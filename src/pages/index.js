import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { info } from '../../info';
import { content } from '../../content';

import OptInForm from '../components/form/opt-in-form';
import Link from 'next/link';
import Blockbuster from '../components/blockbuster';
import Faqs from '../components/faqs';
import scrollDepth from '../utils/scrollDepth';

export default function Index() {
  const [lastClick, setLastClick] = useState('');

  useEffect(() => {
    scrollDepth({
      values: [25, 50, 75, 100],
      callback: (value) => fbq('trackCustom', `Scroll Depth: ${value}`),
    });
  });

  const goToContact = (origin) => {
    setLastClick(origin);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
  };


  const {hero, beneficios, atributos, catalogo, garantias, testimonios, faqs, cta} = content;

  return (
    <>
      {/* HERO */}
      <section
        className="relative min-h-[80rem] w-full flex flex-col md:justify-end items-center bg-brand-1 overflow-hidden">
        <div className="relative min-h-[32rem] flex-grow w-full md:absolute top-0 inset-x-0 bottom-1/2 md:bottom-0">

          <div className="hidden md:flex absolute inset-0 bg-gradient-to-tr from-brand-1 via-transparent to-cyan-400 z-10"/>
          <div className="hidden md:flex absolute inset-0 bg-gradient-to-br from-brand-1 via-transparent to-[#49ea60] opacity-50 z-10"/>
          <div className="hidden md:flex absolute inset-0 bg-black opacity-30 z-10"/>

          <Image src="/landing/hero.jpg" layout="fill" className="object-cover object-right"/>

        </div>

        <div className="container min-h-[40rem] text-white w-full text-left z-20 py-20">
          <h1
            className="text-white lg:w-2/3 relative ft-10 font-semibold">
            {hero.banner.title}
          </h1>
          <p className="text-white lg:w-2/3 ft-3 mt-16" dangerouslySetInnerHTML={{__html: hero.banner.description}}/>

          <div className="flex flex-col md:w-2/3 md:flex-row justify-start items-start mt-20 gap-4">
            <Link href={`tel:${info.phoneNumber}`}>
              <a className="button-secondary !w-full md:!w-1/3 mb-4">{'Llámanos'}</a>
            </Link>
            <Link href="#contact">
              <a className="button !w-full mb-4">{hero.cta.main ?? 'Contáctanos'}</a>
            </Link>
            <p className="-ft-1">{hero.cta.second}</p>
          </div>

        </div>
      </section>

      {catalogo != null &&
        <section id="catalogo">
          <div className="reading-container my-20">
            <h2 className="text-brand-1 text-center font-semibold" dangerouslySetInnerHTML={{__html: catalogo.banner.title}}/>
          </div>
          <div className="px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-stretch">
              {catalogo.content.items.map((i, idx) =>
                <div className="relative flex flex-col w-full gap-4">
                  <div>
                    <div className="relative shadow-md w-full aspect-square overflow-hidden">
                      <Image src={`/landing/${i.img}`} layout="fill" objectFit="cover"/>
                    </div>
                  </div>
                  <h3 className="text-brand-1 text-center font-semibold tracking-wide">{i.title}</h3>

                </div>,
              )}
            </div>
          </div>
          <div className="reading-container mt-20 justify-center items-center">
            <Link href="#contact">
              <a className="button mb-4">{hero.cta.main ?? 'Contáctanos'}</a>
            </Link>
            <p className="-ft-1">{hero.cta.second}</p>
          </div>
        </section>}

      {/* BENEFICIOS */}
      <section id="beneficios" className="">
        <Blockbuster
          background={`bg-[url('/landing/beneficios.jpg')]`}
          title={beneficios.banner.title}
          description={beneficios.banner.description}
        />
        <div className="container mb-20">
          <p className="reading-container ft-2 m-20" dangerouslySetInnerHTML={{__html: beneficios.content?.paragraph}}/>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {beneficios.content.items.map((i, idx) =>
              <div
                id={`beneficio-${idx}`}
                className="relative flex flex-col w-full overflow-hidden">

                <div className="w-full flex aspect-square justify-center items-center">
                  <div className="relative bg-brand-1 rounded-full w-2/3 h-2/3">
                    <Image src={`/landing/${i.img}`} layout="fill" objectFit="contain"/>
                  </div>
                </div>
                <h3 className="text-center ft-6 font-semibold tracking-wide flex-grow">{i.title}</h3>


              </div>,
            )}
          </div>

          <div className="flex flex-col justify-start md:justify-center items-center mt-20">
            <Link href="#contact">
              <a onClick={() => goToContact('benefits')} className="button mb-4">{hero.cta.main ?? 'Contáctanos'}</a>
            </Link>
            <p className="-ft-1">{hero.cta.second}</p>
          </div>
        </div>
      </section>

      {/* MATERIALES */}
      <section id="atributos">
        <Blockbuster
          background={`bg-[url('/landing/materiales.jpg')]`}
          title={atributos.banner.title}
          description={atributos.banner.description}
        />
        <div className="px-16 my-40">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-16 items-stretch">
            {atributos.content.items.map((i, idx) =>
              <div className="flex flex-col w-full gap-4">

                <div className="relative pt-[100%]">
                  <div className="absolute inset-8 aspect-square overflow-hidden z-10">
                    <Image src={`/landing/${i.img}`} layout="fill" objectFit="contain"/>
                  </div>
                </div>
                <h3 className="text-brand-1 ft-6 font-semibold text-center max-w-[16ch] mx-auto">{i.title}</h3>
                <p className="text-center">{i.description}</p>

              </div>,
            )}
          </div>
          <div className="flex flex-col justify-center items-center mt-20">
            <Link href="#contact">
              <a className="button mb-4">{hero.cta.main ?? 'Contáctanos'}</a>
            </Link>
            <p className="-ft-1">{hero.cta.second}</p>
          </div>
        </div>
      </section>

      {/* GARANTIAS */}
      {garantias != null &&
        <section id="garantias">
          <Blockbuster
            background={`bg-[url('/landing/garantias.jpg')]`}
            title={garantias.banner.title}
            description={garantias.banner.description}
          />
          <div className="container my-40">
            <div className="grid md:grid-cols-3 gap-16 items-stretch">
              {garantias.content.items.map((i, idx) =>
                <div className="flex md:flex-col items-center md:justify-start gap-12">
                  <div
                    className="bg-yellow-400 border-2 border-yellow-500 w-1/4 md:h-[16rem] md:w-[16rem] rounded-full overflow-hidden p-6 md:p-12">
                    <div className="relative w-full pt-[100%]">
                      <Image src={`/landing/${i.img}`} layout="fill" objectFit="contain"/>
                    </div>
                  </div>
                  <div className="relative w-3/4 md:w-full flex flex-col flex-grow p-12 border-2 rounded-3xl shadow-md">
                    <h3>{i.title}</h3>
                    <p>{i.description}</p>
                  </div>
                </div>,
              )}
            </div>
            <div className="flex flex-col justify-center items-center mt-20">
              <Link href="#contact">
                <a className="button mb-4">{hero.cta.main ?? 'Contáctanos'}</a>
              </Link>
              <p className="-ft-1">{hero.cta.second}</p>
            </div>
          </div>
        </section>
      }

      {/* CONTACT */}
      <section id="contact"
               className="border-t-2 border-brand-1 bg-white
                bg-center bg-cover py-20 z-[99999]">
        <div className="container">
          <div className="w-full md:w-1/2 mx-auto">
            <h2 className="!font-bold text-brand-1">
              {cta.main}
            </h2>
            <div className="mt-20 mb-12">
              <p className="ft-1 font-semibold text-neutral-900">{cta.description}</p>
              <p className="ft-1 text-neutral-900" dangerouslySetInnerHTML={{__html: cta.paragraph}}/>
            </div>
            <OptInForm
              lastClick={lastClick}
            />
          </div>
        </div>
      </section>

      <div
        className='fixed inset-x-0 bottom-4 px-8 z-[9999] isolate'>
        <div className='flex justify-center lg:justify-end'>
          <a
            href={`https://wa.me/${info.whatsapp.value}`}
            target="_blank"
            className='ft-3 button hover:bg-brand-5 !mt-0 !py-6 !px-16 !rounded-full shadow-lg !tracking-normal'
          >
            <span className="filter invert mr-4"><Image src="/whatsapp.svg" width={24} height={24}/></span>
            Mándanos un WhatsApp
          </a>

        </div>
      </div>
    </>
  );
}
