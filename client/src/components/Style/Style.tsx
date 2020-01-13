import styled, { createGlobalStyle, css } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  html, body {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`

export const Padding = styled.div<{
  top?: string
  right?: string
  bottom?: string
  left?: string
  all?: string
}>`
  ${// prettier-ignore
  ({ all, top, right, bottom, left }) => all ? css`
    padding: ${all};
  ` : css`
    padding-top: ${top};
    padding-right: ${right};
    padding-bottom: ${bottom};
    padding-left: ${left};
  `}
`
Padding.defaultProps = { top: "0", right: "0", bottom: "0", left: "0" }

export const Margin = styled.div<{
  top?: string
  right?: string
  bottom?: string
  left?: string
  all?: string
}>`
  ${// prettier-ignore
  ({ all, top, right, bottom, left }) => all ? css`
    margin: ${all};
  ` : css`
    margin-top: ${top};
    margin-right: ${right};
    margin-bottom: ${bottom};
    margin-left: ${left};
  `}
`
Margin.defaultProps = { top: "0", right: "0", bottom: "0", left: "0" }

export const Text = styled.span<{
  display?: string
  "font-size"?: string
  "font-weight"?: string
  "line-height"?: string
  "text-align"?: string
  color?: string
}>`
  text-align: ${props => props["text-align"]};
  font-size: ${props => props["font-size"]};
  font-weight: ${props => props["font-weight"]};
  line-height: ${props => props["line-height"]};
  color: ${props => props.color};
`
