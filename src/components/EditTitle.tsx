import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ImageItemProps from "../types/ImageItemProps";
import { Input, TextField } from "@mui/material";

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
  isTitleEdit: boolean;
  handleModalClose: (title: string) => void;
  editedImage: ImageItemProps;
}

const EditTitle = ({
  isTitleEdit,
  editedImage,
  handleModalClose,
}: EditTitleProps) => {
  const [title, setTitle] = useState(editedImage.title);
  useEffect(() => {
    setTitle(editedImage.title);
  }, [editedImage.title]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };
  return (
    <Modal open={isTitleEdit} onClose={() => handleModalClose(title)}>
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
            variant={editedImage.title === title ? "outlined" : "contained"}
            color="success"
          >
            Save
          </Button>
          <Button
            sx={{ m: 1 }}
            onClick={() => handleModalClose(editedImage.title)}
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

export default EditTitle;