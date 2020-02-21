import { useMemo } from "react"
import { compose } from "~/libs/compose"

type MiddlewareAPI<S, A> = {
  state: Readonly<S>
  dispatch: React.Dispatch<Readonly<A>>
}

type MiddlewareBehaviour<A> = (action: Readonly<A>) => Promise<void>

export type Middleware<S, A> = (
  api: MiddlewareAPI<S, A>
) => (next: MiddlewareBehaviour<A> | React.Dispatch<A>) => MiddlewareBehaviour<A>

export type EnhanceDispatch<A> = (action: Readonly<A>) => void

export const applyMiddleware = <S, A>(
  api: MiddlewareAPI<S, A>,
  ...middlewares: Middleware<S, A>[]
): EnhanceDispatch<A> => {
  return useMemo(() => {
    const chain = middlewares.map(middleware => middleware(api))
    return compose(...chain)(api.dispatch)
  }, [])
}
