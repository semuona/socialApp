import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinearScaleIcon from "@mui/icons-material/LinearScale";

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
};

export default function EditPostModal(show) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <LinearScaleIcon />{" "}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={style}
            className="editModalContainer"
            style={{ borderRadius: "15px" }}
          >
            <div
              style={{
                borderBottom: "1px solid black",
                width: "100%",
                cursor: "pointer",
                textAlign: "center",
                padding: "5px 0",
              }}
            >
              Share to...
            </div>
            <div
              style={{
                borderBottom: "1px solid black",
                width: "100%",
                cursor: "pointer",
                textAlign: "center",
                padding: "5px 0",
              }}
            >
              Copy Link
            </div>
            <div
              style={{
                borderBottom: "1px solid black",
                width: "100%",
                cursor: "pointer",
                textAlign: "center",
                padding: "5px 0",
              }}
            >
              Go to Post
            </div>
            <div
              style={{
                borderBottom: "1px solid black",
                width: "100%",
                cursor: "pointer",
                textAlign: "center",
                padding: "5px 0",
                color: "red",
              }}
            >
              Unfollow
            </div>
            <div
              style={{
                borderBottom: "1px solid black",
                width: "100%",
                cursor: "pointer",
                textAlign: "center",
                padding: "5px 0",
                color: "red",
              }}
            >
              Report
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
