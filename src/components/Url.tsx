import React from "react";
import { TextField } from "@mui/material";

interface UrlProps {
  error: boolean;
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Url = ({ error, value, onChange }: UrlProps) => {
  return (
    <TextField
      id="standard-url"
      error={error}
      helperText={
        !error ? "" : "The URL might be empty/incorrect/already exists"
      }
      name="url"
      label="URL"
      value={value}
      multiline
      onChange={onChange}
      variant="standard"
      fullWidth
      margin="normal"
    />
  );
};

export default Url;
