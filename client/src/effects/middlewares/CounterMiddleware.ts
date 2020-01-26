import { ACTION_TYPE, CounterAction } from "~/effects/actions/CounterActions"
import { CounterState } from "~/effects/contexts/CounterContext"
import { Middleware } from "~/libs/applyMiddleware"

export const logger: Middleware<CounterState, CounterAction> = ({ state }) => next => async action => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_START: {
      console.log(action.type)
      break
    }
    case ACTION_TYPE.FETCH_END: {
      console.log(action.type, state.count, action.payload.count)
      break
    }
  }
  next(action)
}

export const saveStorage: Middleware<CounterState, CounterAction> = () => next => async action => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_END: {
      localStorage.setItem("count", `${action.payload.count}`)
      break
    }
  }
  next(action)
}
