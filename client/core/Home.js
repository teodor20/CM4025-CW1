import React from 'react'

import Header from '../components/landing/Header';
import Games from '../components/landing/Games';
import Footer from '../components/landing/Footer';

export default function Home() {
    return (
        <React.Fragment>
            <Header content={{
                "header": "Game Mania",
                "description": "Game mania is a free gaming website where you can play some of your favourite classic games!"
            }} />
            <Games />
            <Footer content={{ "copy": "\u00a9 2021 Game Mania. All rights reserved." }} />
        </React.Fragment>
    );
  }
   