const express = require('express')
const router = express.Router()

router.get("/profile/:username", async (request, response) => {

    const { username } = request.params
    try {
        const userRes = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                authorization: `token ${process.env.GITHUB_API_KEY}`
            }
        })

        const userProfile = await userRes.json()
        const repoRes = await fetch(userProfile.repos_url, {
            headers: {
                authorization: `token ${process.env.GITHUB_API_KEY}`
            }
        })

        const repos = await repoRes.json()
        response.send({ userProfile, repos })

    } catch (error) {
        response.status(500).send({ message: error.message })

    }

});

module.exports = router