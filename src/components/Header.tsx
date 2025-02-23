"use client";
import { FC } from "react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useCopyEmail } from "../hooks/CopyEmail";

interface HeaderProps {
  className?: string;
}

interface NavItem {
  path: string;
  label: string;
  isCopyable?: boolean;
}

const navItems: NavItem[] = [
  { path: "/", label: "Work" },
  { path: "/info", label: "Info" },
  // { path: "/blog", label: "Blog" },
  // { path: "/contact", label: "Contact" },
  { isCopyable: true, path: "hey@jeremys.be", label: "hey@jeremys.be" },
];

const Header: FC<HeaderProps> = ({ className = "" }) => {
  const currentPath = usePathname();
  const { copyEmail, copiedEmail } = useCopyEmail();

  const isActivePath = (path: string) => {
    if (path === "/") return currentPath === path;
    return currentPath.startsWith(path);
  };

  const handleEmailClick = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.TouchEvent<HTMLAnchorElement>,
    email: string
  ) => {
    e.preventDefault();
    copyEmail(e, email);
  };

  return (
    <header
      className={`grid grid-cols-subgrid gap-y-0 z-[500] text-sm font-stretch-90% ${className}`}
    >
      <Link
        href="/"
        className="col-span-1 md:!col-span-2 pt-4 font-semibold uppercase"
      >
        Jeremys
      </Link>
      <nav className="col-span-1 md:!col-span-4 md:!col-start-5 grid grid-cols-subgrid">
        <ul className="col-span-full grid grid-cols-subgrid">
          {navItems.map(({ isCopyable, path, label }) => (
            <li key={path} className="group relative">
              {isCopyable ? (
                <a
                  href="#"
                  data-email={path}
                  className="flex pl-3 pt-4 opacity-70 transition-all duration-500 ease-circ hover:opacity-100"
                  onClick={(e) => handleEmailClick(e, path)}
                  onTouchEnd={(e) => handleEmailClick(e, path)}
                >
                  {copiedEmail === path ? "Copied!" : label}
                </a>
              ) : (
                <Link
                  href={path}
                  className={`flex pl-3 pt-4 opacity-70 transition-all duration-500 ease-circ hover:opacity-100 ${
                    isActivePath(path) ? "font-semibold !opacity-100" : ""
                  }`}
                >
                  {label}
                </Link>
              )}
              <div className="absolute top-0 left-0 w-[1px] h-full [&>*]:absolute [&>*]:block [&>*]:w-[1px]">
                <span className="h-0 bg-stone-950 dark:bg-white transition-all duration-500 ease-circ group-hover:h-full" />
                <span
                  className={`h-full bg-stone-950/20 dark:bg-white/20 ${
                    isActivePath(path) ? "!bg-stone-950 dark:!bg-white" : ""
                  }`}
                />
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
