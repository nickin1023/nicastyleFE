import React from "react";
import Modal from "react-modal";
import { Button } from "../../atoms/button/Button";

type DialogProps = {
  variant: "primary" | "outline" | "icon" | null | undefined;
  title: string;
  content: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClickOk: () => void;
};

export const Dialog = (params: DialogProps) => {
  const handleClose = () => {
    params.setIsOpen(false);
  };
  return (
    <Modal isOpen={params.isOpen}>
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
          更新
        </Button>
      </div>
    </Modal>
  );
};

Dialog.displayName = "Dialog";
