const User = require('../models/User')

exports.profilePageController = async (req, res) => {
    try {
        res.render('user/ProfilePage', {
            title: 'Profile',
            isProfile: true,
            user: req.user.toObject()
        })
    } catch (e) {
        console.log(e)
    }
}

exports.profilePostController = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        const toChange = {
            name: req.body.name
        }

        if (req.file) {
            toChange.avatarUrl = req.file.path
        }

        Object.assign(user, toChange)
        await user.save()
        res.redirect('/app/profile')
    } catch (e) {
        console.log(e)
    }
}
