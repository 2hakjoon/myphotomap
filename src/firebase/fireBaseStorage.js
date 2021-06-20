import firebase from "firebase";


let storage =""
let storageRef = ""

export const connectStorage = () => {
    storage = firebase.app().storage("gs://myphotomap-290bb.appspot.com");
    storageRef = storage.ref();
}


export const uploadPhoto = async(file) => {
    const uploadTask1 = await storageRef.child('images/mountains.jpg').put(file);
    console.log(uploadTask1)
    
    const uploadTask2 = await storageRef.child('images/shit.jpg').put(file);
    console.log(uploadTask2)
    
}

export const getPhoto = async(file) => {
    
    const getImg1 = await storageRef.child('images/mountains.jpg').getDownloadURL();
    console.log(getImg1)
    
    const getImg2 = await storageRef.child('images/shit.jpg').getDownloadURL();
    console.log(getImg2)
}