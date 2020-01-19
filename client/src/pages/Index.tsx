import { NextPage } from "next"
import Head from "next/head"
import { Navigation } from "~/components/Navigation"
import { Header, Footer, FlexBody, FlexRoot } from "~/components"
import styled from "styled-components"

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <FlexRoot>
        <Header>Index</Header>
        <Navigation />
        <FlexBody>
          <Content>Hello World.</Content>
        </FlexBody>
        <Footer />
      </FlexRoot>
    </>
  )
}

export default Index

const Content = styled.div`
  margin: 10px;
`
