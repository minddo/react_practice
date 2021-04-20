import React from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

function HourFilter(props) 

{
  function handleChange(value) {
    props.h[1](value.value)
  }
  

 
    return (
      <Select
    labelInValue
    defaultValue={{ value: props.h[0] }}
    style={{ width: 70 }}
    onChange={handleChange}

  >

    <Option value="07">07</Option>
    <Option value="08">08</Option>
    <Option value="09">09</Option>
    <Option value="10">10</Option>
    <Option value="11">11</Option>
    <Option value="12">12</Option>
    <Option value="13">13</Option>
    <Option value="14">14</Option>
    <Option value="15">15</Option>
    <Option value="16">16</Option>
    <Option value="17">17</Option>
    <Option value="18">18</Option>
    <Option value="19">19</Option>
    <Option value="20">20</Option>
    <Option value="21">21</Option>
    <Option value="22">22</Option>
    <Option value="23">23</Option>
    <Option value="24">24</Option>


  </Select>

  
    );

}

export default HourFilter;