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

    socket.on('initial-messages',(data)=>{
        if(initial === 0){
            console.log(data);

            initial++;
        }
    });
    socket.on('username',data=>{
        username.text(data.username);
        user=data.username;
    })
    
})