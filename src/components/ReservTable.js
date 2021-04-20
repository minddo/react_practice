import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import Popup from './Popup';
import CompletePopUp from './CompletePopUp';
import axios from 'axios';

function ReservTable(props) {
  
  const [roomData, setRoomData] = useState({"오리연구소":{"1F":[""]}})
  const [query, setQuery] = useState(true)
  const [result, setResult] = useState([])

  const readMTR = async() => {
    try{
        const response = await axios.post("http://192.168.179.238:14000/GA_APP/GA_SG/ReadMTR?action=SO", {
            'dto': {
        }
    })
    .then(function (response){
        var result =response.data.dto.ReservList
        const  meetingRoomData={}
        for (let i=0; i<result.length; i++){
          if (!(result[i]['LOCATION'] in meetingRoomData)){
              meetingRoomData[result[i]['LOCATION']]={}
          }
          if (!(result[i]['FLOOR'] in meetingRoomData[result[i]['LOCATION']])){
              meetingRoomData[result[i]['LOCATION']][result[i]['FLOOR']] = []
          }
          meetingRoomData[result[i]['LOCATION']][result[i]['FLOOR']].push(result[i]['ROOM_NAME'])
        }
        setRoomData(meetingRoomData)   
  
    })
    .catch(function (error){
        console.log(error);
    })
    }catch (e) {
        console.log(e)
    }
  }

  useEffect(() => {
    readMTR()

  }, [])




  const current_table = roomData[props.data[0]][props.data[1]];
  const start = '07:00';
  const end = '24:00';
  const interval = 30;
  const numOfTime = (Number(end.split(':')[0])-Number(start.split(':')[0]))*(60/interval) + 
  (Number(end.split(':')[1])-Number(start.split(':')[1]))/interval
  const timeTable = [];

  function modifyTime(n){
    if (n.length==1){
      return '0'+ n
    }
    else{
      return n
    }
  }

  
  var startTime = start
  for (let i=0; i<numOfTime; i++){

    let endTime='';
    if (Number(startTime.split(':')[1])+interval>=60){
      endTime=modifyTime(String(Number(startTime.split(':')[0])+1))+":"+modifyTime(String(Number(startTime.split(':')[1])+interval-60))
    }
    else{
      endTime=startTime.slice(0,3)+modifyTime(String(Number(startTime.split(':')[1])+interval))
    }
    timeTable.push(startTime+"~"+endTime)
    startTime=endTime
  }


  const columns=[{title: '시간', dataIndex: '시간'}];
  for (const item of current_table){
    columns.push({title: item, dataIndex: item});
  }
  const table = []
  for (let i=0; i<numOfTime; i++){
    var temp = {}
    for (const item of columns){
      if (item['title'] === '시간'){
        temp[item['title']] = timeTable[i]
      }
      else{
        temp[item['title']] = <Popup name={item['title']} date={props.date} time={timeTable[i]}  setQuery={setQuery} userInfo={props.userInfo}/> 
      }
    }
  table.push(temp)
  }


  // read reservation
  const day = props.date.slice(0,4)+props.date.slice(5,7)+props.date.slice(8,10)
  const [location, floor] = props.data
  const userName=  props.userInfo['USER_NAME']
  function calculateIndex(h,m) {
    return (Number(h)-7)*2+Number(m)/30
  }

  const readReserve = async(day,location, floor) => {
    try{
        const response = await axios.post("http://192.168.179.238:14000/GA_APP/GA_SG/ReadReserv?action=SO", {
            'dto': {
                "RESERVE_DATE": day,
                'LOCATION' : location,
                'FLOOR' : floor
        }
    })
    .then(function (response){
      if(response.data.dto.ReservList===null){
        setResult([])
      }
      else{
        setResult(response.data.dto.ReservList)
      }
    })
    .catch(function (error){
        console.log(error);
    })
    }catch (e) {
        console.log(e)
    }
}

useEffect (() => {
  readReserve(day, location, floor)
}, [day,location,floor,query])

for (let i=0; i<result.length; i++){
  const [h1,m1,h2,m2] = [result[i]['START_TIME'].slice(0,2), result[i]['START_TIME'].slice(3,5),result[i]['END_TIME'].slice(0,2), result[i]['END_TIME'].slice(3,5)]
  const start_index=calculateIndex(h1,m1)
  const end_index=calculateIndex(h2,m2)-1
  const reservCom = <CompletePopUp userName={userName} name={result[i]['ROOM_NAME']} date={props.date} reservedTime={[h1,m1,h2,m2]} setQuery={setQuery} empID={props.userInfo['EMPLOYEE_ID']}/>
  for (var j=start_index; j<=end_index; j++){
    table[j][result[i]['ROOM_NAME']] = reservCom
  }
}


    return(
        <div>
            <Table style={{width: '1200px'}} columns={columns} dataSource={table} pagination={false} size="small" />
        </div>
    )
}

export default ReservTable;