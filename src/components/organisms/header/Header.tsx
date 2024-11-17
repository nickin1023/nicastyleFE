import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <header className="w-full bg-black text-white">
        <div className="container mx-auto flex justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Logo icon" width={32} height={32} />
          </Link>
          <ul className="flex gap-3">
            <li>
              <Link href="/">Top</Link>
            </li>
            <li>
              <Link href="/blogs">Blog</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

Header.displayName = "Header";
