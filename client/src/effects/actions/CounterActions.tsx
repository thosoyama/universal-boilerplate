import { CounterState } from "~/effects/contexts/CounterContext"

export const ACTION_TYPE = {
  FETCH_QUERY: "FETCH_QUERY",
  FETCH_MUTATION: "FETCH_MUTATION"
} as const

export const fetchQuery = (state: CounterState) => {
  return {
    type: ACTION_TYPE.FETCH_QUERY,
    payload: state
  }
}

export type CounterAction = ReturnType<typeof fetchQuery>
