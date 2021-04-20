import React, {useState, useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons';


    
const EditBlock = (props) => {
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


    
    const itemList = [];
    for(let i=0; i < props.items.length; i++){
        itemList.push({index: i, text:props.items[i]})
    }

    const [ items, setItems ] = useState([]);
    const [ result, setResult ] = useState('');
    const [ inputText, setInputText ] = useState('');
    const [ nextId, setNextId ] = useState('');

        
    useEffect(()=> {
        setItems([...itemList])
        setNextId(itemList.length+1)

    }, [props.items])





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
    };


export default EditBlock;