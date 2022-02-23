import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageItemProps from "../types/ImageItemProps";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Input, styled } from "@mui/material";

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
  return (
    <ImageList
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Object.values(images)
        .slice(0, 2)
        .map((image) => (
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
              {image.title}
            </ImageTitle>
          </ImageListItem>
        ))}
    </ImageList>
  );
}
