//===============
//Puerto
//==============
process.env.PORT = process.env.PORT || 3000;

//===============
//Entorno
//===============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===============
//Expiracion del token
//===============
//48 horas
process.env.CADUCIDAD_TOKEN = '48h';

//===============
//SEED de autenticacion
//===============
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'seed-de-desarrollo';

//===============
//Base de datos
//===============
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;


//===============
//Google ClientID
//===============
process.env.CLIENT_ID = process.env.CLIENT_ID || '815103271173-700q1c8og38pemnacgcp6uf14nnbqbsj.apps.googleusercontent.com';