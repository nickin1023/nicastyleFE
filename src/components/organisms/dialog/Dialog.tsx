import React from "react";
import Modal from "react-modal";
import { Button } from "../../atoms/button/Button";

export const initialDialogArgs: DialogArgs = {
  variant: "icon",
  title: "",
  content: "",
  execButtonLabel: "",
  onClickOk: () => {}
};

export type DialogArgs = {
  variant: "primary" | "simple" | "icon" | null | undefined;
  title: string;
  content: string;
  execButtonLabel: string;
  onClickOk: () => void;
};

type DialogProps = DialogArgs & {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#FFFFFF"
  },
  overlay: {
    background: "#00000099"
  }
};

export const Dialog = (params: DialogProps) => {
  const handleClose = () => {
    params.setIsOpen(false);
  };
  return (
    <Modal isOpen={params.isOpen} style={customStyles}>
      <div>
        <h3 className="text-lg leading-6 font-medium">{params.title}</h3>
        <p className="text-sm">{params.content}</p>
      </div>
      <div className="px-4 py-3 sm:px-6 flex justify-end">
        <Button variant={params.variant} className="m-5" onClick={handleClose}>
          キャンセル
        </Button>
        <Button
          variant={params.variant}
          className="m-5"
          onClick={params.onClickOk}
        >
          {params.execButtonLabel}
        </Button>
      </div>
    </Modal>
  );
};

Dialog.displayName = "Dialog";
