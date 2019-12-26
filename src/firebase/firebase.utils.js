import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCJLqfGDfI6z9vgWbxoEq9lfPZ5QXxbzEU",
    authDomain: "ecom-db-9a067.firebaseapp.com",
    databaseURL: "https://ecom-db-9a067.firebaseio.com",
    projectId: "ecom-db-9a067",
    storageBucket: "ecom-db-9a067.appspot.com",
    messagingSenderId: "280736766357",
    appId: "1:280736766357:web:590afd7ca261fb95af3e9c",
    measurementId: "G-Y9KGBDK60F"
};

export const createUserProfileDocument = async(userAuth, addtionalData) => {
    if(!userAuth) {
        return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...addtionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
