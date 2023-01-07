const Product = require('../models/product')
const fs = require('fs'); // permet de manipuler (créer / lire / écrire) des fichiers et des répertoires.
const path = require('path'); // pour travailler avec les chemins de fichiers et de répertoires.

module.exports = {

    // AJOUT PRODUIT
    // async on attend la validation des instructionns
    addProduct:async (req, res, next) => {
        try {  
            // on récup le fichier envoyé
            const file = req.files.file
            // on créer le produit à partir des données json
            let product = JSON.parse(req.body.body)
            // création de l'url du fichier
            let url = `${Date.now().toString()}_${file.name}`
            // enregistrement du fichier dans l'attente d'une validation
            file.mv(`../storeApp/src/assets/images/${url}`,async (result,err)=>{
                // s'il n'y pas d'erreur alors
                if(!err){
                    product.url = url
                    product = new Product(product)
                    // on attend la validation pour sauvegarder le produit 
                    await product.save()
                    // renvoie un statut 201 (ressource créée) pour résoudre la promesse si
                    // le Content-Type d'user corespond bien au type demandé
                    res.status(201).json(product)
                }
            })
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error)
        }
    },

    // METTRE A JOUR
    // async on attend la validation des instructionns
    updateProduct:async (req, res, next) => {
        try {
            // on créer l'id à partir de la requête
            let {_id} = req.query;
            // on créer update à parrtir de la requête
            let update = req.body;
            // on attend que l'objet à mettre à jour par id soit validé
            // avec update (l'objet à update), useFindAndModify: false (doc)
            await Product.findByIdAndUpdate(_id,update,{useFindAndModify:false})
            // on attend d'avoir trouvé l'id de Product
            let product = await Product.findById(_id)
            // renvoie un statut 201 (ressource créée) pour résoudre la promesse si
            // le Content-Type d'user corespond bien au type demandé
            res.status(201).json(product)    
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error) 
        }
        
    },

    // SUPPRIMER
    // async on attend la validation des instructionns
    deleteProduct:async (req, res, next) => {
        try {
            // on créer l'id à partir de la requête
            let {_id} = req.query;
            // on cherche l'id, on supprime et on renvoie la réponse
            let product = await Product.findByIdAndDelete(_id)
            // on vérifie si le chemin existe 
            if(fs.existsSync(`.${product.url}`) && product){
                // on supprime le chemin
                fs.unlinkSync(`.${product.url}`);
            }
            // renvoie un statut 201 (ressource créée) pour résoudre la promesse si
            // le Content-Type d'user corespond bien au type demandé
            res.status(201).json(product)    
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            console.log(error)
            res.status(500).json(error) 
        }
    },

    // RECUP TOUS LES PRODUITS
    // async on attend la validation des instructionns
    getProducts:async (req, res, next) => {
        try {  
            // on attend que tous les produis soit trouvé
            let products = await Product.find()
            // inverse les éléments
            products.reverse()
            // renvoie un statut 200 pour résoudre la promesse si
            // le Content-Type d'user corespond bien au type demandé
            res.status(200).json(products)
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error)
        }
    },      

    // RECUP UN PRODUIT
    // async on attend la validation des instructionns
    getProduct:async (req, res, next) => {
        try { 
            // créer l'id à partir de la requête
            const {_id} = req.query 
            // on attend qu'un produit soit trouvé à partir de son id
            let product = await Product.findById(_id)
            // renvoie un statut 200 pour résoudre la promesse si
            // le Content-Type d'user corespond bien au type demandé
            res.status(200).json(product)
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error)
        }
    }          
}