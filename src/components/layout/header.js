import Link from 'next/link';
import { info } from '../../../info';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const path = router.pathname;
  return (
    <header
      className={`fixed top-0 px-8 bg-white/80 backdrop-blur-sm w-screen shadow-sm ${path === '/survey' ? 'h-[4rem]' : 'h-[8rem]'} flex justify-between z-[99] hover:top-0`}
    >
      <div className="flex items-center z-[10]">
        <div className="relative flex items-center h-[6rem] aspect-[3/1]">
          <Link href="/" passhref>
            <a>
              <Image
                src={logo}
                alt={info.companyName}
                layout="fill"
                objectFit="contain"
              />
            </a>
          </Link>
        </div>
      </div>
    </header>



  );
}
