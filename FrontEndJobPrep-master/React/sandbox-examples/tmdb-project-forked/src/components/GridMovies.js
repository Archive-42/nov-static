import React, { useEffect, useRef, useState } from "react";
import { Button, Card, List, Typography } from "antd";

import MovieModal from "./MovieModal";

import { API_KEY, URLS } from "../utils/constants";

const { Meta } = Card;
const { Title } = Typography;

const GridMovies = ({ title, url }) => {
  const [movies, setMovies] = useState([]);
  const [modalShown, setModalShown] = useState(false);
  const [modalMovieId, setModalMovieId] = useState(-1);
  const [modalMovie, setModalMovie] = useState({});

  const isFirstRun = useRef(true);

  const loadMovies = () => {
    fetch(`${url}&api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  };

  useEffect(() => {
    loadMovies();
  }, [url]);

  const loadMovie = () => {
    fetch(`${URLS.movie}/${modalMovieId}?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((movie) => setModalMovie(movie));
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    loadMovie();
  }, [modalMovieId]);

  const showModal = (movieId) => {
    setModalMovieId(movieId);
    setModalShown(true);
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "2rem",
        minHeight: "calc(100vh - 64px - 53px - 69px)",
      }}
    >
      {title ? <Title level={2}>Movies</Title> : ""}
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 8,
        }}
        dataSource={movies}
        renderItem={(movie) => (
          <List.Item>
            <Card
              cover={
                <img
                  alt="Movie poster"
                  src={`${URLS.image}/w500${movie.poster_path}`}
                />
              }
            >
              <Meta
                title={
                  <Button
                    type="link"
                    onClick={() => showModal(movie.id)}
                    style={{ padding: 0 }}
                  >
                    {movie.title}
                  </Button>
                }
                description={
                  movie.release_date ? movie.release_date.substring(0, 4) : ""
                }
              />
            </Card>
          </List.Item>
        )}
      />
      <MovieModal
        movie={modalMovie}
        modalShown={modalShown}
        setModalShown={setModalShown}
      />
    </div>
  );
};

export default GridMovies;
