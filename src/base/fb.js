import firebase from 'firebase'

const config = {
  apiKey: process.env.kdo_apiKey,
  authDomain: process.env.kdo_authDomain,
  databaseURL: process.env.kdo_databaseURL,
  projectId: process.env.kdo_projectId,
  storageBucket: process.env.kdo_storageBucket,
  messagingSenderId: process.env.kdo_messagingSenderId,
}

firebase.initializeApp(config)
export default firebase
