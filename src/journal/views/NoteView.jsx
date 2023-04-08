import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Grid, Typography, Button, TextField, IconButton } from "@mui/material";
import { ImageGallery } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../hooks";
import { useEffect } from "react";
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store/journal";
import { useRef } from "react";

export const NoteView = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.journal);

  const { title, body, onInputChange, formState } = useForm(active);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  const fileInputRef = useRef();

  const onFileInputChange = ({ target }) => {
    const { files } = target;
    if (target.files === 0) return;
    dispatch(startUploadingFiles(files));
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {new Date(active.date).toLocaleDateString()}
        </Typography>
      </Grid>

      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={onFileInputChange}
        style={{ display: "none" }}
      />

      <Grid item>
        <IconButton onClick={() => fileInputRef.current.click()}>
          <UploadOutlined />
        </IconButton>

        <Button color="primary" sx={{ padding: 2 }} onClick={onSaveNote}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          placeholder="Ingrese un titulo"
          fullWidth
          label="Título"
          sx={{ border: "none", mb: 1 }}
          value={title}
          onChange={onInputChange}
          name="title"
        />

        <TextField
          type="text"
          variant="filled"
          placeholder="¿Qué sucedió hoy?"
          multiline
          fullWidth
          minRows={5}
          value={body}
          onChange={onInputChange}
          name="body"
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      <ImageGallery images={active.imageUrls} />
    </Grid>
  );
};
