import React, { useEffect, useState } from "react";
import { AutoComplete, Icon, Input } from "antd";

import ResultsList from "./ResultsList";

import { API_KEY, URLS } from "../utils/constants";

const SearchAutoComplete = () => {
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres();
  }, []);

  const getMovies = (value) => {
    let dataSource = [];
    if (value.length > 0) {
      fetch(`${URLS.searchMovie}?api_key=${API_KEY}&query=${value}`)
        .then((response) => response.json())
        .then((data) => setDataSource(data.results));
    } else {
      setDataSource(dataSource);
    }
  };

  const getGenres = () => {
    fetch(`${URLS.genres}?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setGenres(data.genres));
  };

  const onChange = (value) => {
    getMovies(value);
    setValue(value);
  };

  const dataAutoComplete = () => {
    let movies = [];
    if (dataSource !== undefined && dataSource !== []) {
      return dataSource
        .filter((item) => {
          if (movies.includes(item.title)) return false;
          movies.push(item.title);
          return true;
        })
        .map((opt) => (
          <AutoComplete.Option key={opt.id} value={opt.id.toString()}>
            {opt.title}
          </AutoComplete.Option>
        ));
    }
    return movies;
  };

  return (
    <>
      <AutoComplete
        value={value}
        dataSource={dataAutoComplete()}
        size="large"
        style={{ width: 320 }}
        onChange={onChange}
        filterOption={(inputValue, option) =>
          option.props.children
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
        placeholder="Search movies"
      >
        <Input suffix={<Icon type="search" />} />
      </AutoComplete>
      <div style={{ textAlign: "initial", padding: "0 20%" }}>
        <ResultsList data={dataSource} genres={genres} />
      </div>
    </>
  );
};

export default SearchAutoComplete;
