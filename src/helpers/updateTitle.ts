import ImageItemProps from "../types/ImageItemProps";

const updateTitle = (
  id: ImageItemProps["id"],
  updatedTitle: string,
  imageList: ImageItemProps[]
) => {
  const itemToUpdate = imageList.find((image) => image.id === id);
  if (itemToUpdate) {
    itemToUpdate["title"] = updatedTitle;
  }
  console.log(imageList[id]["title"], updatedTitle);
};

export default updateTitle;
