import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageItemProps from "../types/ImageItemProps";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface GalleryContainerProps {
  images: ImageItemProps[];
}

export default function GalleryContainer({ images }: GalleryContainerProps) {
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
      {images.map((image) => (
        <ImageListItem
          key={image.id}
          sx={{
            width: 150,
            border: "3px solid gray",
            padding: 1,
            margin: 1,
          }}
        >
          <LazyLoadImage src={`${image.thumbnailUrl}`} alt={image.title} />
          <ImageListItemBar
            sx={{
              flex: 1,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
            title={image.title}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
