import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import ItemProps from "../../types/ItemProps";
import Title from "./Title";
import Url from "./Url";
import { isValidPropValue } from "../../helpers";
import { isValid } from "../../helpers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  overflow: "scroll",
  maxWidth: "80%",
  maxHeight: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

interface NewIemModalProps {
  open: boolean;
  addItem: (item: ItemProps) => void;
  onClose: () => void;
  items: ItemProps[];
}

const NewItemModal = ({ open, addItem, onClose, items }: NewIemModalProps) => {
  const [formInput, setFormInput] = useState<ItemProps>({
    id: uuidv4(),
    title: "Look at my eyes",
    url: "https://picsum.photos/id/237/600/600",
  });
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
      addItem(formInput);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
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

        <img src={`${formInput.url}`} width="80%" alt="" />
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
            sx={{ m: 1 }}
            variant="contained"
            color="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewItemModal;
