const BlogPost = require('../models/BlogPost.js')
const path = require('path')

module.exports = async (req, res) => {
    //traitement image 
    try {
        let image = req.files.image;
        image.mv(path.resolve(__dirname, '../../public/assets/img', image.name), async (error) => {
            if (error !== undefined) {
                console.log(`image file upload error => ${error}`)
            } else {
                try {
                    await BlogPost.create({ ...req.body, image: '/assets/img/' + image.name, userid: req.session.userId })
                    res.redirect('/')
                } catch (error) {
                    console.error(`create new post error => ${error}`)
                }
            }
        })
    } catch (error) {
        console.error(`create new post final error => ${error}`)
    }
}