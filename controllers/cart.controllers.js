const Product = require('../models/Product')

exports.cartPageController = async (req, res) => {
    try {
        const user = await req.user.populate('cart.items.productID').execPopulate()
        const products = mapCartItems(user.cart)
        await res.render('app/CartPage', {
            title: 'Cart',
            isCart: true,
            products: products,
            price: computePrice(products)
        })
    } catch (e) {
        console.log(e)
    }
}

exports.cartAddController = async (req, res) => {
   try {
       const product = await Product.findById(req.body.id)
       req.user.addToCart(product)
       await res.redirect('/app/cart')
   } catch (e) {
       console.log(e)
   }
}

exports.cartDeleteController = async (req, res) => {
    try {
        await req.user.removeFromCart(req.params.id)
        const user = await req.user.populate('cart.items.productID').execPopulate()
        const products = mapCartItems(user.cart)
        const cart = {
            products,
            price: computePrice(products)
        }
        res.status(200).json(cart)
    } catch (e) {
        console.log(e)
    }
}

function mapCartItems(cart) {
    return cart.items.map(c => ({
        ...c.productID._doc,
        id: c.productID.id,
        count: c.count
    }))
}

function computePrice(products) {
    return products.reduce((total, product) => {
        return total += product.price * product.count
    }, 0)
}
