const express = require('express');
const path = require('path');
const app = express();
const socket = require('socket.io');

// settings
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

// listen the server
const server = app.listen(app.get('port'), () => {
  console.log('Listening on port', app.get('port'));
});

/**Socket**/
const io = socket(server);
// console.log(io);

let Rooms = ["room1","room2","room3"]; 


//iniciar coneccion a socket
io.on('connection',(socket) => {

	
	socket.on('conect', function(data){
		if(Rooms.length>0){
			socket.emit('ListRooms',Rooms);
		}

	});	
	
	socket.on('addUser', function(username){

		socket.username = username;
		socket.room = 'room1';
		socket.join('room1');	

		socket.broadcast.emit('ListRooms',Rooms);


	});
	
	// https://github.com/safak/youtube/blob/chat-app/socket/index.js
	socket.on('Join', function(NewRoom,UserAdmin){
		
		socket.leave(socket.room);
		socket.join(NewRoom);
		
		socket.room = NewRoom;
	
		console.log(UserAdmin+" join a "+NewRoom)
	});	
	
	socket.on('Leave', function(data,UserAdmin){
		socket.leave(data);
		console.log(UserAdmin+" leave an "+data)

	});
	

	//mensages
    //obtienene la informacion del chat
	  socket.on('message',function(Sms,UserAdmin){
		  // el problema es userJoin
		  
		// socket.to(socket.room).emit('message',UserAdmin,Sms);
		io.to(socket.room).emit('message',UserAdmin,Sms);

	  });

    //obtienene la informacion del chat 
	  socket.on('typing',function(user){
		 
		socket.broadcast.to(socket.room).emit('typing',user);
		
		
	  });
  
  
	//detectar desconeccion
	  socket.on('disconnect',() => {
				console.log("disconnect ",socket.id)
				socket.leave(socket.room);

	  });

});

				
	// console.log('socket connection opened:', socket.id);
	

				// console.log("Number-Rooms",socket.rooms.size);
				// console.log(socket.rooms);

	// socket.leave('room1');
	// // // socket.broadcast.to('room1').emit('function', 'data1', 'data2');

// https://ichi.pro/es/cree-una-sala-de-chat-con-node-js-y-socket-io-250569453838381
// https://es.stackoverflow.com/questions/304403/mostrar-las-rooms-en-socket-io

// informacion
// https://socket.io/docs/v4/namespaces/
// /historial de eventos

//funcion de escucha constante
// socket.on ( "detalles" , ( ... args ) => { // ... });

//funcion de escucha una sola ves
// socket.once ( "detalles" , ( ... args ) => { // ... });

// elimina el oyente de la matris de oyentes
// socket.off ( "detalles" , oyente);

// elimina todos los oyentes o los del eventName especificado .
	// para un evento específico
	 // socket.removeAllListeners ( "detalles" ); 
	// para todos los eventos
	 // socket.removeAllListeners ();

// Agrega un oyente que se activará cuando se emita cualquier evento
	// socket.onAny ( ( eventName, ... args ) => { // ... });
  
 // Agrega un oyente que se activará cuando se emita cualquier evento.
  // El oyente se agrega al comienzo de la matriz de oyentes
	// socket.prependAny ( ( eventName, ... args ) => { // ... });
 
 // Elimina todos los oyentes catch-all, o el oyente dado. 
// const listener = ( eventName, ... args ) => { console .log (eventName, args); }
 

// socket.onAny (oyente);

// // y luego ...
 // socket.offAny (oyente);

// // o todos los oyentes
// Transmitir a clientlocal
  // io.local.emit ( "hola" , "mundo" );
  
  // enviar a todos menos al que emite
  // socket.broadcast.emit('chat:typing', data);
  
  
    
  // socket.join('sala1');
	// io.to('sala1').emit('someevent',"de la sala1");
  
  
		// console.log('socket connection opened:', socket.id);
		
		// socket.emit("hello", "Hola te has Connectado");
		
		// socket.volatile.emit ("hello", "podría o no ser recibido mesaje volatil" );
		
		// io.local.emit("hola","mensaje local");
		