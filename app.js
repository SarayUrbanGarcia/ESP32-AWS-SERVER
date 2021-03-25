//PRUEBA
// var number = 2;
// s ='2'

//const comparador = (data1, data2) => {
   // if (data1 === data2){
       // console.log('iguales');
    //} else {
       // console.log('diferentes');
    //}
//}

//comparador(s,number);

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//const numeros = require('./dummy');
const usuarios = require('./dummy');
const { exec } = require ('child_process');

const app = express();


//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS

//Rutas
app.get('/', (req, res)=>{
    res.status(200).send('<div> <h1>Mi sitio web </h1> <p>esp32 aws<p><div>');
});

//console.log(__dirname);

//MANDAR LO DEL ARCHIVO HTML

app.get('/homepage',(req, res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
});

const data = {
    message: 'datos',
    payload: {
        temperatura:'20',
        presion: '1'
    }
}

//acomodar números de menor a mayor 
//console.log(numeros);
console.log(usuarios);
app.get('/data',(req, res)=>{
//operacion de ordenamiento de numeros 
   // res.status(200).send(numeros.sort((a,b)=>(a-b)));
//operacion para ordenar id 
   res.status(200).send(usuarios.sort((a,b)=>{return a.id-b.id}));

});

app.get('/users/:id',(req, res)=>{
    const id = req.params.id;
    var user = {};
    for(let u of usuarios){
        if(u.id == id){
            user = u;
        }
    }
    res.status(200).send(comprimirCadena(user.clave));
});




const comprimirCadena = (cadena)=> {

    var cRef = '';
    var contador = 0;
    var contadorCadena = 0;
    var nuevaCadena ='';

    for(let c of cadena){
        contadorCadena=contadorCadena + 1;
        if(c === cRef){
            contador = contador + 1;
        }else{
            nuevaCadena = nuevaCadena + cRef;
            if(c !== '' && contador > 0) nuevaCadena = nuevaCadena + String(contador);
            cRef = c;
            contador = 0;
        }
        if(contadorCadena === cadena.length){
            nuevaCadena = nuevaCadena + c;
            if(c !== '' && contador > 0) nuevaCadena = nuevaCadena + String(contador);
        }
    }
    return nuevaCadena;
}

app.get('/archivos',(req, res)=>{
    //leer nombre de archivos
    exec("dir",(error, stdout, stderr)=>{
        if(error){
            res.status(200).send(error)
        }
        if(stderr){
            res.status(200).send(stderr)
        }
res.status(200).send(stdout)
    });
});
module.exports = app;