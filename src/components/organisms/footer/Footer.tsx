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
      <div className="flex w-11/12 justify-center items-center pt-4 pb-12 border-t">
        <Link href="/" className="p-2">
          <Image
            src="/logo.png"
            alt="Logo icon"
            width={126}
            height={32}
            priority={true}
          />
        </Link>
        <div className="p-2">
          <p>プライバシーポリシー</p>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
