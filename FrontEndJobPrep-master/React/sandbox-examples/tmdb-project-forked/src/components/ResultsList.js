import React from "react";
import { List, Tag } from "antd";

import IconText from "./IconText";

import { URLS } from "../utils/constants";

const colors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple"
];

const ResultsList = ({ data, genres }) => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{ pageSize: 5 }}
    dataSource={data}
    renderItem={movie => {
      return (
        <List.Item
          key={movie.id}
          actions={[
            <IconText
              type="star-o"
              text={movie.vote_average}
              key="list-vertical-star-o"
            />,
            <IconText
              type="like-o"
              text={movie.vote_count}
              key="list-vertical-like-o"
            />,
            <IconText type="message" text="2" key="list-vertical-message" />
          ]}
          extra={
            <img
              width={180}
              alt="cover"
              src={
                movie.poster_path
                  ? `${URLS.image}/w500${movie.poster_path}`
                  : URLS.placeholder
              }
            />
          }
        >
          <List.Item.Meta
            title={<a href={movie.href}>{movie.title}</a>}
            description={
              movie.release_date
                ? movie.release_date.substring(0, 4)
                : "No date"
            }
          />
          {movie.overview}
          <br />
          <br />
          <div>
            {movie.genre_ids.map(genre_id => (
              <Tag color={colors[genre_id % 11]}>
                {genres.find(genre => genre.id === genre_id).name}
              </Tag>
            ))}
          </div>
        </List.Item>
      );
    }}
  />
);

export default ResultsList;
