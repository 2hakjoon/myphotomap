import firebase from "firebase";
import { getEmail } from "./fireBaseAuth";


let storage =""
let storageRef = ""

export const connectStorage = () => {
    storage = firebase.app().storage("gs://myphotomap-290bb.appspot.com");
    storageRef = storage.ref();
}


export const uploadPhoto = async(file) => {
    const userEmail = getEmail();
    const uploadTask = await storageRef.child(`${userEmail}/${file.name}`).put(file);
}

export const getPhoto = async(filename) => {
    const userEmail = getEmail();
    const getImg = await storageRef.child(`${userEmail}/${filename}`).getDownloadURL();
    return getImg
}