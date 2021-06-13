import firebase from "firebase";

let provider = "";

export const connectAuth = () => {
    provider = new firebase.auth.GoogleAuthProvider();
}

export const FB_login = () => {
    if(!localStorage.getItem("TOKEN")){
        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log(result)
            if(result.credential) {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // ...
            }
            // The signed-in user info.
            var user = result.user;
            localStorage.setItem('TOKEN', token);
            
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
    else{
        console.log(localStorage.getItem("TOKEN"))
    }
}