import React, { useEffect, useState } from "react";
import ImageItemProps from "../types/ImageItemProps";
import { getImages } from "../dataService";

const Main = () => {
  const [images, setImages] = useState<ImageItemProps[]>([]);
  useEffect(() => {
    getImages().then((result) => setImages(result));
  }, []);
  return (
    <div>
      {images.map((image) => (
        <div>{JSON.stringify(image)}</div>
      ))}
    </div>
  );
};

export default Main;
