import { NextPage } from "next"
import Head from "next/head"
import { FlexBody, FlexRoot, Footer, Header, Margin, Navigation, Text } from "~/components"

const about: NextPage = () => (
  <>
    <Head>
      <title>About</title>
    </Head>
    <FlexRoot>
      <Header>About</Header>
      <Navigation />
      <FlexBody>
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
      </FlexBody>
      <Footer />
    </FlexRoot>
  </>
)

export default about
