import { useCallback, useRef, useState } from "react";

export const useCopyEmail = () => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const copyEmail = useCallback(
    async (
      e:
        | React.MouseEvent<HTMLAnchorElement>
        | React.TouchEvent<HTMLAnchorElement>,
      email: string
    ) => {
      e.preventDefault();

      const emailAddress = email.replace("mailto:", "");

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailAddress);
        } else {
          // Fallback for older browsers
          const input = document.createElement("input");
          input.type = "text";
          input.value = emailAddress;
          input.style.position = "absolute";
          input.style.opacity = "0";
          document.body.appendChild(input);
          input.select();
          input.setSelectionRange(0, 99999);
          document.execCommand("copy");
          document.body.removeChild(input);
        }

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set the copied email and clear it after 2 seconds
        setCopiedEmail(emailAddress);
        timeoutRef.current = setTimeout(() => {
          setCopiedEmail(null);
        }, 2000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    },
    []
  );

  return { copyEmail, copiedEmail };
};
