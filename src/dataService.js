export function getImages() {
  return getData(
    "https://jsonplaceholder.typicode.com/photos"
  );
}

function getData(endpoint) {
  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then((res) => {
        resolve(res.json());
      })
      .catch((error) => resolve(error));
  });
}
