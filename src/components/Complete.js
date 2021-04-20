import React from 'react';

function Complete (props) {

    const style = {
        display: "table-cell",
        backgroundColor: '#FFD5D5',
        height: '35px'      
        
    }


return(

            <span style={style}>
                
                {props.userName}
                </span>
   
    )
}

export default Complete;
