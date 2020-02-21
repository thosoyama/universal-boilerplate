import { ACTION_TYPE, CounterAction } from "~/effects/actions/CounterActions"
import { CounterState } from "~/effects/contexts/CounterContext"
import { Middleware } from "~/libs/applyMiddleware"

export const logger: Middleware<CounterState, CounterAction> = ({ state }) => next => async action => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_QUERY: {
      const { loading, count } = action.payload
      console.log(`${action.type}:`, {
        loading,
        count: `${state.count} -> ${count}`
      })
      break
    }
  }
  next(action)
}

export const saveStorage: Middleware<CounterState, CounterAction> = () => next => async action => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_QUERY: {
      localStorage.setItem("count", `${action.payload.count}`)
      break
    }
  }
  next(action)
}
