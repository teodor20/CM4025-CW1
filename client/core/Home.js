import React from 'react'

import Header from '../components/landing/Header';
import Games from '../components/landing/Games';
import Footer from './Footer';

export default function Home() {
    return (
        <React.Fragment>
            <Header />
            <Games />
            <Footer />
        </React.Fragment>
    );
  }
   