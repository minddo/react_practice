import React, { useState, useEffect } from 'react';
import { Input, Link } from "react-router-dom";
import '../css/Sign.css';
import logo from '../img/logo_login.svg'
import axios from 'axios';

function SignPage(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState([])
   
    const readAccount = async(id) => {
        try{
            const response = await axios.post("http://192.168.179.238:14000/GA_APP/GA_SG/ReadAccount?action=SO", {
                'dto': {
                  'ACCOUNT_ID': id
            }
        })
        .then(function (response){

            setResult(response.data.dto.EmpList)
  
        })
        .catch(function (error){
            console.log(error);
        })
        }catch (e) {
            console.log(e)
        }
    }

    const onChangeId = e => {
        setId(e.target.value);
    };
    const onChangePassword = e => {
        setPassword(e.target.value);
    };

    const onClickHandler = e => {
        if (result===null){
            alert("아이디 또는 비밀번호를 확인하세요")
            e.preventDefault()
        }
        else if (password!==result[0]['PASSWORD']){
            alert("아이디 또는 비밀번호를 확인하세요")
            e.preventDefault()
        }
        else{
            props.setAccountID(result[0]['ACCOUNT_ID'])
        }
    }
    
    
    useEffect (() => {
        readAccount(id)
    }, [id])

    
    

   
    return (
       
        <div className="modal2">
            <div className="loginModal">
                <div className='loginLogo'>
                    <img src={logo}></img>
                </div>
                
                <input nmae="email" className="loginId" type="text" placeholder="아이디" value={id} onChange={onChangeId}/>
                <input nmae="password" className="loginPw" type="password" placeholder="비밀번호" value={password} onChange={onChangePassword}/>
                
                <div className='loginMid'>
                    <label className="autoLogin" for="hint">
                        {" "}
                        <input type="checkbox" id='hint'/> 아이디 저장
                    </label>
                    <div className="autoLogin">아이디/비밀번호 찾기</div>
                </div>
                <div className="btnBlock"> 
                    <Link to ="/main"> <button className="loginBtn" onClick={onClickHandler}>로그인</button></Link>
                   
                </div>
                

                <div className="loginEnd">
                    <div className="loginLine">
                      회원이 아니신가요? <Link to="/signup" style={{color:"black"}}>회원가입</Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
}



export default SignPage;