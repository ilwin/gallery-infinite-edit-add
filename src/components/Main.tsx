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
  const onScrollUploadCount = 10;
  const [offset, setOffset] = useState(0);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [hasMoreScrolling, setHasMoreScrolling] = useState(true);

  useEffect(() => {
    getImages().then((result) => setItems(result));
  }, []);

  useEffect(() => {
    setVisibleItems(
      Object.values(items).slice(offset, offset + onScrollUploadCount)
    );
  }, [items]);

  const handleModalClose = (item: ItemProps) => {
    setItems({
      ...items,
      [item.id]: { ...item },
    });
    setEditItemId(null);
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
          showMenu={setEditItemId}
          fetchMoreData={fetchMoreDataScrolling}
          hasMore={hasMoreScrolling}
        />
      )}
      {editItemId && (
        <EditItemModal
          open={true}
          handleModalClose={handleModalClose}
          item={items[editItemId]}
        />
      )}
    </div>
  );
};

export default Main;
