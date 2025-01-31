const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-game-btn");
const msgSec = document.querySelector(".msg-sec");

let turnO = true; // PlayerO
let count = 0;

const winPatterns = [
    [0, 1, 2], 
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 6], 
    [2, 4, 6], 
    [3, 4, 5], 
    [6, 7, 8]
];

const gameDraw = () => {
    msg.innerText = "Game was Draw...! Play Again."
    msgSec.classList.remove("hide");
    disableboxes();
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgSec.classList.add("hide");
};

const disableboxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};


const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgSec.classList.remove("hide");
    disableboxes();

};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){ 
            // playerO's turn
            box.innerText = "O";
            turnO = false;
        }else{ 
            //playerX's turn
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        count++;

        let isWinner = checkWinner();

        if(count == 9 && !isWinner){
            gameDraw();
        }
    });
});

const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

resetBtn.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", () => {
    location.reload();
});
