const Order = require('../models/order')
const Product = require('../models/product')
const order = require('../models/order')

module.exports = {

    // AJOUTER UNE COMMANDE
    // async on attend la validation des instructionns
    addOrder:async (req, res, next) => {
        try { 
            // on créer une commande avec le modèle 'Order' à partir de la requête
            let order = new Order(req.body)
            // on attend la validation pour sauvegarder la commande 
            order = await order.save()
            // on décompose les items d'order dans l'attent pour chaque element
            order.items.forEach(async (element) => {
                // on attend de trouver un produit par id
                let product = await Product.findById(element._id)
                product.stock = product.stock - element.stock;
                await product.save()
            });
            // on résout la promesse avec le json de la commande
            res.json(order)
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error)
        }
    },

    // RECUPER LES COMMANDES
    // async on attend la validation des instructionns
    getOrders:async (req, res, next) => {
        try { 
            // on attend d'avoir récup tous les produits
            let orders = await Order.find()
            // on inverse l'ordre des commandes
            orders.reverse()
            // renvoie un statut 200 pour résoudre la promesse si
            // le Content-Type d'user corespond bien au type demandé
            res.status(200).json(orders)
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error)
        }
    },

    // RECHERCHE COMMANDE PAR MAIL
    // async on attend la validation des instructionns
    getOrdersByMail:async (req, res, next) => {
        try { 
            // on créer l'email à partir de la requête
            const {email} = req.query
            // on attend d'avoir récup les commandes à partir de l'email
            let orders = await Order.find({email})
            // on résout la promesse avec le json de la commande
            res.json(orders)
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error)
        }
    },

    // RECHERCHE COMMANDE PAR ID
    // async on attend la validation des instructionns
    getOrderById:async (req, res, next) => {
        try { 
            // on créer l'id à partir de la requête
            const {_id} = req.query
            // on attend d'avoir récup la commande à partir de l'id
            let order = await Order.findById(_id)
            // on résout la promesse avec le json de la commande
            res.json(order)
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error)
        }
    },

    // SUPPRIMER UNE COMMANDE
    // async on attend la validation des instructionns
    deleteOrder:async (req, res, next) => {
        try { 
            const {_id} = req.query
            // on attend d'avoir récup et supprimer la commande à partir de l'email
            let order = await Order.findByIdAndDelete(_id)
            // on résout la promesse avec le json de la commande
            res.json(order)
        } catch (error) {
            // si le json renvoie une erreur alors retour 500 (erreur serveur)
            res.status(500).json(error)
        }
    }
}