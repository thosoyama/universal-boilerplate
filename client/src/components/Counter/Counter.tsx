import React from "react"
import styled from "styled-components"
import { useCounterContext } from "~/effects/contexts/CounterContext"

export const Counter: React.FC = () => {
  const [{ id, count, loading: queryLoading, called: queryCalled }, { useHandles }] = useCounterContext()
  const [handleDecrement, handleIncrement] = useHandles(id, count)

  if (!queryCalled || queryLoading) {
    return null
  }

  return (
    <>
      <Button onClick={handleDecrement}>-</Button>
      <Count>{count}</Count>
      <Button onClick={handleIncrement}>+</Button>
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
