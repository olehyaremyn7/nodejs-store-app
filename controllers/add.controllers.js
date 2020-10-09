const Product = require('../models/Product')
const {validationResult} = require('express-validator/check')

exports.addPageController = (req, res) => {
    res.render('app/AddPage', {
        title: 'Add page',
        isAdd: true
    })
}

exports.addPostController = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).render('app/AddPage', {
            title: 'Add page',
            isAdd: true,
            error: errors.array()[0].msg,
            data: {
                image: req.body.image,
                title: req.body.title,
                price: req.body.price,
                description: req.body.description
            }
        })
    }

    const product = new Product({
       image: req.body.image,
       title: req.body.title,
       price: req.body.price,
       description: req.body.description,
       userID: req.user
    })

    try {
        await product.save();
        res.redirect('/app/home')
    } catch (e) {
        console.log(e)
    }
}
