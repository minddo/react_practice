import React, { useState } from 'react';
import Modal from './Modal';
import checkIcon from '../img/check.svg';
import '../css/Popup.css';
import HourFilter from './HourFilter';
import MinFilter from './MinFilter';
import axios from 'axios';

function Popup(props) {
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [ modalOpen, setModalOpen ] = useState(false);
    const [time1, time2] = String(props.time).split('~')
    const [h1, m1] = time1.split(':')
    const [h2, m2] = time2.split(':')
    const [hb, setHb] = useState(h1)
    const [mb, setMb] = useState(m1)
    const [ha, setHa] = useState(h2)
    const [ma, setMa] = useState(m2)
    const [purpose, setPurpose] = useState('')
    const [num, setNum] = useState('')

 
/*
    const ReadMTR = async(roomName) => {
        try{
            const response = await axios.post("http://192.168.179.238:14000/GA_APP/GA_SG/ReadMTR?action=SO", {
                'dto': {
                    "ROOM_NAME": roomName
            }
        })
        .then(function (response){
            const roomID = response.data.dto.ReservList[0]['MEETING_ROOM_ID']
            if (purpose==='' || num===''){
                alert("필수정보를 입력하세요.")
            }
            else{
                insertReserve(props.userInfo['EMPLOYEE_ID'], roomID,  reservDate, purpose, num, hb+mb, ha+ma)
            }
            
        })
        .catch(function (error){
            console.log(error);
        })
        }catch (e) {
            console.log(e)
        }
    }
    */
/* 
쿼리 수정하여 다시 구현,
null 값이 들어왔을때 alert 해줘야함
if (purpose==='' || num===''){
    alert("필수정보를 입력하세요.")
}
*/
    const insertReserve = async(empID, roomName,  reservDate, purpose, usedNum, startTime, endTime) => {
        try{
            const response = await axios.post("http://192.168.179.238:14000/GA_APP/GA_SG/InsertReserv?action=SO", {
                'dto': {
                    "EMPLOYEE_ID": empID,
                    "ROOM_NAME" : roomName,
                    "RESERVE_DATE": reservDate,
                    "PURPOSE": purpose,
                    "USED_NUM": usedNum,
                    "START_TIME": startTime,
                    "END_TIME": endTime
            }
        })
        .then(function (response){
            console.log(response.data.dto.ReservList)
            props.setQuery(false)
        })
        .catch(function (error){
            console.log(error);
        })
        }catch (e) {
            console.log(e)
        }
    }


    const reservDate = props.date.slice(0,4)+props.date.slice(5,7)+props.date.slice(8,12)
    
    const openModal = () => {
        setModalOpen(true);
        props.setQuery(true)
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const saveModal = () => {
        setModalOpen(false);
        if (purpose==='' || num===''){
            alert("필수정보를 입력하세요.")
        }
        else{
             insertReserve(props.userInfo['EMPLOYEE_ID'], props.name,  reservDate, purpose, num, hb+mb, ha+ma)
        }

    }

    function handleChangeP(e){
        setPurpose(e.target.value)
    }
    
    function handleChangeN(e){
        setNum(e.target.value)
    }

    
    
    return (
        <React.Fragment>
            <img src={checkIcon} onClick={ openModal } style={{cursor : 'pointer', marginLeft:"10px", marginRight:"10px"}}></img>
            <Modal mode='reserv' open={ modalOpen } close={ closeModal } save={ saveModal } header="예약"> 
            <div className='reservBlock'>
                <div className='reservContents'>
                    <span>회의실</span>
                    <span><input className="meetingRoomBox" type="text" placeholder={props.name}/></span>
                </div>
                <hr/>

                <div className='reservContents'  style={{textAlign:'left'}}>
                    <span >일자</span>
                    <span  style={{marginRight:100}}>
                        <div><input className="dayBox" type="text" placeholder={props.date} readOnly/></div> 
                        <div><HourFilter h={[hb, setHb]}/>:<MinFilter m={[mb, setMb]}/>~<HourFilter h={[ha, setHa]}/>:<MinFilter m={[ma, setMa]}/></div>
                    </span>
                </div>
                <hr/>

                <div className='reservContents'>
                    <span>목적</span>
                    <input  name='purpose 'className="purposeBox" type="text" placeholder=""  onChange={handleChangeP}/>
                </div>
                <hr/>

                <div className='reservContents'>
                    <span> 예상인원</span>
                    <span style={{marginRight:255}}><input name='num' className="populationBox" style={{marginLeft:10}}type="text" placeholder=""  onChange={handleChangeN}/> 명</span>
                </div>
                <hr/>
                
                <div className='reservContents'>
                    <span>예약자</span>
                    <span>
                        <div className='reservContents'>
                            <span style={{marginRight:100}}>신청자 : {props.userInfo['USER_NAME']}</span> <span>부서: {props.userInfo['DEPARTMENT_NAME']+'팀'}</span>
                        </div>

                        <div className='reservContents'>
                            <span style={{marginRight:100}}>전화번호 : </span> <span>휴대폰 : {props.userInfo['PHONE_NUM']}</span>
                        </div>
                        

                    </span>
                </div>
            </div>

            </Modal>
        </React.Fragment>
    )
}

export default Popup;