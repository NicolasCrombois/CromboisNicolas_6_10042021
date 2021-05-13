# MVP So Pekocko

### Démarrer l'API 

Afin de lancer l'api correctement NodeJs doit être installé sur la machine.

Au préalable cloner le repository Git sur votre machine.
Une fois cela fait, exécuter votre Terminal puis faites : 
1. *cd path_du_projet/*
2. *npm install*
3. *npm start serve*

Maintenant votre terminal devrait vous afficher le message de réussite suivant:
*" Connexion à MongoDB réussie ! "*
Dans ce cas, l'api a bien été lancé.


### Le port utilisé
Le port d'écoute de l'api est renseigné sur le terminal précédant le message de réussite :
*" Listening on port 3000 "*
Par défaut, votre api est utilisable sur l'adresse : **http://localhost:3000/**

Si vous souhaitez effectuer l'écoute sur un autre port, rendez-vous dans le fichier **app.js**
et modifier la valeur '3000' de la ligne 15 par le port souhaité.

### Connexion à la base SQL
Afin de vous connecter à votre base de donnée, vous devez créer un fichier ".env".
Dans ce fichier vous devez y ajouter "CONNECTION_DB = " suivi de votre URL de connexion