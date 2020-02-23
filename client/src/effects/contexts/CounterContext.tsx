import { useMutation, useQuery } from "@apollo/react-hooks"
import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react"
import {
  Counter,
  GetCounterDocument,
  GetCounterQuery,
  GetCounterQueryResult,
  SetCounterDocument,
  SetCounterMutation
} from "~/@types/Graphql"
import { CounterAction, fetchQuery } from "~/effects/actions/CounterActions"
import { logger, saveStorage } from "~/effects/middlewares/CounterMiddleware"
import { CounterReducer } from "~/effects/reducers/CounterReducer"
import { applyMiddleware, EnhanceDispatch } from "~/libs/applyMiddleware"

// state
export type CounterState = Pick<Counter, "id" | "count"> & Pick<GetCounterQueryResult, "loading" | "called">

const initialState: Readonly<CounterState> = {
  id: "0",
  count: 0,
  loading: false,
  called: false
}

const CounterStateContext = createContext<CounterState>(initialState)

export const useCounterState = () => {
  return useContext(CounterStateContext)
}

// mutation
export const useCounterHandle = () => {
  const { id, count } = useCounterState()
  const [mutation, { loading }] = useMutation<SetCounterMutation>(SetCounterDocument)
  const decrement = useCallback(() => {
    !loading && mutation({ variables: { id, count: count - 1 } })
  }, [id, count, loading])
  const increment = useCallback(() => {
    !loading && mutation({ variables: { id, count: count + 1 } })
  }, [id, count, loading])

  return {
    decrement,
    increment
  } as const
}

// providor
type CounterProvidorProps = {
  id: string
}

const useReducerWithMiddleware = () => {
  const [state, dispatch] = useReducer(CounterReducer, initialState)
  return [state, applyMiddleware({ state, dispatch }, logger, saveStorage)] as const
}

export const CounterProvidor: React.FC<CounterProvidorProps> = ({ id, children }) => {
  const [state, dispatch] = useReducerWithMiddleware()
  const { data, error, loading, called } = useQuery<GetCounterQuery>(GetCounterDocument, {
    variables: { id }
  })
  const stateProvidorValue = useMemo(() => state, [state.id, state.count, state.loading, state.called])

  useEffect(() => {
    if (error) {
      throw error
    }
    const { id, count } = {
      ...initialState,
      ...data?.counter
    }
    dispatch(fetchQuery({ id, count, loading, called }))
  }, [data, error, loading, called])

  return <CounterStateContext.Provider value={stateProvidorValue}>{children}</CounterStateContext.Provider>
}
