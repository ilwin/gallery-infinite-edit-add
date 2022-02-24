import React, { useState } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageItemProps from "../types/ImageItemProps";
import { LazyLoadImage } from "react-lazy-load-image-component";
import InfiniteScroll from "react-infinite-scroll-component";
import { styled } from "@mui/material";

interface GalleryContainerProps {
  images: Record<number, ImageItemProps>;
  handleItemTitleClick: (id: number) => void;
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
  images,
  handleItemTitleClick,
}: GalleryContainerProps) {
  const imgList = Object.values(images);
  const portionSize = 10;
  const [offset, setOffset] = useState(0);
  const [imgListPortions, setImgListPortions] = useState<ImageItemProps[]>(
    imgList.slice(offset, offset + portionSize)
  );
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (imgListPortions.length + portionSize >= imgList.length) {
      setHasMore(false);
      return;
    }
    const newOffset = offset + portionSize;
    setImgListPortions((prevState) =>
      prevState.concat(imgList.slice(newOffset, newOffset + portionSize))
    );
    setOffset(newOffset);
  };
  return (
    <InfiniteScroll
      dataLength={imgListPortions.length}
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
      {imgListPortions.map((image) => (
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
