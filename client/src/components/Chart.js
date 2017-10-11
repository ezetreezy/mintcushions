import React from 'react';
import {Sparklines, SparklinesLine, SparklinesBars} from 'react-sparklines';


export default (props) => {
  return(
    <div className={props.styling}>
        <Sparklines height={15} width={45} data={props.data}>
          {props.bar ? <SparklinesBars color={props.color}/> : <SparklinesLine color={props.color}/>}
        </Sparklines>
        <button type="button" className="btn btn-sm text-white"
          style={{backgroundColor: props.textColor}}>{props.stat + ': ' + props.avg}</button>
    </div>
  );
}
