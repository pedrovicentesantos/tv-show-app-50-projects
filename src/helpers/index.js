const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const formatTVShow = tvShow => {
  return {
    id: tvShow.id,
    title: tvShow.name,
    overview: tvShow.overview,
    poster: parsePoster(tvShow.poster_path),
    rating: tvShow.vote_average
  };
};

const parsePoster = poster => (poster ? `${IMAGE_BASE_URL}${poster}` : '');

module.exports = { formatTVShow };
