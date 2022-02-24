import ItemProps from "../types/ItemProps";

const updateTitle = (
  id: ItemProps["id"],
  updatedTitle: string,
  imageList: ItemProps[]
) => {
  const itemToUpdate = imageList.find((image) => image.id === id);
  if (itemToUpdate) {
    itemToUpdate["title"] = updatedTitle;
  }
  console.log(imageList[id]["title"], updatedTitle);
};

export default updateTitle;
