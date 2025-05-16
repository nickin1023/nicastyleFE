import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-[repeating-conic-gradient(#000_0_25%,#222_0_50%)] bg-[size:20px_20px] text-white flex flex-col items-center">
      <nav className="p-4">
        <ul className="flex justify-center">
          <li className="px-2">
            <Link href="/">Top</Link>
          </li>
          <li className="px-2">
            <Link href="/articles">Article</Link>
          </li>
          <li className="px-2">
            <Link href="/about">About</Link>
          </li>
          <li className="px-2">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="relative flex flex-col md:flex-row w-11/12 justify-center items-center pt-4 pb-12 border-t">
        <div className="absolute top-0 bottom-0 left-0 z-20 my-auto pointer-events-none w-[100px] h-[100px]">
          <Image
            src={"/decoration/plant4.png"}
            alt="decoration-plant4"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <div className="p-2 order-1 md:order-2">
          <p>プライバシーポリシー</p>
        </div>
        <Link href="/" className="p-2 order-1 md:order-1">
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
