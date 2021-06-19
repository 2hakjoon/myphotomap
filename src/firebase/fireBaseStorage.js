import firebase from "firebase";


let storage =""
let storageRef = ""

export const connectStorage = () => {
    storage = firebase.app().storage("gs://myphotomap-290bb.appspot.com");
    storageRef = storage.ref();
}


export const uploadPhoto = async(file) => {
    const uploadTask = await storageRef.child('images/mountains.jpg').put(file);
    console.log(uploadTask)
}