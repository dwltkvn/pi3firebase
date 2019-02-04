import React from 'react'
import { Link } from 'gatsby'
import { withPrefix } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import fb from '../base/fb'

function registerSW()
{
  console.log("register service worker ->");
  if ('serviceWorker' in navigator) {
    console.log("serviceWorker  navigator");
    
      navigator.serviceWorker.register(withPrefix('/sw.js')).then(function(registration) {
        // Registration was successful
        console.log('S registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
  
  }else{
    console.log("serviceWorker not in navigator");
  }
}
function notifyMe() {
  console.log("notifyMe?");
  // Voyons si le navigateur supporte les notifications
  if (!("Notification" in window)) {
    console.log("notifyMe?1");
    alert("Ce navigateur ne supporte pas les notifications desktop");
  }

  // Voyons si l'utilisateur est OK pour recevoir des notifications
  else if (Notification.permission === "granted") {
    // Si c'est ok, créons une notification
    console.log("notifyMe?2");
    //var notification = new Notification("Salut toi !");
    navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          //icon: '../images/touch/chrome-touch-icon-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
      });
  }

  // Sinon, nous avons besoin de la permission de l'utilisateur
  // Note : Chrome n'implémente pas la propriété statique permission
  // Donc, nous devons vérifier s'il n'y a pas 'denied' à la place de 'default'
  else if (Notification.permission !== 'denied') {
    console.log("notifyMe?3");
    Notification.requestPermission(function (permission) {

      // Quelque soit la réponse de l'utilisateur, nous nous assurons de stocker cette information
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }

      // Si l'utilisateur est OK, on crée une notification
      if (permission === "granted") {
        //var notification = new Notification("Salut toi !");
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: '../images/touch/chrome-touch-icon-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
      });
      }
    });
  }

  // Comme ça, si l'utlisateur a refusé toute notification, et que vous respectez ce choix,
  // il n'y a pas besoin de l'ennuyer à nouveau.
}

function setLoginObserver()
{
  fb.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    console.log("signed in");
    console.log(user);
    // ...
  } else {
    console.log("signed out");
  }
});
}

function testSignIn()
{
  fb.auth().signInWithEmailAndPassword("kdo@gmail.com","pwdkdo").catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage);
});
}

function testSignOut()
{
  fb.auth().signOut().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage);
});
}

function testCreateLogin()
{
  fb.auth().createUserWithEmailAndPassword("kdo@gmail.com","pwdkdo").catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage);
});
}

function test()
{
  //console.log( fb.auth().currentUser.email );
  //console.log( fb.auth().currentUser.providerId );
  
  let db = fb.firestore();
  let user1Ref = db.collection("users").doc("alovelace");
  user1Ref.get()
          .then( (doc) => {
                            if(doc.exists){
                              console.log(doc.data())
                            }
                          })
          .catch( (error) => console.log(error) );
  
  
  
  //console.log(user1Ref);
  /*db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});*/
}

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2 </p>
    <Link to="/">Go back to the homepagem</Link>
    <button onClick={() => console.log(process.env.kdo_apiKey)}>Log Env</button>
    <button onClick={() => test()}>Read FB</button>
    <button onClick={() => setLoginObserver()}>Set Login Observer</button>
    <button onClick={() => testCreateLogin()}>Create login</button>
    <button onClick={() => testSignIn()}>Sign In</button>
    <button onClick={() => testSignOut()}>Sign Out</button>
    <button onClick={() => registerSW()}>Register SW</button>
    <button onClick={() => notifyMe()}>Notify Me</button>
  </Layout>
)

export default SecondPage
