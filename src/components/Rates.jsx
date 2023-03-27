import axios from 'axios';
import { useState, useEffect } from 'react';

const Rates = () => {
	const [rateData, setRateData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [localTime, setLocalTime] = useState('');
	const [usdRate, setUSDRate] = useState(0);
	const [eurRate, setEURRate] = useState(0);
	const [gbpRate, setGBPRate] = useState(0);
	const [disable, setDisable] = useState(false);
	const [timer, setTimer] = useState(0);

	const getRateData = () => {
		setLoading(true);
		setError(null);

		const cratesUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json';

		axios
			.get(cratesUrl)
			.then(({ data }) => {
				setRateData(data);
				setLocalTime(data.time.updated);
				setUSDRate(data.bpi.USD.rate_float);
				setEURRate(data.bpi.EUR.rate_float);
				setGBPRate(data.bpi.GBP.rate_float);
			})
			.catch((error) => {
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		getRateData();
	}, []);

	const refetchRates = () => {
		if (disable === false && timer === 0) {
			getRateData();
			setDisable(true);
			// 5 mins is = to 300000 milliseconds
			setTimer(
				setTimeout(() => {
					setDisable(false);
				}, 300000)
			);
		}
	};

	if (rateData !== null) {
		const usdRateCon = (1 / usdRate).toFixed(9);
		const eurRateCon = (1 / eurRate).toFixed(9);
		const gbpRateCon = (1 / gbpRate).toFixed(9);

		const curLocal = new Date(Date.parse(localTime));
		const newLocal = curLocal.toLocaleString();

		return (
			<div>
				{!!error && <pre>{JSON.stringify(error, 0, 1)}</pre>}
				{!!loading && <p>Loading</p>}
				<p className="mt-5">Time Updated: {rateData.time.updated}</p>
				<p>Local Time: {newLocal}</p>
				<hr></hr>
				<button onClick={refetchRates} className="btn btn-1">
					Refresh Rate Data
				</button>
				<p>
					1 USD is equal to {usdRateCon} BTC , and 1 BTC is equal to $
					{rateData.bpi.USD.rate_float} USD
				</p>
				<p>
					1 EUR is equal to {eurRateCon} BTC, and 1 BTC is equal to €
					{rateData.bpi.EUR.rate_float} EUR
				</p>
				<p>
					1 GBP is equal to {gbpRateCon} BTC, and 1 BTC is equal to £
					{rateData.bpi.GBP.rate_float} GBP{' '}
				</p>
			</div>
		);
	}
};

export default Rates;
