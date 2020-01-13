import { ApolloProvider } from "@apollo/react-common"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import fetch from "isomorphic-unfetch"
import { NextPage } from "next"
import Head from "next/head"
import styled from "styled-components"
import { Reset } from "styled-reset"
import { Counter, Footer, GlobalStyle, Header } from "~/components"
import { CounterProvidor } from "~/contexts/CounterContext"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
    fetch
  })
})

const Index: NextPage = () => {
  const counterId = "1"

  return (
    <ApolloProvider client={client}>
      <CounterProvidor id={counterId}>
        <Head>
          <title>Counter</title>
        </Head>
        <Reset />
        <GlobalStyle />
        <FlexRoot>
          <Header>Counter</Header>
          <FlexBody>
            <Counter />
          </FlexBody>
          <Footer />
        </FlexRoot>
      </CounterProvidor>
    </ApolloProvider>
  )
}

export default Index

const FlexRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  height: 100%;
`

const FlexBody = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`
