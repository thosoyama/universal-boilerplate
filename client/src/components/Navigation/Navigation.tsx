import Link from "next/link"
import React from "react"
import styled from "styled-components"

export const Navigation: React.FC = () => {
  return (
    <Root>
      <List>
        <Link href="/" passHref>
          <StyledLink>index</StyledLink>
        </Link>
      </List>
      <List>
        <Link href="/about" passHref>
          <StyledLink>about</StyledLink>
        </Link>
      </List>
      <List>
        <Link href="/counter" passHref>
          <StyledLink>counter</StyledLink>
        </Link>
      </List>
      <List>
        <Link href="/screen" passHref>
          <StyledLink>Screen</StyledLink>
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
  height: 100%;
  text-align: center;
`

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
