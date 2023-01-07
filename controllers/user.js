const User = require('../models/user');
const bcrypt = require('bcryptjs')
const fs = require('fs'); // permet de manipuler (créer / lire / écrire) des fichiers et des répertoires.
const path = require('path'); // pour travailler avec les chemins de fichiers et de répertoires.

module.exports = {

    // RECUPERER UN UTILISATEUR
    // async on attend la validation des instructionns
    getUser:async (req, res, next) => {
        try {        
            // récupération des données de mongoDB
            const email = req.body.email.toLowerCase()
            // on attend d'avoir récup l'utlisateur
            const user = await User.find();
            // renvoie un statut 200 pour résoudre la promesse si
            // le Content-Type d'user corespond bien au type demandé
            res.status(200).json(user)
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error)
        }
    },

    // RECUPERER TOUS LES UTILISATEURS
    // async on attend la validation des instructionns
    getUsers:async (req, res, next) => {
        try {        
            // on attend d'avoir récup tous les utlisateurs
            const users = await User.find({},{password:0});
            // renvoie un statut 200 pour résoudre la promesse si
            // le Content-Type d'user corespond bien au type demandé
            res.status(200).json(users)
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error)
        }
    },

    // METTRE A JOUR
    // async on attend la validation des instructionns
    updateUser:async (req, res, next) => {
        try {
            // on créer l'id à partir de la requête
            let {_id} = req.query;
            // on créer update à parrtir de la requête
            let update = req.body;
            // on attend que l'objet à mettre à jour par id soit validé
            // avec update (l'objet à update), useFindAndModify: false (doc)
            await Product.findByIdAndUpdate(_id,update,{useFindAndModify:false})
            // on attend d'avoir trouvé l'id de Product
            let user = await User.findById(_id)
            // renvoie un statut 201 (ressource créée) pour résoudre la promesse si
            // le Content-Type d'user corespond bien au type demandé
            res.status(201).json(user)    
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error) 
        }
        
    },

    // SUPPRIMER UN UTILISATEUR
    // async on attend la validation des instructionns
    deleteUser:async (req, res, next) => {
        try {        
            // récupération l'_id
            const {_id} = req.query
            // on cherche l'id, on supprime et on renvoie la réponse
            let user = await User.findByIdAndDelete(_id)
            // renvoie un statut 200 pour résoudre la promesse si
            // le Content-Type d'user corespond bien au type demandé
            res.status(200).json(user)
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error)
        }
    },

    // QUEL ROLE A L'UTILISATEUR ?
    // async on attend la validation des instructions
    toggleRole:async (req, res, next) => {
        try {        
            // récupération l'_id
            const {_id} = req.query
            // on attend la écup l'id lié à l'utilisateur
            let user = await User.findById(_id);
            // est-ce que l'user est admin ?
            user.role = user.role === 'admin' ? 'visitor' : 'admin'; 
            // on attend la validation pour sauvegarder l'utilisateur 
            await user.save()
            // renvoie un statut 200 pour résoudre la promesse si
            // le Content-Type d'user corespond bien au type demandé
            res.status(200).json(user)
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error)
        }
    },

    // INSCRIPTION 
    postSignUp:async (req, res, next) => {
        try {              
            // on récup le fichier envoyé
            const file = req.files.file
            // on créer l'objet user à partir des données json récupérées dans le body
            let user = JSON.parse(req.body.body)

            // récup email en bas de casse
            const email = user.email.toLowerCase()
            // on attend que l'email récupéré correspond à l'email entré
            let userfound = await User.findOne({ email: email})
            // si l'email correspond
            if(userfound) 
                // alors le json renverra une erreur serveur (500) avec le message: message
                res.status(500).json({message:'l\'utilisateur avec e-mail existe déjà!'})
            else{
                // sinon on hash le mdp avec bcrypt avec le salt '10'
                const hash = bcrypt.hashSync(user.password,10)
                // création de l'url du fichier
                let url = `${Date.now().toString()}_${file.name}`
                // enregistrement du fichier dans l'attente d'une validation
                file.mv(`../storeApp/src/assets/images/profil/${url}`,async (result,err)=>{
                    // s'il n'y pas d'erreur alors
                    if(!err){
                        // user.url = url
                        user = new User({
                            firstName: user.firstName,
                            lastName: user.lastName,
                            gender: user.gender,
                            birthday: user.birthday,
                            postalCode: user.postalCode,
                            city: user.city,
                            url: user.url,
                            description: user.description,
                            email: user.email,
                            password: hash
                        })
                        user.url = url
                        console.log(user)
                            // renvoie un statut 200 pour résoudre la promesse si
                        // le Content-Type d'user corespond bien au type demandé
                        await user.save();
                        res.status(201).json(user)
                    }
                })
            }
        } catch (error) {
            console.log('Erreur ! ')
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error)
        }
    },

    // CONNEXION
    // async on attend la validation des instructionns
    postSignIn:async (req, res, next) => {
        try {  
            // on assigne les constantes email et password à partir de la requête
            const { email,password} = req.body
            // on attend de voir si l'email (en bas de casse) entré par l'utilisateur
            // correspond à l'email récupéré dans la bdd
            let userfound = await User.findOne({ email: email.toLowerCase()})
            // si c'est pas le cas on renvoie une erreur 400 (erreur initulisable)
            // avec message: message
            if(!userfound){
                res.status(400).json({message:'L\'utilisateur n\'existe pas avec l\'email!'})
            } else{
                // sinon on vérifie que le mot de passe de la requête 
                // correspond au mdp de la bdd grace à methode compareSync()
                let result = bcrypt.compareSync(password,userfound.password)
                // si c'est le cas
                
                if(result){
                    // on créé un nouvel objet 
                    let obj = new Object({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        gender: req.body.gender,
                        dob: req.body.dob,
                        url: req.body.url,
                        email:userfound.email,
                        role:userfound.role
                    })
                    // renvoie un statut 200 pour résoudre la promesse si
                    // le Content-Type d'user corespond bien au type demandé
                    res.status(200).json(obj)
                }else{
                    // si c'est pas le cas on renvoie une erreur 400 (erreur initulisable)
                    // avec message: message
                    res.status(400).json({message:'Mot de passe incorrect!'})
                }
            }
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error)
        }
    }            
}