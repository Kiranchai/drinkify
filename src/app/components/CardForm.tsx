"use client";
import { Button, TextField } from "@mui/material";
import type { Card, GameType } from "@prisma/client";
import { useFormik } from "formik";
import React from "react";
import { MdSave } from "react-icons/md";
import { loadingToast } from "../utils/toasts";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const CardSchema = Yup.object().shape({
  title: Yup.string(),
  description: Yup.string(),
  truth: Yup.string(),
  dare: Yup.string(),
  forbiddenWords: Yup.string(),
});

export default function CardForm({
  initialValues,
  type,
  onClose,
  create,
  productId,
}: {
  initialValues?: Card;
  type: GameType;
  onClose: () => void;
  create: Boolean;
  productId: string;
}) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      id: initialValues?.id,
      productId: productId,
      title: initialValues?.title,
      description: initialValues?.description,
      truth: initialValues?.truth,
      dare: initialValues?.dare,
      forbiddenWords: initialValues?.forbiddenWords,
    },
    validationSchema: CardSchema,
    onSubmit: async (values) => {
      const res = fetch("/api/admin/card", {
        method: create ? "POST" : "PATCH",
        body: JSON.stringify({ card: values }),
      });
      loadingToast({
        promise: res,
        success: `Pomyślnie ${create ? "utworzono" : "zapisano"} kartę`,
        error: `${create ? "Tworzenie" : "Zapisywanie"} karty nie powiodło się`,
      });

      res.then((e) => router.refresh());
      onClose();
    },
  });

  return (
    <div className="flex flex-col mb-6">
      <h2 className="font-bold text-primary text-xl mb-8">Karta</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        {(type === "NHIE" || type === "TB" || type === "JINX") && (
          <TextField
            id="title"
            name="title"
            label="Tytuł"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        )}

        {type === "NHIE" && (
          <TextField
            id="description"
            name="description"
            label="Opis"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        )}

        {type === "TOD" && (
          <TextField
            id="truth"
            name="truth"
            label="Prawda"
            value={formik.values.truth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.truth && Boolean(formik.errors.truth)}
            helperText={formik.touched.truth && formik.errors.truth}
          />
        )}

        {type === "TOD" && (
          <TextField
            id="dare"
            name="dare"
            label="Wyzwanie"
            value={formik.values.dare}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dare && Boolean(formik.errors.dare)}
            helperText={formik.touched.dare && formik.errors.dare}
          />
        )}

        {type === "TB" && (
          <TextField
            id="forbiddenWords"
            name="forbiddenWords"
            label="Zakazane słowa"
            value={formik.values.forbiddenWords}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.forbiddenWords &&
              Boolean(formik.errors.forbiddenWords)
            }
            helperText={
              formik.touched.forbiddenWords && formik.errors.forbiddenWords
            }
          />
        )}

        <div className="flex flex-col items-center gap-2 md:flex-row">
          <Button
            variant="outlined"
            style={{ backgroundColor: "#148014", color: "white" }}
            type="submit"
            className="flex gap-2 w-full items-center md:w-fit"
          >
            <MdSave className="text-lg" />
            {create ? "Utwórz" : "Zapisz"}
          </Button>

          <Button
            className="text-red-800 w-full md:w-fit"
            onClick={() => {
              formik.resetForm();
              onClose();
            }}
          >
            Odrzuć
          </Button>
        </div>
      </form>
    </div>
  );
}
