const config = require('../config/keys.config')

module.exports = function (email, token) {
    return {
        to: email,
        from: config.EMAIL_FROM,
        subject: 'Restore access',
        html: `
            <h1>Forgot your password?</h1>
            <p>If not, ignore this letter!</p>
            <p>If not, ignore this letter!</p>
            <p><a href="${config.BASE_URL}/app/authorization/password/${token}">Restore access</a></p>
            <hr>
            <a href="${config.BASE_URL}">Sneakers store</a>
        `
    }
}
