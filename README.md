##  Piquante
##  Projet de formation n°6 du parcours Développeur Web - Openclassrooms
##  Construisez une API sécurisée pour une application d'avis gastronomiques.

##  1. Installation
    Use node 
    
    📁 backend :

frameworks : Express
. packages : mongoose / mongoose-unique-validator / bcrypt / body-parser / jsonwebtoken / multer express-mongo-sanitize /nodemon / express-validator/ cors.

. modules: dotenv 

  Sur Windows, ces installations nécessitent d'utiliser PowerShell ou GitBash en tant qu'administrateur.

dans les deux dossiers pour une installation rapide : 

npm install



## Mission

. Implémenter un modèle logique de données conformément à la réglementation

. Mettre en œuvre des opérations CRUD de manière sécurisée.

. Stocker des données de manière sécurisée.


## 2. Paramétrer dotenv

PORT=YOUR_PORT_HERE

DB_URI=YOUR_MONGODB_URI_HERE
DB_NAME=YOUR_DB_NAME_HERE
DB_USER=YOUR_DB_USERNAME_HERE
DB_PASS=YOUR_DB_PASWWORD_HERE

TOKEN_KEY=YOUR_SECRET_JWTOKEN_KEY_HERE

EMAIL_CRYPTO_KEY=SECRET_22_LENGTH_KEY

## 3. Lancer le projet
Dans le dossier 📁 frontend

Pour avoir accès au serveur de développement : run npm start ou  (Rendez-vous sur http://localhost:4200/)
Dans le dossier 📁 backend

Lancer le serveur : nodemon server

## 📦 Made with
Javascript
Express
Database : MongoDb
