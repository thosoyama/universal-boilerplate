import { ApolloProvider } from "@apollo/react-common"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import fetch from "isomorphic-unfetch"
import { NextPage } from "next"
import Head from "next/head"
import styled from "styled-components"
import { Counter, FlexBody, FlexRoot, Footer, Header, Navigation } from "~/components"
import { CounterProvidor } from "~/contexts/CounterContext"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
    fetch
  })
})

const counter: NextPage = () => {
  const counterId = "1"

  return (
    <>
      <Head>
        <title>Counter</title>
      </Head>
      <ApolloProvider client={client}>
        <CounterProvidor id={counterId}>
          <FlexRoot>
            <Header>Counter</Header>
            <Navigation />
            <FlexBody>
              <Content>
                <Counter />
              </Content>
            </FlexBody>
            <Footer />
          </FlexRoot>
        </CounterProvidor>
      </ApolloProvider>
    </>
  )
}

export default counter

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  height: 100%;
`
