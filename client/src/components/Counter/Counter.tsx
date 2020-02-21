import React from "react"
import styled from "styled-components"
import { useCounterDispatch, useCounterState } from "~/effects/contexts/CounterContext"

export const Counter: React.FC = () => {
  const { count, loading, called } = useCounterState()
  const { usehandle } = useCounterDispatch()
  const { decrement, increment } = usehandle()

  if (!called || loading) {
    return null
  }

  return (
    <>
      <Button onClick={decrement}>-</Button>
      <Count>{count}</Count>
      <Button onClick={increment}>+</Button>
    </>
  )
}

const Count = styled.span`
  width: 2.5em;
  font-size: 20px;
  font-weight: bold;
  vertical-align: middle;
  text-align: center;
`

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid #ccc;
  font-size: 10px;
  font-weight: bold;
`
