import react from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios'

const Conversions = () => {
    const [value, setValue] = useState('');
    const [convValue, setConvValue] = useState('');
    const [rateData, setRateData] = useState(null);
    const [usdRate, setUSDRate] = useState(0);
    const [eurRate, setEURRate] = useState(0);
    const [gbpRate, setGBPRate] = useState(0);
    const [localTime, setLocalTime] = useState('');
    const [direction, setDirection] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rateArr, setRateArr] = useState('');

    const getRateData = () => {
        setLoading(true);
        setError(null);

        const cratesUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json';

        axios.get(cratesUrl)
            .then(({data}) => {
                setRateData(data);
                setUSDRate(data.bpi.USD.rate_float);
                setEURRate(data.bpi.EUR.rate_float);
                setGBPRate(data.bpi.GBP.rate_float);
                setLocalTime(data.time.updated);
                setRateArr([
                    data.bpi.USD.rate_float,
                    data.bpi.EUR.rate_float,
                    data.bpi.GBP.rate_float
                ]);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })

    };

    const sortRates = () => {
        if(direction === 'asc') {
            rateArr.sort((a,b) => b - a);   // descending order 
            setDirection('desc');
        } else {
            rateArr.sort((a,b) => a - b);   // ascending order
            setDirection('asc');
        }
        setRateArr(rateArr);
        
    } 

    const enteredHandler = (e) => {
        setValue(e.target.value);
    } 

    function convertValue() {
        const select = document.getElementById('selectbox').value;
        if(select == "USD") {
            setConvValue(value/usdRate);
        } else if(select == "EUR") {
            setConvValue(value/eurRate);
        } else if(select == "GBP") {
            setConvValue(value/gbpRate);
        } else {
            setConvValue()
        }
    }

    useEffect(() => {

        getRateData() 
    },[])

    if(rateData!==null) {     //checks if object is not null
        const usdRateCon = (1/usdRate).toFixed(9);
        const eurRateCon = (1/eurRate).toFixed(9);
        const gbpRateCon = (1/gbpRate).toFixed(9);
        const curLocal = new Date(Date.parse(localTime));
        const newLocal = curLocal.toLocaleString();

    return (
        <div>
            <p className="mt-5">Time Updated: {rateData.time.updated}</p>
            <p>Local Time: {newLocal}</p>
            <hr></hr> 
            <button onClick={getRateData} className="btn btn-1 btn-3">Refresh Rate Data</button>  
            <button className="btn btn-1" onClick={sortRates}>Sort Exchange Rates</button>
                <small> {direction} </small>
                {rateArr.map((rate) => (
                    <div key={rate.id}>
                        <div>
                            {rate == rateData.bpi.USD.rate_float ? (
                                <p>
                                    1 USD is {usdRateCon} BTC , and 1 BTC is ${rateData.bpi.USD.rate_float} USD
                                </p>
                            ) : rate == rateData.bpi.EUR.rate_float ? (
                                <p>
                                    1 EUR is {eurRateCon} BTC, and 1 BTC is €{rateData.bpi.EUR.rate_float} EUR
                                </p>
                            ) : (
                                <p>
                                    1 GBP is {gbpRateCon} BTC, and 1 BTC is £{rateData.bpi.GBP.rate_float} GBP
                                </p>
                            )}
                        </div>
                    </div>
                ))} 
            <p><u>Convert USD/EUR/GBP to BTC</u></p>
            <select id ="selectbox" className="mb-2">
            <option value = "default">-Select-</option>
            <option value = "USD">USD</option>
            <option value = "EUR">EUR</option>
            <option value = "GBP">GBP</option>
            </select>
            <br></br>

            <input id="text1" placeholder="Enter amount to convert" onChange={enteredHandler} value={value}></input>
            <button className='btn btn-2' onClick={convertValue}>Submit</button>
            <br></br>
            <br></br>
            <p><u>Converted value in BTC:</u> {convValue} BTC</p>
        </div>
    )
    }
    
}

export default Conversions;