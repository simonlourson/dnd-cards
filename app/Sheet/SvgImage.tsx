import { PropsWithChildren } from "react";
import { SvgElement } from "./SimpleSvg/SvgElement";

interface SvgImageProps {
  svgPathData: SvgElement | undefined
}

export function SvgImage(props: PropsWithChildren<SvgImageProps>) {
  return (
    props.svgPathData && <img src={`data:image/svg+xml;base64,${btoa(props.svgPathData.getImageHtml())}`} />
  )
}