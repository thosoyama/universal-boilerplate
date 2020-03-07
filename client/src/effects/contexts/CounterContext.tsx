import { ExecutionResult, MutationFunctionOptions, OperationVariables } from "@apollo/react-common"
import { useMutation, useQuery } from "@apollo/react-hooks"
import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react"
import {
  Counter,
  GetCounterDocument,
  GetCounterQuery,
  GetCounterQueryResult,
  SetCounterDocument,
  SetCounterMutation,
  SetCounterMutationResult
} from "~/@types/Graphql"
import { applyMiddleware, EnhanceDispatch } from "~/libs/applyMiddleware"
import { CounterAction, mutation, query } from "../actions/CounterActions"
import { logger, saveStorage } from "../middlewares/CounterMiddleware"
import { CounterReducer } from "../reducers/CounterReducer"

// state
export type CounterState = Pick<Counter, "id" | "count"> & Pick<GetCounterQueryResult, "error" | "loading" | "called">
const initialCounterState: Readonly<CounterState> = {
  id: "",
  count: 0,
  loading: false,
  called: false
}

// context
const CounterStateContext = createContext<CounterState>(initialCounterState)

const CounterQueryResultContext = createContext<Pick<GetCounterQueryResult, "data" | "error" | "loading" | "called">>({
  data: undefined,
  loading: true,
  called: false
})

const CounterDispatchContext = createContext<EnhanceDispatch<CounterAction>>(() => {
  throw new Error("dispatch not provided")
})

type CounterMutationFunc = (
  options?: MutationFunctionOptions<SetCounterMutation, OperationVariables>
) => Promise<ExecutionResult<SetCounterMutation>>
const CounterMutationFuncContext = createContext<CounterMutationFunc>(() => {
  return new Promise(resolve => resolve({}))
})

const CounterMutationResultContext = createContext<SetCounterMutationResult>({
  loading: false,
  called: false
})

// enhance useReducer
const useReducerWithMiddleware = () => {
  const [state, dispatch] = useReducer(CounterReducer, initialCounterState)
  const enhanceDispatch = useMemo(() => applyMiddleware(state, dispatch, [logger, saveStorage]), [state])
  return [state, enhanceDispatch] as const
}

// providers
const CounterStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducerWithMiddleware()

  return (
    <CounterStateContext.Provider value={state}>
      <CounterDispatchContext.Provider value={dispatch}>{children}</CounterDispatchContext.Provider>
    </CounterStateContext.Provider>
  )
}

const CounterQueryProvider: React.FC<{ id: string }> = ({ id, children }) => {
  const dispatch = useContext(CounterDispatchContext)
  const queryResult = useQuery<GetCounterQuery>(GetCounterDocument, { variables: { id } })
  const { data, called, loading } = queryResult

  useEffect(() => {
    const { count } = (data && data.counter) || {}
    if (!data || typeof count !== "number") {
      return
    }
    dispatch(query(id, count, loading, called))
  }, [data, called, loading])

  return <CounterQueryResultContext.Provider value={queryResult}>{children}</CounterQueryResultContext.Provider>
}

const CounterMutationProvider: React.FC = ({ children }) => {
  const [mutationFunc, mutationResult] = useMutation<SetCounterMutation>(SetCounterDocument)
  const dispatch = useContext(CounterDispatchContext)
  const { data, loading, called } = mutationResult

  useEffect(() => {
    if (!called) {
      return
    }
    dispatch(mutation(loading))
  }, [data, loading])

  return (
    <CounterMutationFuncContext.Provider value={mutationFunc}>
      <CounterMutationResultContext.Provider value={mutationResult}>{children}</CounterMutationResultContext.Provider>
    </CounterMutationFuncContext.Provider>
  )
}

export const CounterProvider: React.FC<{ id: string }> = ({ id, children }) => {
  return (
    <CounterStateProvider>
      <CounterQueryProvider id={id}>
        <CounterMutationProvider>{children}</CounterMutationProvider>
      </CounterQueryProvider>
    </CounterStateProvider>
  )
}

// consumers
export const useCounterState = () => {
  return useContext(CounterStateContext)
}
export const useCounterDispatch = () => {
  return useContext(CounterDispatchContext)
}
export const useCounterQueryResult = () => {
  return useContext(CounterQueryResultContext)
}
export const useCounterMutationFunc = () => {
  return useContext(CounterMutationFuncContext)
}
export const useCounterMutationResult = () => {
  return useContext(CounterMutationResultContext)
}
export const useCounterHandle = () => {
  const { id, count, loading, called } = useCounterState()
  const mutation = useCounterMutationFunc()

  const handleDecrement = () => {
    if (loading || typeof count !== "number") {
      return
    }
    mutation({ variables: { id, count: count - 1 } })
  }

  const handleIncrement = () => {
    if (loading || typeof count !== "number") {
      return
    }
    mutation({ variables: { id, count: count + 1 } })
  }

  const handleReset = () => {
    if (loading || typeof count !== "number") {
      return
    }
    mutation({ variables: { id, count: 0 } })
  }

  return {
    count,
    loading,
    called,
    handleDecrement,
    handleIncrement,
    handleReset
  }
}
