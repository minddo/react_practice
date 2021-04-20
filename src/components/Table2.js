import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';

function Table2(props) {
   const columns =  [
      {title: 'No', dataIndex: 'No',},
      {title: '예약일', dataIndex: '예약일',},
      {title: '예약시간', dataIndex: '예약시간',},
      {title: '회의실',dataIndex: '회의실',},
      {title: '인원',dataIndex: '인원',},
      {title: '예약상태', dataIndex: '예약상태',},
    ]

    const data=props.book

    return(
      <div>
      <Table style={{width: '1300px'}} columns={columns} dataSource={data} size="big" />
    </div>
    )
}

export default Table2;