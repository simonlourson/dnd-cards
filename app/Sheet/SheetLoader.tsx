'use client'

import { useEffect, useState } from "react";
import xmlJs from 'xml-js';
import { CharacterSheet, extractCharacterSheetFromXmlData } from "./SheetHelper";
import CleanSheet from "./CleanSheet";
import OriginalSheet from '../data/dnd5e_sheet_template_a4.svg'
import { SvgGroup } from "./SimpleSvg/SvgGroup";

interface SheetLoaderProps {
  svgData: SvgGroup
}

export default function SheetLoader(props: SheetLoaderProps) {
  
  const [key, setKey] = useState<number>(0)
  const [characterSheet, setCharacterSheet] = useState<CharacterSheet>()

  useEffect(() => {
    //fetch('/Adran Fierlame.xml')
    fetch('/Chausey.xml')
    //fetch('/Théren Mélianne.xml')
      .then((response) => response.text())
      .then((xmlText) => {
        setCharacterSheet(
          extractCharacterSheetFromXmlData(
            JSON.parse(
              xmlJs.xml2json(
                xmlText, { compact: true, spaces: 2 }
              )
            )
          )
        )
      })
      .catch((error) => {
        console.error('Error fetching XML data:', error);
      });

  }, []);

  function removeFeat(index: number, moveTo: number = -1) {
    if (moveTo == 2)
      characterSheet?.page2Feats.push(characterSheet?.feats[index])
    
    characterSheet?.feats.splice(index, 1)
    
    // Force re render of component
    setKey(key + 1)
  }

  return (
    <>
      {characterSheet ? 
        <CleanSheet svgData={props.svgData} characterSheet={characterSheet} removeFeat={removeFeat} /> : 
        <OriginalSheet />}
    </>
  )
}