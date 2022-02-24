import React, { useEffect, useMemo, useState } from "react";

import ImageItemProps from "../types/ImageItemProps";
import { getImages } from "../dataService";
import GalleryContainer from "./GalleryContainer";
import EditTitle from "./EditTitle";

const Main = () => {
  const [items, setItems] = useState<Record<number, ImageItemProps>>(
    {} as Record<number, ImageItemProps>
  );
  const [editItemId, setEditItemId] = useState<number | null>(null);

  useEffect(() => {
    getImages().then((result) => setItems(result));
  }, []);

  const handleItemTitleClick = (id: number) => {
    setEditItemId(id);
  };

  const handleModalClose = (title: string) => {
    if (title !== items[editItemId!].title) {
      console.log({
        ...items,
        [editItemId!]: { ...items[editItemId!], title: title },
      });
      setItems({
        ...items,
        [editItemId!]: { ...items[editItemId!], title: title },
      });
    }
    setEditItemId(null);
  };

  const hasItems = useMemo(() => Object.keys(items).length, [items]);

  return (
    <div>
      {hasItems && (
        <GalleryContainer
          items={items}
          handleItemTitleClick={handleItemTitleClick}
        />
      )}
      {editItemId && (
        <EditTitle
          open={true}
          handleModalClose={handleModalClose}
          imageItem={items[editItemId]}
        />
      )}
    </div>
  );
};

export default Main;
