import React , { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar' 
import logo from '../img/logo_main.svg';
import '../css/Main.css';
import Left from '../img/left_arrow.svg';
import Right from '../img/right_arrow.svg';
import PopUpCalendar from '../components/PopUpCalendar';
import ReservTable from '../components/ReservTable';
import axios from 'axios';
import TreeFilter from '../components/TreeFilter'
import Edit from '../components/Edit'

function MainPage(props) {
    
    const [data, setData] = useState (['오리연구소','1F']);
    const [date, setDate] = useState (new Date());
    const [userInfo, setUserInfo] = useState([])
    const isAdmin = userInfo['ACCOUNT_ID']==='admin'


    const readEmp = async(id) => {
        try{
            const response = await axios.post("http://192.168.179.238:14000/GA_APP/GA_SG/ReadEmp?action=SO", {
                'dto': {
                  'ACCOUNT_ID': id
            }
        })
        .then(function (response){
            setUserInfo(response.data.dto.EmpList[0])
            
  
        })
        .catch(function (error){
            console.log(error);
            alert("로그인이 필요한 서비스입니다.")
            //window.location.pathname='/'
        })
        }catch (e) {
            console.log(e)
        }
    }



    useEffect (() => {

        readEmp(props.accountID)
      }, [])
    
    function ModifyDate(date){
        if (String(date).length === 1){
            return '0'+String(date)
        }
        else {
            return String(date)
        }
    }
    function onIncrease(){
        const temp = new Date(date.getTime());
        temp.setDate(temp.getDate()+1)
        temp.toLocaleString()
        setDate(temp)

    }

    function onDecrease(){
        const temp = new Date(date.getTime());
        temp.setDate(temp.getDate()-1)
        temp.toLocaleString()
        setDate(temp)

    }
    const month = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    const week = [ '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    const day= String(date.getFullYear())+'.'+month[date.getMonth()]+'.'+ModifyDate(date.getDate())
    return (
        
        <div>
   
            <Sidebar userInfo={userInfo}/>
            
            <div className='mainBlock'>
                <br></br>
                <div className='mainHead'>
                    <img src={logo}></img>
                    <div className='Title'> 회의실 예약</div>
                </div>

                <div className="mainBody">
                    <div className='tableFilter'>
                        
                        <div className='filter'>
                            <span className='filterSpan'><TreeFilter setData={setData}/>
                            {isAdmin ? <Edit/> : <span style={{marginRight:"85px"}}/>} 
                            </span>
                            <span className='calenderSpan'>
                            <img src={Left} className='arrow' onClick={onDecrease} ></img>
                             <span style={{paddingRight: "10px"}}>{day}</span>
                            <PopUpCalendar  loc='normal' dataSet={[date, setDate]}/>
                            <img src={Right} className='arrow' onClick={onIncrease}></img>
                            </span>
                    
                            <span className='dayBlock'>{week[date.getDay()]}</span>
                            
                            
                        </div>
                    
                    </div>                   
                     <ReservTable data={data} date={day} setDate={setDate} userInfo={userInfo}/>
                
                     <br/><br/>
                </div>
            </div>


      </div>
    );
}

export default MainPage;
