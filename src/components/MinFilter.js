import React from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';


const { Option } = Select;

function MinFilter(props) {

  function handleChange(value) {
    props.m[1](value)
    
  }
    
    return (
      <Select
    labelInValue
    defaultValue={{ value: props.m[0] }}
    style={{ width: 70 }}
    onChange={handleChange}
  >
    <Option value="00">00</Option>
    <Option value="30">30</Option>


  </Select>

  
    );

}

export default MinFilter;