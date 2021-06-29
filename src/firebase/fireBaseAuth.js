import firebase from "firebase";

let keepEmail = "";
let provider = "";

export const setEmail = (email) => {
    keepEmail = email;
  }
  
  export const getEmail = () => {
    return keepEmail
  }


export const connectAuth = () => {
    provider = new firebase.auth.GoogleAuthProvider();
}

export const FB_login = (setEmail) => {
    if(!localStorage.getItem("TOKEN")){
        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log(result)
            if(result.credential) {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // ...
                var user = result.user;
                localStorage.setItem('TOKEN', token);
                keepEmail = user.email
                setEmail(keepEmail)
                return keepEmail
            }
            // The signed-in user info.
            
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
        return keepEmail
    }
}