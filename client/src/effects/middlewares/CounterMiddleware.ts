import { ACTION_TYPE, CounterAction } from "~/effects/actions/CounterActions"
import { CounterState } from "~/effects/contexts/CounterContext"
import { Middleware } from "~/libs/applyMiddleware"

export const logger: Middleware<CounterState, CounterAction> = async (state, action) => {
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

export const saveStorage: Middleware<CounterState, CounterAction> = async (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.QUERY: {
      localStorage.setItem("count", `${action.payload.count}`)
      break
    }
  }
}
