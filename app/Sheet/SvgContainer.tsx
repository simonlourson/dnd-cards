import { PropsWithChildren } from "react";
import styles from './sheet.module.css'
import { SvgElement } from "./SimpleSvg/SvgElement";

interface SvgContainerProps {
  svgPathData: SvgElement
}

export function SvgContainer(props: PropsWithChildren<SvgContainerProps>) {
  return (
    <div className={`${styles.absolute} ${styles.with_background}`} style={{
      left: `${props.svgPathData.bbox.x}mm`,
      top: `${props.svgPathData.bbox.y}mm`,
      width: `${props.svgPathData.bbox.width}mm`,
      height: `${props.svgPathData.bbox.height}mm`,
      backgroundImage: `url("data:image/svg+xml;base64,${btoa(props.svgPathData.getImageHtml())}")`}}>
      {props.children}
    </div>
  )
}