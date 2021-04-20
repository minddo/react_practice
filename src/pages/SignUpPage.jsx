import React, { useState, useCallback } from "react";
import { Input, Checkbox } from "antd";
import { Link } from "react-router-dom";
import logo from '../img/logo_login.svg'
import axios from 'axios';

const Signup = () => {
    const [userName, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [phone, setphone] = useState("");
    const [id, setId] = useState("");
    const [empNum, setEmpNum] = useState("")
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [term, setTerm] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    const [termError,setTermError] = useState(false);

    const insertEmp = async(empID, department, userName, phoneNum, accountID) => {
      try{
          const response = await axios.post("http://192.168.179.238:14000/GA_APP/GA_SG/InsertEmp?action=SO", {
              'dto': {
                'EMPLOYEE_ID': empID,
                'DEPARTMENT_NAME': department,
                'USER_NAME':userName,
                'PHONE_NUM':phoneNum,
                "ACCOUNT_ID":accountID
          }
      })
      .then(function (response){
          console.log(response.data.dto)

      })
      .catch(function (error){
          console.log(error);
      })
      }catch (e) {
          console.log(e)
      }
  }

  const insertAccount = async(empID, password) => {
    try{
        const response = await axios.post("http://192.168.179.238:14000/GA_APP/GA_SG/InsertAccount?action=SO", {
            'dto': {
              'ACCOUNT_ID': empID,
              'PASSWORD': password
        }
    })
    .then(function (response){
        console.log(response.data.dto)

    })
    .catch(function (error){
        console.log(error);
    })
    }catch (e) {
        console.log(e)
    }
}

    const goToHome = () => {
      window.location.pathname='/'
    }

    const onSubmit = (e) => {

      if (userName ==="" ||department ==="" ||phone ==="" ||id ==="" ||empNum ==="" || password ===""){
        alert("필수사항을 입력하세요")
        e.preventDefault() 
      }
      else if(password !== passwordCheck){
        e.preventDefault() 
        return setPasswordError(true);
          
      }
      else if(!term){
        e.preventDefault() 
        return setTermError(true);
      }

      insertAccount(id,password)
      insertEmp(empNum, department, userName, phone, id)
      
  };


  function clickHandler(e){
      onSubmit(e)
  }

    const onChangeName = (e) => {
      setName(e.target.value);
    };

    const onChangedepartment = e => {
      setDepartment(e.target.value);
    };

    const onChangePhone = e => {
      setphone(e.target.value);
    };

    const onChangeEmp = e => {
      setEmpNum (e.target.value);
    };

    const onChangeId = e => {
      setId(e.target.value);
    };
  
    const onChangePassword = e => {
      setPassword(e.target.value);
    };
  
    const onChangePasswordCheck = (e) => {
      //비밀번호를 입력할때마다 password 를 검증하는 함수
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
  };
    const onChangeTerm = (e) => {
      //체크박스 초기화
      setTermError(false);
      setTerm(e.target.checked);
  }
    return (
       <div className='modal2'> 
        <div className='loginModal'>

            <div className='loginLogo' style={{marginTop:"150px"}}>
                    <img src={logo} onClick={goToHome} style={{cursor:"pointer"}}></img>
            </div>

            <div className='signUptitle'>
                <span>회원가입</span>
            </div>

            <div>
              <label htmlFor="user-name">이름</label>
              <br />
              <Input name="user-name" value={userName} onChange={onChangeName}   />
            </div>

            <div>
              <label htmlFor="user-deq">부서</label>
              <br />
              <Input name="user-deq"  value={department} onChange={onChangedepartment} />
            </div>

            <div>
              <label htmlFor="user-empNum">사번</label>
              <br />
              <Input name="user-empNum"  value={empNum} onChange={onChangeEmp} />
            </div>

            <div>
              <label htmlFor="user-phone">전화번호</label>
              <br />
              <Input name="user-phone"  value={phone} onChange={onChangePhone}/>
            </div>
            <div>

            <div>
              <label htmlFor="user-id">아이디</label>
              <br />
              <Input name="user-id" value={id} required onChange={onChangeId} />
            </div>
            
              <label htmlFor="user-password">비밀번호</label>
              <br />
              <Input
                name="user-password"
                type="password"
                value={password}
                required
                onChange={onChangePassword}
              />
            </div>
            <div>
                <label htmlFor="user-password-check">비밀번호확인</label><br/>
                <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
                {passwordError && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}
            </div>
            <br/>
            <div>
                <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>회원가입 약관에 동의합니다</Checkbox>
                {termError && <div style={{color : 'red'}}>약관에 동의하셔야 합니다.</div>}
            </div>
            
            <div>
                <div className="btnBlock"> 
                    <Link to ="/"> <button className="loginBtn" onClick={clickHandler}>회원가입</button></Link>
                </div>
            </div>
        </div>

      </div>

    );
  };
  
  export default Signup;

