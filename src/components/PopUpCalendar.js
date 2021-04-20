import React, { useState } from 'react';
import Modal from './Modal';
import CalendarImg from '../img/calendar.svg';
import '../css/Popup.css';
import CalendarComponet from './CalendarComponet';

function PopUpCalendar(props) {
    
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [ modalOpen, setModalOpen ] = useState(false);
    const [popDate, setPopDate] = useState(props.dataSet[0])

     const openModal = () => {
        setModalOpen(true);

  
    }
    const closeModal = () => {
        setModalOpen(false);
  
    }

    const saveModal = () => {
        setModalOpen(false);
        props.dataSet[1](popDate)
        
    }




    

    return (
        <React.Fragment>
            <img src={CalendarImg} onClick={ openModal } style={{cursor : 'pointer'}}></img>
            <Modal mode={'reserv'} open={ modalOpen } close={ closeModal } save={ saveModal } header="Calendar"> 
            <div>
                <CalendarComponet loc={props.loc} dataSet={props.dataSet} setPopDate={setPopDate} popDate={popDate}/>
            </div>

            </Modal>
        </React.Fragment>
    )
}

export default PopUpCalendar;