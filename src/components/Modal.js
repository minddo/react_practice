import React from 'react';
import "../css/Modal2.css";

const Modal = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, save, header, cancle, mode } = props;
    var clickBtn = save
    var message = '저장'
    if (mode === 'reserv' || mode === 'edit'){
        clickBtn = save
        message = '저장'
    }
    else{
        clickBtn = cancle
        message = '예약취소'
    }
    return (
      
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section style={ mode==='edit' ? {maxWidth:"1000px"}:{maxWidth:"600px"}}>
                    <header>
                        {header}
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                        <button className="save" onClick={clickBtn}> {message} </button>
                        <button className="close" onClick={close}> 닫기 </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}

export default Modal;