const result = document.querySelector('section#result');
const form = document.querySelector('form');
const loader = document.querySelector('.loader');
const scrollToTopBtn = document.querySelector('button.scroll-top');
const rootElement = document.documentElement;
const footer = document.querySelector('footer');

const getTVShows = async (query = null) => {
  const url = query ? `/api/v1/search?query=${query}` : '/api/v1/popular';

  const response = await fetch(url);

  if (response.status === 200) {
    return response.json();
  }

  throw new Error('Unable to fetch tv shows');
};

const hideLoader = () => {
  loader.style.display = 'none';
};

const showLoader = () => {
  loader.style.display = 'block';
};

const cleanResult = () => {
  result.innerHTML = '';
};

const defineRatingLevel = rating => {
  if (rating >= 8) {
    return 'good';
  } else if (rating >= 5) {
    return 'medium';
  } else {
    return 'bad';
  }
};

const limitText = text => {
  const LIMIT = 30;
  if (text.length > LIMIT) {
    return `${text.substring(0, LIMIT)}...`;
  }
  return text;
};

const createElementWithClass = (elementType, className) => {
  const element = document.createElement(elementType);
  element.classList.add(className);
  return element;
};

const createOverviewDiv = overview => {
  const overviewDiv = createElementWithClass('div', 'overview');
  overviewDiv.innerHTML = `
    <h3>Overview</h3>
    ${overview}
  `;
  return overviewDiv;
};

const moreBtnOnClick = e => {
  const btn = e.target;
  const card = btn.parentElement;
  const cardOverview = card.querySelector('.overview');
  cardOverview.classList.toggle('show');
};

const createMoreBtn = () => {
  const btn = createElementWithClass('button', 'more');
  const i = createElementWithClass('i', 'fa-solid');
  i.classList.add('fa-info');
  btn.appendChild(i);
  btn.addEventListener('click', moreBtnOnClick);
  return btn;
};

const createImagePoster = (poster, title) => {
  const img = document.createElement('img');
  img.src = poster;
  img.alt = title;
  return img;
};

const createDefaultPlaceholder = () => {
  const div = createElementWithClass('div', 'placeholder');
  const icon = createElementWithClass('i', 'fa-solid');
  icon.classList.add('fa-tv');
  icon.style.fontSize = '5rem';
  div.appendChild(icon);
  return div;
};

const createWrapperDiv = (title, rating) => {
  const wrapperDiv = createElementWithClass('div', 'wrapper');
  const titleDiv = createElementWithClass('h3', 'title');
  titleDiv.innerText = limitText(title);
  const ratingDiv = createElementWithClass('div', 'rating');
  const ratingLevel = defineRatingLevel(rating);
  ratingDiv.classList.add(ratingLevel);
  ratingDiv.innerText = rating;
  wrapperDiv.appendChild(titleDiv);
  wrapperDiv.appendChild(ratingDiv);
  return wrapperDiv;
};

const createTvShowCard = tvShow => {
  const cardDiv = createElementWithClass('div', 'card');
  const overviewDiv = createOverviewDiv(tvShow.overview);
  const moreBtn = createMoreBtn();
  const imagePoster = tvShow.poster
    ? createImagePoster(tvShow.poster, tvShow.title)
    : createDefaultPlaceholder();
  const wrapperDiv = createWrapperDiv(tvShow.title, tvShow.rating);
  cardDiv.appendChild(overviewDiv);
  cardDiv.appendChild(moreBtn);
  cardDiv.appendChild(imagePoster);
  cardDiv.appendChild(wrapperDiv);

  return cardDiv;
};

getTVShows()
  .then(tvShows => {
    const cards = tvShows.data.map(createTvShowCard);
    cards.forEach(card => {
      result.append(card);
    });
    hideLoader();
  })
  .catch(error => {
    result.innerHTML = `<p>${error.message}</p>`;
    hideLoader();
  });

form.addEventListener('submit', e => {
  e.preventDefault();
  const query = e.target[0].value;
  showLoader();
  cleanResult();
  getTVShows(query)
    .then(tvShows => {
      const cards = tvShows.data.map(createTvShowCard);
      cards.forEach(card => {
        result.append(card);
      });
      hideLoader();
    })
    .catch(error => {
      hideLoader();
      result.innerHTML = `<p>${error.message}</p>`;
    });
});

const scrollToTop = () => {
  rootElement.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

scrollToTopBtn.addEventListener('click', scrollToTop);

const observerCallback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });
};

const observer = new IntersectionObserver(observerCallback);
observer.observe(footer);
