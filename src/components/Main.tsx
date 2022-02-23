import React, { useEffect, useState } from "react";

import ImageItemProps from "../types/ImageItemProps";
import { getImages } from "../dataService";
import GalleryContainer from "./GalleryContainer";
import EditTitle from "./EditTitle";

const Main = () => {
  const [images, setImages] = useState<Record<number, ImageItemProps>>(
    {} as Record<number, ImageItemProps>
  );
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [editedImage, setEditedImage] = useState<ImageItemProps>(
    {} as ImageItemProps
  );
  useEffect(() => {
    getImages().then((result) => setImages(result));
  }, []);

  const handleItemTitleClick = (id: number) => {
    setIsTitleEdit(true);
    setEditedImage(images[id]);
  };

  const handleModalClose = (title: string) => {
    if (title !== editedImage.title) {
      setImages({
        ...images,
        [editedImage.id]: { ...editedImage, title: title },
      });
    }
    setIsTitleEdit(false);
  };

  return (
    <div>
      <GalleryContainer
        images={images}
        handleItemTitleClick={handleItemTitleClick}
      />
      {editedImage && (
        <EditTitle
          isTitleEdit={isTitleEdit}
          handleModalClose={handleModalClose}
          editedImage={editedImage}
        />
      )}
    </div>
  );
};

export default Main;
