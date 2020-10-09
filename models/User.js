const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatarUrl: String,
    resetToken: String,
    resetTokenExp: Date,
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                productID: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                }
            }
        ]
    }
})

userSchema.methods.addToCart = function(product) {
      const items = [...this.cart.items];
      const index = items.findIndex(c => {
          return c.productID.toString() === product._id.toString()
      })

      if (index >= 0) {
          items[index].count = this.cart.items[index].count + 1
      } else {
          items.push({
             productID: product._id,
             count: 1
          })
      }

      this.cart = {
          items
      }
      return this.save()
}

userSchema.methods.removeFromCart = function(id) {
    let items = [...this.cart.items]
    const index = items.findIndex(c => c.productID.toString() === id.toString())

    if (items[index].count === 1) {
        items = items.filter(c => c.productID.toString() !== id.toString())
    } else {
        items[index].count--
    }

    this.cart = {
        items
    }
    return this.save()
}

userSchema.methods.clearCart = function() {
    this.cart = {
        items: []
    }
    return this.save()
}

module.exports = model('User', userSchema)
