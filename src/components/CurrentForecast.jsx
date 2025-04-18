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
            key: '100000',
            date: currentData.current.date,
            currentTemp: currentData.current.currentTemp + " °F",
            lowTemp: currentData.current.lowTemp  + " °F",
            highTemp: currentData.current.highTemp + " °F",
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
