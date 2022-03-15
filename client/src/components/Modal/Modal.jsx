import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});
export default function Modal({
  save,
  close,
  valueText,
  onTextChange,
  onChangeFile,
  valueImage,
}) {
  return (
    <Box
      style={{
        position: "fixed",
        padding: "10px",
        backgroundColor: "whitesmoke",
        borderRadius: "5px",
        border: "3px solid grey",
        width: "300px",
        height: "300px",
        top: "calc(100vh/2 - 150px)",
        left: "calc(100vw/2 - 150px)",
        display: "grid",
        placeContent: "center",
      }}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack direction="column" alignItems="center" spacing={2}>
        {" "}
        <h4 style={{ textAlign: "center" }}>
          Please upload your image and add description*
        </h4>
        <label htmlFor="file" style={{ cursor: "pointer" }}>
          <Input
            value={valueImage}
            onChange={onChangeFile}
            type="file"
            name="image"
            id="file"
            accept="image/*"
          />
          <Button
            variant="contained"
            component="span"
            style={{ margin: "10px" }}
          >
            Upload <PhotoCameraIcon />
          </Button>
        </label>
        <TextField
          style={{ width: "95%" }}
          required
          id="outlined-required"
          label="Description"
          value={valueText}
          onChange={onTextChange}
        />
        {/*  <input
          value={valueImage}
          onChange={onChangeFile}
          type="file"
          name="image"
          id="file"
        /> */}
      </Stack>

      <div>
        {" "}
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={close}
          style={{ width: "50%" }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          onClick={save}
          endIcon={<SendIcon />}
          style={{ width: "50%" }}
        >
          Save
        </Button>
      </div>
    </Box>
  );
}
