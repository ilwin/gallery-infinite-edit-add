import React, { useEffect, useMemo, useState } from "react";

import ItemProps from "../types/ItemProps";
import { getImages } from "../dataService";
import GalleryContainer from "./GalleryContainer";
import EditItemModal from "./Modals/EditItemModal";
import NewItemModal from "./Modals/NewItemModal";
import { findIndex } from "../helpers";

const Main = () => {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [visibleItems, setVisibleItems] = useState<ItemProps[]>([]);
  const onScrollUploadCount = 5;
  const [offset, setOffset] = useState(0);
  const [editItem, setEditItem] = useState<ItemProps | null>(null);
  const [isAddItem, setIsAddItem] = useState(false);
  const [hasMoreScrolling, setHasMoreScrolling] = useState(true);

  useEffect(() => {
    getImages("https://jsonplaceholder.typicode.com/photos").then(
      // (result) => setItems(result as ItemProps[])
      (result) => setItems([] as ItemProps[])
    );
  }, []);

  useEffect(() => {
    setVisibleItems(
      Object.values(items).slice(0, offset + onScrollUploadCount)
    );
  }, [items, offset, onScrollUploadCount]);

  const onClickEdit = (item: ItemProps) => {
    setEditItem(item);
  };

  const updateItem = (item: ItemProps) => {
    const itemIndex = findIndex(item, items);
    items[itemIndex] = item;
    setItems([...items]);
    setEditItem(null);
  };

  const removeItem = (item: ItemProps) => {
    const itemIndex = findIndex(item, items);
    items.splice(itemIndex, 1);
    setItems([...items]);
  };

  const addItem = (item: ItemProps) => {
    setItems([item].concat(items));
  };

  const hasItems = useMemo(() => Object.keys(items).length > 0, [items]);

  const fetchMoreDataScrolling = () => {
    const hasMore =
      visibleItems.length + onScrollUploadCount <= Object.keys(items).length;
    if (!hasMore) {
      setHasMoreScrolling(false);
      return;
    }
    const newOffset = offset + onScrollUploadCount;
    setVisibleItems((visibleItems) =>
      visibleItems.concat(
        Object.values(items).slice(newOffset, newOffset + onScrollUploadCount)
      )
    );
    setOffset(newOffset);
  };

  return (
    <div>
      {hasItems && (
        <GalleryContainer
          items={visibleItems}
          onClickEdit={onClickEdit}
          fetchMoreData={fetchMoreDataScrolling}
          hasMore={hasMoreScrolling}
          removeItem={removeItem}
          onClickAddItem={() => setIsAddItem(true)}
        />
      )}
      {editItem && (
        <EditItemModal
          open={true}
          updateItem={updateItem}
          item={items[findIndex(editItem, items)]}
          items={items}
        />
      )}
      {isAddItem && (
        <NewItemModal
          open={true}
          addItem={addItem}
          onClose={() => setIsAddItem(false)}
          items={items}
        />
      )}
    </div>
  );
};

export default Main;
