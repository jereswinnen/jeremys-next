import { Plugin } from "unified";

declare module "rehype-figure" {
  const rehypeFigure: Plugin<[], unknown>;
  export default rehypeFigure;
}
