import { compose } from "~/libs/compose"

type MiddlewareAction<A> = (action: Readonly<A>) => Promise<void>

type MiddlewareDispatch<A> = (next: React.Dispatch<A>) => MiddlewareAction<A>

export type Middleware<S, A> = (api: { state: Readonly<S>; dispatch: React.Dispatch<A> }) => MiddlewareDispatch<A>

export type EnhanceDispatch<A> = (action: Readonly<A>) => void

export const applyMiddleware = <S, A>(state: S, dispatch: React.Dispatch<A>) => {
  return (...middlewares: Middleware<S, A>[]): EnhanceDispatch<A> => {
    const chain = middlewares.map(middleware => middleware({ state, dispatch }))
    return compose(...chain)(dispatch)
  }
}
