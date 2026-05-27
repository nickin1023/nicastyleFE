import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  const pathname = router.pathname || "";

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

  const navItemClass = `relative pb-1
    after:content-['']
    after:absolute
    after:left-0
    after:bottom-0
    after:w-full
    after:h-[2px]
    after:bg-[#ffffff]
    after:origin-right
    after:scale-x-0
    after:transition-transform
    after:duration-300
    after:transform
    hover:after:scale-x-100
    hover:after:origin-left
    items-center`;

  const navItems = [
    { href: "/", label: "Top", match: "/" },
    { href: "/articles?page=1", label: "Article", match: "/articles" },
    { href: "/about", label: "About", match: "/about" },
    { href: "/contact", label: "Contact", match: "/contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full bg-neutral-900/85 backdrop-blur-md border-b border-neutral-800/50 text-neutral-100 transition-transform duration-300 z-50 px-4 py-4 md:px-8 ${
            isVisible ? "translate-y-0" : "-translate-y-full"
          }
        `}
      >
        <nav className="mx-auto flex justify-between items-center w-full max-w-7xl h-[32px]">
          <Link className="hover:-translate-y-1 duration-500" href="/">
            <Image
              src="/logo.png"
              alt="Logo icon"
              width={126}
              height={32}
              priority={true}
            />
          </Link>
          <ul className="flex gap-3 font-bold justify-center text-sm md:text-xl px-3 items-center">
            {navItems.map((item) => {
              const isActive =
                item.match === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.match);

              return (
                <li key={item.href}>
                  <Link
                    className={`${navItemClass} ${isActive ? "after:scale-x-100 after:origin-left" : ""}`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
};

Header.displayName = "Header";
