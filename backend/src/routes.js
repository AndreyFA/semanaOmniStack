const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');

const routes = Router();

routes.post('/devs', async (request, response) => {
    const {
        github_username,
        techs,
        latitude,
        longitude
    } = request.body;

    const res = await axios.get(`https://api.github.com/users/${github_username}`);

    const {
        login,
        avatar_url
    } = res.data;

    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    };

    const dev = await Dev.create({
        name: login,
        github_username,
        avatar_url,
        techs,
        location
    });

    response.json(dev);
});

module.exports = routes;