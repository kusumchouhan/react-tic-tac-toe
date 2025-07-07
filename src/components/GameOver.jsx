export default function GameOver({winner,onRestart})
{
  return (
    <div id="game-over">
        <h2>Game Over!</h2>
        {winner &&  <p>{winner} is won the game!</p>}
        {!winner && <p>It&apos;s a Draw</p>}
        <button onClick={onRestart} >Rematch</button>
    </div>
  );
}