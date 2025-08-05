import React from "react";
import { Modal } from "antd";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
}

const DeleteConfirmModal: React.FC<Props> = ({ open, onClose, onConfirm, name }) => {
  return (
    <Modal
      open={open}
      title="Confirm Delete"
      onOk={onConfirm}
      onCancel={onClose}
      okText="Delete"
      okButtonProps={{ danger: true }}
    >
      <p>Are you sure you want to delete <strong>{name}</strong>?</p>
    </Modal>
  );
};

export default DeleteConfirmModal;
