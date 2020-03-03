import React from "react"
import styled from "styled-components"
import { useCounterHandle } from "~/effects/contexts/CounterContext"

type CounterProps = {
  count: number | undefined
  loading: boolean
  handleDecrement: () => void
  handleIncrement: () => void
  handleReset: () => void
}

const PureCounter = React.memo<CounterProps>(({ count, handleDecrement, handleIncrement, handleReset }) => {
  if (typeof count !== "number") {
    return <div>Now Loading ...</div>
  }
  return (
    <>
      <Button onClick={handleDecrement}>-</Button>
      <Count>{count}</Count>
      <Button onClick={handleIncrement}>+</Button>
      <ResetButton onClick={handleReset}>RESET</ResetButton>
    </>
  )
})

export const Counter: React.FC = () => {
  return <PureCounter {...useCounterHandle()} />
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

const ResetButton = styled(Button)`
  margin-left: 10px;
`
