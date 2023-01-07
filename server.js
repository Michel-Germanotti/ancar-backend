const mongoose = require('mongoose');
const User = require('./models/user')
const app = require('./app')
const bcrypt = require('bcryptjs')

//Définition des variables d'environnement
if(!process.env.PORT){
    require('dotenv').config();
}

//configuration mongo
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,useUnifiedTopology: true},async (err)=>{
    // pour le code d'enregistrement de l'utilisateur administrateur
    try {
        if(!err){
            let user = await User.findOne({email:process.env.ADMIN_EMAIL})
            if(!user){
                user = new User({
                    name : process.env.ADMIN_NAME,
                    email: process.env.ADMIN_EMAIL.toLowerCase(),
                    password:bcrypt.hashSync(process.env.ADMIN_PSWD,10),
                    role:process.env.ADMIN_ROLE
                })
                user.save((res)=>console.log(`Administrateur enregistré! vérifier l'environnement pour afficher l'e-mail / mot de passe de l'administrateur`))
            } else {
                console.log(`L'administrateur existe! vérifier l'environnement pour afficher l'e-mail / mot de passe de l'administrateur`)
            }
            console.log(`Mongodb Up! <br/>`);
        } else{
            console.log(`${err}`);
        }    
    } catch (error) {
        console.log(`${error}`);
    }
});
//Démarrage du serveur sur le port spécifié
app.listen(process.env.PORT,()=>console.log(`Le serveur tourne sur le port ${process.env.PORT}`));