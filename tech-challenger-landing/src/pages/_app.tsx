import React from 'react';
import './global.scss';

export default function MyApp({
                                children,
                              }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    {children}
    </body>
    </html>
  );
}
