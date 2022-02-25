import React, { useEffect, useMemo, useState } from "react";

import ItemProps from "../types/ItemProps";
import { getImages } from "../dataService";
import GalleryContainer from "./GalleryContainer";
import EditItemModal from "./EditItemModal";

const Main = () => {
  const [items, setItems] = useState<Record<number, ItemProps>>(
    {} as Record<number, ItemProps>
  );
  const [visibleItems, setVisibleItems] = useState<ItemProps[]>([]);
  const onScrollUploadCount = 5;
  const [offset, setOffset] = useState(0);
  const [editItem, setEditItem] = useState<ItemProps | null>(null);
  const [hasMoreScrolling, setHasMoreScrolling] = useState(true);

  useEffect(() => {
    getImages().then((result) => setItems(result));
  }, []);

  useEffect(() => {
    setVisibleItems(
      Object.values(items).slice(0, offset + onScrollUploadCount)
    );
  }, [items]);

  const onClickEdit = (item: ItemProps) => {
    setEditItem(item);
  };

  const updateItem = (item: ItemProps) => {
    setItems({
      ...items,
      [item.id]: { ...item },
    });
    setEditItem(null);
  };

  const removeItem = (itemToRemove: ItemProps) => {
    delete items[itemToRemove.id];
    setItems({ ...items });
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
        />
      )}
      {editItem && (
        <EditItemModal
          open={true}
          updateItem={updateItem}
          item={items[editItem.id]}
        />
      )}
    </div>
  );
};

export default Main;
