import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import fb from '../base/fb'

function test()
{
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
    <button onClick={() => console.log(process.env.kdo_apiKey)}>click</button>
    <button onClick={() => test()}>click2</button>
  </Layout>
)

export default SecondPage
