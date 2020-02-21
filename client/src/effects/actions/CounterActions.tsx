import { CounterQueryFlatResult } from "~/effects/contexts/CounterContext"

export const ACTION_TYPE = {
  FETCH_QUERY: "FETCH_QUERY",
  FETCH_MUTATION: "FETCH_MUTATION"
} as const

const fetchQuery = (state: CounterQueryFlatResult) => {
  return {
    type: ACTION_TYPE.FETCH_QUERY,
    payload: state
  }
}

export const actions = {
  fetchQuery
}

export type CounterAction = ReturnType<typeof fetchQuery>
