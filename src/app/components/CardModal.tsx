import { Modal } from "@mui/material";
import React from "react";
import CardForm from "./CardForm";

export default function CardModal({
  open,
  handleClose,
  card,
  type,
  create,
  productId,
}) {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="rounded-md max-w-md md:w-full w-[90%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-slate-100 p-4">
          <CardForm
            initialValues={card}
            type={type}
            onClose={handleClose}
            create={create}
            productId={productId}
          />
        </div>
      </Modal>
    </>
  );
}
