import React, {useState} from "react";
import {Button, Form, Input, Select} from 'antd';
import CountryCodes from '../config/country_codes.json';
import {useRef} from 'react';

export default function AddressInputs({callback}) {

    const zipRef = useRef(null);
    const [countryCode, setCountryCode] = useState('US');

    const handleChange = (value) => {
        setCountryCode(value)
    };

    const getZipAndCountryCode = () => {
        const zip = zipRef.current.input.value;
        callback(countryCode, zip);
    };


    return (<>

        <div className="addressContainer">
            <table>
                <tbody>

                <tr>
                    <td>Country</td>
                    <td><Select onChange={handleChange} style={{width: 200}} placeholder="United States">
                        {CountryCodes.map((item) => (
                            <Select.Option key={item.value} value={item.value}>
                                {item.label}
                            </Select.Option>
                        ))}
                    </Select></td>
                </tr>

                <tr>
                    <td>Zip code</td>
                    <td><Form onFinish={getZipAndCountryCode}>
                        <Form.Item
                            name="zip code"
                            rules={[
                                {required: true, message: 'Zip Code is required'},
                                {pattern: /^\d{5}(-\d{4})?$/, message: 'Enter a valid 5-digit zip code'},
                            ]}
                        >
                            <Input maxLength={5} ref={zipRef} placeholder="Zip Code"/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form></td>
                </tr>
                </tbody>

            </table>
        </div>


        {/*<div>*/}
        {/*    <div>Country</div>*/}
        {/*    <Select onChange={handleChange} style={{width: 200}} placeholder="United States">*/}
        {/*        {CountryCodes.map((item) => (*/}
        {/*            <Select.Option  key={item.value} value={item.value}>*/}
        {/*                {item.label}*/}
        {/*            </Select.Option >*/}
        {/*        ))}*/}
        {/*    </Select>*/}
        {/*</div>*/}

        {/*<div>*/}
        {/*    <Form onFinish={getZipAndCountryCode}>*/}
        {/*        <Form.Item*/}
        {/*            name="zip code"*/}
        {/*            rules={[*/}
        {/*                {required: true, message: 'Zip Code is required'},*/}
        {/*                {pattern: /^\d{5}(-\d{4})?$/, message: 'Enter a valid 5-digit zip code'},*/}
        {/*            ]}*/}
        {/*        >*/}
        {/*            <Input ref={zipRef} placeholder="Zip Code"/>*/}
        {/*        </Form.Item>*/}
        {/*        <Button type="primary" htmlType="submit">Submit</Button>*/}
        {/*    </Form>*/}
        {/*</div>*/}


    </>);
}