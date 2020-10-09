module.exports = {
    port: process.env.PORT,
    mongoURI: process.env.MONGODB_URI,
    sessionSecret: process.env.SESSION_SECRET,
    sendgridKeyAPI: process.env.SENDGRID_API_KEY,
    emailFrom: process.env.EMAIL_FROM,
    baseURL: process.env.BASE_URL
}
