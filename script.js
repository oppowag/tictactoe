const gameBoard = (() => {
    var board = ["", "", "", "", "", "", "", "", ""];

    // Cache DOM
    var grid = document.getElementsByClassName("grid-container")[0];
    var gridItems = [];
    for(i = 0; i < grid.getElementsByTagName("div").length; i++){
        gridItems.push(grid.getElementsByTagName("div")[i]);
    }

    function _render(index){
        gridItems[index].innerHTML = board[index];
    }

    function addMove(index, value){
        board.splice(index, 1, value);
        _render(index);
        _checkGame(index);
    }

    function _checkGame(index){       
        if(countTurns() == 9){
            displayController.updateDisplay("tie");
        }
        // Players can't win unless there have been at least 5 turns
        else if(countTurns() > 4){
            // Check columns
            for(i = 0; i < 3; i++){
                if(board[i] != "" && board[i] == board[i+3] && board[i] == board[i+6]){
                    displayController.updateDisplay(board[i]);
                    return;
                }
            }
            // Check rows
            for(i = 0; i <= 6; i += 3){
                if(board[i] != "" && board[i] == board[i+1] && board[i] == board[i+2]){
                    displayController.updateDisplay(board[i]);
                    return;
                }
            }
            // Check diagonals
            if(board[0] != "" && board[0] == board[4] && board[0] == board[8]){
                displayController.updateDisplay(board[0]);
            }
            else if(board[2] != "" && board[0] == board[4] && board[0] == board[6]){
                displayController.updateDisplay(board[2]);
            }
        }
    }

    function countTurns(){
        return board.filter(Boolean).length;
    }

    return{
        gridItems,
        addMove,
        countTurns,
    };
})();

const displayController = (() => {
    // Attach EventListeners to each grid item
    gameBoard.gridItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            _checkEligibility(item, index);
        });
    });

    function _checkEligibility(item, index){
        if(item.innerHTML === ""){
            if(gameBoard.countTurns() % 2 == 0){
                gameBoard.addMove(index, "X");
            }
            else{
                gameBoard.addMove(index, "O");
            }
        }
    }

    function updateDisplay(result){
        console.log(result);
    }

    return{
        updateDisplay,
    }

})();

const Player = () => {

};