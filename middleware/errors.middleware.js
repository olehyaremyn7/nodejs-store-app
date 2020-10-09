module.exports = function (req, res, next) {
    res.status(404).render('app/404Page', {
        title: 'Page not founded'
    })
}