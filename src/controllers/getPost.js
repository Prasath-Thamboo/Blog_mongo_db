const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    try {
        const blogpost = await BlogPost.findById(req.params.id).populate('userid')
        console.log(`blogpost ${blogpost} param id ${req.params.id}`)
        res.render('post', {
            blogpost
        })
    } catch (error) {
        console.error(`get blogpost error => ${error}`)
    }
}