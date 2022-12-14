import BoardView from "./BoardView";

export default function GameView({ game }: any) {
    return (
        <div>
            <BoardView gameState={game.getGameState()} />
        </div>
    )
}