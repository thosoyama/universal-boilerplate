import { useQuery } from "@apollo/react-hooks"
import React, { createContext, useContext, useEffect, useReducer } from "react"
import { Counter, GetCounterDocument, GetCounterQuery } from "~/@types/Graphql"
import { applyMiddleware, EnhanceDispatch, logger } from "~/middlewares"

// state
type CounterState = Counter & {
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

// actions
const FETCH_START = "fetchStart" as const
const FETCH_END = "fetchEnd" as const
const INCREMENT = "increment" as const
const DECREMENT = "decrement" as const

export const fetchStart = () => ({ type: FETCH_START })
export const fetchEnd = (id: string, count: number) => {
  return {
    type: FETCH_END,
    payload: { id, count }
  }
}

export const increment = () => ({ type: INCREMENT })
export const decrement = () => ({ type: DECREMENT })

type CounterAction =
  | ReturnType<typeof fetchStart>
  | ReturnType<typeof fetchEnd>
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>

// reducer
const counterReducer: React.Reducer<CounterState, CounterAction> = (state, action) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...state,
        loading: true
      }
    }
    case FETCH_END: {
      return {
        ...state,
        ...action.payload,
        loading: false,
        initialized: true
      }
    }
    case INCREMENT: {
      return {
        ...state,
        count: state.count + 1,
        touched: true
      }
    }
    case DECREMENT: {
      return {
        ...state,
        count: state.count - 1,
        touched: true
      }
    }
    default: {
      return state
    }
  }
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
      dispatch(fetchStart())
    }
  }, [loading])

  useEffect(() => {
    if (error) {
      throw error
    }
    if (data && data.counter) {
      dispatch(fetchEnd(id, data.counter.count))
    }
  }, [data, error])

  return <CounterContext.Provider value={[state, dispatch]}>{props?.children}</CounterContext.Provider>
}

// hooks
export const useCounterContext = () => {
  return useContext<[CounterState, EnhanceDispatch<CounterAction>]>(CounterContext)
}
