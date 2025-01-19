import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '../button/button';
import { AdvantageList } from '../advantage/advantage-list';

export function Body() {

  const advantages = [
    {
      text: 'Relatórios e análises em tempo real',
      icon: 'graph',
      image: 'graph2',
    },
    {
      text: 'Gerencie suas finanças sem complicações',
      icon: 'pig',
      image: 'pig2',
    },
    {
      text: 'Notificações para não deixar passar nada',
      icon: 'ad',
      image: 'ad2',
    },
  ];

  return (
    <div className="body">
      <div className="initial-scream">
        <div className="container-invite">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="invite">
                  <span className="title">
                    Controle suas finanças na palma da sua pata.
                  </span>
                  <Link href="/dashboard" className="login">
                    <Button
                      className={['button', 'primary-button']}
                    >
                      Começar agora
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wave">
          <div className="cat-paw">
            <Image src="/png/cat.png" alt="cat-paw" width="377" height="482" />
          </div>
          <div className="wave-login">
            <span className="has-login">Vamos Começar?</span>
            <Link href="/dashboard" className="login">
              Iniciar
            </Link>
          </div>
        </div>
      </div>
      {<AdvantageList advantage={advantages} className="advantage-list" />}

      {/*<RemoteLandingPage />*/}
    </div>
  );
}
