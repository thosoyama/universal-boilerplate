import React from "react"
import { compose } from "~/libs/compose"
export * from "./logger"

export type Middleware<S, A> = (state: S) => (next: React.Dispatch<A>) => (action: A) => Promise<Middleware<S, A>>

export type EnhanceDispatch<A> = (action: A) => void

export const applyMiddleware = <S, A>(state: S, dispatch: React.Dispatch<A>) => {
  return (...middlewares: Middleware<S, A>[]): EnhanceDispatch<A> => {
    const chain = middlewares.map(middleware => middleware({ ...state }))
    return compose(...chain)(dispatch)
  }
}
