import React, { useState } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ItemProps from "../types/ItemProps";
import { LazyLoadImage } from "react-lazy-load-image-component";
import InfiniteScroll from "react-infinite-scroll-component";
import { styled } from "@mui/material";

interface GalleryContainerProps {
  items: ItemProps[];
  handleItemTitleClick: (id: number) => void;
  fetchMoreData: () => void;
  hasMore: boolean;
}

const ImageTitle = styled("p")({
  lineHeight: 1,
  overflowWrap: "anywhere",
  fontSize: 15,
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
});

export default function GalleryContainer({
  items,
  handleItemTitleClick,
  fetchMoreData,
  hasMore,
}: GalleryContainerProps) {
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {items.map((image) => (
        <ImageListItem
          key={image.id}
          sx={{
            width: 600,
            border: "3px solid gray",
            padding: 1,
            margin: 1,
          }}
        >
          <LazyLoadImage src={`${image.url}`} />
          <ImageTitle onClick={() => handleItemTitleClick(image.id)}>
            {`${image.id}-${image.title}`}
          </ImageTitle>
        </ImageListItem>
      ))}
    </InfiniteScroll>
  );
}
