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
        className={`fixed top-0 w-full bg-black text-white transition-transform duration-300 z-50 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex justify-between p-3">
          <Link href="/">
            <Image src="/logo.png" alt="Logo icon" width={32} height={32} />
          </Link>
          <ul className="flex gap-3">
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
        </div>
      </header>
    </>
  );
};

Header.displayName = "Header";
