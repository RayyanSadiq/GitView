const express = require('express')
const router = express.Router()
const User = require('../Models/User');;
const isAuthenticated = require('../middleware/Authentication');

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
        response.status(200).send({ userProfile, repos })

    } catch (error) {
        response.status(500).send({ message: error.message })

    }

});

router.get("/likes", isAuthenticated, async (request, response) => {
    try {
        const user = await User.findById(request.user._id.toString())
        response.status(200).send({ likedBy: user.likedBy })
    }
    catch (error) {
        response.status(500).send({ error: error.message })
    }
});

router.post("/like/:username", isAuthenticated, async (request, response) => {
    try {
        const { username } = request.params;
        const user = await User.findById(request.user._id.toString());
        console.log(user, "auth user");
        const userToLike = await User.findOne({ username });

        if (!userToLike) {
            return response.status(404).json({ error: "User is not a member" });
        }

        if (user.likedProfiles.includes(userToLike.username)) {
            return response.status(400).json({ error: "User already liked" });
        }

        userToLike.likedBy.push({ username: user.username, avatarUrl: user.avatarUrl, likedDate: Date.now() });
        user.likedProfiles.push(userToLike.username);

        await Promise.all([userToLike.save(), user.save()]);

        response.status(200).json({ message: "User liked" });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }

});



module.exports = router