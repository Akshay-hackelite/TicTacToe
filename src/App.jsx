import { useState } from "react"
import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import Log from "./components/Log.jsx"
import Gameover from "./components/Gameover.jsx"
const WINNING_COMBINATIONS=[[{row:0,col:0},{row:0,col:1},{row:0,col:2}]]

const initialGameBoard=[
    [null,null,null],
    [null,null,null],
    [null,null,null]
]
const names={X:"player1",O:"player2"}//outside so that everytime re rendering this names do not initialised with this value and the same refernce is given in Players component so now when we change the name it will also mutate this object directly as the refernce is same and we can get the names outside of player component i.e in app component so we can provide this name to gameover screen

function deriveGameBoard(gameTurns){
  let gameBoard=initialGameBoard.map(t=>[...t])//not gameboard=initialgameboard will make both the refernce same so in the end when i have to restart by clicking restart button i have to make it initialgameboard so i have to preserve that variable so deep copy is done as shallow copy in nested things will lead to same reference for the nested elements
    gameTurns.map(t=>{
    const {square,player}=t;
    const{row,col}=square;
    gameBoard[row][col]=player
  })
  return gameBoard
}

function deriveActivePlayer(gameTurns){  
      let currentPlayer='X'
      if(gameTurns.length>0&&gameTurns[0].player==='X'){
        currentPlayer='O'
      } 
      return currentPlayer
}

function deriveWinner(gameBoard,names){
  let winner=null;

  for(const combination of WINNING_COMBINATIONS){
    const firstsquare= gameBoard[combination[0].row][combination[0].col]
    const secondsquare= gameBoard[combination[1].row][combination[1].col]
    const thirdsquare= gameBoard[combination[2].row][combination[2].col]
    if(firstsquare&&firstsquare===secondsquare&&secondsquare===thirdsquare){
      winner=names[firstsquare]
    }
  }
  return winner
}

function App() {
  
  const[gameTurns,setGameTurns]=useState([])
  //const[activePlayer,setActivePlayer]=useState('X')



  const gameBoard=deriveGameBoard(gameTurns)

  const winner=deriveWinner(gameBoard,names)

  const hasDraw=gameTurns.length==9&&!winner

  function selectSquareChangesPlayer(rowIndex,colIndex){
    //setActivePlayer((currActivePlayer)=>currActivePlayer=='X'?'O':'X')//always use funcn method to change states when the new state is dependent on previous state.
    setGameTurns(prevTurns=>{//State updates within the same event handler are batched together, causing only one re-render.i.e setActivePlayer and setgameturn run asyn and after updating both value(dk which finishes first)will cause re render once not twice.React waits until the entire event handler (handleClick) finishes executing.then it applies all the updates to the state and triggers a single re-render.
      const currentPlayer=deriveActivePlayer(prevTurns)
      const updatedTurns=[{square:{row:rowIndex,col:colIndex},player:currentPlayer},...prevTurns]//we are not usingplayer:activePlayer as we can't get latest activePlayer always as we can't use setState((currActiveplayer)=>)i.e. functional approach in now.so we used a simple variable method for it.
      return updatedTurns
    })
  }
  function handleRestart(){
    setGameTurns([])//react , when passing[] this automatically creates new reference array and set it .we are directly mutating array but in case of passing[] ,it renders due to the reason explained earlier in line
  
  }
  return (
    <>
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialname="player1" symbol="X" isActive={deriveActivePlayer(gameTurns)=='X'} names={names}/>
          <Player initialname="player2" symbol="O" isActive={deriveActivePlayer(gameTurns)=='O'} names={names}/>
          
        </ol>
        {winner||hasDraw?<Gameover winner={winner} Restart={handleRestart}/>:undefined}
        <GameBoard onSelectSquare={selectSquareChangesPlayer} gameBoard={gameBoard}/>
      </div>
      <Log gameTurns={gameTurns}/>
    </main>

    </>
    
  )
}

export default App
