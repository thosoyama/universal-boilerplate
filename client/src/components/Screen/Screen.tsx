import React from "react"
import styled from "styled-components"

function requestFullscreen() {
  if (document.fullscreenElement) {
    return Promise.resolve()
  }
  return document.documentElement.requestFullscreen()
}

async function lock(orientation) {
  await requestFullscreen().catch(() => false)
  screen.orientation.lock(orientation)
}

function handleLockPortrait() {
  lock("portrait")
}

function handleLockLandscape() {
  lock("landscape")
}

const handleUnLock = () => {
  screen.orientation.unlock()
  if (document.fullscreenElement) {
    document.exitFullscreen()
  }
}

export const Screen: React.FC = () => {
  return (
    <ul>
      <li>
        <Button onClick={handleLockPortrait}>🔒 Portrait</Button>
      </li>
      <li>
        <Button onClick={handleLockLandscape}>🔒 Landscape</Button>
      </li>
      <li>
        <UnLockButton onClick={handleUnLock}>🔓 UnLock</UnLockButton>
      </li>
    </ul>
  )
}

const Button = styled.button`
  outline: none;
  margin: 10px;
  padding: 5px 10px;
  width: 120px;
  font-size: 14px;
  border: 1px solid #333;
  background-color: #fff;
  text-align: left;
`

const UnLockButton = styled(Button)`
  color: #fff;
  background-color: #333;
`
