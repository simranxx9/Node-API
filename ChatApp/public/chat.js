 const socket = io.connect('http://localhost:3000');

 var btn = document.getElementById('btn');
 var handle = document.getElementById('handle');
 var message = document.getElementById('message');
 var output= document.getElementById('output');
 var feedback = document.getElementById('feedback');

//to emit the input to server
 btn.addEventListener('click',function(){
     socket.emit('chat',{
         handle:handle.value,
         message:message.value
     })
})
 
// to emit the feedback
message.addEventListener('keypress',function(){

    socket.emit('broadcast',handle.value);
})

    // to catch the data from the server
    socket.on('chat',function(data){
        feedback.innerHTML="";
        output.innerHTML+= '<p><strong>'+data.handle+'</strong>  '+data.message+'</p>';

    })

    // to catch the feedback from the server
    socket.on('broadcast',function(data){
        feedback.innerHTML = '<p><em>'+data+'</em>  is writting...</p>'
    })