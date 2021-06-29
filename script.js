// Player Factory Function
const Player = (name, symbol) =>{
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol};
}

const playerOne = Player("Player One", "O");
const playerTwo = Player("Player Two", "X");

// Gameboard Module
const Gameboard = (()=>{
    let board = [0,0,0,0,0,0,0,0,0];

    const isValid = (pos) =>{
        return board[pos] === 0;
    }

    // -1: Game Over - Draw
    // 0: Game not over
    // 1: Game Over - Player 1 wins
    // 2: Game Over - Player 2 wins
    const isGameOver = () =>{
        let zeros = board.filter((e)=>e ===0).length;
        if(zeros === 0) return -1;
        if(zeros > 6) return 0;

        //rows
        console.log(board[0]);
        console.log(board[1]);
        console.log(board[2]);
        if((board[0] === board[1] && board[0] === board[2]) && board[0] != 0) return board[0];
        if((board[3] === board[4] && board[3] === board[5]) && board[3] != 0) return board[3];
        if((board[6] === board[7] && board[6] === board[8]) && board[6] != 0) return board[6];
        //columns
        if((board[0] === board[3] && board[0] === board[6]) && board[0] != 0) return board[0];
        if((board[1] === board[4] && board[1] === board[7]) && board[1] != 0) return board[1];
        if((board[2] === board[5] && board[2] === board[8]) && board[2] != 0) return board[2];
        //diags
        if((board[0] === board[4] && board[0] === board[8]) && board[0] != 0) return board[0];
        if((board[2] === board[4] && board[2] === board[6]) && board[2] != 0) return board[2];
        return 0;
    }

    const insertMove = (player, pos) => {
        if(isValid(pos)){
        board[pos] = player.getSymbol();
        return true;
        }
        return false;
    };
    const getState = () => board;
    const clearBoard = () => {board = [0,0,0,0,0,0,0,0,0];};

    return{
        isGameOver,
        insertMove,
        getState,
        clearBoard,
    };
})();


// Display Controller Module
const DisplayController = (()=>{
    const squares = document.querySelectorAll(".square");
    let currentState = Gameboard.getState();

    const updateDisplay = () => {
        for(let i = 0; i < 9; i++){
            if (currentState[i] != 0){
                squares[i].classList.remove("invisible");
                squares[i].textContent = currentState[i];
            }
        }
    }
    return{
        updateDisplay,
    };

})();


// Game Loop Module
const  GameLoop = (()=>{
    const squares = document.querySelectorAll(".square");
    let p1 = null;
    let p2 = null;
    let currentPlayer = null;
    const playRound = () =>{
        function listener(){
            let index = Array.from(squares).indexOf(this);
            if(Gameboard.getState()[index] === 0){       
                Gameboard.insertMove(currentPlayer, index);
                DisplayController.updateDisplay();
                nextRound();
            }
        }
        function nextRound(){
            squares.forEach((s) => s.removeEventListener("click", listener));
            if(Gameboard.isGameOver() != 0){
                let result = Gameboard.isGameOver();
                if(result === -1){
                    alert("Draw! Game Over!");
                }
                else{
                    alert(currentPlayer.getName() + " won! Congrats!");
                }
            }
            else{
                if(currentPlayer === p1) currentPlayer = p2;
                else currentPlayer = p1;
                playRound();
                console.log("next round!")
            }
        }
        squares.forEach((s) => s.addEventListener("click", listener));
    }
    const startGame = () => {
        playRound();
    }
    const init = (one, two) => {
        p1 = one;
        p2 = two;
        currentPlayer = p1;
    }
    const wipeData = () =>{
        p1 = null;
        p2 = null;
        currentPlayer = null;
    }

    return {
        startGame,
        init,
        wipeData,
    };

})();

GameLoop.init(playerOne, playerTwo);
GameLoop.startGame();