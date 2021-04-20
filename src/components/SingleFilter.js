import React from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';


const { Option } = Select;



function SingleFilter(props) {

  
  function onChange(value) {
    props.setFilter(value)
  }
  
    return (
        <Select
    showSearch
    style={{ width: 150 }}
    placeholder="예약상태"
    optionFilterProp="children"
    onChange={onChange}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="예약">예약</Option>
    <Option value="이용완료">이용완료</Option>

  </Select>
    );

}

export default SingleFilter;