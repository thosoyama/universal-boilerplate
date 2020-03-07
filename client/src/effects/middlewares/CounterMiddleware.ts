import { ACTION_TYPE, CounterAction } from "~/effects/actions/CounterActions"
import { CounterState } from "~/effects/contexts/CounterContext"
import { Middleware } from "~/libs/applyMiddleware"

type CounterMiddleware = Middleware<CounterAction, CounterState>

export const logger: CounterMiddleware = async (action, state) => {
  switch (action.type) {
    case ACTION_TYPE.QUERY: {
      const { count } = action.payload
      console.log(`${action.type}:`, {
        count: `${state.count} -> ${count}`
      })
      break
    }
    case ACTION_TYPE.MUTATION: {
      const { loading } = action.payload
      console.log(`${action.type}:`, {
        loading
      })
      break
    }
  }
}

export const saveStorage: CounterMiddleware = async action => {
  switch (action.type) {
    case ACTION_TYPE.QUERY: {
      localStorage.setItem("count", `${action.payload.count}`)
      break
    }
  }
}
