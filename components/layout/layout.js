import React from 'react'
import Navigation from './navigation'
import Footer from './footer'
import Head from 'next/head'

const Layout = (props) => {
  return (
    <>
        <Head>
            <title>My-Test</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <link rel="icon" href="/favicon.ico" />       
        </Head>
        <Navigation />
        <main>
          <div className="container">
            <div className="section">
            <div className="columns is-mobile">
              <div className="column is-half is-offset-one-quarter">
                {props.children}
              </div>
            </div>     
            </div>        
          </div>        
        </main>
    </>
  )
}

export default Layout