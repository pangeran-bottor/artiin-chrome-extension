import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'

interface Definition {
  def_text?: string;
}


const getData = async (word: string) => {
  const resp = await fetch(`http://kateglo.com/api.php?format=json&phrase=${word}`)
  const data = await resp.json()
  return data.kateglo.definition
}

const App: React.FC<{}> = () => {
  const [definitions, setDefinitions] = useState([] as Array<Definition>)
  const [word, setWord] = useState("")
  const [searchWord, setSearchWord] = useState("")

  useEffect(() => {
    const fetchData = async (word: string) => {
      const data: Array<Definition> = await getData(word)
      console.log(data)
      setDefinitions(data)
    }
    if (searchWord.length > 0) {
      fetchData(searchWord)
    } 
  }, [searchWord])

  const handleCariBtn = () => {
    console.log("current word: " + word)
    setSearchWord(word)
  }

  return (
    <>
      <input type="text" id="targetWord" onChange={(event) => setWord(event.target.value as string)}></input>
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
