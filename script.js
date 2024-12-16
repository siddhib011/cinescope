const API_KEY = '41a6db9dcbcdafdd6a5007aa8cc9505d';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchMovies(genre) {
  showMoviesPage(); // Switch to movies page

  const genreMap = {
    action: 28,
    comedy: 35,
    drama: 18,
    horror: 27,
    romance: 10749,
  };

  const genreId = genreMap[genre];
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

async function fetchOscarWinningMovies() {
  showMoviesPage(); // Switch to movies page

  // You can filter Oscar-winning movies by checking for award data or manually by known lists.
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_keywords=1029`; // "Oscar Winner" keyword

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Error fetching Oscar-winning movies:', error);
  }
}

async function fetchNostalgicMovies() {
  showMoviesPage(); // Switch to movies page

  // For nostalgic movies, you can filter movies from a specific year or era.
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=1990`; // Example: movies from 1990s

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Error fetching nostalgic movies:', error);
  }
}

async function fetch2024Hits() {
  showMoviesPage(); // Switch to movies page

  // Fetch movies released in 2024
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=2024`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Error fetching 2024 hits:', error);
  }
}

async function searchMovies(event) {
  if (event && event.type === "keyup" && event.key !== "Enter") return;

  const query = document.getElementById('search-input').value.trim();
  if (!query) return;

  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
    showMoviesPage();
  } catch (error) {
    console.error('Error searching movies:', error);
  }
}

function displayMovies(movies) {
  const container = document.getElementById('movies-container');
  container.innerHTML = '';

  if (movies.length === 0) {
    container.innerHTML = '<p style="text-align: center;">No movies found.</p>';
    return;
  }

  movies.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    movieElement.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;

    container.appendChild(movieElement);
  });
}

function displayFeaturedMovies(movies) {
  const container = document.getElementById('featured-movies-container');
  container.innerHTML = '';

  movies.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    movieElement.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;

    container.appendChild(movieElement);
  });
}

function showHomePage() {
  document.getElementById('home-page').classList.add('active');
  document.getElementById('home-page').classList.remove('hidden');

  document.getElementById('movies-container').classList.add('hidden');
  document.getElementById('movies-container').classList.remove('active');
}

function showMoviesPage() {
  document.getElementById('movies-container').classList.add('active');
  document.getElementById('movies-container').classList.remove('hidden');

  document.getElementById('home-page').classList.add('hidden');
  document.getElementById('home-page').classList.remove('active');
}

console.error('Error fetching movies:', error.message);


// Fetch featured movies on load
fetchFeaturedMovies();

