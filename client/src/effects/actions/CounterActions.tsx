export const ACTION_TYPE = {
  FETCH_START: "FETCH_START",
  FETCH_END: "FETCH_END",
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT"
} as const

const fetchStart = () => ({ type: ACTION_TYPE.FETCH_START })

const fetchEnd = (id: string, count: number) => {
  return {
    type: ACTION_TYPE.FETCH_END,
    payload: { id, count }
  }
}

const increment = () => ({ type: ACTION_TYPE.INCREMENT })

const decrement = () => ({ type: ACTION_TYPE.DECREMENT })

export const actions = {
  fetchStart,
  fetchEnd,
  increment,
  decrement
}

export type CounterAction =
  | ReturnType<typeof fetchStart>
  | ReturnType<typeof fetchEnd>
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
