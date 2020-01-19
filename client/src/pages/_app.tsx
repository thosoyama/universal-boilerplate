import NextApp from "next/app"
import Head from "next/head"
import React from "react"
import { ThemeProvider } from "styled-components"
import { Reset } from "styled-reset"
import { GlobalStyle } from "~/components"

const theme = {
  primary: "green"
}

export default class App extends NextApp {
  render(): JSX.Element {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>universal-boilerplate</title>
        </Head>
        <Reset />
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
