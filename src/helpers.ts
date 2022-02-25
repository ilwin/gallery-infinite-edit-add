import ItemProps from "./types/ItemProps";

export function isValidURL(string: string) {
  const res = string.match(
    /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

export function findIndex(item: ItemProps, items: ItemProps[]) {
  return items.findIndex((currItem) => item.id === currItem.id);
}

function isUniquePropValue(
  prop: keyof ItemProps,
  propValue: string,
  items: ItemProps[]
) {
  return (
    items.filter(
      (currItem) =>
        String(propValue).toLowerCase() === String(currItem[prop]).toLowerCase()
    ).length === 0
  );
}

export function isValidPropValue(
  prop: keyof ItemProps,
  propValue: string,
  items: ItemProps[]
) {
  if (!propValue) {
    return false;
  }

  switch (prop) {
    case "title":
      return isUniquePropValue(prop, propValue, items);
    case "url":
      return isValidURL(propValue) && isUniquePropValue(prop, propValue, items);
    default:
      return true;
  }
}

interface ValidationProps {
  title: string;
  url: string;
}

export function isValid(item: ItemProps, fields: string[], items: ItemProps[]) {
  for (let key in item) {
    if (!fields.includes(key)) {
      continue;
    }

    if (
      !isValidPropValue(
        key as keyof ValidationProps,
        item[key as keyof ValidationProps],
        items
      )
    ) {
      return false;
    }
  }
  return true;
}
