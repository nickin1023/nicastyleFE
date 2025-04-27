import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 32) {
        // 下方向にスクロールした場合はヘッダーを隠す
        setIsVisible(false);
      } else {
        // 上方向にスクロールした場合はヘッダーを表示
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 w-full bg-black text-white transition-transform duration-300 z-50 px-7 py-5 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="container flex justify-between w-full max-w-full">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo icon"
              width={126}
              height={32}
              priority={true}
            />
          </Link>
          <ul className="flex gap-3 font-bold justify-center text-lg pr-3">
            <li>
              <Link href="/">Top</Link>
            </li>
            <li>
              <Link href="/articles?page=1">Article</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

Header.displayName = "Header";
