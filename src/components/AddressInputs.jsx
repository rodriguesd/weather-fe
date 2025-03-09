import React from "react";
import {Button, Form, Input, Select} from 'antd';
import CountryCodes from '../config/country_codes.json';
import {useRef} from 'react';

export default function AddressInputs({callback}) {

    const zipRef = useRef(null);

    let cc = CountryCodes[0].value;
    const handleChange = (value) => {
        cc = value;
    };

    const getZipAndCountryCode = () => {
        const zip = zipRef.current.input.value;
        callback(cc, zip);
    };


    return (<>

        <div>
            <Select onChange={handleChange} style={{width: 200}} placeholder="United States">
                {CountryCodes.map((item) => (
                    <Select.Option  key={item.value} value={item.value}>
                        {item.label}
                    </Select.Option >
                ))}
            </Select>
        </div>

        <div>
            <Form onFinish={getZipAndCountryCode}>
                <Form.Item
                    name="zip code"
                    rules={[
                        {required: true, message: 'Zip Code is required'},
                        {pattern: /^\d{5}(-\d{4})?$/, message: 'Enter a valid 5-digit zip code'},
                    ]}
                >
                    <Input ref={zipRef} placeholder="Zip Code"/>
                </Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form>
        </div>


    </>);
}