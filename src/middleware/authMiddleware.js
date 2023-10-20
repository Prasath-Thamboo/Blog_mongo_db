const User = require('../models/User.js')

module.exports = async (req, res, next) => {
    try {
        if (req.session.userId) {
            let user = await User.findById(req.session.userId)
            if (user) {
                //return res.redirect('/')
                next()
            }
        } else {
            return res.redirect('/')
            next()
        }
    } catch (error) {
        console.error(`user login check error "authMiddleware" => ${error}`)
    }
}