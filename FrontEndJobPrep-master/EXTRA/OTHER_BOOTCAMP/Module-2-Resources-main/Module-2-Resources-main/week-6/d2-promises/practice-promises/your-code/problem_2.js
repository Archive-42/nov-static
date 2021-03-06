const fetch = require("node-fetch");

// 1. Go to the following url: http://www.omdbapi.com/apikey.aspx
// and sign up for an api key! You should receive a confirmation email
// containing your very own api key!

// 2. set the variable `apiKey` to your new api key
let apiKey = "afab3d6d";

// 3. create a function called `fetchMovie` that accepts a movie title as an
// argument and uses fetch to retrieve the specified movie information
// from the omdb api
// - the request url for retrieving harry potter movie information is as follows:
//   => `http://www.omdbapi.com/?apikey=${apiKey}&t=harry+potter`
// - parse the string argument into the format the api is expecting so that we can
//   interpolate it into our request url
// 	 => 'harry potter' should be 'harry+potter' in the url
// - make a fetch to the following url where `parsedMovie` is the string
//   parameter you transformed above:
//   => `http://www.omdbapi.com/?apikey=${apiKey}&t=${parsedMovie}`
// - chain a `.then` onto the fetch call
// - inside that `.then`, call the .json method on the response object that the
//   call to fetch fulfills with to turn it into a more readable json object
// - the json object returned from the previous `.then` will look something like:

//				 { Title: 'Harry Potter and the Deathly Hallows: Part 2',
//				   Year: '2011',
//				   Rated: 'PG-13',
//				   Released: '15 Jul 2011',
//				   Runtime: '130 min',
//				   Genre: 'Adventure, Drama, Fantasy, Mystery',
//				   Director: 'David Yates',
//				   Response: 'True' }

// - chain another `.then` and pass the json object returned from the previous
//   `.then` to the parseMovie function we will write below

function fetchMovie(movie) {}

// 4. create a function called `parseMovie` that accepts a json movie object
// as an argument and console.logs the title, director and year
// - extract the Title, Director, and Year values from that movie object
// - console.log the following string, where "title", "director" and "year"
//   are the properties you extracted from the movie object:
//   => `${title} was directed by ${director} and released in ${year}`

function parseMovie(movie) {}

// TESTING:
// - run your file (`node problem_2.js`) and ensure the output matches
//   the output below

fetchMovie("harry potter");
// Zoolander was directed by Ben Stiller and released in 2001

fetchMovie("zoolander");
// Mean Girls was directed by Mark Waters and released in 2004

fetchMovie("mean girls");
// Harry Potter and the Deathly Hallows: Part 2 was directed by David Yates and released in 2011
