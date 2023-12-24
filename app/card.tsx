import { CardProps } from "./CardProps";

export default function Card(props: CardProps) {
  const regex = /^\(.*?\) /g
  const match = regex.test(props.text)
  const materials = match ? props.text.match(regex)?.[0].slice(1,-2) : undefined
  const text = match ? props.text.replace(regex, '') : props.text

  const regexFollowUp = /\([^1]\/\d\)/g
  const skipArray = false//regexFollowUp.test(props.name) 

  /* Wizard #1c71d8 */
  const color = props.color ? props.color : '#000'
  
  return (
    <div className="myCard" style={{backgroundColor: color}}>
      <div className="myBody">
        <div className="myTitle" style={{borderColor: color}} dangerouslySetInnerHTML={{__html: props.title}}></div>
        {props.keyValueFirstLine &&
          <div className="keyValueLine" style={{borderColor: color}}>
            <div className="keyValueColumn">
              <div className="keyValueColumnHeader">{props.keyValueFirstLine[0]}</div>
              <div className="keyValueColumnValue">{props.keyValueFirstLine[1]}</div>
            </div>
            <div className="keyValueSeparator" style={{backgroundColor: color}}/>
            <div className="keyValueColumn">
              <div className="keyValueColumnHeader">{props.keyValueFirstLine[2]}</div>
              <div className="keyValueColumnValue">{props.keyValueFirstLine[3]}</div>
            </div>
          </div>
        }
        {props.keyValueSecondLine &&
          <div className="keyValueLine" style={{borderColor: color}}>
            <div className="keyValueColumn">
              <div className="keyValueColumnHeader">{props.keyValueSecondLine[0]}</div>
              <div className="keyValueColumnValue">{props.keyValueSecondLine[1]}</div>
            </div>
            <div className="keyValueSeparator" style={{backgroundColor: color}}/>
            <div className="keyValueColumn">
              <div className="keyValueColumnHeader">{props.keyValueSecondLine[2]}</div>
              <div className="keyValueColumnValue">{props.keyValueSecondLine[3]}</div>
            </div>
          </div>
        }
        {props.separatorText && <div className="separatorText" style={{backgroundColor: color}}>{props.separatorText}</div>}
        
        <div className="myText" dangerouslySetInnerHTML={{__html: props.text}} />
        {props.image && <><div className="grow"/><img src={props.image} width={props.imageSize}/><div className="grow"/></>}
      </div>
      <div className="myBottom">
        {props.bottomLeft && <b className="myLeft">{props.bottomLeft}</b>}
        {props.bottomRight && <b className="myRight">{props.bottomRight}</b>}
      </div>
    </div>
  )
}