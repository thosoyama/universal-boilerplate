import { useQuery } from "@apollo/react-hooks"
import React, { createContext, useContext, useEffect, useReducer } from "react"
import { Counter, GetCounterDocument, GetCounterQuery } from "~/@types/Graphql"
import { actions, CounterAction } from "~/effects/actions/CounterActions"
import { logger, saveStorage } from "~/effects/middlewares/CounterMiddleware"
import { CounterReducer } from "~/effects/reducers/CounterReducer"
import { applyMiddleware, EnhanceDispatch } from "~/libs/applyMiddleware"

export type CounterState = Counter & {
  loading: boolean
  initialized: boolean
  touched: boolean
}

const initialState: Readonly<CounterState> = {
  id: "0",
  count: 0,
  loading: false,
  initialized: false,
  touched: false
}

type CounterDispatch = React.Dispatch<CounterAction>

const initialDispatch: CounterDispatch = () => {
  throw new TypeError("Context not provided.")
}

const CounterContext = createContext<[CounterState, CounterDispatch]>([initialState, initialDispatch])

type CounterProvidorProps = {
  id: string
}
export const CounterProvidor: React.FC<CounterProvidorProps> = props => {
  const { id } = props
  const [state, dispatch] = useReducer(CounterReducer, initialState)
  const { data, error, loading } = useQuery<GetCounterQuery>(GetCounterDocument, {
    variables: { id }
  })
  const enhancedDispatch = applyMiddleware({ state, dispatch }, logger, saveStorage)

  useEffect(() => {
    if (loading) {
      enhancedDispatch(actions.fetchStart())
    }
  }, [loading])

  useEffect(() => {
    if (error) {
      throw error
    }
    if (data && data.counter) {
      enhancedDispatch(actions.fetchEnd(id, data.counter.count))
    }
  }, [data, error])

  return <CounterContext.Provider value={[state, enhancedDispatch]}>{props?.children}</CounterContext.Provider>
}

export const useCounterContext = () => {
  return useContext<[CounterState, EnhanceDispatch<CounterAction>]>(CounterContext)
}
