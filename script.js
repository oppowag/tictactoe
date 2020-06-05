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