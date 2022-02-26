export function getImages(endpoint: string) {
  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then((res) => {
        resolve(res.json());
      })
      .catch((error) => resolve(error));
  });
}
