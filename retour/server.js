//importation de dotenv qui stocke nos variables d'environnement et permet d'eviter de rendre visible dans le code des données sensibles.
const dotenv = require("dotenv")
dotenv.config()
const express = require ("express")
// const app qui est notre application
const app = express()
const cors = require("cors")

// intergiciel cors pour créer des header//
app.use (cors())
// Empêche les erreurs de CORS entre deux servers différents.
app.use((req, res, next) => {
    //Permet d'accéder à l'API depuis n'importe quelle origine ('*')
    res.setHeader('Access-Control-Allow-Origin', '*');
    //Permet d'ajouter les headers mentionnées aux requêtes envoyées vers l'API
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    //Permet d'envoyer des requêtes avec les méthodes mentionnnées
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
  });
/*Permet à express de prendre toutes les requêtes qui ont comme Content-Type application.json
 et met à disposition leur body directement sur l'objet req.*/
app.use(express.json())

//On exporte pour pouvoir y accéder depuis les autres fichiers
module.exports = {app, express}
