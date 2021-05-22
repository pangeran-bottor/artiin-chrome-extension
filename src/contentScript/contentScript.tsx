import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Card } from '@material-ui/core'
import './contentScript.css'

const App: React.FC<{}> = () => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [selectedText, setSelectedText] = useState<string>("")

  useEffect(() => {
    setIsActive(false)
  }, [])

  const handleMessages = (msg: string) => {
    if (msg.length > 0) {
      console.log("receive a message: ", msg)
      setIsActive(true)
      setSelectedText(msg)
    }
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessages)
    return () => {
      // clean up event listener, bug fix from: https://www.udemy.com/course/chrome-extension/learn/#questions/14694484/
      chrome.runtime.onMessage.removeListener(handleMessages)
    }
  }, [isActive, selectedText])


  return (
    <>
      {isActive && (
        <Card className="overlayCard">
            { selectedText }
            <button onClick={() => setIsActive(false)}>
                CLOSE
            </button>
        </Card>
      )}
    </>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)