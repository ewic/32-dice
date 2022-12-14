import Game from "./game/Game";
import GameView from "./components/GameView";

const createNewGame = () => {
    const newGame = new Game();
    newGame.createNewGame();
    return newGame;
};

export default function App() {
    var game = createNewGame();

    return (
        <div>
            <GameView game={game} />
        </div>

    );
}