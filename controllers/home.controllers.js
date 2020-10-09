const Product = require('../models/Product')

exports.homePageController = async (req, res) => {
    try {
        await res.render('app/HomePage', {
            title: 'Home page',
            isHome: true
        })
    } catch (e) {
        console.log(e)
    }
}

exports.aboutPageController = async (req, res) => {
    try {
        await res.render('app/AboutPage', {
            title: 'About page',
        })
    } catch (e) {
        console.log(e)
    }
}

exports.searchController = async (req, res) => {
    try {
        if(req.query.search) {
            const regex = new RegExp(escapeRegex(req.query.search), 'gi')
            const filteredProducts = await Product.find({ title: regex }, (err, res) => {
                if (err) {
                    console.log(err);
                    res.redirect('/app/home');
                }
            }).lean()

            await res.render('app/SearchPage', {
                title: 'Search',
                filteredProducts
            })
        }
    } catch (e) {
        console.log({ message: e })
    }
}

// function for valid search data
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}
