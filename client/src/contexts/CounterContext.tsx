import { useQuery } from "@apollo/react-hooks"
import React, { createContext, memo, useContext, useEffect, useReducer } from "react"
import { Counter, GetCounterDocument, GetCounterQuery } from "~/@types/Graphql"

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

// middleware
type CounterMiddleWare = (action: CounterAction) => Promise<any>

export const consoleLog = async action => {
  console.log(action)
}

// dispachers
type EnhanceDispatch<T, U> = (action: T, middleware?: U) => void

type CounterDispatch = React.Dispatch<CounterAction>
type EnhanceCounterDispatch = EnhanceDispatch<CounterAction, CounterMiddleWare>

const initialDispatch: CounterDispatch = () => {
  throw new TypeError("Context not provided.")
}

const enhanceDispatch = (dispatch: CounterDispatch): EnhanceCounterDispatch => {
  return (action, middleware?) => {
    if (middleware) {
      middleware(action).then(() => dispatch(action))
    } else {
      dispatch(action)
    }
  }
}

// contexts
const CounterContext = createContext<[CounterState, CounterDispatch]>([initialState, initialDispatch])

// provider
type CounterProvidorProps = {
  id: string
}
export const CounterProvidor: React.FC<CounterProvidorProps> = memo(props => {
  const { id } = props
  const [state, dispatch] = useReducer(counterReducer, initialState)
  const { data, error, loading } = useQuery<GetCounterQuery>(GetCounterDocument, {
    variables: { id }
  })
  const enhancedDispatch = enhanceDispatch(dispatch)

  useEffect(() => {
    if (loading) {
      enhancedDispatch(fetchStart(), consoleLog)
    }
  }, [loading])

  useEffect(() => {
    if (error) {
      throw error
    }
    if (data && data.counter) {
      enhancedDispatch(fetchEnd(id, data.counter.count), consoleLog)
    }
  }, [data, error])

  return <CounterContext.Provider value={[state, enhancedDispatch]}>{props?.children}</CounterContext.Provider>
})

// hooks
export const useCounterContext = (): [CounterState, EnhanceCounterDispatch] => {
  return useContext(CounterContext)
}
