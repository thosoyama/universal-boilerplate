import { ACTION_TYPE, CounterAction } from "~/effects/actions/CounterActions"
import { CounterState } from "~/effects/contexts/CounterContext"

export const CounterReducer: React.Reducer<CounterState, CounterAction> = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_START: {
      return {
        ...state,
        loading: true
      }
    }
    case ACTION_TYPE.FETCH_END: {
      return {
        ...state,
        ...action.payload,
        loading: false,
        initialized: true
      }
    }
    case ACTION_TYPE.INCREMENT: {
      return {
        ...state,
        count: state.count + 1,
        touched: true
      }
    }
    case ACTION_TYPE.DECREMENT: {
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
