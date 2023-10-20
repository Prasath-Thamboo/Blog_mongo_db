const bcrypt = require('bcrypt')
const User = require('../models/User.js')

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body
        let user = await User.findOne({ username: username })
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                //session stockage
                req.session.userId = user._id
                res.redirect('/')
            } else {
                res.redirect('/auth/login')
            }
        } else {
            res.redirect('/auth/login')
        }
    } catch (error) {
        console.error(`login request error  => ${error}`)
    }

}