const gameBoard = (() => {
    var board = ["", "", "", "", "", "", "", "", ""];
    var gameOver = true;

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
            displayController.declareWinner("It's a tie game!");
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
    startButton.addEventListener("click", () => {
        // Check if players exist and set name if not
        if(Player1.getSymbol() == null){
            displayController.setName();
        }
        gameBoard.reset();
    });

    // Create text input elements
    var textBox1 = document.createElement("input");
    textBox1.setAttribute("type", "text");
    textBox1.setAttribute("placeholder", "Enter Player 1 name");
    var textBox2 = document.createElement("input");
    textBox2.setAttribute("type", "text");
    textBox2.setAttribute("placeholder", "Enter Player 2 name");
    resultSection.appendChild(textBox1);
    resultSection.appendChild(textBox2);

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
        if(result == Player1.getSymbol()){
            result = Player1.getName() + " wins!";
        }
        else if(result == Player2.getSymbol()){
            result = Player2.getName() + " wins!";
        }
        
        var resultH2 = document.createElement("h2");
        resultH2.innerHTML = result;
        gameTracker.resultSection.appendChild(resultH2);

        gameBoard.gameOver = true;
    }

    function setName(){
        var playerNames = document.getElementsByTagName("input");
        if(playerNames[0].value == ""){
            Player1.modPlayer("Player 1", "X");
        }
        else{
            Player1.modPlayer(playerNames[0].value, "X");
        }
        if(playerNames[1].value == ""){
            Player2.modPlayer("Player 2", "O");
        }
        else{
            Player2.modPlayer(playerNames[1].value, "O");
        }
    }

    return{
        checkEligibility,
        declareWinner,
        setName,
    }

})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    const modPlayer = (modName, modSymbol) => {
        name = modName;
        symbol = modSymbol;
    }

    return{
        getName,
        getSymbol,
        modPlayer,
    }

};

const Player1 = Player(null, null);
const Player2 = Player(null, null);