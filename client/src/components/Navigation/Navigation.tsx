import Link from "next/link"
import React from "react"
import styled from "styled-components"

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
      <List>
        <Link href="/screen">
          <a>Screen</a>
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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`
