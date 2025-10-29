console.log("Inicio del chat")
$(function(){
    let socket = io.connect();
    let message = $("#message");
    let messageForm = $("#messageForm");
    let chat = $("#chat");
    let username = $("#username");

    let initial = 0;
    socket.emit('username', 'farsante');
    socket.emit('initial-messages', 'initial');

    
})