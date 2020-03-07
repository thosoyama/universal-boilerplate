export type Middleware<A, S> = (action: A, state: S) => Promise<void>
export type EnhanceDispatch<A> = (action: A) => void

export const applyMiddleware = <A, S>(
  state: S,
  dispatch: React.Dispatch<A>,
  middlewares: Middleware<A, S>[]
): EnhanceDispatch<A> => {
  return action => middlewares.map(middleware => middleware(action, state)) && dispatch(action)
}
