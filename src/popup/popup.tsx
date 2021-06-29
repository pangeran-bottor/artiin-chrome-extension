import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'



interface Definition {
  def_text?: string;
}


type FetchState = "start" | "loading" | "error" | "ready"

const getData = async (word: string) => {
  const resp = await fetch(`http://kateglo.com/api.php?format=json&phrase=${word}`)
  const data = await resp.json()
  return data.kateglo.definition
}

const App: React.FC<{}> = () => {
  const [definitions, setDefinitions] = useState([] as Array<Definition>)
  const [word, setWord] = useState("")
  const [searchWord, setSearchWord] = useState("")
  const [fetchState, setFetchState] = useState<FetchState>("start")

  useEffect(() => {
    const fetchData = async (word: string) => {
      const data: Array<Definition> = await getData(word)
      console.log(data)
      setDefinitions(data)
      setFetchState("ready")
    }
    if (searchWord.length > 0) {
      fetchData(searchWord).catch((err) => {
        console.log("Caugh error: ", err)
        setFetchState("error")
      })
    } 
  }, [searchWord])

  const handleCariBtn = () => {
    console.log("current word: " + word)
    setFetchState("loading")
    setSearchWord(word)
  }

  const handleEnterPressed = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setFetchState("loading")
      setSearchWord(word)
    } 
  }

  if (fetchState == "loading" || fetchState == "error") {
    return (
      <>
      <input 
        type="text" 
        id="targetWord" 
        onChange={(event) => setWord(event.target.value as string)}
        onKeyDown={handleEnterPressed}
      ></input>
      <button onClick={handleCariBtn}>Cari</button>
      <div>
        {
          fetchState == "loading" 
          ? "Loading ..."
          : 'Error: could not retrieve data.'
        }
      </div>
    </>
    )
  }

  return (
    <>
      <input 
        type="text" 
        id="targetWord" 
        onChange={(event) => setWord(event.target.value as string)}
        onKeyDown={handleEnterPressed}
      ></input>
      <button onClick={handleCariBtn}>Cari</button>
      <div>
        {
          definitions.map((definition: Definition) => {
            return (
              <h1>{ definition.def_text }</h1>
            )
          })
        }
      </div>
    </>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
