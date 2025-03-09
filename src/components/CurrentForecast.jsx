import React from "react";
import {Space, Table} from "antd";

export default function CurrentForecast({currentData}) {

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Current Temp',
            dataIndex: 'currentTemp',
            key: 'currentTemp',
        },
        {
            title: 'Low Temp',
            dataIndex: 'lowTemp',
            key: 'lowTemp',
        },
        {
            title: 'High Temp',
            dataIndex: 'highTemp',
            key: 'highTemp',
        },
    ];

    const dataSource = [
        {
            key: '1',
            date: currentData.current.date,
            currentTemp: currentData.current.currentTemp,
            lowTemp: currentData.current.lowTemp,
            highTemp: currentData.current.highTemp,
        }
    ];



    return (<>

        <Space
            direction="vertical"
            size="middle"
            style={{
                display: 'flex',
            }}
        >
            {currentData &&
                <Table   pagination={false}  dataSource={dataSource} columns={columns} />
            }
        </Space>





    </>)
}
