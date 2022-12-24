import Game from "./game/Game";
import BoardView from "./components/BoardView";

import './styles.css';

const createNewGame = () => {
    const newGame = new Game();
    newGame.createNewGame();
    return newGame;
};

export default function App() {
    var game = createNewGame();

    return (
        <div className="main">
            <div className="header">
                <ul>
                    <li>32Dice</li>
                    <li>Play</li>
                    <li>Instructions</li>
                </ul>
            </div>
            <div className="game">
                <BoardView game={game} />
            </div>
        </div>

    );
}