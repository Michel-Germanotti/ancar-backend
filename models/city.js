const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma Mongodb pour la collection city
const citySchema = new Schema({
    code_commune_INSEE:Number,
    nom_commune_postal:String,
    code_postal:Number,
    libelle_acheminement:String,
    ligne_5:String,
    latitude:Number,
    longitude:Number,
    code_commune:Number,
    article:String,
    nom_commune:String,
    nom_commune_complet:String,
    code_departement:Number,
    nom_departement:String,
    code_region:Number,
    nom_region:String
})

module.exports = mongoose.model('city', citySchema)