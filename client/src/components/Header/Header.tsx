import React from "react"
import styled from "styled-components"
import { useCounterContext } from "~/contexts/CounterContext"

type TProps = {
  children?: React.ReactNode
}

export const Header: React.FC<TProps> = props => {
  const [{ count, initialized }] = useCounterContext()

  return (
    <Root>
      <Title>
        {props?.children || "Demo"} {initialized ? count : "..."}
      </Title>
    </Root>
  )
}

const Root = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #efefef;
  box-sizing: border-box;
`

const Title = styled.h1`
  font-size: 14px;
  font-weight: bold;
`