export const ACTION_TYPE = {
  QUERY: "QUERY",
  MUTATION: "MUTATION",
  RESET: "RESET"
} as const

export const query = (id: string, count: number, loading: boolean, called: boolean) => {
  return {
    type: ACTION_TYPE.QUERY,
    payload: {
      id,
      count,
      loading,
      called
    }
  }
}

export const mutation = (loading: boolean) => {
  return {
    type: ACTION_TYPE.MUTATION,
    payload: {
      loading
    }
  }
}

export type CounterAction = ReturnType<typeof query> | ReturnType<typeof mutation>
