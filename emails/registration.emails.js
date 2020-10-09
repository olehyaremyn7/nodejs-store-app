const config = require('../config/keys.config')

module.exports = function (email) {
    return {
        to: email,
        from: config.EMAIL_FROM,
        subject: 'Successfully created account',
        html: `
            <h1>Welcome, dear client!</h1>
            <p>Successfully created account with email - ${email}</p>
            <hr>
            <a href="${config.BASE_URL}">Sneakers store</a>
        `
    }
}
