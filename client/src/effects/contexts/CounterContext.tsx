import { useQuery } from "@apollo/react-hooks"
import React, { createContext, useContext, useEffect, useReducer } from "react"
import { Counter, GetCounterDocument, GetCounterQuery } from "~/@types/Graphql"
import { actions, CounterAction } from "~/effects/actions/CounterActions"
import { applyMiddleware, EnhanceDispatch, logger } from "~/effects/middlewares"
import { counterReducer } from "~/effects/reducers/CounterReducer"

// state
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

// dispacher
type CounterDispatch = React.Dispatch<CounterAction>

const initialDispatch: CounterDispatch = () => {
  throw new TypeError("Context not provided.")
}

// context
const CounterContext = createContext<[CounterState, CounterDispatch]>([initialState, initialDispatch])

// provider
type CounterProvidorProps = {
  id: string
}
export const CounterProvidor: React.FC<CounterProvidorProps> = props => {
  const { id } = props
  const [state, _dispatch] = useReducer(counterReducer, initialState)
  const { data, error, loading } = useQuery<GetCounterQuery>(GetCounterDocument, {
    variables: { id }
  })
  const dispatch = applyMiddleware(state, _dispatch)(logger)

  useEffect(() => {
    if (loading) {
      dispatch(actions.fetchStart())
    }
  }, [loading])

  useEffect(() => {
    if (error) {
      throw error
    }
    if (data && data.counter) {
      dispatch(actions.fetchEnd(id, data.counter.count))
    }
  }, [data, error])

  return <CounterContext.Provider value={[state, dispatch]}>{props?.children}</CounterContext.Provider>
}

// consumer
export const useCounterContext = () => {
  return useContext<[CounterState, EnhanceDispatch<CounterAction>]>(CounterContext)
}
