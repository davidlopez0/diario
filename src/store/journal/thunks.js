import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById} from './';
import { fileUpload, loadNotes } from '../../helpers/';

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch( savingNewNote() );

        const { uid } = getState().auth;


        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
        }

        const newDoc = doc( collection(FirebaseDB, `users/${ uid }/notes`) );
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );


    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
        const notes = await loadNotes(uid);
        dispatch( setNotes( notes ) );
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active } = getState().journal;

        const noteToFirestore = {...active};

        delete noteToFirestore.id;

        const docRef = doc( FirebaseDB, `users/${ uid }/notes/${active.id}` );
        await setDoc(docRef, noteToFirestore, { merge: true });

        dispatch( updateNote( { ...noteToFirestore, id: active.id, } ) );
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async (dispatch) => {
        dispatch( setSaving() );
        
        const fileUploadPromises = [];

        for (const file of files) {
             fileUploadPromises.push( fileUpload(file) );   
        }

        const photosUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote(photosUrls) );

    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;
        const { active } = getState().journal;
        const docRef = doc( FirebaseDB, `users/${uid}/notes/${active.id}` );
        await deleteDoc( docRef );
        dispatch( deleteNoteById( {id: active.id} ) );
    }
}