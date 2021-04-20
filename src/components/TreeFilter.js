import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios';

const { Option } = Select;
const TreeFilter = (props) => {
//수정필요
const [roomData, setRoomData] = useState({"오리연구소":{"1F":[""] , "4F":[""], "5F":[""]}})

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



  const locationsData =Object.keys(roomData)
  const floorData ={}
  for(const item of locationsData){
      floorData[item]= Object.keys(roomData[item]);
    }


  const [location, setLocation] = React.useState(locationsData[0])
  const [locations, setLocations] = React.useState(floorData[locationsData[0]]);
  const [floor, setFloor] = React.useState(floorData[locationsData[0]][0]);
  

  const handlelocationsChange = value => {
    setLocation(value)
    setLocations(floorData[value]);
    setFloor(floorData[value][0]);
    props.setData([value, floorData[value][0]]);
  };

  const onFloorChange = value => {
    setFloor(value);
    props.setData([location, value]);


  };


  return (
    <>
      <Select defaultValue={locationsData[0]} style={{ width: 120 }} onChange={handlelocationsChange}>
        {locationsData.map(province => (
          <Option key={province}>{province}</Option>
        ))}
      </Select>
      <Select style={{ width: 120 }} value={floor} onChange={onFloorChange}>
        {locations.map(city => (
          <Option key={city}>{city}</Option>
        ))}
      </Select>
    </>
  );
};

export default TreeFilter;