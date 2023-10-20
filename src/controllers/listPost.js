const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    try {
        const blogposts = await BlogPost.find({}).populate('userid')
        console.log(`blog list => ${blogposts}`)
        res.render('list', {
            blogposts
        })
    } catch (error) {
        console.error(`get blogs list error => ${error}`)
    }
}