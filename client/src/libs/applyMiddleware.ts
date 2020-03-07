import { useMemo } from "react"

export type Middleware<S, A> = (state: S, action: A) => Promise<void>
export type EnhanceDispatch<A> = (action: A) => void

export const applyMiddleware = <S, A>(
  state: S,
  dispatch: React.Dispatch<A>,
  ...middlewares: Middleware<S, A>[]
): EnhanceDispatch<A> => {
  return useMemo(() => action => middlewares.map(middleware => middleware(state, action)) && dispatch(action), [state])
}
