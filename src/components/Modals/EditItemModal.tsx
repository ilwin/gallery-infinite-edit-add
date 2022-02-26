import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

import ItemProps from "../../types/ItemProps";
import { isValidPropValue } from "../../helpers";
import { isValid } from "../../helpers";
import Title from "./Title";
import Url from "./Url";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

interface EditItemModalProps {
  open: boolean;
  updateItem: (item: ItemProps) => void;
  item: ItemProps;
  items: ItemProps[];
}

const EditItemModal = ({
  open,
  item,
  updateItem,
  items,
}: EditItemModalProps) => {
  const [formInput, setFormInput] = useState<ItemProps>(item);
  const handleInput = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ ...formInput, [name]: newValue });
  };

  const isValidTitle =
    !!formInput.title &&
    isValidPropValue(formInput.id, "title", formInput.title, items);
  const isValidURL = isValidPropValue(
    formInput.id,
    "url",
    formInput.url,
    items
  );
  const isValidFormFields = isValid(formInput, ["title", "url"], items);

  const onSubmit = () => {
    if (isValidFormFields) {
      updateItem(formInput);
    } else {
      updateItem(item);
    }
  };

  return (
    <Modal open={open} onClose={() => updateItem(item)}>
      <Box component="form" sx={style}>
        <TextField
          disabled
          name="id"
          id="standard-disabled"
          label="ID"
          defaultValue={formInput.id}
          variant="standard"
          margin="normal"
        />
        <Title
          error={!isValidTitle}
          value={formInput.title}
          onChange={handleInput}
        />
        <Url error={!isValidURL} value={formInput.url} onChange={handleInput} />
        <Box sx={{ display: "flex", justifyContent: "right", mt: 1 }}>
          <Button
            sx={{ m: 1 }}
            disabled={!isValid(formInput, ["title", "url"], items)}
            onClick={onSubmit}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
          <Button
            sx={{ m: 1, textTransform: "none" }}
            onClick={() => updateItem(item)}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditItemModal;
