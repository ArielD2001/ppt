
//Botones
const btnPlay = document.getElementById('btn-play');
const atras = document.getElementById('atras');
const continuar = document.getElementById('continuar');
const cerrar = document.querySelectorAll('#cerrar');
const btnpiedra = document.getElementById('piedra');
const btnpapel = document.getElementById('papel');
const btntijeras = document.getElementById('tijeras');

// opciones
const piedra = 'piedra';
const papel = 'papel';
const tijeras = 'tijeras';


//estados de partida
const perdiste = 0;
const ganaste = 1;
const empate = 2;

//imagenes
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');

//inputs
const inputj1 = document.getElementById('inputj1');
const inputj2 = document.getElementById('inputj2');

const user1name = document.getElementById('user1name');
const user2name = document.getElementById('user2name');
const nombreuser1 = document.getElementById('nombreuser1');
const nombreuser2 = document.getElementById('nombreuser2');
const contenedorres = document.getElementById('contenedorres');
const opciontitulo1 = document.getElementById('opciontitulo1');
const opciontitulo2 = document.getElementById('opciontitulo2');

//pantallas
const pantalla1 = document.querySelector('#pantalla1');
const pantalla2 = document.querySelector('#pantalla2');
const pantalla3 = document.querySelector('#pantalla3');

//meensajes
const smallp1 = document.getElementById('smallp1')
const smallp2 = document.getElementById('smallp2')
const mensaje = '¡Escriba el nombre por favor!'
const popresultado = document.getElementById('popresultado');

var user1 = '';
var user2 = '';


var opcionusuario = '';


//=======Eventos pantalla 1===========
//boton play - inicio pantalla 1
btnPlay.addEventListener('click', ()=>{
 transicion(pantalla1, pantalla2);

})



//========Eventos pantalla 2 ==========

//Validando los campos vacios

let name1 = false;
let name2 = false;
inputj1.addEventListener('keyup',()=>{
    user1name.innerHTML= inputj1.value;
    user1 = inputj1.value;

    if(user1 == ''){
        name1 = false;
        user1name.innerHTML = 'Jugador #1'
        smallp1.innerHTML = mensaje
    }else{
        name1 = true;
        smallp1.innerHTML = ''

    }
})

inputj2.addEventListener('keyup',()=>{
    user2name.innerHTML= inputj2.value;
    user2 = inputj2.value;
    if(user2 == ''){
        name2 = false;
        user2name.innerHTML = 'Jugador #2 (PC)'
        smallp2.innerHTML = mensaje
    }else{
        name2 = true;
        smallp2.innerHTML = ''

    }
})


//Boton Atras
atras.addEventListener('click',()=>{
  pantalla2.classList.toggle('transicion');
  setTimeout(() => {
    pantalla1.style.display = 'flex';
    setTimeout(() => {
        pantalla1.classList.toggle('transicion')
    }, 200);
  }, 200);
})


//Boton Continuar
continuar.addEventListener('click',()=>{
    if(name1 == true && name2 == true){
        nombreuser1.innerHTML= user1;
        nombreuser2.innerHTML= user2 + " (PC)";
    }else{
            
        if(name1 ==false && name2 == true){
            user1 = 'User'
            nombreuser1.innerHTML= user1;
            nombreuser2.innerHTML= user2 + " (PC)";
        }else if(name2 == false && name1 ==true){
            user2 = 'PC'
            nombreuser1.innerHTML= user1;
            nombreuser2.innerHTML= user2 + " (PC)";
        }else{
            user1 = 'User'
            user2 = 'PC'
            nombreuser1.innerHTML= user1;
            nombreuser2.innerHTML= user2 + " (PC)";
        }

    }
    transicion(pantalla2,pantalla3);
})

const transicion = (p1, p2)=>{
    p1.classList.toggle('transicion');
    
        setTimeout(() => {
            p1.style.display = 'none';
            setTimeout(() => {
            p2.classList.toggle('transicion');
                
            }, 200);
        }, 300);
}


//=============Eventos pantalla 3==========
btnpiedra.addEventListener('click',()=>{
    img1.src = 'img/piedra.png';
    opcionusuario = piedra;
    play(opcionusuario);
})
btnpapel.addEventListener('click',()=>{
    img1.src = 'img/papel.png';
    opcionusuario = papel;
    play(opcionusuario);
    
})
btntijeras.addEventListener('click',()=>{
    img1.src = 'img/tijeras.png';
    opcionusuario = tijeras;
    play(opcionusuario);

})


function play(opcionuser){
    opciontitulo1.innerHTML=opcionuser;
   setTimeout(() => {
    const interval = setInterval(function(){
        const opcionpc = calcopcionpc();
        opciontitulo2.innerHTML='pensando...';

        img2.src = "img/" + opcionpc + ".png";

    }, 200);
    setTimeout(function () {

        clearInterval(interval);
        
        const opcionpc = calcopcionpc();
        const resultado = calcResultado(opcionuser, opcionpc);
        opciontitulo2.innerHTML=opcionpc;

        img2.src = "img/" + opcionpc + ".png";

        switch (resultado) {
            case empate:
                popresultado.innerHTML = `<span class="empate">${user1}</span> Han empatado`;
                break;
            case ganaste:
                popresultado.innerHTML = `<span class="ganaste">${user1}</span> Has ganado con ${opcionuser}`;
                break;
            case perdiste:
                popresultado.innerHTML = `<span class="perdiste">${user1}</span> Has perdido con ${opcionuser}`;
                break;
        }
        setTimeout(() => {
            contenedorres.style.display='flex';
            contenedorres.classList.add('okey');
            setTimeout(() => {
                contenedorres.style.opacity='1';
            }, 700);
        },200);
    }, 3000);
   }, 1000);

    
}

cerrar.forEach(boton=>{
    
boton.addEventListener('click',()=>{
    contenedorres.style.opacity='0';
    setTimeout(() => {
        contenedorres.style.display='none';
        contenedorres.classList.toggle('okey')
        opciontitulo1.innerHTML='¡Escoge!';
        opciontitulo2.innerHTML='';
        img1.src='';
        img2.src='';


    }, 450);

})
})

function calcopcionpc() {
        const number = Math.floor(Math.random() * 3);
        switch (number) {
            case 0:
                return piedra;
            case 1:
                return papel;
            case 2:
                return tijeras;
        }
    }


function calcResultado(opcionuser, opcionpc) {
    if (opcionuser === opcionpc) {
        return empate;

    } else if (opcionuser === piedra) {

        if (opcionpc === papel) return perdiste;
        if (opcionpc === tijeras) return ganaste;

    } else if (opcionuser === papel) {

        if (opcionpc === tijeras) return perdiste;
        if (opcionpc === piedra) return ganaste;

    } else if (opcionuser === tijeras) {

        if (opcionpc === piedra) return perdiste;
        if (opcionpc === papel) return ganaste;

    }
}