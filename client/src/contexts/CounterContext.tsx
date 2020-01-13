import { useMutation, useQuery } from "@apollo/react-hooks"
import React, { createContext, useContext, useEffect, useReducer } from "react"
import { Counter, GetCounterDocument, GetCounterQuery, SetCounterDocument, SetCounterMutation } from "~/@types/Graphql"

// actions
const FETCH_START = "fetchStart" as const
const FETCH_END = "fetchEnd" as const
const INCREMENT = "increment" as const
const DECREMENT = "decrement" as const

const fetchStart = () => ({ type: FETCH_START })
const fetchEnd = (id: string, count: number) => {
  return {
    type: FETCH_END,
    payload: { id, count }
  }
}

const increment = () => ({ type: INCREMENT })
const decrement = () => ({ type: DECREMENT })

type CounterAction =
  | ReturnType<typeof fetchStart>
  | ReturnType<typeof fetchEnd>
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>

export const actions = {
  fetchStart,
  fetchEnd,
  increment,
  decrement
} as const

// states
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

// reducers
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

// dispachers
type CounterDispatch = React.Dispatch<CounterAction>

const initialDispatch: CounterDispatch = () => {
  throw new TypeError("Context not provided.")
}

// contexts
const CounterContext = createContext<[CounterState, CounterDispatch]>([initialState, initialDispatch])

// provider
type CounterProvidorProps = {
  id: string
}
export const CounterProvidor: React.FC<CounterProvidorProps> = props => {
  const { id } = props
  const [state, dispatch] = useReducer(counterReducer, initialState)
  const { data, error, loading } = useQuery<GetCounterQuery>(GetCounterDocument, {
    variables: { id }
  })

  if (error) {
    throw error
  }

  useEffect(() => {
    if (loading) {
      dispatch(fetchStart())
    }
  }, [loading])

  useEffect(() => {
    if (data && data.counter) {
      dispatch(fetchEnd(id, data.counter.count))
    }
  }, [data])

  return <CounterContext.Provider value={[state, dispatch]}>{props?.children}</CounterContext.Provider>
}

// hooks
export const useCounterContext = (): [CounterState, CounterDispatch] => {
  const [state, dispatch] = useContext(CounterContext)
  const [mutation, { data, error, loading }] = useMutation<SetCounterMutation>(SetCounterDocument)

  if (error) {
    throw error
  }

  useEffect(() => {
    if (loading) {
      dispatch(fetchStart())
    }
  }, [loading])

  useEffect(() => {
    if (data && data.counter) {
      dispatch(fetchEnd(state.id, data.counter.count))
    }
  }, [data])

  useEffect(() => {
    if (state.initialized && state.touched) {
      mutation({ variables: { id: state.id, count: state.count } })
    }
  }, [state.count])

  return [state, dispatch]
}
