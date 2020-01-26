import { compose } from "~/libs/compose"

export type MiddlewareBehaviour<A> = (action: Readonly<A>) => Promise<void>

export type Middleware<S, A> = (value: {
  state: Readonly<S>
  dispatch: React.Dispatch<A>
}) => (next: React.Dispatch<A> | MiddlewareBehaviour<A>) => MiddlewareBehaviour<A>

export type EnhanceDispatch<A> = (action: Readonly<A>) => void

export const applyMiddleware = <S, A>(state: S, dispatch: React.Dispatch<A>) => {
  return (...middlewares: Middleware<S, A>[]): EnhanceDispatch<A> => {
    const chain = middlewares.map(middleware => middleware({ state, dispatch }))
    return compose(...chain)(dispatch)
  }
}
