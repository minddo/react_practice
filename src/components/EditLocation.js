import React, { useState, useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';


function EditLocation(props){
    const [ items, setItems ] = useState([]);
    const [ result, setResult ] = useState('');
    const [ inputText, setInputText ] = useState('');
    const [ nextId, setNextId ] = useState('');


    const style1 = {
        margin: "5px",
        cursor: "pointer",
        backgroundColor: "#EEEEFC",
        borderRadius: "10px"
    }

    const style2 = {
        margin: "5px",
        cursor: "pointer",
        backgroundColor: "white"
    }


    const inputStyle = {
        paddingLeft:'10px', 
        borderStyle:'dashed', 
        borderRadius:'10px', 
        borderWidth:'1px', 
        marginRight:'10px',
        marginBottom: "10px", 
        width: "190px" 
    }

    const btnStyle ={
        borderRadius: "10px",
        fontSize: "14px",
        width: "40px"
    }

    


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

            var location = []
            try{
                location = Object.keys(meetingRoomData)
                if (location === undefined){location = []}
            }
            catch(e){location = []}
            
            const itemList = [];
            for(let i=0; i < location.length; i++){
                itemList.push({index: i, text:location[i]})
            }

            setItems(itemList)
            setNextId(itemList.length+1)
      
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
    

    const itemOnClick = (e) => {
        props.setQuery(e.target.innerText)
        setResult(e.target.innerText)
   
        if(e.target.tagName ==='svg'){
            const target = e.nativeEvent.path[1].getAttribute('class').split(' ')[2]
            const temp = [...items]
            const idx = temp.findIndex(function (item) {return item.text === target})
            if (idx > -1) {temp.splice(idx,1)}
        setItems(temp)
        }
    }


    const onChange = (e) => {
        setInputText(e.target.value)
    }
  
  
    const onClickBtn = () => {
        const nextItems = items.concat({
            index: nextId,
            text: inputText
        });
        setNextId(nextId+1);
        setItems(nextItems);
        setInputText('');
    }

    const nameList = items.map(item => <li key={item.index} style={item.text===result?style1:style2} onClick={itemOnClick}>{item.text}{(props.mode==='editBtn') ? <DeleteOutlined className={item.text} style={{marginLeft:"15px", cursor:'pointer'}}/> : null}</li>)



      return (
        <>
        <ul>{nameList}</ul>
        <div>
        {(props.mode==='editBtn') ? <input value={inputText} placeholder='항목을 추가하세요' style={inputStyle} onChange={onChange}/>:null}
        {(props.mode==='editBtn') ? <button style={btnStyle} onClick={onClickBtn}>추가</button>:null}
        </div>
        </>
      )
    

}

export default EditLocation;