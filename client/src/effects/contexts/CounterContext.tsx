import { useMutation, useQuery } from "@apollo/react-hooks"
import React, { createContext, useCallback, useContext, useEffect, useReducer } from "react"
import {
  Counter,
  GetCounterDocument,
  GetCounterQuery,
  GetCounterQueryResult,
  SetCounterDocument,
  SetCounterMutation
} from "~/@types/Graphql"
import { actions, CounterAction } from "~/effects/actions/CounterActions"
import { logger, saveStorage } from "~/effects/middlewares/CounterMiddleware"
import { CounterReducer } from "~/effects/reducers/CounterReducer"
import { applyMiddleware, EnhanceDispatch } from "~/libs/applyMiddleware"

export type CounterQueryFlatResult = Pick<Counter, "id" | "count"> & Pick<GetCounterQueryResult, "loading" | "called">
export type CounterState = CounterQueryFlatResult

const initialState: Readonly<CounterState> = {
  id: "0",
  count: 0,
  loading: false,
  called: false
}

const useHandles = (id: Counter["id"], count: Counter["count"]) => {
  const [mutation, { loading: mutationLoading }] = useMutation<SetCounterMutation>(SetCounterDocument)

  const handleDecrement = useCallback(() => {
    !mutationLoading && mutation({ variables: { id, count: count - 1 } })
  }, [id, count, mutationLoading])

  const handleIncrement = useCallback(() => {
    !mutationLoading && mutation({ variables: { id, count: count + 1 } })
  }, [id, count, mutationLoading])

  return [handleDecrement, handleIncrement] as const
}

type CounterDispatch = {
  useHandles: typeof useHandles
  dispatch: EnhanceDispatch<CounterAction>
}

const initialDispatch: CounterDispatch = {
  useHandles: () => [() => undefined, () => undefined],
  dispatch: () => {
    throw new TypeError("Context not provided.")
  }
}

const CounterContext = createContext<[CounterState, CounterDispatch]>([initialState, initialDispatch])

type CounterProvidorProps = {
  id: string
}
export const CounterProvidor: React.FC<CounterProvidorProps> = props => {
  const { id } = props
  const [state, dispatch] = useReducer(CounterReducer, initialState)
  const { data, error, loading, called } = useQuery<GetCounterQuery>(GetCounterDocument, {
    variables: { id }
  })
  const enhancedDispatch = applyMiddleware({ state, dispatch }, logger, saveStorage)
  const dispatchs: CounterDispatch = {
    dispatch: enhancedDispatch,
    useHandles
  }

  useEffect(() => {
    if (error) {
      throw error
    }
    const { id, count } = {
      ...initialState,
      ...data?.counter
    }
    const action = actions.fetchQuery({ id, count, loading, called })
    enhancedDispatch(action)
  }, [data, error, loading, called])

  return <CounterContext.Provider value={[state, dispatchs]}>{props?.children}</CounterContext.Provider>
}

export const useCounterContext = (): [CounterState, CounterDispatch] => {
  return useContext(CounterContext)
}
