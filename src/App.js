import './App.css';
import AddressInputs from "./components/AddressInputs";
import CurrentForecast from "./components/CurrentForecast";
import ExtendedForecast from "./components/ExtendedForecast";
import {useEffect, useState} from "react";
import {Flex, Layout, Modal} from 'antd';
import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { ClipLoader } from 'react-spinners';


const {Header, Footer, Sider, Content} = Layout;

function App() {

    const [countryCode, setCountryCode] = useState('');
    const [zip, setZip] = useState('');
    const [currentData, setCurrentData] = useState(null);
    const [currentLoading, setCurrentLoading] = useState(false);
    const [currentCache, setCurrentCache] = useState(false);

    const [extData, setExtData] = useState(null);
    const [extLoading, setExtLoading] = useState(false);
    const [extCache, setExtCache] = useState(false);

    const [random, setRandom] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [status, setStatus] = useState(200);
    const [hasErrror, setHasErrror] = useState(false);

    useEffect(() => {

        if (countryCode !== '' && zip !== '') {
            const fetchDataCurrentWeather = async () => {
                setCurrentLoading(true);
                try {
                    const response = await fetch(`http://127.0.0.1:8080/weather/v1/current/${countryCode}/${zip}`);
                    if (!response.ok) {
                        setStatus(response.status);
                        const temp = await response.json();
                        setErrorMessage(temp.message);
                        setHasErrror(true);
                        setCurrentData('');
                        setCurrentCache(false)
                        return;
                    }
                    const json = await response.json();
                    setCurrentData(json);
                    setCurrentCache(json.cached)
                    // Set data on success
                } catch (e) {
                    // setError(e);  // Set error if there's an issue
                } finally {
                    setCurrentLoading(false);
                }
            };


            const fetchDataExtWeather = async () => {
                setExtLoading(true);
                try {
                    const response = await fetch(`http://127.0.0.1:8080/weather/v1/extended/${countryCode}/${zip}`);
                    if (!response.ok) {
                        setStatus(response.status);
                        const temp = await response.json();
                        setErrorMessage(temp.message);
                        setHasErrror(true);
                        setExtData('');
                        setExtCache(false)
                        return;
                    }
                    const json = await response.json();
                    setExtData(json);
                    setExtCache(json.cached)

                } catch (e) {
                    // setError(e);  // Set error if there's an issue
                } finally {
                    setExtLoading(false);
                }
            };


            fetchDataExtWeather().then((json) => {
            });
            fetchDataCurrentWeather().then((json) => {
            });
        }


    }, [countryCode, zip, random]);  // Re-run when either countryCode or zip changes

    const getZipAndCountryCode = (cc, zip) => {
        setCountryCode(cc);
        setZip(zip);
        if(random)
        {
            setRandom(false);
        }
        else {
            setRandom(true);
        }

    };

    const clearError = async (e) => {
        setErrorMessage('');
        setStatus(200);
        setHasErrror(false);
    }




    const headerStyle = {
        textAlign: 'center',
        color: '#fff',
        height: 64,
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: '#4096ff',
    };
    const contentStyle = {
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
        color: '#fff',
        // backgroundColor: '#0958d9',
    };
    const siderStyle = {
        textAlign: 'center',
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#1677ff',
    };
    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        // backgroundColor: '#4096ff',
    };
    const layoutStyle = {
        borderRadius: 8,
        overflow: 'hidden',
        width: 'calc(100% - 8px)',
        maxWidth: 'calc(100% - 8px)',
    };


    const title = {
        borderRadius: 8,
        overflow: 'hidden',
        width: 'calc(100% - 8px)',
        maxWidth: 'calc(100% - 8px)',
    };


    return (
        <>



                <div>

                    <Modal

                        open={hasErrror}
                        width={500}
                        keyboard={true}
                        title={<div style={{marginBottom: '15px'}}>
                            Error
                        </div>}
                        onCancel={clearError}
                        onOk={clearError}
                        okText={"OK"}
                    >

                        <div>{status} {errorMessage}</div>

                    </Modal>

                </div>




            {((currentLoading  || extLoading)) && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width:'100%' }}>
                    <ClipLoader color="#123abc" loading={extLoading || currentLoading} size={50} />
                </div>
            )}


            <div style={{ paddingTop: '40px' }}>


                <Flex>
                    <Layout style={layoutStyle}>
                        <Header style={headerStyle}><font className="myTitleCity">Current City: {extData ? extData.city : "NONE"}</font></Header>
                        <Header style={headerStyle}><font className="myTitle">Address Input</font></Header>
                        <Content style={contentStyle}>{<AddressInputs callback={getZipAndCountryCode}/>}</Content>
                        <Footer style={footerStyle}></Footer>
                    </Layout>
                </Flex>

            </div>



            <div style={{
                placeItems: "center",
            }}>
                <div style={{
                    backgroundColor: "white",
                    padding: "20px",
                }}>
                    {currentCache && <div> <SyncOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                        <span style={{ marginLeft: '8px', fontSize: '24px', fontStyle: "-moz-initial", fontWeight:"bold" }}>Cached</span></div>}
                </div>
            </div>

                {currentData &&

                    <Flex>
                        <Layout style={layoutStyle}>
                            <Header style={headerStyle}><font className="myTitle">Current Weather</font></Header>
                            <Content style={contentStyle}>{<CurrentForecast currentData={currentData}/>}</Content>
                            <Footer style={footerStyle}></Footer>
                        </Layout>
                    </Flex>
                }


            <div style={{
                placeItems: "center",
            }}>
                <div style={{
                    backgroundColor: "white",
                    padding: "20px",
                }}>
                    {extCache && <div> <SyncOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                        <span style={{ marginLeft: '8px', fontSize: '24px', fontStyle: "-moz-initial", fontWeight:"bold" }}>Cached</span></div>}

                </div>
            </div>

                {  extData &&

                    <Flex>
                        <Layout style={layoutStyle}>
                            <Header style={headerStyle}><font className="myTitle">Extended Weather {extCache}</font></Header>
                            <Content style={contentStyle}>{<ExtendedForecast extData={extData}/>}</Content>

                        </Layout>
                    </Flex>
                }




        </>

    );
}

export default App;
