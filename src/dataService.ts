import ItemProps from "./types/ItemProps";

export function getImages() {
  return getData("https://jsonplaceholder.typicode.com/photos");
  // .then((result) => buildObject(result as ItemProps[])
  // );
}

function buildObject(imagesFetched: ItemProps[]) {
  let images: Record<number, ItemProps> = {} as Record<number, ItemProps>;
  imagesFetched.forEach((image) =>
    Object.assign(images, {
      [String(image.id)]: { ...image, id: String(image.id) },
    })
  );
  return images;
}

function getData(endpoint: string) {
  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then((res) => {
        resolve(res.json());
      })
      .catch((error) => resolve(error));
  });
}
