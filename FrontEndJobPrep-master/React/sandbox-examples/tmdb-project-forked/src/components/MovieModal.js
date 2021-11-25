import React from "react";
import { Descriptions, Modal, PageHeader, Rate, Row, Statistic } from "antd";

import IconText from "./IconText";

import { URLS } from "../utils/constants";

const MovieModal = ({ setModalShown, movie, modalShown }) => (
  <Modal
    centered
    width={1024}
    height={512}
    visible={modalShown}
    onCancel={() => setModalShown(false)}
    footer={null}
    style={
      movie.backdrop_path
        ? {
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${URLS.image}/original${movie.backdrop_path})`,
          }
        : {}
    }
  >
    <PageHeader
      style={{ padding: 0 }}
      title={movie.title}
      subTitle={movie.release_date}
    />

    <Descriptions size="small" column={3}>
      {movie.original_language ? (
        <Descriptions.Item label="Origin country">
          {movie.original_language.toUpperCase()}
        </Descriptions.Item>
      ) : (
        ""
      )}
      <Descriptions.Item label="Runtime">{movie.runtime} min</Descriptions.Item>
    </Descriptions>

    <Row type="flex">
      <Statistic
        title="Budget"
        prefix={movie.budget ? "$" : null}
        value={movie.budget || "Unknown"}
      />
      <Statistic
        title="Revenue"
        prefix={movie.revenue ? "$" : null}
        value={movie.revenue || "Unknown"}
        style={{
          margin: "0 32px",
        }}
      />
    </Row>

    <Rate allowHalf disabled value={movie.vote_average / 2} />
    <p>{movie.overview}</p>
    <IconText
      type="like-o"
      text={movie.vote_count}
      key="list-vertical-like-o"
    />
    <IconText
      type="message"
      text="2"
      key="list-vertical-message"
      style={{ marginLeft: "1rem" }}
    />
  </Modal>
);

export default MovieModal;
