const socket = io();
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("message");
const chatBox = document.getElementById("chatBox");

const name = prompt("Enter Your Name To Join");
socket.emit("new-user-joined", name);

// send message with button
sendBtn.addEventListener("click", () => {
    sendMessage();
});

// send message with Enter key
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
        sendMessage();
    }
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    chatBox.innerHTML += `<div class="left">
        <h6>Me</h6>
        <p>${message}</p>
    </div>`;

    socket.emit("send", message);
    messageInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

// receive messages
socket.on("receive", (dataObj) => {
    chatBox.innerHTML += `<div class="right">
        <h6>${dataObj.name}</h6>
        <p>${dataObj.message}</p>
    </div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
});
