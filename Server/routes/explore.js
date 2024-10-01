const express = require('express')
const router = express.Router()

router.get("/repos/:language", async (request, response) => {

    const { language } = request.params
    try {
        const res = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`, {
            headers: {
                "authorization": `token ${process.env.GITHUB_API_KEY}`
            }
        })   
        const data = await res.json()
        response.send(data)

    } catch (error) {
        response.status(500).send({ message: error.message })

    }

});



module.exports = router