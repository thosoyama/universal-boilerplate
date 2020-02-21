import React from "react"
import styled from "styled-components"
import { useCounterDispatch, useCounterState } from "~/effects/contexts/CounterContext"

const MemoizeCount = React.memo<{ count: number }>(({ count }) => <Count>{count}</Count>)

export const Counter: React.FC = () => {
  const { count, loading, called } = useCounterState()
  const { usehandle } = useCounterDispatch()
  const { decrement, increment } = usehandle()

  return !called || loading ? null : (
    <>
      <Button onClick={decrement}>-</Button>
      <MemoizeCount count={count} />
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
