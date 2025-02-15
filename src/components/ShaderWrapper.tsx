"use client";
import { FC } from "react";
import ReverseImageShader from "./shaders/ReverseImageShader";

interface Source {
  srcset: string;
  type: string;
}

interface ShaderWrapperProps {
  hover?: boolean;
  sources: Source[];
  fallbackSrc: string;
  alt: string;
}

const ShaderWrapper: FC<ShaderWrapperProps> = ({
  hover = true,
  sources,
  fallbackSrc,
  alt,
}) => {
  return (
    <ReverseImageShader
      hover={hover}
      sources={sources}
      fallbackSrc={fallbackSrc}
      alt={alt}
    />
  );
};

export default ShaderWrapper;
