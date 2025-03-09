import React from "react";
import {Space, Table} from "antd";

export default function ExtendedForecast({extData}) {


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
    const dynamicData = [];
    if (extData) {


        extData.extended.forEach((entry, index) => {
            dynamicData.push({
                date: entry.date,
                currentTemp: entry.currentTemp,
                lowTemp: entry.lowTemp,
                highTemp: entry.highTemp
            });
        });


        return (<>


            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                {extData && <Table pagination={false} dataSource={dynamicData} columns={columns}/>}
            </Space>


        </>)
    }
}


