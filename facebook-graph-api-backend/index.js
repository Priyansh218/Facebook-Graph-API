const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


app.get('/',(req,res)=>{
    res.json({message:"Hello World from backend"})
})
// Route to handle Facebook login
app.get('/auth/facebook/callback', async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).send('Authorization code missing');
    console.log(code)
    try {
        const tokenResponse = await axios.get(
            `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&client_secret=${process.env.FACEBOOK_APP_SECRET}&code=${code}`
        );
        const { access_token } = tokenResponse.data;
        res.redirect(`https://facebook-graph-api-frontend.vercel.app/?access_token=${access_token}`);
        // res.json({ access_token });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching access token', error });
    }
});

// Route to get user profile info
app.get('/api/profile', async (req, res) => {
    const { access_token } = req.query;
    try {
        const profileResponse = await axios.get(
            `https://graph.facebook.com/me?fields=name,picture&access_token=${access_token}`
        );
        res.json(profileResponse.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile info', error });
    }
});

// Route to get the list of pages
app.get('/api/pages', async (req, res) => {
    const { access_token } = req.query;
    try {
        const pagesResponse = await axios.get(
            `https://graph.facebook.com/me/accounts?access_token=${access_token}`
        );
        res.json(pagesResponse.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pages', error });
    }
});

// Route to get page insights
app.get('/api/page-insights', async (req, res) => {
    const { page_id, access_token, since, until } = req.query;
    try {
        const insightsResponse = await axios.get(
            `https://graph.facebook.com/${page_id}/insights?metric=page_fans,page_engaged_users,page_impressions,page_actions_post_reactions_total&period=lifetime&since=${since}&until=${until}&access_token=${access_token}`
        );
        res.json(insightsResponse.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching page insights', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
