import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { ModalType } from '../../interface/modal.type.ts';

const Modal: React.FC<ModalType> = ({
  open,
  handleClose,
  title,
  description,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="success"
          onClick={() => handleClose(false)}
        >
          Нет
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleClose(true)}
          autoFocus
        >
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
