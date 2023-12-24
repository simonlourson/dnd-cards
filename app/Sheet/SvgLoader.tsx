'use client'

import { forwardRef, useEffect, useRef, useState } from "react";
import OriginalSheet from '../data/dnd5e_sheet_template_a4.svg'
import SheetLoader from "./SheetLoader";
import { SvgGroup } from "./SimpleSvg/SvgGroup";


export default function SvgLoader() {
  const [svgData, setSvgData] = useState<SvgGroup>()
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = sheetRef.current?.firstChild as SVGGElement
    
    if (!sheetRef.current?.firstChild) return

    let simpleSvg: SvgGroup = new SvgGroup(svg.children.item(0) as SVGGElement)

    setSvgData(simpleSvg)
    console.log(simpleSvg)

  }, []);

  return (
    <>
      {svgData ? 
        <SheetLoader svgData={svgData} /> :
        <div ref={sheetRef}><OriginalSheet /></div>
      }
    </>
  )
}