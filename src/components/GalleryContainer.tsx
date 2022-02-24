import React, { useState } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ItemProps from "../types/ItemProps";
import { LazyLoadImage } from "react-lazy-load-image-component";
import InfiniteScroll from "react-infinite-scroll-component";
import { styled, Tooltip } from "@mui/material";

interface GalleryContainerProps {
  items: ItemProps[];
  handleItemTitleClick: (id: number) => void;
  fetchMoreData: () => void;
  hasMore: boolean;
  imgWidth?: number;
  imgHeight?: number;
}

const ImageTitle = styled("p")({
  lineHeight: 1,
  overflowWrap: "anywhere",
  fontSize: 20,
  fontFamily: "fantasy",
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
  imgWidth = 600,
  imgHeight = 600,
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
        <Tooltip title="Add" enterDelay={500} leaveDelay={200}>
          <ImageListItem
            key={image.id}
            sx={{
              width: 600,
              border: "3px solid gray",
              padding: 1,
              margin: 1,
            }}
          >
            <LazyLoadImage
              src={`${image.url}`}
              width={imgWidth}
              height={imgHeight}
            />
            <ImageTitle onClick={() => handleItemTitleClick(image.id)}>
              {image.title}
            </ImageTitle>
          </ImageListItem>
        </Tooltip>
      ))}
    </InfiniteScroll>
  );
}
