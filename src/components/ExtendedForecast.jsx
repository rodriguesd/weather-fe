import React from "react";
import {Space, Table} from "antd";

export default function ExtendedForecast({extData}) {


    const columns = [
        {
            title: 'Date',
            dataIndex: 'date-ext',
            key: 'date-ext',
        },
        {
            title: 'Current Temp',
            dataIndex: 'currentTemp-ext',
            key: 'currentTemp-ext',
        },
        {
            title: 'Low Temp',
            dataIndex: 'lowTemp-ext',
            key: 'lowTemp-ext',
        },
        {
            title: 'High Temp',
            dataIndex: 'highTemp-ext',
            key: 'highTem-ext',
        },
    ];
    const dynamicData = [];
    if (extData) {


        extData.extended.forEach((entry, index) => {
            dynamicData.push({
                key: entry.key,
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


