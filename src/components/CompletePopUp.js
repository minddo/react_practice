import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Complete from './Complete'
import '../css/Popup.css';
import axios from 'axios';
function CompletePopUp(props) {
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [ modalOpen, setModalOpen ] = useState(false);
    const [result, setResult] = useState([])
    const reservDate = props.date.slice(0,4)+props.date.slice(5,7)+props.date.slice(8,10)
    const startTime=props.reservedTime[0]+props.reservedTime[1]
    const empID = props.empID

    useEffect(() => {
        readCancle(reservDate,props.name,startTime)
    }, [])


    // table tab에서 쿼리 결과 props로 가져오기
    // 삭제 쿼리 추카

    const openModal = () => {
        setModalOpen(true);
        props.setQuery(true)
        readCancle(reservDate,props.name,startTime)

    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const cancleModal = () => {
        setModalOpen(false);
        
        if(empID===result['EMPLOYEE_ID']){
            deleteReserv(reservDate,props.name,startTime)
        }
        else{
            alert("예약자 정보가 다릅니다")
        }
        
    }
    

    const readCancle = async(reservDate,roonName,startTime) => {
        try{
            const response = await axios.post("http://192.168.179.238:14000/GA_APP/GA_SG/ReadCancle?action=SO", {
                'dto': {
                    "RESERVE_DATE": reservDate,
                    "ROOM_NAME": roonName,
                    "START_TIME":startTime
            }
        })
        .then(function (response){
            var result = response.data.dto.ReservList[0]
            setResult(result)
            
        })
        .catch(function (error){
            console.log(error);
        })
        }catch (e) {
            console.log(e)
        }
    }

    const deleteReserv = async(reservDate,roonName,startTime) => {
        try{
            const response = await axios.post("http://192.168.179.238:14000/GA_APP/GA_SG/DeleteReserv?action=SO", {
                'dto': {
                    "RESERVE_DATE": reservDate,
                    "ROOM_NAME": roonName,
                    "START_TIME":startTime
            }
        })
        .then(function (response){
            console.log(response.data.dto)
            props.setQuery(false)
        })
        .catch(function (error){
            console.log(error);
        })
        }catch (e) {
            console.log(e)
        }
    }



    return (
        <React.Fragment>
            <span onClick={ openModal } style={{cursor : 'pointer'}}><Complete userName={result['USER_NAME']}/></span>
            <Modal mode='complete' open={ modalOpen } close={ closeModal } cancle={ cancleModal } header="예약확인"> 
            <div className='reservBlock'>
                <div className='reservContents'>
                    <span>회의실</span>
                    <span><input className="meetingRoomBox" type="text" placeholder={props.name}/></span>
                </div>
                <hr/>

                <div className='reservContents'  style={{textAlign:'left'}}>
                    <span >일자</span>
                    <span  style={{marginRight:190}}>
                        <div><input className="dayBox" type="text" placeholder={props.date} readOnly/></div> 
                        <div>
                        <input className="timeBox" type="text" placeholder={props.reservedTime[0]} readOnly/>:
                        <input className="timeBox" type="text" placeholder={props.reservedTime[1]} readOnly/>~
                        <input className="timeBox" type="text" placeholder={props.reservedTime[2]} readOnly/>:
                        <input className="timeBox" type="text" placeholder={props.reservedTime[3]} readOnly/>

                        </div>
                    </span>
                </div>
                <hr/>
                
                <div className='reservContents'>
                    <span>예약자</span>
                    <span>
                        <div className='reservContents'>
                            <span style={{marginRight:120}}>신청자 : {result['USER_NAME']}</span> <span>부서: {result['DEPARTMENT_NAME']+'팀'}</span>
                        </div>

                        <div className='reservContents'>
                            <span style={{marginRight:120}}>전화번호 : </span> <span>휴대폰 : {result['PHONE_NUM']}</span>
                        </div>
                        

                    </span>
                </div>
            </div>

            </Modal>
        </React.Fragment>
    )
}

export default CompletePopUp;