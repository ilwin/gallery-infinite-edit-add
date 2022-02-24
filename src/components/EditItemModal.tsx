import React, { useEffect, useState } from "react";
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
  handleModalClose: (title: string) => void;
  item: ItemProps;
}

const EditItemModal = ({ open, item, handleModalClose }: EditTitleProps) => {
  const [title, setTitle] = useState(item.title);
  useEffect(() => {
    setTitle(item.title);
  }, [item.title]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };
  return (
    <Modal open={open} onClose={() => handleModalClose(title)}>
      <Box sx={style}>
        <TextField
          value={title}
          onChange={handleChange}
          label="Edit Title"
          autoFocus
          multiline
        />
        <Box sx={{ display: "flex", justifyContent: "right", mt: 1 }}>
          <Button
            sx={{ m: 1 }}
            disabled={!title}
            onClick={() => handleModalClose(title)}
            variant={item.title === title ? "outlined" : "contained"}
            color="success"
          >
            Save
          </Button>
          <Button
            sx={{ m: 1 }}
            onClick={() => handleModalClose(item.title)}
            variant="outlined"
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
