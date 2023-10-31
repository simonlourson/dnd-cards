'use client'

import { useEffect, useState } from 'react';
import xmlJs from 'xml-js';
import { SheetProps } from './SheetProps'
import styles from './sheet.module.css'

function findProficiencies(xmlData: any, proficiencies: number[]) {
  for (var prop in xmlData) {
    const type = xmlData[prop].constructor.name
    if (prop == 'proficiency') {
      if (type == 'Object') console.log(parseInt(xmlData[prop]._text))
      else if (type == 'Array') for (var proficiency of xmlData[prop]) proficiencies.push(parseInt(proficiency._text))
    }
    else if (type != 'String') findProficiencies(xmlData[prop], proficiencies)
  }
}

export default function Sheet(props: SheetProps) {

  const [xmlData, setXmlData] = useState<any>(null);

  useEffect(() => {
    fetch('/Quinret Moonfeet.xml')
      .then((response) => response.text())
      .then((xmlText) => {
        const jsonData = xmlJs.xml2json(xmlText, { compact: true, spaces: 4 });
        setXmlData(JSON.parse(jsonData));
      })
      .catch((error) => {
        console.error('Error fetching XML data:', error);
      });
  }, []);

  console.log(xmlData)

  const abilities: string[] = [
    'FORCE',
    'DEXTÉRITÉ',
    'CONSTITUTION',
    'INTELLIGENCE',
    'SAGESSE',
    'CHARISME'
  ]

  const skills: string[] = [
    'Acrobaties',
    'Arcanes',
    'Athlétisme',
    'Discrétion',
    'Dressage',
    'Escamotage',
    'Histoire',
    'Intimidation',
    'Intuition',
    'Investigation',
    'Médecine',
    'Nature',
    'Perception',
    'Persuasion',
    'Religion',
    'Représentation',
    'Survie',
    'Tromperie',
  ]

  /*
  100: Acrobatics
  101: Animal Handling
  102: Arcana
  103: Athletics
  104: Deception
  105: History
  106: Insight
  107: Intimidation
  108: Investigation
  109: Medicine
  110: Nature
  111: Perception
  112: Performance
  113: Persuasion
  114: Religion
  115: Sleight of Hand
  116: Stealth
  117: Survival
  */

  const skillIndexTranslation: number[] = [
    0,  // Acrobatics - Acrobaties
    4,  // Animal Handling - Dressage
    1,  // Arcana - Arcanes
    2,  // Athletics - Athlétisme
    17, // Deception - Tromperie
    6,  // History - Histoire
    8,  // Insight - Intuition
    7,  // Intimidation - Intimidation
    9,  // Investigation - Investigation
    10, // Medicine - Médecine
    11, // Nature - Nature
    12, // Perception - Perception
    15, // Performance - Représentation
    13, // Persuasion - Persuasion
    14, // Religion - Religion
    5,  // Sleight of Hand - Escamotage
    3,  // Stealth - Discrétion
    16, // Survival - Survie
  ]

  const bonus: number[] = [-5, -5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10]

  const proficencies: number[] = []
  if (xmlData) findProficiencies(xmlData, proficencies)

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

  return (
    <div className={`${styles.absolute} ${styles.sheet}`}>
      <div className={`${styles.absolute} ${styles.with_background}`} style={{left: '7.488mm', top: '5.588mm', width: '195.024mm', height: '33.885mm', backgroundImage: 'url("/sheet/page_1_header.svg")'}}/>
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
      <div className={`${styles.absolute} ${styles.with_background}`} style={{left: '9.525mm', top: '44.196mm', width: '21.300mm', height: '159.802mm', backgroundImage: 'url("/sheet/page_1_abilities_container.svg")'}}>
        <div style={{height: '148.302mm', marginTop: '6mm', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
        {abilities.map((value, index) => (
          <div key={index} className={`${styles.with_background}`} style={{width: '18.786mm', height: '22.025mm', backgroundImage: 'url("/sheet/page_1_stat.svg")', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className={`${styles.text} ${styles.text6}`} style={{marginTop: '1mm'}}>{value}</div>
            {abilityScores && <div className={`${styles.text} ${styles.text13}`} style={{marginTop: '-2mm'}}>{abilityScores[index]}</div>}
            {abilityScores && <div className={`${styles.text} ${styles.text9}`} style={{marginBottom: '2mm'}}>{`${bonus[abilityScores[index]] > 0 ? '+' : ''}${bonus[abilityScores[index]]}`}</div>}
          </div>
        ))}
        </div>
      </div>
      <div className={`${styles.absolute} ${styles.with_background}`} style={{left: '32.921mm', top: '44.298mm', width: '39.885mm', height: '9.927mm', backgroundImage: 'url("/sheet/page_1_inspiration.svg")', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className={`${styles.text} ${styles.text9}`} style={{paddingLeft: '4mm'}}>3</div>
        <div className={`${styles.text} ${styles.text7}`} style={{paddingLeft: '3mm', flexGrow: '1', textAlign: 'center'}}>INSPIRATION</div>
      </div>
      <div className={`${styles.absolute} ${styles.with_background}`} style={{left: '32.712mm', top: '56.463mm', width: '40.093mm', height: '12.200mm', backgroundImage: 'url("/sheet/page_1_proficiency_bonus.svg")', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className={`${styles.text} ${styles.text9}`} style={{paddingLeft: '5mm'}}>3</div>
        <div className={`${styles.text} ${styles.text7}`} style={{paddingLeft: '3mm', flexGrow: '1', textAlign: 'center'}}>BONUS DE MAÎTRISE</div>
      </div>
      <div className={`${styles.absolute} ${styles.with_background}`} style={{left: '32.493mm', top: '70.490mm', width: '40.532mm', height: '36.048mm', backgroundImage: 'url("/sheet/page_1_saving_throws_container.svg")'}}>
        <div style={{height: '26.514mm', marginTop: '2mm', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          {abilities.map((value, index) => (
            <div key={index} className={`${styles.with_background} ${styles.text} ${styles.text6}`} style={{marginLeft: '4mm', paddingLeft: '11mm', backgroundImage: savingThrowsProficiencies[index] ? 'url("/sheet/checkbox_true.svg")' : 'url("/sheet/checkbox_false.svg")'}}>{value}</div>
          ))}
        </div>
        <div className={`${styles.text} ${styles.text7}`} style={{position: 'absolute', width: '100%', bottom: '1mm', textAlign: 'center'}}>JETS DE SAUVEGARDE</div>
      </div>
      <div className={`${styles.absolute} ${styles.with_background}`} style={{left: '32.493mm', top: '109.717mm', width: '40.532mm', height: '94.721mm', backgroundImage: 'url("/sheet/page_1_skills_container.svg")'}}>
        <div style={{height: '83.664mm', marginTop: '2mm', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          {skills.map((value, index) => (
            <div key={index} className={`${styles.with_background} ${styles.text} ${styles.text6}`} style={{marginLeft: '4mm', paddingLeft: '11mm', backgroundImage: skillProficiencies[index] ? 'url("/sheet/checkbox_true.svg")' : 'url("/sheet/checkbox_false.svg")'}}>{value}</div>
          ))}
        </div>
        <div className={`${styles.text} ${styles.text7}`} style={{position: 'absolute', width: '100%', bottom: '1mm', textAlign: 'center'}}>COMPÉTENCES</div>
      </div>
      <div className={`${styles.absolute} ${styles.with_background}`} style={{left: '78.856mm', top: '46.783mm', width: '16.934mm', height: '19.431mm', backgroundImage: 'url("/sheet/page_1_armor_class.svg")'}}>
        <div className={`${styles.text} ${styles.text13}`} style={{paddingTop: '6mm', width: '16.934mm', textAlign: 'center'}}>18</div>
        <div className={`${styles.text} ${styles.text7}`} style={{paddingTop: '2mm', width: '16.934mm', textAlign: 'center'}}>CA</div>
      </div>
      <div className={`${styles.absolute} ${styles.with_background}`} style={{left: '97.937mm', top: '47.806mm', width: '18.429mm', height: '17.384mm', backgroundImage: 'url("/sheet/page_1_inititative_speed.svg")'}}>
        <div className={`${styles.text} ${styles.text13}`} style={{paddingTop: '6mm', width: '18.429mm', textAlign: 'center'}}>+3</div>
        <div className={`${styles.text} ${styles.text7}`} style={{paddingTop: '2mm', width: '18.429mm', textAlign: 'center'}}>INITIATIVE</div>
      </div>
      <div className={`${styles.absolute} ${styles.with_background}`} style={{left: '118.614mm', top: '47.806mm', width: '18.429mm', height: '17.384mm', backgroundImage: 'url("/sheet/page_1_inititative_speed.svg")'}}>
        <div className={`${styles.text} ${styles.text13}`} style={{paddingTop: '6mm', width: '18.429mm', textAlign: 'center'}}>9m</div>
        <div className={`${styles.text} ${styles.text7}`} style={{paddingTop: '2mm', width: '18.429mm', textAlign: 'center'}}>VITESSE</div>
      </div>
      <div className={`${styles.absolute} ${styles.with_background}`} style={{left: '9.525mm', top: '206.680mm', width: '63.221mm', height: '9.558mm', backgroundImage: 'url("/sheet/page_1_passive_perception.svg")', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className={`${styles.text} ${styles.text9}`} style={{paddingLeft: '5mm'}}>3</div>
        <div className={`${styles.text} ${styles.text7}`} style={{paddingLeft: '3mm', flexGrow: '1', textAlign: 'center'}}>SAGESSE (PERCEPTION) PASSIVE</div>
      </div>
      <div className={`${styles.absolute} ${styles.with_background}`} style={{left: '78.856mm', top: '68.049mm', width: '58.188mm', height: '21.815mm', backgroundImage: 'url("/sheet/page_1_hit_points.svg")', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className={`${styles.text} ${styles.text8}`} style={{width: '58.188mm', marginTop: '2mm', marginLeft: '5mm'}}>Maximum de points de vie :</div>
        <div className={`${styles.text} ${styles.text8}`} style={{width: '58.188mm', marginBottom: '1mm', textAlign: 'center'}}>POINTS DE VIE ACTUELS</div>
      </div>
      <div className={`${styles.absolute} ${styles.with_background}`} style={{left: '78.856mm', top: '90.920mm', width: '58.188mm', height: '17.597mm', backgroundImage: 'url("/sheet/page_1_temporary_hit_points.svg")', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
        <div/>
        <div className={`${styles.text} ${styles.text8}`} style={{width: '58.188mm', marginBottom: '1mm', textAlign: 'center'}}>POINTS DE VIE TEMPORAIRES</div>
      </div>
      <div className={`${styles.absolute} ${styles.with_background}`} style={{left: '78.856mm', top: '111.108mm', width: '27.878mm', height: '17.399mm', backgroundImage: 'url("/sheet/page_1_hit_dice.svg")', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className={`${styles.text} ${styles.text6}`} style={{width: '27.878mm', marginTop: '2mm', marginLeft: '5mm'}}>Total :</div>
        <div className={`${styles.text} ${styles.text6}`} style={{width: '27.878mm', marginBottom: '1.5mm', textAlign: 'center'}}>DÉS DE VIE</div>
      </div>
      <div className={`${styles.absolute} ${styles.with_background}`} style={{left: '108.867mm', top: '111.108mm', width: '27.878mm', height: '17.399mm', backgroundImage: 'url("/sheet/page_1_hit_dice.svg")', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className={`${styles.text} ${styles.text6} ${styles.with_background}`} style={{marginTop: '2mm', width: '22mm', height: '3.302mm', backgroundPosition: 'right', backgroundImage: 'url("/sheet/page_1_death_saves.svg")'}}>SUCCÈS</div>
        <div className={`${styles.text} ${styles.text6} ${styles.with_background}`} style={{marginBottom: '0mm', width: '22mm', height: '3.302mm', backgroundPosition: 'right', backgroundImage: 'url("/sheet/page_1_death_saves.svg")'}}>ÉCHECS</div>
        <div className={`${styles.text} ${styles.text6}`} style={{width: '27.878mm', marginBottom: '1.5mm', textAlign: 'center'}}>JdS CONTRE LA MORT</div>
      </div>
      <div className={`${styles.absolute} ${styles.with_background}`} style={{left: '75.318mm', top: '134.212mm', width: '65.263mm', height: '70.227mm', backgroundImage: 'url("/sheet/page_1_attacks.svg")', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
      </div>
    </div>
  )
}