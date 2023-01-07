// require & create app from 'express'
const app = require('express')();
const fileUploader = require('express-fileupload');
const path = require('path')

//middlewares à usage interne.
app.use(require('cors')())
app.use(require('body-parser').json());

//gestionnaire de fichiers utilisant express
app.use(fileUploader());

// public folder
// app.use('/static',require('express').static('./static')) 
app.use('/static',require('express').static(path.join(__dirname,'static')))

//routes
app.use(require('./routes/user'))
app.use(require('./routes/product'))
app.use(require('./routes/order'))
app.use(require('./routes/city'))

//aucun gestionnaire d'itinéraire trouvé
app.use('',(req,res)=>{
    res.status(200).json({message:"veuillez vérifier la route entré!"})
})

module.exports = app;