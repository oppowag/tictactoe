const gameBoard = (() => {
    var board = ["", "", "", "", "", "", "", "", ""];
    var gameOver = false;

    // Cache DOM
    var grid = document.getElementsByClassName("grid-container")[0];
    var gridItems = [];
    for(i = 0; i < grid.getElementsByTagName("div").length; i++){
        gridItems.push(grid.getElementsByTagName("div")[i]);
    }

    // Attach EventListeners to each grid item
    gridItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            displayController.checkEligibility(item, index);
        });
    });

    function _render(index){
        gridItems[index].innerHTML = board[index];
    }

    function _checkGame(index){       
        // Players can't win unless there have been at least 5 turns
        if(countTurns() > 4){
            // Check columns
            for(i = 0; i < 3; i++){
                if(board[i] != "" && board[i] == board[i+3] && board[i] == board[i+6]){
                    displayController.declareWinner(board[i]);
                    return;
                }
            }
            // Check rows
            for(i = 0; i <= 6; i += 3){
                if(board[i] != "" && board[i] == board[i+1] && board[i] == board[i+2]){
                    displayController.declareWinner(board[i]);
                    return;
                }
            }
            // Check diagonals
            if(board[0] != "" && board[0] == board[4] && board[0] == board[8]){
                displayController.declareWinner(board[0]);
                return;
            }
            else if(board[2] != "" && board[2] == board[4] && board[2] == board[6]){
                displayController.declareWinner(board[2]);
                return;
            }
        }
        if(countTurns() == 9){
            displayController.declareWinner("tie");
        }
    }

    function reset(){
        board = ["", "", "", "", "", "", "", "", ""];
        for(i = 0; i < gridItems.length; i++){
            _render(i);
        }
        gameBoard.gameOver = false;
        gameTracker.wipeAway();
    }

    function addMove(index, value){
        board.splice(index, 1, value);
        _render(index);
        _checkGame(index);
    }

    function countTurns(){
        return board.filter(Boolean).length;
    }

    return{
        addMove,
        countTurns,
        reset,
        gameOver,
    };
})();

const gameTracker = (() => {
    // Cache DOM
    var startButton = document.getElementById("startButton");
    var resultSection = document.getElementsByClassName("belowGrid")[0];

    // Attach EventListener to button
    startButton.addEventListener("click", gameBoard.reset);

    function wipeAway(){
        resultSection.innerHTML = "";
    }

    return{
        resultSection,
        wipeAway,
    }
})();

const displayController = (() => {
    function checkEligibility(item, index){
        if (!gameBoard.gameOver && item.innerHTML === ""){
            if(gameBoard.countTurns() % 2 == 0){
                gameBoard.addMove(index, "X");
            }
            else{
                gameBoard.addMove(index, "O");
            }
        }
    }

    function declareWinner(result){
        var resultH2 = document.createElement("h2");
        resultH2.innerHTML = result;
        gameTracker.resultSection.appendChild(resultH2);

        gameBoard.gameOver = true;
    }

    return{
        checkEligibility,
        declareWinner,
    }

})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return{
        getName,
        getSymbol,
    }

};