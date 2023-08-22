const socket = io('http://localhost:8000');
const container = document.getElementById("container");
const name = prompt("Enter Name");
socket.emit("new-user-joined", name);

const appendDiv = (name, classes, message) => {
  let div = document.createElement("div");
  div.setAttribute("class", classes);
  div.innerText = `${name} ${message}`;
  container.append(div);
};

socket.on("user-joined", (name) => {
  appendDiv(name, "message bottom", "joined the chat");
});

socket.on("receive", (obj) => {
  appendDiv(`${obj.name}:`, "message right", obj.message);
});
socket.on("left", (name) => {
  appendDiv(name, "message bottom", 'left the chat');
});

const handleSubmit = () => {
  const val = document.getElementById("input").value;
  console.log("val:", val);
  appendDiv("You:", "message left", val);
  socket.emit("messageSent", val);
  val.innerText = "";
};
