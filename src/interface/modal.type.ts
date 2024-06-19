export type ModalType = {
  open: boolean;
  title: string;
  description: string;
  handleClose: (agree: boolean) => void;
};
