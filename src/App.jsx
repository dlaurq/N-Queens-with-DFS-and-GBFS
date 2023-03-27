import { faCrown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { gbfs } from "./lib/GBFS"
import { dfs } from "./lib/DFS"

function Board({n, queens, className}){

  const [board, setBoard] = useState([])

  useEffect(() => {

    const createChessBoard = (n) =>{
      const newBoard = []
  
      for (let i = 0; i < n; i++) {
        const row = []
        for (let j = 0; j < n; j++) {
          row.push(
            <div 
              key={i + '' + j} 
              className={` ${(i+j) % 2 ? "bg-stone-800 ": "bg-stone-200 "} flex justify-center items-center`}
            >
            {queens?.length > 0 && queens[i] === j ? <FontAwesomeIcon icon={faCrown} size="xl" className="text-amber-600 text-2xl" /> : null}
            </div>)
        }
        newBoard.push(row)
      }
      setBoard(newBoard)
    }

    createChessBoard(8)
  }, [queens])


  return(
    <section className={`grid grid-cols-8 w-80 h-80 border-2 border-amber-600 ${className} `}>
      {board}
    </section>
  )
}

function App() {

  const [n, setN] = useState(0)
  const [GBFS, setGBFS] = useState({})
  const [DFS, setDFS] = useState({})

useEffect(() => {
  
}, [])

const handleClick = () => {

  let startGBFS = performance.now()
  setGBFS(gbfs(parseInt(n)))
  let endGBFS = performance.now()

  let startDFS = performance.now()
  setDFS(dfs(parseInt(n)))
  let endDFS = performance.now()

  const timeGBFS = endGBFS-startGBFS
  const timeDFS = endDFS-startDFS

  setGBFS(prev => ({...prev, time:timeGBFS}))
  setDFS(prev => ({...prev, time:timeDFS}))

  console.log(timeDFS)
  console.log(timeGBFS)

}

  return (
    <main className="bg-zinc-900 min-h-screen text-gray-300 pt-20">

      <p className="text-red-500 text-center">**Due to a bug that I cannot fix, the board is drawn only in 8x8</p>
      <p className="text-amber-600 text-center"><a href="https://github.com/dlaurq/N-Queens-with-DFS-and-GBFS" >Github Repo</a></p>
    


      {/**TITLU + INPUT */}
      <header className="text-center">
        <h1 className="text-4xl">N-Queens Probles</h1>
        <section className="p-5">
          <label htmlFor="queens" className="text-2xl">Number of queens: </label>
          <input 
            className="text-gray-900 font-bold text-2xl w-10 text-center appearance-none m-0 outline-none" 
            type="number" 
            id="queens" 
            value={n} 
            onChange={(e) => setN(e.target.value)}/>
        </section>
        <button
          className="border-2 border-amber-600 text-xl p-3 font-bold"
          onClick={handleClick}
        >
            Start
        </button>
      </header>

      <section className="flex flex-row justify-evenly items-start mt-10">

        {/**DFS*/}
        <section className="text-2xl">
          <h2 className=" p-3 font-bold text-center text-2xl">
            Depth First Search
          </h2>

          <section>
            <h2 className="">Initial State: {JSON.stringify(DFS?.initial)}</h2>
            <Board n={n} queens={DFS?.initial} />
          </section>

          <ul>
            <li>Transitions: {DFS?.visited?.length}</li>
            {DFS?.visited?.map((e, index) => 
              <li key={index}>
                {JSON.stringify(e)}
              </li>
            )}
          </ul>

          <section>
            <h2 className="">Final State: {JSON.stringify(DFS?.final)}</h2>
            <Board n={n} queens={DFS?.final} />
          </section>

        </section>

        {/**GBFS*/}
        <section className="text-2xl">
          <h2 className=" p-3 font-bold text-center text-2xl">
            Greedy Best First Search
          </h2>

          <section>
            <h2 className="">Initial State: {JSON.stringify(GBFS?.initial)}</h2>
            <Board n={n} queens={GBFS?.initial} className="" /> 
          </section>

          <ul>
            <li>Transitions: {GBFS?.visited?.length}</li>
            {GBFS?.visited?.map((e, index) => 
              <li key={index}>
                {JSON.stringify(e)}
              </li>
            )}
          </ul>

          <section>
            <h2 className="">Final State: {JSON.stringify(GBFS?.final)}</h2>
            <Board n={n} queens={GBFS?.final} />
          </section>

        </section>

      </section>
    </main>
  )
}

export default App
