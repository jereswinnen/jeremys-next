"use client";
import { FC } from "react";
import Link from "next/link";
import { useCopyEmail } from "@/hooks/CopyEmail";

interface ButtonProps {
  href: string;
  label: string;
  className?: string;
  "data-copyEmail"?: boolean;
}

const Button: FC<ButtonProps> = ({
  href,
  label,
  className = "",
  "data-copyEmail": copyEmail,
}) => {
  const { copyEmail: handleCopyEmail, copiedEmail } = useCopyEmail();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement> | React.TouchEvent<HTMLAnchorElement>
  ) => {
    if (copyEmail) {
      e.preventDefault();
      handleCopyEmail(e, href);
    }
  };

  const baseClasses = [
    "group relative px-3 pb-1 md:px-5 md:pt-1 md:pb-2 rounded-full dark:text-white uppercase text-2xl md:text-5xl border-2 border-current",
    "hover:bg-stone-900 will-change-auto cta-interaction overflow-hidden hover:text-stone-900 hover:scale-95",
    className,
  ].join(" ");

  const Component = copyEmail ? "a" : Link;
  const componentProps = copyEmail
    ? {
        href: "#",
        onClick: handleClick,
        onTouchEnd: handleClick,
        "data-email": href,
      }
    : { href };

  return (
    <Component {...componentProps} className={baseClasses}>
      <div className="relative z-10 cta-interaction group-hover:text-stone-900 dark:group-hover:text-white">
        <span className="cta-interaction group-hover:text-white dark:group-hover:text-stone-900">
          {copiedEmail === href && copyEmail ? "Copied!" : label}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 94 94"
          fill="currentColor"
          className="hidden w-7 h-7"
          aria-hidden="true"
        >
          <path d="M12.018 12.462V0h81.84v81.84h-12.462l.186-60.264L9.6 93.558l-9.3-9.3L72.282 12.276l-60.264.186Z" />
        </svg>
      </div>
      <span className="bg-stone-900 dark:bg-white block absolute inset-0 w-full h-full rounded-full -translate-x-full cta-interaction group-hover:translate-x-0" />
    </Component>
  );
};

export default Button;
