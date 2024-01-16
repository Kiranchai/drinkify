"use client";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import type { Card, Product } from "@prisma/client";
import * as Yup from "yup";
import { MdSave } from "react-icons/md";
import { loadingToast } from "../utils/toasts";
import YupMessages from "@/app/yupMessages.json";
import { GameType } from "@prisma/client";
import DataTable from "./DataTable";
import CardModal from "./CardModal";
import { useRouter } from "next/navigation";

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ta nazwa jest za krótka!")
    .max(40, "Ta nazwa jest za długa!")
    .required("To pole jest wymagane!"),
  stripeId: Yup.string().required(YupMessages.required),
  price: Yup.string().required(YupMessages.required),
  description: Yup.string().required(YupMessages.required),
  pubName: Yup.string().required(YupMessages.required),
  thumbnail: Yup.string().url(YupMessages.url).required(YupMessages.required),
  type: Yup.string().required(YupMessages.required),
  backgroundImg: Yup.string()
    .url(YupMessages.url)
    .required(YupMessages.required),
  rules: Yup.string().required(YupMessages.required),
  priority: Yup.number().required(YupMessages.required),
});

export default function ProductForm({
  initialValues,
  cards,
  create,
}: {
  initialValues?: Product;
  cards?: Card[];
  create?: Boolean;
}) {
  const [editMode, setEditMode] = useState(create);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      id: initialValues?.id,
      name: initialValues?.name || "",
      stripeId: initialValues?.stripeId || "",
      price: initialValues?.price || "",
      description: initialValues?.description || "",
      pubName: initialValues?.pubName || "",
      thumbnail: initialValues?.thumbnail || "",
      type: initialValues?.type || "",
      backgroundImg: initialValues?.backgroundImg || "",
      rules: initialValues?.rules || "",
      priority: initialValues?.priority || 0,
    },
    validationSchema: ProductSchema,
    onSubmit: async (values) => {
      setEditMode(false);
      const res = fetch("/api/admin/product", {
        method: create ? "POST" : "PATCH",
        body: JSON.stringify({ product: values }),
      });

      loadingToast({
        promise: res,
        success: `Pomyślnie ${create ? "utworzono" : "zapisano"} produkt`,
        error: `${
          create ? "Tworzenie" : "Zapisywanie"
        } produktu nie powiodło się`,
      });

      res.then((e) => router.refresh());
    },
  });

  const [thumbnail, setThumbnail] = useState(formik.values.thumbnail);
  const [thumbnailShown, setThumbnailShown] = useState(
    formik.values.thumbnail.length > 0
  );
  const [backgroundImg, setBackgroundImg] = useState(
    formik.values.backgroundImg
  );
  const [backgroundImgShown, setBackgroundImgShown] = useState(
    formik.values.backgroundImg.length > 0
  );

  const [modalShown, setModalShown] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card>(null);

  const handleModalOpen = (card?) => {
    setModalShown(true);
    if (card) {
      setCurrentCard(card);
    } else {
      setCurrentCard(null);
    }
  };

  const handleModalClose = () => {
    setModalShown(false);
  };

  return (
    <>
      <Paper className="p-4">
        <div className="flex items-center gap-6 mb-6">
          <h2 className="font-bold text-primary text-lg">Produkt</h2>
          {initialValues && !editMode && (
            <Button
              onClick={() => {
                setEditMode(true);
              }}
              variant="outlined"
              style={{
                color: "var(--primary)",
                borderColor: "var(--primary)",
              }}
            >
              Edytuj
            </Button>
          )}
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
          <TextField
            id="name"
            name="name"
            label="Nazwa"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            disabled={!editMode}
          />
          <TextField
            id="stripeId"
            name="stripeId"
            label="Stripe ID"
            value={formik.values.stripeId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.stripeId && Boolean(formik.errors.stripeId)}
            helperText={formik.touched.stripeId && formik.errors.stripeId}
            disabled={!editMode}
          />
          <TextField
            id="price"
            name="price"
            label="Cena"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            disabled={!editMode}
          />
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
            disabled={!editMode}
            multiline
          />
          <TextField
            id="pubName"
            name="pubName"
            label="Segment URL"
            value={formik.values.pubName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pubName && Boolean(formik.errors.pubName)}
            helperText={formik.touched.pubName && formik.errors.pubName}
            disabled={!editMode}
          />
          <TextField
            id="thumbnail"
            name="thumbnail"
            label="Miniatura"
            value={formik.values.thumbnail}
            onChange={formik.handleChange}
            onBlur={(e) => {
              e.preventDefault();
              setThumbnail(e.currentTarget.value);
              setThumbnailShown(true);
              formik.handleBlur(e);
            }}
            error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail)}
            helperText={formik.touched.thumbnail && formik.errors.thumbnail}
            disabled={!editMode}
          />

          {thumbnail.length > 0 &&
            (thumbnailShown ? (
              <div className="flex justify-center items-center">
                <img
                  src={thumbnail}
                  alt="thumbnail"
                  className={`drop-shadow-2xl ${
                    editMode ? "opacity-100" : "opacity-70"
                  }`}
                  width={300}
                  height={300}
                  onError={(e) => {
                    setThumbnailShown(false);
                  }}
                />
              </div>
            ) : (
              <span className="text-red-600 mb-4">
                Nie znaleziono obrazu pod tym URL
              </span>
            ))}

          <FormControl>
            <InputLabel id="type-label">Typ gry</InputLabel>
            <Select
              id="type"
              name="type"
              label="Typ gry"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.type && Boolean(formik.errors.type)}
              // helperText={formik.touched.gameType && formik.errors.gameType}
              disabled={!editMode}
            >
              <MenuItem className="text-primary" value={GameType.NHIE}>
                Alkokarty
              </MenuItem>
              <MenuItem className="text-primary" value={GameType.TOD}>
                Prawda czy wyzwanie
              </MenuItem>
              <MenuItem className="text-primary" value={GameType.TB}>
                Tabu
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="backgroundImg"
            name="backgroundImg"
            label="Tło"
            value={formik.values.backgroundImg}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.backgroundImg &&
              Boolean(formik.errors.backgroundImg)
            }
            helperText={
              formik.touched.backgroundImg && formik.errors.backgroundImg
            }
            disabled={!editMode}
          />

          {backgroundImg.length > 0 &&
            (backgroundImgShown ? (
              <div className="flex justify-center items-center">
                <img
                  src={backgroundImg}
                  alt="thumbnail"
                  className={`drop-shadow-2xl ${
                    editMode ? "opacity-100" : "opacity-70"
                  }`}
                  width={300}
                  height={300}
                  onError={(e) => {
                    setBackgroundImgShown(false);
                  }}
                />
              </div>
            ) : (
              <span className="text-red-600 mb-4">
                Nie znaleziono obrazu pod tym URL
              </span>
            ))}

          <TextField
            id="rules"
            name="rules"
            label="Zasady"
            value={formik.values.rules}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.rules && Boolean(formik.errors.rules)}
            helperText={formik.touched.rules && formik.errors.rules}
            disabled={!editMode}
            multiline
            rows={10}
          />
          <TextField
            id="priority"
            name="priority"
            type="number"
            label="Priorytet"
            value={formik.values.priority}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.priority && Boolean(formik.errors.priority)}
            helperText={formik.touched.priority && formik.errors.priority}
            disabled={!editMode}
          />
          <div>
            {editMode && (
              <div className="flex items-center gap-4">
                <Button
                  variant="outlined"
                  style={{ backgroundColor: "#148014", color: "white" }}
                  type="submit"
                  className="flex gap-2 items-center"
                >
                  <MdSave className="text-lg" />
                  {create ? "Utwórz" : "Zapisz"}
                </Button>
                {!create && (
                  <Button
                    className="text-red-800"
                    onClick={() => {
                      formik.resetForm();
                      setEditMode(false);
                    }}
                  >
                    Odrzuć
                  </Button>
                )}
              </div>
            )}
          </div>
        </form>
      </Paper>
      {!create && (
        <>
          <Paper className="mt-8 p-4">
            <div className="flex flex-col gap-6 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-primary text-lg">Karty</h2>
                <Button
                  variant="contained"
                  className="flex justify-center items-center bg-primary hover:bg-[#7f3d7a]"
                  onClick={() => {
                    handleModalOpen();
                  }}
                >
                  Dodaj
                </Button>
              </div>

              <div className="shadow-lg">
                {initialValues.type === "NHIE" && (
                  <DataTable
                    columns={["Tytuł", "Opis", "ID"]}
                    onRowClick={(card) => {
                      handleModalOpen(card);
                    }}
                    data={cards.map((card) => {
                      return {
                        title: card.title,
                        description: card.description,
                        id: card.id,
                      };
                    })}
                  />
                )}

                {initialValues.type === "TOD" && (
                  <DataTable
                    columns={["Prawda", "Wyzwanie", "ID"]}
                    onRowClick={(card) => {
                      handleModalOpen(card);
                    }}
                    data={cards.map((card) => {
                      return {
                        truth: card.truth,
                        dare: card.dare,
                        id: card.id,
                      };
                    })}
                  />
                )}

                {initialValues.type === "TB" && (
                  <DataTable
                    columns={["Słowo klucz", "Zakazane", "ID"]}
                    onRowClick={(card) => {
                      handleModalOpen(card);
                    }}
                    data={cards.map((card) => {
                      return {
                        title: card.title,
                        forbiddenWords: card.forbiddenWords,
                        id: card.id,
                      };
                    })}
                  />
                )}
              </div>
            </div>
          </Paper>
          <CardModal
            open={modalShown}
            handleClose={handleModalClose}
            card={currentCard}
            type={initialValues.type}
            create={currentCard === null}
            productId={initialValues.id}
          />
        </>
      )}
    </>
  );
}
