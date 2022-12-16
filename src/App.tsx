import Game from "./game/Game";
import BoardView from "./components/BoardView";

const createNewGame = () => {
    const newGame = new Game();
    newGame.createNewGame();
    return newGame;
};

export default function App() {
    var game = createNewGame();

    return (
        <div>
            <BoardView game={game} />
        </div>

    );
}