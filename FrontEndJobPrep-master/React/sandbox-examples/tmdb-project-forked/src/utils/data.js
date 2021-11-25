export const menuItems = [
  {
    key: "1",
    path: "/",
    icon: "home",
    text: "Home",
  },
  {
    key: "2",
    path: "/collections",
    icon: "appstore",
    text: "Collections",
  },
  {
    key: "3",
    path: "/search",
    icon: "search",
    text: "Search",
  },
];

const genres = [
  {
    key: 28,
    name: "Action",
    queryParams: { withGenres: "28" },
  },
  {
    key: 12,
    name: "Adventure",
    queryParams: { withGenres: "12" },
  },
  {
    key: 16,
    name: "Animation",
    queryParams: { withGenres: "16" },
  },
  {
    key: 35,
    name: "Comedy",
    queryParams: { withGenres: "35" },
  },
  {
    key: 18,
    name: "Drama",
    query_params: { withGenres: "18" },
  },
  {
    key: 27,
    name: "Horror",
    queryParams: { withGenres: "27" },
  },
];

const durations = [
  {
    key: "lte15",
    name: "Less than 15 min",
    queryParams: { "with_runtime.lte": 15 },
  },
  {
    key: "gte15lte45",
    name: "Between 15 and 45 min",
    queryParams: { "with_runtime.gte": 15, "with_runtime.lte": 45 },
  },
  {
    key: "gte45lte105",
    name: "Between 45 and 105 min",
    queryParams: { "with_runtime.gte": 45, "with_runtime.lte": 105 },
  },
  {
    key: "gte105",
    name: "More than 105 min",
    queryParams: { "with_runtime.gte": 105 },
  },
];

const trends = [
  {
    key: "punctuation",
    name: "Punctuation",
    queryParams: { sortBy: "vote_average.desc" },
  },
  {
    key: "popularity",
    name: "Popularity",
    queryParams: { sortBy: "popularity.desc" },
  },
  {
    key: "new",
    name: "New",
    queryParams: { sortBy: "release_date.desc" },
  },
];

export const subMenuItems = [
  {
    key: "genres",
    name: "Genres",
    icon: "experiment",
    data: genres,
  },
  {
    key: "durations",
    name: "Durations",
    icon: "clock-circle",
    data: durations,
  },
  {
    key: "trends",
    name: "Trends",
    icon: "fund",
    data: trends,
  },
];

export const collections = [
  {
    id: "colBest2019",
    title: "Best of 2019",
    queryString: {
      releaseDate: 2019,
      sortBy: "vote_average",
    },
  },
  {
    id: "colBestDecade",
    title: "Best films of the decade",
    queryString: {
      releaseDateGte: 2010,
      releaseDateLte: 2019,
      sortBy: "vote_average",
    },
  },
  {
    id: "colBestFrench",
    title: "Best french films of 2019",
    queryString: {
      withOriginalLanguage: "fr",
      releaseDate: 2019,
      sortBy: "vote_average",
    },
  },
  {
    id: "colBestHorror",
    title: "Best Horror Films",
    queryString: {
      withGenres: "27",
      sortBy: "vote_average",
    },
  },
  {
    id: "colBestScifi",
    title: "The best Sci-fi films",
    queryString: {
      withGenres: "878",
      sortBy: "vote_average",
    },
  },
  {
    id: "colBiggestBoxOfficeFlops",
    title: "Biggest Box Office Flops",
    queryString: {
      sortBy: "revenue.desc",
    },
  },
  {
    id: "colLargestGrossing",
    title: "Largest grossing films of 2019",
    queryString: {
      sortBy: "revenue.asc",
    },
  },
  {
    id: "colMostPopularOnes",
    title: "The Most Popular Ones",
    queryString: {
      sortBy: "popularity",
    },
  },
];
