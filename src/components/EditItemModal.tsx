import React, { useEffect, useReducer, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ItemProps from "../types/ItemProps";
import { TextField } from "@mui/material";

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

interface EditTitleProps {
  open: boolean;
  updateItem: (item: ItemProps) => void;
  item: ItemProps;
}

function isValidURL(string: string) {
  const res = string.match(
    /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

const EditItemModal = ({ open, item, updateItem }: EditTitleProps) => {
  const [formInput, setFormInput] = useState<ItemProps>(item);
  const handleInput = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ ...formInput, [name]: newValue });
  };

  const onSubmit = () => {
    if (isValidURL(formInput.url) && formInput.title) {
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
        <TextField
          id="standard-title"
          error={!formInput.title}
          name="title"
          label="Title"
          value={formInput.title}
          multiline
          onChange={handleInput}
          variant="standard"
          fullWidth
          margin="normal"
        />
        <TextField
          id="standard-url"
          error={!isValidURL(formInput.url)}
          name="url"
          label="URL"
          value={formInput.url}
          multiline
          variant="standard"
          onChange={handleInput}
          margin="normal"
          fullWidth
        />
        <Box sx={{ display: "flex", justifyContent: "right", mt: 1 }}>
          <Button
            sx={{ m: 1 }}
            disabled={!formInput.title || !isValidURL(formInput.url)}
            onClick={onSubmit}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
          <Button
            sx={{ m: 1 }}
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
