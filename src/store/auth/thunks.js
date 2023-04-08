import { logoutFirebase, registerUserWithEmailAndPassword, signInWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = ( email, password ) => {
    return ( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if( !result.ok ){
            dispatch( logout( result ) );
            return;
        }
        dispatch( login( result ) );
    }
}

export const startRegisterWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch( checkingCredentials() );
        const { ok, photoURL, uid, errorMessage } = await registerUserWithEmailAndPassword({ email, password, displayName });
        if(!ok) return dispatch( logout( { errorMessage } ) );  
        dispatch( login( {displayName, email, photoURL, uid} ) );      
    }
}

export const startSignInWithEmailAndPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage, displayName } = await signInWithEmailPassword({email, password});
        
        if(!ok) return dispatch( logout({ errorMessage }) );
        dispatch( login( {uid, displayName, photoURL, email} ) );
    }
}

export const startLogout = () => {

    return async(dispatch) => {
        await logoutFirebase();
        dispatch( clearNotesLogout() );
        dispatch(logout());
    }
}