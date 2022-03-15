import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
        border: "1px solid black",
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
      <div>
        <h5>Please upload your image and add description</h5>
        <TextField
          required
          id="outlined-required"
          label="Username"
          value={valueText}
          onChange={onTextChange}
        />
        <input
          value={valueImage}
          onChange={onChangeFile}
          type="file"
          name="image"
          id="file"
        />
      </div>
      <Button variant="contained" onClick={close}>
        Close
      </Button>
      <Button variant="contained" onClick={save}>
        Save
      </Button>
    </Box>
  );
}
