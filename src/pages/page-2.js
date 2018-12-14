import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2 </p>
    <Link to="/">Go back to the homepagem</Link>
    <button onClick={() => console.log(process.env.kdo_apiKey)}>click</button>
  </Layout>
)

export default SecondPage
