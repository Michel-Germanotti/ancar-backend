const City = require('../models/city');
const fs = require('fs')
const path = require('path')

module.exports = {

    // RECUPERER UNE VILLE
    getCity:async (req, res, next) => {
        try {        
            // récupération des données de mongoDB
            // on attend d'avoir récup la ville
            const city = await City.find();
            // renvoie un statut 200 pour résoudre la promesse si
            // le Content-Type de city corespond bien au type demandé
            res.status(200).json(city)
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error)
        }
    }

}