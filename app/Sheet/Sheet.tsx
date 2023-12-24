'use client'

import { useEffect, useRef, useState } from 'react';
import xmlJs from 'xml-js';
import { SheetProps } from './SheetProps'
import styles from './sheet.module.css'
import { SvgContainer, SvgPathData } from './SvgContainer';
import OriginalSheet from '../data/dnd5e_sheet_template_a4.svg'
import { Feat, abilities, bonus, findFeats, findProficiencies, skillIndexTranslation, skills } from './SheetHelper';



export default function Sheet(props: SheetProps) {

  const [xmlData, setXmlData] = useState<any>(null);
  const [svgData, setSvgData] = useState<SvgPathData[]>([])
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/Adran Fierlame.xml')
      .then((response) => response.text())
      .then((xmlText) => {
        const jsonData = xmlJs.xml2json(xmlText, { compact: true, spaces: 4 });
        setXmlData(JSON.parse(jsonData));
      })
      .catch((error) => {
        console.error('Error fetching XML data:', error);
      });

    const svg = sheetRef.current?.firstChild as SVGElement
    const svgPathData: SvgPathData[] = []
    for (let svgIndex = 0; svgIndex < svg.children.length; svgIndex++) {
      const child = svg.children.item(svgIndex) as SVGPathElement
      if (child) {
        const path = child.getAttribute('d')
        if (path) svgPathData.push({
          id: child.id,
          bbox: child.getBBox(),
          path: path,
          fill: child.getAttribute('fill') || '#000'
        })}
    }

    console.log(svgPathData)
    setSvgData(svgPathData)
  }, []);

  console.log(xmlData)

  function getSvgDataForId(id: string): SvgPathData {
    return svgData.find(function predicate(value: SvgPathData) { return value.id === id }) || {id: 'unknown', path: '', bbox: new DOMRect(), fill: '#000'}
  }

  const proficencies: number[] = []
  if (xmlData) findProficiencies(xmlData, proficencies)

  const feats: Feat[] = []
  if (xmlData) console.log(findFeats(xmlData, feats))

  console.log(feats)

  const skillProficiencies: boolean[] = []
  skills.forEach((value, index) => {
    skillProficiencies[skillIndexTranslation[index]] = proficencies.includes(index + 100)
  });

  const savingThrowsProficiencies: boolean[] = []
  abilities.forEach((value, index) => {
    savingThrowsProficiencies[index] = proficencies.includes(index)
  });
  
  const fromFightClub5eXml: boolean = true && xmlData != undefined;

  const characterName: string = fromFightClub5eXml ? xmlData?.pc.character.name._text :
    'Jo le Clodo'

  const classAndLevel: string = fromFightClub5eXml ? xmlData?.pc.character.class.name._text + " niveau " + xmlData?.pc.character.class.level._text :
    'Grosbill niveau 20'

  const race: string = fromFightClub5eXml ? xmlData?.pc.character.race.name._text :
    'Canard'

  const background: string = fromFightClub5eXml ? xmlData?.pc.character.background.name._text :
    'à l\'Orange'

  const abilityScores: number[] = fromFightClub5eXml ? xmlData?.pc.character.abilities._text.split(',').map(function(s: string) { return parseInt(s) }).slice(0, 6) :
    [10, 10, 10, 10, 10, 10]
  
  console.log(xmlData?.pc.character.class)

  return (
    <>
      {svgData.length == 0 ?
        <div ref={sheetRef}><OriginalSheet /></div> :
        <div className={`${styles.absolute} ${styles.sheet}`}>
          <SvgContainer svgPathData={getSvgDataForId('page_1_header')}>

          </SvgContainer>
          <SvgContainer svgPathData={getSvgDataForId('page_1_abilities_container')}>
            <div style={{height: '148.302mm', marginTop: '6mm', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
              {abilities.map((value, index) => (
                <div key={index} className={`${styles.with_background}`} style={{width: '18.786mm', height: '22.025mm', backgroundImage: 'url("/sheet/page_1_stat.svg")', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div className={`${styles.text} ${styles.text6}`} style={{marginTop: '1mm'}}>{value}</div>
                  {abilityScores && <div className={`${styles.text} ${styles.text13}`} style={{marginTop: '-2mm'}}>{abilityScores[index]}</div>}
                  {abilityScores && <div className={`${styles.text} ${styles.text9}`} style={{marginBottom: '2mm'}}>{`${bonus[abilityScores[index]] > 0 ? '+' : ''}${bonus[abilityScores[index]]}`}</div>}
                </div>
              ))}
            </div>
          </SvgContainer>
          <SvgContainer svgPathData={getSvgDataForId('page_1_proficiency_bonus')}>
            <div className={`${styles.text} ${styles.text9}`} style={{paddingLeft: '4mm'}}>+3</div>
            <div className={`${styles.text} ${styles.text7}`} style={{paddingLeft: '3mm', flexGrow: '1', textAlign: 'center'}}>BONUS DE MAÎTRISE</div>
          </SvgContainer>
          <SvgContainer svgPathData={getSvgDataForId('page_1_saving_throws_container')}>
            <div style={{height: `${getSvgDataForId('page_1_saving_throws_container').bbox.height-10}mm`, marginTop: '3mm', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              {abilities.map((value, index) => (
                <div key={index} className={`${styles.with_background} ${styles.text} ${styles.text6}`} style={{marginLeft: '4mm', paddingLeft: '11mm', backgroundImage: savingThrowsProficiencies[index] ? 'url("/sheet/checkbox_true.svg")' : 'url("/sheet/checkbox_false.svg")'}}>{value}</div>
              ))}
            </div>
            <div className={`${styles.text} ${styles.text7}`} style={{position: 'absolute', width: '100%', bottom: '1mm', textAlign: 'center'}}>JETS DE SAUVEGARDE</div>
          </SvgContainer>
          <SvgContainer svgPathData={getSvgDataForId('page_1_skills_container')}>
            <div style={{height: '83.664mm', marginTop: '2mm', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              {skills.map((value, index) => (
                <div key={index} className={`${styles.with_background} ${styles.text} ${styles.text6}`} style={{marginLeft: '4mm', paddingLeft: '11mm', backgroundImage: skillProficiencies[index] ? 'url("/sheet/checkbox_true.svg")' : 'url("/sheet/checkbox_false.svg")'}}>{value}</div>
              ))}
            </div>
            <div className={`${styles.text} ${styles.text7}`} style={{position: 'absolute', width: '100%', bottom: '1mm', textAlign: 'center'}}>COMPÉTENCES</div>
          </SvgContainer>
          <SvgContainer svgPathData={getSvgDataForId('page_1_armor_class')}>
            <div className={`${styles.text} ${styles.text13}`} style={{paddingTop: '6mm', width: '16.934mm', textAlign: 'center'}}>18</div>
            <div className={`${styles.text} ${styles.text7}`} style={{paddingTop: '2mm', width: '16.934mm', textAlign: 'center'}}>CA</div>
          </SvgContainer>
          <SvgContainer svgPathData={getSvgDataForId('page_1_inititative')}>
            <div className={`${styles.text} ${styles.text13}`} style={{paddingTop: '6mm', width: '18.429mm', textAlign: 'center'}}>+3</div>
            <div className={`${styles.text} ${styles.text7}`} style={{paddingTop: '2mm', width: '18.429mm', textAlign: 'center'}}>INITIATIVE</div>
          </SvgContainer>
          <SvgContainer svgPathData={getSvgDataForId('page_1_speed')}>
            <div className={`${styles.text} ${styles.text13}`} style={{paddingTop: '6mm', width: '18.429mm', textAlign: 'center'}}>9m</div>
            <div className={`${styles.text} ${styles.text7}`} style={{paddingTop: '2mm', width: '18.429mm', textAlign: 'center'}}>VITESSE</div>
          </SvgContainer>
          <SvgContainer svgPathData={getSvgDataForId('page_1_attacks')}>
            <table style={{marginTop: '2mm', width: '61.263mm'}}>
              <thead>
                <tr>
                  <td className={`${styles.text} ${styles.text6}`} style={{width: '26mm', textAlign: 'center'}}>NOM</td>
                  <td className={`${styles.text} ${styles.text6}`} style={{width: '11mm', textAlign: 'center'}}>BONUS</td>
                  <td className={`${styles.text} ${styles.text6}`} style={{textAlign: 'center'}}>DÉGÂTS / TYPE</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`${styles.text} ${styles.text6}`} style={{backgroundColor: '#e5e5e5', width: '26mm', textAlign: 'center'}}>Marteau de Guerre</td>
                  <td className={`${styles.text} ${styles.text6}`} style={{backgroundColor: '#e5e5e5', width: '11mm', textAlign: 'center'}}>+5</td>
                  <td className={`${styles.text} ${styles.text6}`} style={{backgroundColor: '#e5e5e5', textAlign: 'center'}}>1d8 + 2</td>
                </tr>
                <tr>
                  <td className={`${styles.text} ${styles.text6}`} style={{backgroundColor: '#e5e5e5', width: '26mm', textAlign: 'center'}}>Dague</td>
                  <td className={`${styles.text} ${styles.text6}`} style={{backgroundColor: '#e5e5e5', width: '11mm', textAlign: 'center'}}>+5</td>
                  <td className={`${styles.text} ${styles.text6}`} style={{backgroundColor: '#e5e5e5', textAlign: 'center'}}>1d4 + 2</td>
                </tr>
              </tbody>
            </table>
            <div className={`${styles.text} ${styles.text7}`} style={{position: 'absolute', width: '100%', bottom: '1mm', textAlign: 'center'}}>ATTAQUES</div>
          </SvgContainer>
          <SvgContainer svgPathData={getSvgDataForId('page_1_hit_points')}>
            <div className={`${styles.text} ${styles.text8}`} style={{width: '58.188mm', marginTop: '2mm', marginLeft: '5mm'}}>Maximum de points de vie :</div>
            <div className={`${styles.text} ${styles.text8}`} style={{width: '58.188mm', marginBottom: '1mm', textAlign: 'center'}}>POINTS DE VIE ACTUELS</div>
          </SvgContainer>
          <SvgContainer svgPathData={getSvgDataForId('page_1_hit_dice')}>
            <div className={`${styles.text} ${styles.text6}`} style={{width: '27.878mm', marginTop: '2mm', marginLeft: '5mm'}}>Total :</div>
            <div className={`${styles.text} ${styles.text6}`} style={{width: '27.878mm', marginBottom: '1.5mm', textAlign: 'center'}}>DÉS DE VIE</div>
          </SvgContainer>
          <SvgContainer svgPathData={getSvgDataForId('page_1_death_saves')}>
            <div className={`${styles.text} ${styles.text6} ${styles.with_background}`} style={{marginTop: '2mm', width: '22mm', height: '3.302mm', backgroundPosition: 'right', backgroundImage: 'url("/sheet/page_1_death_saves.svg")'}}>SUCCÈS</div>
            <div className={`${styles.text} ${styles.text6} ${styles.with_background}`} style={{marginBottom: '0mm', width: '22mm', height: '3.302mm', backgroundPosition: 'right', backgroundImage: 'url("/sheet/page_1_death_saves.svg")'}}>ÉCHECS</div>
            <div className={`${styles.text} ${styles.text6}`} style={{width: '27.878mm', marginBottom: '1.5mm', textAlign: 'center'}}>JdS CONTRE LA MORT</div>
          </SvgContainer>
          <SvgContainer svgPathData={getSvgDataForId('page_1_text')}>
            <div style={{width: `${getSvgDataForId('page_1_text').bbox.width - 6}mm`, margin: '3mm', columnCount: 3}}>
              {feats.map((value, index) => (
                <div key={index} className={`${styles.with_background}`} style={{marginTop: '2mm' }}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div className={`${styles.text} ${styles.text6}`}>{value.name}</div>
                    <div className={`${styles.text} ${styles.text6} no-print`}>remove</div>
                  </div>
                  <div className={`${styles.rules_text} ${styles.text6}`} dangerouslySetInnerHTML={{__html: value.text}} />
                </div>
              ))}
            </div>
          </SvgContainer>
          
      {/* Header */}
      <div className={`${styles.absolute} ${styles.text} ${styles.text7}`} style={{left: '21.257mm', top: '32.386mm'}}>NOM DU PERSONNAGE</div>
      <div className={`${styles.absolute} ${styles.text} ${styles.text13}`} style={{left: '19.036mm', top: '21.898mm', width: '55.622mm', height: '7.181mm', textAlign: 'center', lineHeight: '7.181mm'}}>{characterName}</div>
      <div className={`${styles.absolute} ${styles.text} ${styles.text7}`} style={{left: '93.643mm', top: '22.949mm'}}>CLASSE & NIVEAU</div>
      <div className={`${styles.absolute} ${styles.text} ${styles.text7}`} style={{left: '93.643mm', top: '19.449mm'}}>{classAndLevel}</div>
      <div className={`${styles.absolute} ${styles.text} ${styles.text7}`} style={{left: '130.522mm', top: '22.949mm'}}>HISTORIQUE</div>
      <div className={`${styles.absolute} ${styles.text} ${styles.text7}`} style={{left: '130.522mm', top: '19.449mm'}}>{background}</div>
      <div className={`${styles.absolute} ${styles.text} ${styles.text7}`} style={{left: '159.659mm', top: '22.949mm'}}>NOM DU JOUEUR</div>
      <div className={`${styles.absolute} ${styles.text} ${styles.text7}`} style={{left: '93.643mm', top: '32.150mm'}}>RACE</div>
      <div className={`${styles.absolute} ${styles.text} ${styles.text7}`} style={{left: '93.643mm', top: '28.650mm'}}>{race}</div>
      <div className={`${styles.absolute} ${styles.text} ${styles.text7}`} style={{left: '130.522mm', top: '32.150mm'}}>ALIGNEMENT</div>
      <div className={`${styles.absolute} ${styles.text} ${styles.text7}`} style={{left: '159.659mm', top: '32.150mm'}}>POINTS D'EXPERIENCE</div>
      {/* Abilities */}

    </div>
      }
    </>

  )
}