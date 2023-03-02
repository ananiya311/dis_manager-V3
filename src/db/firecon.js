const  firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyDfQXI5orDCNr6jnpcJTBkoJAs7xF434-Q",
    authDomain: "dis-manager.firebaseapp.com",
    projectId: "dis-manager",
    storageBucket: "dis-manager.appspot.com",
    messagingSenderId: "91977925680",
    appId: "1:91977925680:web:881b87a05f1cbe234859f5",
    measurementId: "G-6VH6WEPYGE"
};
console.log("test");
try {
    firebase.initializeApp(firebaseConfig)
    
    const db = firebase.firestore()
    
} catch (error) {
    console.log(error);
}