const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Post = require("../models/Post");
const dotenv= require("dotenv");
dotenv.config({path: './config/config.env'})
const API_KEY=process.env.API_KEY
const axios = require('axios');
const Keyword = require('../models/Keyword');


router.get("/", (req, res, next) => {
    res.status(200).json({ message: "Getting all the auth users" })
})

router.post("/", check('keyword', 'Keyword is required').notEmpty(), async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let dataArray = [];
    try {
        const { keyword } = req.body;
        const key = new Keyword({
            keyword: keyword
        })
        let KeywordDatabase = await Keyword.findOne({ keyword });
        let KeywordPost = await Post.find({keyword})
        
        if (KeywordDatabase) {  
            return res.status(200).json({ "message": KeywordPost , "Greet": "Hello From DB"})
        }
        else {
            await key.save()
            console.log(req.body.keyword)
          const result = await axios.get(`https://newsapi.org/v2/everything?q=${keyword}&from=2021-03-15&sortBy=publishedAt&apiKey=${API_KEY}`)
        
            result.data.articles.map((e) => {
                
                const post = new Post({
                    author: e.author,
                    title: e.title,
                    description: e.description,
                    url: e.url,
                    keyword: keyword
                })
                dataArray.push(post)
                 post.save();
            })
            return res.status(200).json({ "data": dataArray, "Greet": "new data" })

        }
    }
    catch (error) {
        return res.status(400).json({"error": error})
    }

})

module.exports = router;