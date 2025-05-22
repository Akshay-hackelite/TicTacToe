export default function Gameover({winner,Restart}){
    return(
        <div id="game-over">
        <h2>Game Over !</h2>
        {winner?<p>Congratulations {winner} Won!</p>:<p>It's a Draw</p>}
        <p>
            <button onClick={Restart}>Rematch!</button>
        </p>
        </div>  
    )
}