//area de Agregar usuario 
let useradd = document.getElementById('useradd');
let AddUser = document.getElementById('btn-AddUser');

//area de seleccion de chat
//area de chat
let output = document.getElementById('output');
let output2 = document.getElementById('output2');
let messageInput = document.getElementById('messageInput');
let btnSend = document.getElementById('send');
let back = document.getElementById('back');

//extras
let SectionUser = document.getElementById('SectionUser');
let JoinUser = document.getElementById('JoinUser');

//**Areas de trabajo***//
let sectionAdduser = document.getElementById('sectionAdduser');
let selectChat = document.getElementById('selectChat');
let sectionChat = document.getElementById('sectionChat');

//titulos
let TitleUser = document.getElementById('TitleUser');
let TitleUser2 = document.getElementById('TitleUser2');
let TitleUser3 = document.getElementById('TitleUser3');
//*****//

//Add New User
let UserAdmin="";
let UserJoinRoom="";

// conenction
let socket = io();

socket.emit('conect');

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  
});

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
   console.log(socket.connected); // false
});




AddUser.addEventListener('click',function(){

			UserAdmin = useradd.value;
		 
			TitleUser.innerHTML = UserAdmin;
			
			socket.emit('addUser',UserAdmin);
			
			sectionAdduser.style.display="none";
			selectChat.style.display="block";
});

socket.on("ListRooms",(Rooms) => {

		CreateDivUserJoin(Rooms,"SectionUser");
		
});


btnSend.addEventListener('click',function(){
	socket.emit("message",messageInput.value,UserAdmin);
	messageInput.value="";
});

messageInput.addEventListener('keypress', function(){
		socket.emit("typing",UserAdmin);
});

back.addEventListener('click',function(){
	
			socket.emit("Leave",UserJoinRoom,UserAdmin);
			
			selectChat.style.display="block";
			sectionChat.style.display="none";
});

socket.on('typing', function(data) {
	output2.innerHTML = `<p ><em>${data} is typing a message...</em></p>`
});

socket.on('message',function(User,Sms){
	output2.innerHTML = " ";
	new Messages(User,Sms,"output");
});




function Messages(user,sms,obj){
	let p = document.createElement('p');
		p.id="Title-Article";
		p.className="title-article";	
			document.getElementById(obj).appendChild(p);					
		/***texto de la descripcion***/	
		var node = document.createTextNode(user+":"+sms);
		p.appendChild(node);
	
}

let NumberUser=0;

function CreateDivUserJoin(info,obj){
	
	var cell = document.getElementById('SectionUser');

			if (cell.hasChildNodes()){
					while (cell.childNodes.length >= 1){
						cell.removeChild( cell.firstChild );
								}//while
					}	
	
	info.forEach((element, index) => {
		
		console.log(index+" "+element);
		
	
		let div = document.createElement('div');
		div.id="Areajoin";
		div.className="Areajoin";
		document.getElementById(obj).appendChild(div);
		
		let p = document.createElement('p');
		p.id="Title-Article";
		p.className="title-article";	
		// document.getElementById("Areajoin").appendChild(p);
		document.getElementsByClassName('Areajoin')[index].appendChild(p);
					
		/***texto de la descripcion***/	
		var node = document.createTextNode(element);
		p.appendChild(node);

		let button = document.createElement('button');
		button.id="Join";
		button.innerHTML="Join";
		button.onclick = function(){
			
				socket.emit("Join",element,UserAdmin);
				
				selectChat.style.display="none";
				sectionChat.style.display="block";
				
				UserJoinRoom=element;
				
				TitleUser2.innerHTML = UserAdmin;
				TitleUser3.innerHTML = UserJoinRoom;
			
		}

		document.getElementsByClassName('Areajoin')[index].appendChild(button);
			
	
	})
	
}


