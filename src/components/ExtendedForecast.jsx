import React from "react";
import {Space, Table} from "antd";

export default function ExtendedForecast({extData}) {


    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date-ext',
        },
        {
            title: 'Current Temp',
            dataIndex: 'currentTemp',
            key: 'currentTemp-ext',
        },
        {
            title: 'Low Temp',
            dataIndex: 'lowTemp',
            key: 'lowTemp-ext',
        },
        {
            title: 'High Temp',
            dataIndex: 'highTemp',
            key: 'highTem-ext',
        },
    ];
    const dynamicData = [];
    if (extData) {


        extData.extended.forEach((entry, index) => {
            dynamicData.push({
                key: index,
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


