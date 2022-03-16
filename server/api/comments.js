const express = require('express')
const router = express.Router()

const Post = require('../models/Posts')

router.post('/add', async (req, res) => {

    try {
        console.log('comments/add body is', req.body)

        const {postid, ...comment} = req.body

        console.log('comment is', comment)

        // collection.findByIdANdUpdate(filter, data, option {new: true}) )
        const post = await Post.findByIdAndUpdate(postid, {
            $push: {comments: comment}
        }, {new: true})

        console.log('post is', post) 
        res.send({success: true, post})
    } catch (error) {
        
        console.log('comments add ERROR', error. message)
        res.send(error. message)
    }
})

router.delete('/delete/:postid/:commentid', async (req, res) => {

    try {
        console.log('comments/delete params is', req.params)

        const {postid, commentid} = req.params

        // collection.findByIdANdUpdate(filter, data, option {new: true}) )
        const post = await Post.findByIdAndUpdate(postid, {
            $pull: {comments: {_id: commentid}}
        }, {new: true})

        console.log('post is', post) 
        res.send({success: true, post})
    } catch (error) {
        
        console.log('comments add ERROR', error. message)
        res.send(error. message)
    }
})

router.put('/edit/:postid/:commentid', async (req, res) => {

    try {
        console.log('comments/edit params is', req.params)
        console.log('comments/edit text is', req.body)

        const {postid, commentid} = req.params
        const text = req.body.text

        // collection.findOneAndUpdate(filter, data, option {new: true}) )
        const post = await Post.findOneAndUpdate({ // filter
            _id: postid,
            comments: {$elemMatch: {_id: commentid}}
        },  
        { // update part
            $set: { 'comments.$.text': text}
        }, {new: true})

        console.log('post is', post) 
        res.send({success: true, post})
    } catch (error) {
        
        console.log('comments add ERROR', error. message)
        res.send(error. message)
    }
})

module.exports = router