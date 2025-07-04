let boxes=document.querySelectorAll(".cell")
let turno=true;
let reset=document.querySelector(".reset-button")
const messageBox = document.getElementById("winner-message");
const messageText = document.getElementById("message-text");

 boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("button was clicked");

        if (turno) {
            box.innerText = "O";
            turno = false;
        } else {
            box.innerText = "X";
            turno = true;
        }

        box.disabled = true;

        // Use a minimal delay to allow DOM paint before alert
        setTimeout(() => {
            checkwinner();
        }, 0);
    });
});

const winning_patterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function checkboxes() {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false; // Game is still in progress
        }
    }
    return true; // All boxes are filled
}

function checkwinner(){
winning_patterns.forEach((win)=>{
    let a,b,c;
    a=boxes[win[0]].innerText;
    b=boxes[win[1]].innerText;
    c=boxes[win[2]].innerText;
    if(a!=""&&b!=""&&c!=""){
        if(a==b&&b==c){
         showWinner(`Player ${a} Wins!`);
        }
    }
})
if(checkboxes()){
    showWinner("It's a tie!");
}
}

reset.addEventListener("click",()=>{
    window.location.reload();
})



function showWinner(winner) {
  messageText.textContent = winner;
  messageBox.classList.remove("hidden");

  // Trigger animation
  setTimeout(() => {
    messageBox.classList.add("show");
  }, 100); // small delay to allow transition
}

function startNewGame() {
  messageBox.classList.remove("show");

  // After transition ends, hide it from layout
  setTimeout(() => {
    messageBox.classList.add("hidden");
  }, 500);

  // Reset game logic here
  console.log("New game started");
  // e.g., reset board, scores, current player, etc.
  window.location.reload();
}

