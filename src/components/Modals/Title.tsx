import React from "react";
import { TextField } from "@mui/material";

interface TitleProps {
  error: boolean;
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Title = ({ error, value, onChange }: TitleProps) => {
  return (
    <TextField
      id="standard-title"
      error={error}
      helperText={!error ? "" : "The title might be empty or already exists"}
      name="title"
      label="Title"
      value={value}
      multiline
      onChange={onChange}
      variant="standard"
      fullWidth
      margin="normal"
    />
  );
};

export default Title;
