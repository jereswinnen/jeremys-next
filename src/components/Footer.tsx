"use client";
import { FC, useEffect, useState } from "react";
import Button from "@/components/Button";

const Footer: FC = () => {
  const [time, setTime] = useState<string>("");
  const [isColonVisible, setIsColonVisible] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Brussels",
      };

      const timeString = new Intl.DateTimeFormat("en-GB", options).format(
        new Date()
      );
      setTime(timeString);
    };

    // Initial update
    updateTime();

    // Update time every minute
    const timeInterval = setInterval(updateTime, 60000);
    // Toggle colon blink
    const blinkInterval = setInterval(() => {
      setIsColonVisible((prev) => !prev);
    }, 800);

    return () => {
      clearInterval(timeInterval);
      clearInterval(blinkInterval);
    };
  }, []);

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    return (
      <>
        {hours}
        <span style={{ opacity: isColonVisible ? 1 : 0 }}>:</span>
        {minutes}
      </>
    );
  };

  // Placeholder music data
  const latestTrack = {
    data: {
      albumCover:
        "https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?q=80&w=3417&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Sample Track",
      artist: "Sample Artist",
    },
  };

  return (
    <footer
      data-speed="1.1"
      className="bg-amber-100 col-span-full grid grid-cols-subgrid grid-rows-[auto_1fr_auto] pt-6 h-[70vh] border-t border-stone-900 dark:border-white/20"
    >
      <div className="col-span-full grid grid-cols-subgrid h-fit content-start">
        <article className="col-span-2 flex flex-col gap-3 text-balance">
          <p>
            Thanks for visiting! Interested in collaborating on your app or
            website? Feel free to contact me.
          </p>
        </article>
        <div className="col-span-2 col-start-7 hidden md:flex gap-1 justify-end">
          <span>Local time</span>
          <span className="font-[system-ui,sans-serif] opacity-50">&rarr;</span>
          <span>{time && formatTime(time)}</span>
        </div>
      </div>

      <div className="col-span-full grid grid-cols-subgrid place-content-center">
        <Button
          data-copyEmail
          className="col-span-full place-self-center w-fit h-fit tracking-tight !px-[6vw] !pt-[1vw] md:!pt-0 !pb-[2.5vw] md:!pb-[1.5vw] !text-[8vw] !normal-case !border-[0.5vw] md:!border-[0.2vw]"
          href="hey@jeremys.be"
          label="hey@jeremys.be"
        />
      </div>

      <div className="col-span-full grid grid-cols-subgrid gap-y-2 md:gap-y-0 h-fit content-start">
        <div className="col-span-full md:!col-span-3 flex gap-2 items-center justify-center md:justify-start">
          <div className="relative inline-block overflow-hidden w-7 h-7">
            <img
              className="vinylMask block w-full h-full object-cover"
              src={latestTrack.data.albumCover}
              alt={`${latestTrack.data.title} album cover`}
            />
          </div>
          <span className="text-sm font-medium">
            {latestTrack.data.title} &mdash; {latestTrack.data.artist}
          </span>
        </div>
        <div className="col-span-full md:!col-span-2 md:!col-start-7 text-right flex justify-center md:justify-end">
          <span className="opacity-70">&copy; JS.2025</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
