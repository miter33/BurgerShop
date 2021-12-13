import Rebase from "re-base";
import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';


export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCGY5yu0S-3SvuT_UU9si7FSSxlj_i24lw",
    authDomain: "burgershop-40077.firebaseapp.com",
    databaseURL: "https://burgershop-40077-default-rtdb.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database());
export default base;