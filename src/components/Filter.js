import React from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';




const { Option } = Select;
const provinceData = ['오리연구소1F', '오리연구소4F', '오리연구소5F'];

let floor = provinceData[0];


const Filter = (props) => {


  const handleProvinceChange = value => {

    floor = value;
    props.setData(floor)

  };




  return (
    <>
      <Select defaultValue={provinceData[0]} style={{ width: 150 }} onChange={handleProvinceChange}>
        {provinceData.map(province => (
          <Option key={province}>{province}</Option>
        ))}
      </Select>

      
    </>
  );
};

export default Filter;
