import { NextPage } from "next"
import Head from "next/head"
import { Reset } from "styled-reset"
import { Footer, GlobalStyle, Header, Margin, Text } from "~/components"

const Index: NextPage = () => (
  <>
    <Head>
      <title>About</title>
    </Head>
    <Reset />
    <GlobalStyle />
    <Header>About</Header>
    <Margin all="10px">
      <Text as="h2" font-weight="bold">
        Text
      </Text>
    </Margin>
    <Margin all="10px">
      <Text as="p" line-height="1.5">
        This is about page. This is about page. This is about page. This is about page. This is about page. This is
        about page. This is about page.
      </Text>
    </Margin>
    <Margin top="20px" right="10px" bottom="10px" left="10px">
      <Text as="h2" font-weight="bold">
        List
      </Text>
    </Margin>
    <Margin all="10px">
      <Text as="ul" line-height="1.5">
        <Text as="li">This is about page.</Text>
        <Text as="li">This is about page.</Text>
        <Text as="li">This is about page.</Text>
      </Text>
    </Margin>
    <Footer />
  </>
)

export default Index
