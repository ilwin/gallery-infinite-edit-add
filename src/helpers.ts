import ItemProps from "./types/ItemProps";

export function isValidURL(string: string) {
  const res = string.match(
    /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

export function findIndex(itemToFind: ItemProps, items: ItemProps[]) {
  return items.findIndex((item) => itemToFind.id === item.id);
}
