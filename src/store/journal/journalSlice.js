import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSave: '',
    notes: [],
    active: null,
    toggleDrawer: false,
  },
    reducers: {
     savingNewNote: (state) => {
        state.isSaving = true;
     },
     addNewEmptyNote: (state, action) => {
        state.notes.push(action.payload);
        state.isSaving = false;
     },
     setActiveNote: (state, action) => {
        state.active = action.payload;
        state.messageSave = '';
     },
     setNotes: (state, action) => {
         state.notes = action.payload;
     },
     setSaving: (state) => {
         state.isSaving = true;
         state.messageSave = '';
     },
     updateNote: (state, action) => {
         state.isSaving = false;
         
         state.notes = state.notes.map(note => {
            if(note.id === action.payload.id){
               return action.payload;
            }

            return note;
         })

         state.messageSave = `${action.payload.title}, fue actualizada correctamente`;
     },
     setPhotosToActiveNote: (state, action) => {
         state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
         state.isSaving = false;
     },
     clearNotesLogout: (state) => {
         state.isSaving = false;
         state.messageSave = '';
         state.notes = null;
         state.active = null;
     },
     deleteNoteById: (state, action) => {
         state.notes = state.notes.filter( note => note.id != action.payload.id );
         state.active = null;
     },
     openOrCloseDrawer: (state) => {
        state.toggleDrawer = !state.toggleDrawer;
     },
   },
})

export const {  addNewEmptyNote,
                setActiveNote,
                setNotes,
                setSaving,
                updateNote,
                deleteNoteById,
                savingNewNote, 
                setPhotosToActiveNote,
                clearNotesLogout,
                openOrCloseDrawer, } = journalSlice.actions;