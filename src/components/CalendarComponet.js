import React from 'react';
import 'antd/dist/antd.css'; 
import { Calendar } from 'antd';
import moment from 'moment';


function CalendarComponet(props){


function onPanelChange(value) {
 
  props.setPopDate(value.toDate())

}


    return (
      <div className="site-calendar-demo-card">
  <Calendar fullscreen={false} onSelect={onPanelChange} defaultValue={moment(props.popDate)}/>
  </div>
  );

}

export default CalendarComponet;
