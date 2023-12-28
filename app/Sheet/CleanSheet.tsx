import { CharacterSheet, abilities, hitDiceType, modifierFormat, scoreToModifier, scoreToModifierString, skills } from "./SheetHelper"
import { SvgElement } from "./SimpleSvg/SvgElement"
import { SvgGroup } from "./SimpleSvg/SvgGroup"
import { SvgContainer } from "./SvgContainer"
import { SvgImage } from "./SvgImage"
import styles from './sheet.module.css'

interface CleanSheetProps {
  svgData: SvgGroup
  characterSheet: CharacterSheet
  removeFeat: Function
}

export default function CleanSheet(props: CleanSheetProps) {

  function getSvgDataForId(id: string): SvgElement {
    const returnValue = props.svgData.getItem(id)
    if (returnValue) return returnValue
    else throw new Error(`id ${id} not found`)
  }

  console.log(props.characterSheet)
  
  const bboxName = props.svgData.getItem('position_character_name')?.bbox
  const bboxRace = props.svgData.getItem('position_character_race')?.bbox
  const bboxClass = props.svgData.getItem('position_character_class')?.bbox
  const bboxBackground = props.svgData.getItem('position_character_background')?.bbox
  const bboxSpellAbility = props.svgData.getItem('position_spell_ability')?.bbox

  return (
    <>
    <div style={{position: 'relative'}}>
      <div className={`${styles.absolute} ${styles.sheet}`}>
        <SvgContainer svgPathData={getSvgDataForId('container_header')}>
        </SvgContainer>
        <SvgContainer svgPathData={getSvgDataForId('container_abilities')}>
          <div style={{height: `${getSvgDataForId('container_abilities').bbox.height - 12}mm`, marginTop: '6mm', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
            {abilities.map((value, index) => (
              <div key={index} className={`${styles.with_background}`} style={{width: `${props.svgData.getItem('image_ability_score')?.bbox.width}mm`, height: `${props.svgData.getItem('image_ability_score')?.bbox.height}mm`, backgroundImage: `url(data:image/svg+xml;base64,${btoa(props.svgData.getItem('image_ability_score')?.getImageHtml() || '')})`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                <div className={`${styles.text} ${styles.text7}`} style={{marginTop: '1mm'}}>{value}</div>
                <div className={`${styles.text} ${styles.text13}`} style={{marginTop: '-2mm'}}>{props.characterSheet.abilityScores[index]}</div>
                <div className={`${styles.text} ${styles.text9}`} style={{marginBottom: '2mm'}}>{scoreToModifierString(props.characterSheet.abilityScores[index])}</div>
              </div>
            ))}
          </div>
        </SvgContainer>
        <SvgContainer svgPathData={getSvgDataForId('container_proficiency_bonus')}>
          <div style={{marginTop: '3.5mm'}}>
            <span className={`${styles.text} ${styles.text10}`} style={{paddingLeft: '3mm'}}>{modifierFormat.format(props.characterSheet.proficiencyBonus)}</span>
            <span className={`${styles.text} ${styles.text7}`} style={{paddingLeft: '5mm'}}>BONUS DE MAÎTRISE</span>
          </div>
        </SvgContainer>
        <SvgContainer svgPathData={getSvgDataForId('container_saving_throws')}>
          <table style={{height: `${getSvgDataForId('container_saving_throws').bbox.height-8}mm`, paddingLeft: '4mm', marginTop: '2mm'}}>
            <tbody>
              {abilities.map((value, index) => (
                <tr key={index} className={`${styles.with_background} ${styles.text} ${styles.text7}`} style={{}}>
                  <td style={{verticalAlign: 'middle'}}><SvgImage svgPathData={props.characterSheet.savingThrowProficiencies[index] ? props.svgData.getItem('image_checkbox_true') : props.svgData.getItem('image_checkbox_false')}/></td>
                  <td style={{width: '8mm', textAlign: 'center'}}>{modifierFormat.format(props.characterSheet.savingThrowBonuses[index])}</td>
                  <td style={{}}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={`${styles.text} ${styles.text7}`} style={{position: 'absolute', width: '100%', bottom: '2mm', textAlign: 'center'}}>JETS DE SAUVEGARDE</div>
        </SvgContainer>
        <SvgContainer svgPathData={getSvgDataForId('container_skills')}>
          <table style={{height: `${getSvgDataForId('container_skills').bbox.height-8}mm`, paddingLeft: '4mm', marginTop: '2mm'}}>
            <tbody>
              {skills.map((value, index) => (
                <tr key={index} className={`${styles.with_background} ${styles.text} ${styles.text7}`} style={{}}>
                  <td style={{verticalAlign: 'middle'}}><SvgImage svgPathData={props.characterSheet.skillProficiencies[index] ? props.svgData.getItem('image_checkbox_true') : props.svgData.getItem('image_checkbox_false')}/></td>
                  <td style={{width: '8mm', textAlign: 'center'}}>{modifierFormat.format(props.characterSheet.skillBonuses[index])}</td>
                  <td style={{}}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={`${styles.text} ${styles.text7}`} style={{position: 'absolute', width: '100%', bottom: '1mm', textAlign: 'center'}}>COMPÉTENCES</div>
        </SvgContainer>
        <SvgContainer svgPathData={getSvgDataForId('container_armor_class')}>
          <div className={`${styles.text} ${styles.text13}`} style={{paddingTop: '3mm', width: `${getSvgDataForId('container_armor_class').bbox.width}mm`, textAlign: 'center'}}>{props.characterSheet.armorClass}</div>
          <div className={`${styles.text} ${styles.text7}`} style={{paddingTop: '0mm', width: `${getSvgDataForId('container_armor_class').bbox.width}mm`, textAlign: 'center'}}>CA</div>
        </SvgContainer>
        <SvgContainer svgPathData={getSvgDataForId('container_initiative')}>
          <div className={`${styles.text} ${styles.text13}`} style={{paddingTop: '2.5mm', width: `${getSvgDataForId('container_initiative').bbox.width}mm`, textAlign: 'center'}}>{modifierFormat.format(props.characterSheet.initiative)}</div>
          <div className={`${styles.text} ${styles.text6}`} style={{paddingTop: '0mm', width: `${getSvgDataForId('container_initiative').bbox.width}mm`, textAlign: 'center'}}>Inititative</div>
        </SvgContainer>
        <SvgContainer svgPathData={getSvgDataForId('container_speed')}>
          <div className={`${styles.text} ${styles.text13}`} style={{paddingTop: '2.5mm', width: `${getSvgDataForId('container_speed').bbox.width}mm`, textAlign: 'center'}}>9m</div>
          <div className={`${styles.text} ${styles.text6}`} style={{paddingTop: '0mm', width: `${getSvgDataForId('container_speed').bbox.width}mm`, textAlign: 'center'}}>Vitesse</div>
        </SvgContainer>
        <SvgContainer svgPathData={getSvgDataForId('container_attacks')}>
          <table style={{marginTop: '2mm', marginLeft: '3mm', width: `${getSvgDataForId('container_attacks').bbox.width - 6}mm`}}>
            <thead>
              <tr>
                <td className={`${styles.text} ${styles.text6}`} style={{width: '26mm', textAlign: 'center'}}>NOM</td>
                <td className={`${styles.text} ${styles.text6}`} style={{width: '11mm', textAlign: 'center'}}>BONUS</td>
                <td className={`${styles.text} ${styles.text6}`} style={{textAlign: 'center'}}>DÉGÂTS / TYPE</td>
              </tr>
            </thead>
            <tbody>
              {props.characterSheet.attacks.map((value, index) => (
                <tr key={index}>
                  <td className={`${styles.text} ${styles.text6}`} style={{backgroundColor: '#e5e5e5', width: '26mm', textAlign: 'center'}}>{value.name}</td>
                  <td className={`${styles.text} ${styles.text6}`} style={{backgroundColor: '#e5e5e5', width: '11mm', textAlign: 'center'}}>{modifierFormat.format(value.attackBonus)}</td>
                  <td className={`${styles.text} ${styles.text6}`} style={{backgroundColor: '#e5e5e5', textAlign: 'center'}} dangerouslySetInnerHTML={{__html: value.damage}} />
                </tr>
              ))}
            </tbody>
          </table>
          <div className={`${styles.text} ${styles.text7}`} style={{position: 'absolute', width: '100%', bottom: '1mm', textAlign: 'center'}}>ATTAQUES</div>
        </SvgContainer>
        <SvgContainer svgPathData={getSvgDataForId('container_counters')}>
          <div style={{width: `${getSvgDataForId('container_counters').bbox.width - 4}mm`, marginLeft: '2mm' }}>
          {props.characterSheet.counters.map((value, index) => {
            return <div key={index} style={{marginTop: '2mm', textAlign: 'center', backgroundColor: '#e5e5e5', }}>
              <div className={`${styles.text} ${styles.text7}`} style={{textAlign: 'center'}}>{value.name}</div>
              {Array(value.max).fill(value).map((value, index) => {
                return <div key={index} style={{display: 'inline-block', marginTop: '1mm', marginLeft: '1mm', backgroundColor: '#fff', width: '4.5mm', height: '4.5mm', borderWidth: '1pt', borderStyle: 'solid', borderColor: '#000'}} />
              })}
            </div>
          })}
          </div>
          <div className={`${styles.text} ${styles.text7}`} style={{position: 'absolute', width: '100%', bottom: '1mm', textAlign: 'center'}}>COMPTEURS</div>
        </SvgContainer>
        <SvgContainer svgPathData={getSvgDataForId('container_hit_points')}>
          <div className={`${styles.text} ${styles.text6}`} style={{position: 'absolute', width: '100%', bottom: '1mm', textAlign: 'center'}}>POINTS DE VIE ACTUELS ({props.characterSheet.hpMax})</div>
        </SvgContainer>
        <SvgContainer svgPathData={getSvgDataForId('container_hit_dice')}>
          <div style={{width: `${getSvgDataForId('container_hit_dice').bbox.width - 4}mm`, marginLeft: '2mm', marginTop: '1mm' }}>
            {Array(props.characterSheet.level).fill(0).map((value, index) => {
              return <span key={index} style={{paddingRight: '0.6mm'}}><SvgImage svgPathData={getSvgDataForId(hitDiceType(props.characterSheet.className))} /></span>
            })}
          </div>
          <div className={`${styles.text} ${styles.text6}`} style={{position: 'absolute', width: '100%', bottom: '1mm', textAlign: 'center'}}>DÉS DE VIE</div>
        </SvgContainer>
        <SvgContainer svgPathData={getSvgDataForId('container_death_saves')}>
          <table style={{borderSpacing: '0', marginLeft: '2.5mm', marginTop: '2mm'}}>
            <tbody>
              <tr>
                <td className={`${styles.text} ${styles.text6}`} >SUCCÈS</td>
                <td><SvgImage svgPathData={getSvgDataForId('image_deathsaves')}/></td>
              </tr>
              <tr>
                <td className={`${styles.text} ${styles.text6}`} >ÉCHECS</td>
                <td><SvgImage svgPathData={getSvgDataForId('image_deathsaves')}/></td>
              </tr>
            </tbody>
          </table>
          <div className={`${styles.text} ${styles.text6}`} style={{position: 'absolute', width: '100%', bottom: '1mm', textAlign: 'center'}}>JdS CONTRE LA MORT</div>
        </SvgContainer>
        <SvgContainer svgPathData={getSvgDataForId('container_text')}>
          <div style={{overflow: 'hidden', width: `${getSvgDataForId('container_text').bbox.width - 6}mm`, height: `${getSvgDataForId('container_text').bbox.height - 6}mm`, margin: '3mm', columnCount: 3, columnFill: 'auto'}}>
            {props.characterSheet.feats.map((value, index) => (
              <div key={index} className={`${styles.with_background}`} style={{/*breakInside: 'avoid',*/ marginBottom: '2mm' }}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div className={`${styles.text} ${styles.text7}`}>{value.name}</div>
                  <div className={`${styles.text} ${styles.text7} ${styles.text_link} no-print`} onClick={() => props.removeFeat(index, 2)}>move</div>
                  <div className={`${styles.text} ${styles.text7} ${styles.text_link} no-print`} onClick={() => props.removeFeat(index)}>remove</div>
                </div>
                <div className={`${styles.rules_text} ${styles.text7}`} dangerouslySetInnerHTML={{__html: value.text}} />
              </div>
            ))}
          </div>
        </SvgContainer>
          
        {/* Header */}
        {bboxName && <div className={`${styles.absolute} ${styles.text} ${styles.text13}`} style={{left: `${bboxName.x}mm`, top: `${bboxName.y}mm`, width: `${bboxName.width}mm`, height: `${bboxName.height}mm`, textAlign: 'center' }}>{props.characterSheet.name}</div>}
        {bboxClass && <div className={`${styles.absolute} ${styles.text} ${styles.text8}`} style={{left: `${bboxClass.x}mm`, top: `${bboxClass.y}mm`, width: `${bboxClass.width}mm`, height: `${bboxClass.height}mm` }}>{`${props.characterSheet.className} level ${props.characterSheet.level}`}</div>}
        {bboxRace && <div className={`${styles.absolute} ${styles.text} ${styles.text8}`} style={{left: `${bboxRace.x}mm`, top: `${bboxRace.y}mm`, width: `${bboxRace.width}mm`, height: `${bboxRace.height}mm` }}>{props.characterSheet.race}</div>}
        {bboxBackground && <div className={`${styles.absolute} ${styles.text} ${styles.text8}`} style={{left: `${bboxBackground.x}mm`, top: `${bboxBackground.y}mm`, width: `${bboxBackground.width}mm`, height: `${bboxBackground.height}mm` }}>{props.characterSheet.background}</div>}

      </div>

      {props.characterSheet.page2Feats.length > 0 && <div className={`${styles.absolute} ${styles.sheet}`} style={{top: '297mm'}}>
        <SvgContainer svgPathData={getSvgDataForId('p2_container_text')}>
          <div style={{overflow: 'hidden', width: `${getSvgDataForId('p2_container_text').bbox.width - 6}mm`, height: `${getSvgDataForId('p2_container_text').bbox.height - 6}mm`, margin: '3mm', columnCount: 4, columnFill: 'auto'}}>
            {props.characterSheet.page2Feats.map((value, index) => (
              <div key={index} className={`${styles.with_background}`} style={{/*breakInside: 'avoid',*/ marginBottom: '2mm' }}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div className={`${styles.text} ${styles.text7}`}>{value.name}</div>
                </div>
                <div className={`${styles.rules_text} ${styles.text7}`} dangerouslySetInnerHTML={{__html: value.text}} />
              </div>
            ))}
          </div>
        </SvgContainer>
      </div>}

      {props.characterSheet.spells.length > 0 && <div className={`${styles.absolute} ${styles.sheet}`} style={{top: `${props.characterSheet.page2Feats.length > 0 ? 594 : 297}mm`}}>
        <SvgContainer svgPathData={getSvgDataForId('header_spells')} />
        {bboxSpellAbility && <div className={`${styles.absolute} ${styles.text} ${styles.text13}`} style={{left: `${bboxSpellAbility.x}mm`, top: `${bboxSpellAbility.y}mm`, width: `${bboxSpellAbility.width}mm`, height: `${bboxSpellAbility.height}mm`, textAlign: 'center' }}>{abilities[props.characterSheet.spellAbility]}</div>}
        
        {props.characterSheet.spellsPerDay > 0 && <SvgContainer svgPathData={getSvgDataForId('container_spells_per_day')}>
          <div style={{width: `${getSvgDataForId('container_spells_per_day').bbox.width}mm`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className={`${styles.text} ${styles.text13}`} style={{marginTop:'3mm'}} >{props.characterSheet.spellsPerDay}</div>
            <div className={`${styles.text} ${styles.text8}`} style={{marginTop:'3.2mm', textAlign: 'center'}} >Sorts à préparer chaque jour</div>
          </div>
        </SvgContainer>}
        <SvgContainer svgPathData={getSvgDataForId('container_spells_dd')}>
          <div style={{width: `${getSvgDataForId('container_spells_dd').bbox.width}mm`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className={`${styles.text} ${styles.text13}`} style={{marginTop:'3mm'}} >{props.characterSheet.spellsDd}</div>
            <div className={`${styles.text} ${styles.text8}`} style={{marginTop:'3.2mm', textAlign: 'center'}} >Degré de difficulté des sorts</div>
          </div>
        </SvgContainer>
        <SvgContainer svgPathData={getSvgDataForId('container_spells_attack_bonus')}>
          <div style={{width: `${getSvgDataForId('container_spells_dd').bbox.width}mm`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className={`${styles.text} ${styles.text13}`} style={{marginTop:'3mm'}} >{modifierFormat.format(props.characterSheet.spellAttackBonus)}</div>
            <div className={`${styles.text} ${styles.text8}`} style={{marginTop:'3.2mm', textAlign: 'center'}} >Bonus d'attaque des sorts</div>
          </div>
        </SvgContainer>
        <SvgContainer svgPathData={getSvgDataForId('container_spells')}>
          <div style={{overflow: 'hidden', width: `${getSvgDataForId('container_spells').bbox.width - 6}mm`, height: `${getSvgDataForId('p2_container_text').bbox.height - 6}mm`, margin: '3mm', columnCount: 3, columnFill: 'auto'}}>
            {props.characterSheet.spellSlots.filter((value) => { return value > 0 }).map((value, index) => {
              return <div key={index} style={{marginBottom: '2mm' }}>
                <div className={`${styles.with_background}`} style={{width: `${props.svgData.getItem('image_spell_header')?.bbox.width}mm`, height: `${props.svgData.getItem('image_spell_header')?.bbox.height}mm`, backgroundImage: `url(data:image/svg+xml;base64,${btoa(props.svgData.getItem('image_spell_header')?.getImageHtml() || '')})`, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <div className={`${styles.text} ${styles.text12}`} style={{marginLeft: '2mm', width: '10mm'}}>{index}</div>
                  {index != 0 && <div>{Array(value).fill(value).map((value, index) => {
                    return <div key={index} style={{display: 'inline-block', marginTop: '1mm', marginLeft: '1mm', backgroundColor: '#fff', width: '5mm', height: '5mm', borderWidth: '1pt', borderStyle: 'solid', borderColor: '#000'}} />
                  })}</div>}
                </div>
                <table style={{paddingLeft: '1mm'}}>
                  <tbody>
                  {props.characterSheet.spells[index].map((value, index) => {
                    return <tr key={index} style={{}}>
                      <td style={{verticalAlign: 'middle', width: '4mm'}}><SvgImage svgPathData={props.svgData.getItem('image_checkbox_false')}/></td>
                      <td className={`${styles.rules_text} ${styles.text12}`} style={{}}>{value.name}</td>
                    </tr>
                  })}
                  </tbody>
                </table>
              </div>
            })}
          </div>
        </SvgContainer>
      </div>}
      
    </div>
    
    </>

  )
}