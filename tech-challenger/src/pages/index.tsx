'use client';

import React from 'react';

import dynamic from 'next/dynamic';

const Home: React.FC = () => {
  const LandingComponent = dynamic(() => import('landing/LandingComponent'), { ssr: false });

  return (
    <div className="home">
      <LandingComponent />
    </div>
  );
};

export default Home;
