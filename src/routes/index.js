const express = require('express');
const { default: axios, AxiosError } = require('axios');
const router = express.Router();

const { formatTVShow } = require('../helpers');

const API_BASE_URL = process.env.API_BASE_URL;
const API_TOKEN = process.env.API_TOKEN;

router.get('/popular', async (_, res) => {
  try {
    const SORT_BY = 'popularity.desc';

    const response = await axios.get(
      `${API_BASE_URL}/discover/tv?sort_by=${SORT_BY}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`
        }
      }
    );

    const data = response.data;
    const tvShows = data.results.map(formatTVShow);

    res.status(200).json({ data: tvShows });
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(error.response.status).json({
        message: error.response.data.status_message
      });
    }

    res.status(500).json({ message: error.response.data.status_message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    const response = await axios.get(
      `${API_BASE_URL}/search/tv?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`
        }
      }
    );

    const data = response.data;
    const tvShows = data.results.map(formatTVShow);

    res.status(200).json({ data: tvShows });
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(error.response.status).json({
        message: error.response.data.status_message
      });
    }

    res.status(500).json({ message: error.response.data.status_message });
  }
});

module.exports = router;
