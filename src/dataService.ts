import ImageItemProps from "./types/ImageItemProps";

export function getImages() {
  return getData("https://jsonplaceholder.typicode.com/photos").then((result) =>
    buildObject(result as ImageItemProps[])
  );
}

function buildObject(imagesFetched: ImageItemProps[]) {
  let images: Record<number, ImageItemProps> = {} as Record<
    number,
    ImageItemProps
  >;
  imagesFetched.forEach((image) =>
    Object.assign(images, { [image.id]: image })
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
