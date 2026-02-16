import { useEffect, useState } from 'react';
import Image from 'next/image';
import { info } from '../../info';
import { content } from '../../content';

import OptInForm from '../components/form/opt-in-form';
import Link from 'next/link';
import Blockbuster from '../components/blockbuster';
import scrollDepth from '../utils/scrollDepth';
import { gtagSendEvent } from '../services/fbEvents';

export default function Index({utm}) {
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

          <div
            className="hidden md:flex absolute inset-0 bg-gradient-to-tr from-brand-1 via-transparent to-cyan-400"/>
          <div
            className="hidden md:flex absolute inset-0 bg-gradient-to-br from-brand-1 via-transparent to-[#49ea60] opacity-50"/>
          <div className="hidden md:flex absolute inset-0 bg-black opacity-30"/>

          <Image src="/landing/hero.jpg" layout="fill" className="object-cover object-right"/>

        </div>

        <div className="container min-h-[40rem] text-white w-full text-left z-20 py-20">
          <h1
            className="text-white lg:w-2/3 relative ft-10 font-semibold md:[text-shadow:_2px_2px_0_rgb(0_0_0_/_40%)]">
            {hero.banner.title}
          </h1>
          <p className="text-white lg:w-2/3 ft-3 mt-16" dangerouslySetInnerHTML={{__html: hero.banner.description}}/>

          <div className="flex flex-col md:w-2/3 md:flex-row justify-start items-start mt-20 gap-4">
            <Link href={`tel:${info.phoneNumber}`}>
              <a
                onClick={() => gtagSendEvent('9qCYCImf17UbELavzeAo')}
                className="button-secondary !w-full md:!w-1/3 mb-4"
              >{'Llámanos'}</a>
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
            <h2 className="text-brand-1 text-center font-semibold"
                dangerouslySetInnerHTML={{__html: catalogo.banner.title}}/>
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
                  <div className="absolute inset-8 aspect-square overflow-hidden">
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

      {/*UBICACION*/}

      <section id="ubicacion" className="border-t-2 border-brand-1">
        <div className="container py-20">
          <h2 className="text-center py-20 font-bold text-brand-1">En dónde nos ubicamos</h2>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch">
            <div className="w-full">
              <h3 className="font-semibold">Matriz</h3>
              <p>
                {info.address.address}<br/>
                {info.address.col}, {info.address.cp} <br/>
                {info.address.city}, {info.address.state}
              </p>
              <div className="relative w-full aspect-square md:aspect-video mt-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.4681861019412!2d-103.33406!3d20.650523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b23dc045f995%3A0xef5ed936e20e2dab!2sSistemas%20de%20riego%20Agr%C3%ADcola%20-%20Agro%20irrigaci%C3%B3n!5e0!3m2!1sen!2smx!4v1761672180061!5m2!1sen!2smx"
                  style={{position: 'absolute', inset: 0, border: 0, width: '100%', height: '100%'}}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación: Av. Jaime Balmes 11, Polanco, CDMX"
                />
              </div>
            </div>

            <div className="w-full">
              <h3 className="font-semibold">Suc. Tala</h3>
              <p>
                Carr. Guadalajara-Ameca<br/>
                KM 16 +200 6A<br/>
                Tala, JAL
              </p>
              <div className="relative w-full aspect-square md:aspect-video mt-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238870.2550873402!2d-103.80108030123478!3d20.69609933272301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8426050022f8535b%3A0x4f48a628dd8a0fe6!2sSistemas%20de%20riego-Agro%20irrigacion!5e0!3m2!1sen!2smx!4v1761672461999!5m2!1sen!2smx"
                  style={{position: 'absolute', inset: 0, border: 0, width: '100%', height: '100%'}}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación: Av. Jaime Balmes 11, Polanco, CDMX"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="sticky inset-x-0 bottom-4 px-8 isolate mb-12 z-20">
        <div className="flex justify-center lg:justify-end">
          <a
            onClick={() => gtagSendEvent('9qCYCImf17UbELavzeAo')}
            href={`tel:${info.phoneNumber}`}
            target="_blank"
            className="button hover:bg-brand-5 !mt-0 !py-6 !px-16 !rounded-full shadow-lg"
          >
                  <span className="filter invert h-[18px] w-[18px] mt-2 mr-4">
                    <Image src="/phone.png" layout="fill"/>
                  </span>
            <p className="ft-3">Llámanos</p>
          </a>
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact"
               className="border-t-2 border-brand-1 bg-white
                bg-center bg-cover py-20">
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
              utm={utm}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const {req, query} = ctx;
  const cookiesHeader = req.headers.cookie || '';

  const keys = ['utm', '_fbc', '_fbp'];
  const cookies = {};

  for (const key of keys) {
    const raw = cookiesHeader
      .split('; ')
      .find(c => c.startsWith(`${key}=`))
      ?.split('=')[1];

    if (!raw) continue;

    try {
      const clean = raw.startsWith('j%3A') ? raw.slice(4) : raw;
      cookies[key] = JSON.parse(decodeURIComponent(clean));
    } catch {
      cookies[key] = decodeURIComponent(raw);
    }
  }

  // --- Revisar params UTM del query ---
  const utmFromQuery = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    if (query[param]) utmFromQuery[param] = query[param];
  });

  // Si hay params en la URL, se usan; si no, cae en cookie
  const utm =
    Object.keys(utmFromQuery).length > 0
      ? utmFromQuery
      : cookies.utm ?? null;

  return {
    props: {utm},
  };
}
