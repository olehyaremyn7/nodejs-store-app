const Order = require('../models/Order')

exports.ordersPageController = async (req, res) => {
    try {
        const orders = await Order.find({'user.userID': req.user._id})
            .populate('user.userID')

        res.render('app/OrdersPage', {
            title: 'Orders page',
            isOrder: true,
            orders: orders.map(o => {
               return {
                   ...o._doc,
                   price: o.products.reduce((total, prod) => {
                       return total += prod.count * prod.product.price
                   }, 0)
               }
            })
        })
    } catch (e) {
        console.log(e)
    }
}

exports.ordersPostController = async (req, res) => {
    try {
        const user = await req.user
            .populate('cart.items.productID')
            .execPopulate()

        const products = user.cart.items.map(i => ({
            count: i.count,
            product: {...i.productID._doc}
        }))

        const order = new Order({
            user: {
                name: req.user.name,
                userID: req.user
            },
            products: products
        })

        await order.save()
        await req.user.clearCart()
        await res.redirect('/app/orders')
    } catch (e) {
        console.log(e)
    }
}
