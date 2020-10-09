const { body } = require('express-validator/check')
const User = require('../models/User')

exports.registerValidators = [
    body('email').isEmail().withMessage('Enter correct email!').custom(async (value, { req }) => {
        try {
            const user = await User.findOne({ email: value });

            if (user) {
                return Promise.reject('This email is already in use!')
            }

        } catch (e) {
            console.log(e);
        }
    }).normalizeEmail().notEmpty(),
    body('password', 'Enter correct password. Minimum length 6 symbols').isLength({min: 6, max: 50}).isAlphanumeric().trim().notEmpty(),
    body('confirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password is not same')
        }
        return true
    }).trim().notEmpty(),
    body('name').isLength({ min: 2 }).withMessage('Name length must be minimum 2 symbols').trim().notEmpty()
]

exports.loginValidators = [
    body('email').isEmail().notEmpty().withMessage('Enter correct email!'),
    body('password').notEmpty().isLength({min: 6, max: 50}).withMessage('Enter correct password. Minimum length 6 symbols')
]

exports.productValidators = [
    body('title').isLength({ min: 5 }).withMessage('Minimum length of title must be 5 symbols!').trim().notEmpty(),
    body('price').isNumeric().withMessage('Enter correct price!').notEmpty(),
    body('image', 'Enter correct image URL!').isURL().notEmpty(),
    body('description').isLength({ min: 10 }).trim().withMessage('Minimum length of description must be 10 symbols!').notEmpty()
]
