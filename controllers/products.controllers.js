const Product = require('../models/Product')
const {validationResult} = require('express-validator/check')

function isOwner(product, req) {
    return product.userID.toString() === req.user._id.toString()
}

exports.productsPageController = async (req, res) => {
    try {
        const products = await Product.find({}).populate('userID').select('price title image').lean()
        await res.render('app/ProductsPage', {
            title: 'Sneakers page',
            isProducts: true,
            userID: req.user ? req.user._id.toString() : null,
            products
        })
    } catch (e) {
        console.log(e)
    }
}

exports.productEditController = async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/app/home')
    }

    try {
        const product = await Product.findById(req.params.id).lean()

        if (!isOwner(product, req)) {
            return res.redirect('/app/products')
        }

        res.render('app/EditPage', {
            title: `Edit ${product.title}`,
            product
        })
    } catch (e) {
        console.log(e)
    }
}

exports.productEditPostController = async (req, res) => {
    const errors = validationResult(req)
    const {id} = req.body

    if (!errors.isEmpty()) {
        return res.status(422).redirect(`/app/products/${id}/edit?allow=true`)
    }

    try {
        delete req.body.id
        const product = await Product.findById(id)

        if (!isOwner(product, req)) {
            return res.redirect('/app/products')
        }

        Object.assign(product, req.body)
        await product.save()
        res.redirect('/app/products')
    } catch (e) {
        console.log(e)
    }
}

exports.productRemoveController = async (req, res) => {
    try {
        await Product.deleteOne({
            _id: req.body.id,
            userID: req.user._id
        })
        res.redirect('/app/products')
    } catch (e) {
        console.log(e)
    }
}

exports.productPageController = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).lean()
        res.render('app/ProductPage', {
            layout: 'empty',
            title: `Sneakers ${product.title}`,
            product
        })
    } catch (e) {
        console.log(e)
    }
}
