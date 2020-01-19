import { NextPage } from "next"
import Head from "next/head"
import styled from "styled-components"
import { FlexBody, FlexRoot, Footer, Header, Navigation, Screen } from "~/components"

const screen: NextPage = () => {
  return (
    <>
      <Head>
        <title>Screen</title>
      </Head>
      <FlexRoot>
        <Header>Counter</Header>
        <Navigation />
        <FlexBody>
          <Content>
            <Screen />
          </Content>
        </FlexBody>
        <Footer />
      </FlexRoot>
    </>
  )
}

export default screen

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  height: 100%;
`
