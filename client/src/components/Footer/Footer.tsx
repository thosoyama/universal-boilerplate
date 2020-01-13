import React from "react"
import styled from "styled-components"

export const Footer: React.FC = () => {
  return (
    <Root>
      <small>&copy;t-hosoyama</small>
    </Root>
  )
}

const Root = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  box-sizing: border-box;
  background-color: #efefef;
`
