import { Plugin } from "unified";

declare module "rehype-figure" {
  const rehypeFigure: Plugin<[], any>;
  export default rehypeFigure;
}
