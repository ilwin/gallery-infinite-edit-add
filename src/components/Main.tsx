import React, { useEffect, useState } from "react";
import ImageItemProps from "../types/ImageItemProps";
import { getImages } from "../dataService";
import GalleryContainer from "./GalleryContainer";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Main = () => {
  const [images, setImages] = useState<ImageItemProps[]>([]);
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  useEffect(() => {
    getImages().then((result) => setImages(result));
  }, []);
  return (
    <div>
      <GalleryContainer images={images} />
      <Modal open={isTitleEdit}>
        <Box>
          <Button>Save</Button>
          <Button>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Main;
