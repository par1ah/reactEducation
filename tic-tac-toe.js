import {useState} from "react";

function Board({isXNext, squares, onPlay}) {
    function handleClick(i) {
        //if !null
        if (Winner(squares) || squares[i] ) {
            return;
        }
        const nextSquares = squares.slice();
        if (isXNext){
            nextSquares[i] = "X";
        } else nextSquares[i] = "O";
        onPlay(nextSquares);
    }

    const winner = Winner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (isXNext ? "X" : "O");
    }
    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    )
};

export function Game(){
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0);
    const isXNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function backTo(move){
        setCurrentMove(move);
    }

    const moves = history.map((squares, move)=>{
        let context;
        if(move > 0){
            context = 'Back to ' + move;
        } else context = 'Restart'
        return(
            <li key={move}>
                <button onClick={()=> backTo(move)}>{context}</button>
            </li>
        )
    })

    return(
        <>
            <div className="game">
                <div className="game-board">
                    <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay} />
                </div>
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div>
        </>
    )
}

function Square({value, onSquareClick}) {
    return (
        <button
            className="square"
            onClick={onSquareClick}
        >
            {value}
        </button>
    )
}

function Winner(squares){
    const winLines =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for (let i = 0; i < winLines.length; i++) {
        const [a, b, c] = winLines[i];
        //сравниваем значения в клетках
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
