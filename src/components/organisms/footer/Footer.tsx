import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-neutral-900 border-t border-neutral-800 text-neutral-400 flex flex-col items-center pt-8 pb-4">
      <nav className="p-4 mb-4">
        <ul className="flex gap-6 justify-center font-semibold">
          <li>
            <Link href="/" className="hover:text-white transition-colors duration-300">Top</Link>
          </li>
          <li>
            <Link href="/articles" className="hover:text-white transition-colors duration-300">Article</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-white transition-colors duration-300">About</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-white transition-colors duration-300">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="relative flex flex-col md:flex-row w-11/12 max-w-7xl justify-between items-center pt-8 pb-12 border-t border-neutral-800/80 gap-6 md:pr-32">
        <div className="absolute -top-8 md:-top-12 right-0 md:right-4 z-20 pointer-events-none w-[70px] h-[70px] md:w-[100px] md:h-[100px] animate-float">
          <Image
            src={"/decoration/plant4.png"}
            alt="decoration-plant4"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <div className="order-2 md:order-2 text-sm hover:text-white transition-colors duration-300">
          <Link href="/privacy">プライバシーポリシー</Link>
        </div>
        <Link href="/" className="order-1 md:order-1 hover:opacity-85 transition-opacity duration-300">
          <Image
            src="/logo.png"
            alt="Logo icon"
            width={126}
            height={32}
            priority={true}
          />
        </Link>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
