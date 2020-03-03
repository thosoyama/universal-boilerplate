import { ACTION_TYPE, CounterAction } from "~/effects/actions/CounterActions"
import { CounterState } from "~/effects/contexts/CounterContext"

export const CounterReducer: React.Reducer<CounterState, CounterAction> = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.QUERY: {
      return {
        ...state,
        ...action.payload
      }
    }
    case ACTION_TYPE.MUTATION: {
      return {
        ...state,
        ...action.payload
      }
    }
    default: {
      throw new Error(`Invalid action type`)
    }
  }
}
