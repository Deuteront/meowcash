'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/logo/logo';


export function Header() {

  return (
    <div className="header">
      <div className="container">
        <div className="row w-100">
          <div className="col-12 container-header">
            <Link href="/dashboard">
              <Logo />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
