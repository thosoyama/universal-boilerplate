import React, { memo, useCallback, useEffect } from "react"
import styled from "styled-components"
import Link from "next/link"

export const Navigation: React.FC = () => {
  return (
    <Root>
      <List>
        <Link href="/">
          <a>index</a>
        </Link>
      </List>
      <List>
        <Link href="/about">
          <a>about</a>
        </Link>
      </List>
      <List>
        <Link href="/counter">
          <a>counter</a>
        </Link>
      </List>
    </Root>
  )
}

const Root = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #efefef;
`
const List = styled.li`
  text-align: center;
`
