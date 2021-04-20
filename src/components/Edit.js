import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import '../css/Edit.css';
import axios from 'axios';
import EditLocation from './EditLocation';
import EditFloor from './EditFloor';
import EditRoom from './EditRoom';


function Edit(props) {
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ roomData, setRoomData ] = useState({})
    const [ selectedLocation, setSelectedLocation ] = useState('')
    const [ selectedFloor, setSelectedFloor ] = useState('')
    const [ selectedRoom, setSelectedRoom ] = useState('')
    const [ locationMode, setLocationMode] = useState('viewBtn')
    const [ floorMode, setFloorMode] = useState('viewBtn')
    const [ roomMode, setRoomMode] = useState('viewBtn')

  
    const openModal = () => {
        setModalOpen(true);

    }

    const closeModal = () => {
        setModalOpen(false);
        setSelectedLocation('');
        setSelectedFloor('');
        setLocationMode('viewBtn')
        setFloorMode('viewBtn')
        setRoomMode('viewBtn')
    }

    const saveModal = () => {
        setModalOpen(false);
        setSelectedLocation('');
        setSelectedFloor('');
        setLocationMode('viewBtn')
        setFloorMode('viewBtn')
        setRoomMode('viewBtn')

    }


    const onLocationClick = () => {
        if (locationMode==='viewBtn'){
            setLocationMode('editBtn')
        }
        else{
            setLocationMode('viewBtn')
        }
    }

    const onFloorClick = () => {
        if (floorMode==='viewBtn'){
            setFloorMode('editBtn')
        }
        else{
            setFloorMode('viewBtn')
        }
    }

    const onRoomClick = () => {
        if (roomMode==='viewBtn'){
            setRoomMode('editBtn')
        }
        else{
            setRoomMode('viewBtn')
        }
    }
    

    return (
        <React.Fragment>
            <button className='buttonSpan' onClick={ openModal }>편집</button>
            <Modal mode='edit' open={ modalOpen } close={ closeModal } save={ saveModal } header="회의실 편집"> 
            
            <div className='editHeader'>
                <span >위치</span><span>층</span> <span>회의실</span>
            </div>
            <div className='btnSection'>
                <button className={locationMode} onClick={onLocationClick}>항목수정</button>
                <button className={floorMode} onClick={onFloorClick}>항목수정</button>
                <button className={roomMode} onClick={onRoomClick}>항목수정</button>
            </div>
            <div className='editField'>
                <div className='fieldItem'>
                    <EditLocation  mode={locationMode} func={'location'} setQuery={setSelectedLocation}/>
                </div>
                <div className='fieldItem'>
                     <EditFloor  mode={floorMode} func={'floor'} selectedLocation={selectedLocation} setQuery={setSelectedFloor}/>
                
                </div>
                <div className='fieldItem'>
                    <EditRoom mode={roomMode} func={'room'} selectedLocation={selectedLocation} selectedFloor={selectedFloor} setQuery={setSelectedRoom}/>
                </div>

               
            </div>
            </Modal>
        </React.Fragment>
    )
}

export default Edit;