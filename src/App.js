import './App.css';
import AddressInputs from "./components/AddressInputs";
import CurrentForecast from "./components/CurrentForecast";
import ExtendedForecast from "./components/ExtendedForecast";
import {useEffect, useState} from "react";
import {Flex, Layout} from 'antd';

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

    useEffect(() => {

        if (countryCode !== '' && zip !== '') {
            const fetchDataCurrentWeather = async () => {
                setCurrentLoading(true);
                try {
                    const response = await fetch(`http://127.0.0.1:8080/weather/v1/current/${countryCode}/${zip}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
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
                        throw new Error(`HTTP error! status: ${response.status}`);
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
            <div style={{ paddingTop: '40px' }}>

                <Flex>
                    <Layout style={layoutStyle}>
                        <Header style={headerStyle}><font className="myTitle">Address Input</font></Header>
                        <Content style={contentStyle}>{<AddressInputs callback={getZipAndCountryCode}/>}</Content>
                        <Footer style={footerStyle}></Footer>
                    </Layout>
                </Flex>

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


                {extData &&

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
