import React , { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar' 
import logo from '../img/logo_main.svg'
import '../css/Info.css';
import Table2 from '../components/Table2';
import SingleFilter from '../components/SingleFilter';
import PopUpCalendar from '../components/PopUpCalendar';
import axios from 'axios';

function InfoPage(props) {
    const dummyDate = new Date()
    dummyDate.setDate(dummyDate.getDate() + 30)
    dummyDate.toLocaleString()
    const [date1, setDate1] = useState (new Date());
    const [date2, setDate2] = useState (new Date(dummyDate));
    const [userInfo, setUserInfo] = useState([])
    const [books, setBooks] = useState([])
    const month = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    const day1 = String(date1.getFullYear())+month[date1.getMonth()]+ModifyDate(date1.getDate())
    const day2 = String(date2.getFullYear())+month[date2.getMonth()]+ModifyDate(date2.getDate())
    const [filter, setFilter] = useState('') 
    


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

    function ReservState(d, m){
    
        const day = new Date()
        const today = String(day.getFullYear())+'-'+month[day.getMonth()]+'-'+ModifyDate(day.getDate())
        const time = String(day.getHours())+':'+String(day.getMinutes())
        if (today<d){
            return "예약"
        }
       else if (today===d){
           if(time<m){
               return "예약"
           }
           else{
               return "이용완료"
           } 
       }
       else{
           return "이용완료"
       }
    }

    const readEmp = async(id) => {
        try{
            const response = await axios.post("http://192.168.179.238:14000/GA_APP/GA_SG/ReadEmp?action=SO", {
                'dto': {
                  'ACCOUNT_ID': id
            }
        })
        .then(function (response){
            setUserInfo(response.data.dto.EmpList[0])
            getReserve(day1, day2, response.data.dto.EmpList[0]['EMPLOYEE_ID'])
  
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

    const getReserve = async(day1,day2, empID) => {
        try{
            const response = await axios.post("http://192.168.179.238:14000/GA_APP/GA_SG/ReadReservInt?action=SO", {
                'dto': {
                    "START_DATE": day1,
                    "END_DATE": day2,
                    "EMPLOYEE_ID":empID
            }
        })
        .then(function (response){
            var result =response.data.dto.ReservList
            var book = []
            if (result.length!==0){
                for(var i=0; i<result.length; i++){
                    book.push({No:String(i+1), 예약일:result[i]['RESERVE_DATE'].split(' ')[0], 예약시간: result[i]['START_TIME'].slice(0,5)+'~'+result[i]['END_TIME'].slice(0,5),
                    회의실: result[i]['ROOM_NAME'], 인원: result[i]['USED_NUM'], 예약상태: ReservState(result[i]['RESERVE_DATE'].split(' ')[0], result[i]['END_TIME'].slice(0,5)), })
                    }
            }
        

            if (filter==='예약'){
                var book2 = []
                var count = 0
                for(var i=0; i<book.length; i++){
                    if (book[i]['예약상태']==='예약'){
                        book2.push(book[i])
                        book2[count]['No']=count+1
                        count+=1
                    }
                }
            }
        
            else if (filter==='이용완료'){
                var book2 = []
                var count = 0
                for(var i=0; i<book.length; i++){
                    if (book[i]['예약상태']==='이용완료'){
                        book2.push(book[i])
                        book2[count]['No']=count+1
                        count+=1
                    }
                }
            }

            else{
                book2=book
            }                           
        
            setBooks(book2)

        })
        .catch(function (error){
            console.log(error);
        })
        }catch (e) {
            console.log(e)
        }
    }
    
    function clickHandler(){
        getReserve(day1, day2, userInfo['EMPLOYEE_ID'])
    }
    
    


    return (
        <div>
            <Sidebar userInfo={userInfo}/>

            <div className='mainBlock'>
                <br></br>
                <img src={logo}></img>
                <div className='Title'> 회의실 예약 현황</div>        
                
                <div className='infoHead'>
                    <span className='textbox'>{day1}</span>
                    <span className='contents'>
                        
                        <PopUpCalendar loc='left' dataSet={[date1, setDate1]}/>
                    </span>
                    <span className='contents'>~</span>
                    <span className='textbox'>{day2}</span>
                    <span className='contents'>
                        <PopUpCalendar loc='right' dataSet={[date2, setDate2]} />
                    </span>
                    <span style={{marginTop: 15}}> <SingleFilter setFilter={setFilter}/></span>

                    <button className='searchBtn' onClick={clickHandler}>검색</button>
                </div>

                <div className='infoBody'>
                    <Table2 book={books}/>
                </div>

            </div> 
      </div>
      
    );
}

export default InfoPage;