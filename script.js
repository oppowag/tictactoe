const gameBoard = (() => {
    var board = ["", "", "", "", "", "", "", "", ""];
    var col = [0, 0, 0];
    var row = [0, 0, 0];
    var diag = [0, 0];

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
        _addToTracker(index, value);
        _checkGame(index, value);
    }

    function _addToTracker(index, value){
        if(value == "X"){
            //
        }
    }

    function _checkGame(index, value){
        if(board.filter(Boolean).length > 4){
            //
        }
    }

    return{
        gridItems,
        addMove,
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
            gameBoard.addMove(index, "X");
        }
    }

})();

const Player = () => {

};