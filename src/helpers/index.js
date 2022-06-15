const BASE_IMAGE_URL = process.env.BASE_IMAGE_URL;

const formatTVShow = tvShow => {
  return {
    id: tvShow.id,
    title: tvShow.name,
    overview: tvShow.overview,
    poster: parsePoster(tvShow.poster_path),
    rating: tvShow.vote_average
  };
};

const parsePoster = poster => (poster ? `${BASE_IMAGE_URL}${poster}` : '');

module.exports = { formatTVShow };
