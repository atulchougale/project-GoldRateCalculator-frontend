import React, { useState, } from 'react';
import axios from 'axios';
import { FaCalculator, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GoldCalculator.css';



function GoldCalculator() {
    const navigate = useNavigate()
    const [goldData, setGoldData] = useState()
    const [weight, setWeight] = useState('');
    const [karat, setKarat] = useState('');
    const [currency, setCurrency] = useState('');
    const [k24, setK24] = useState(0);
    const [k22, setK22] = useState(0);
    const [k21, setK21] = useState(0);
    const [k20, setK20] = useState(0);
    const [k18, setK18] = useState(0);
    const [id, setId] = useState();

    const currencyOptions = [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'INR', label: 'INR' },
    ];

    const handleClick = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/gold/${currency}`);

            setId(data.goldRate._id)
            
            setK24(data.data.price_gram_24k);
            setK22(data.data.price_gram_22k);
            setK21(data.data.price_gram_21k);
            setK20(data.data.price_gram_20k);
            setK18(data.data.price_gram_18k);
        } catch (error) {
            console.log(error)
            
        }
    };


    const calculateGoldPrice = async () => {
        try {
            const { data } = await axios.post(`http://localhost:5000/gold/rate/calculate/${id}`, { weight, karat });
            setGoldData(data.goldData);
        } catch (error) {
            console.log(error)
        }
    };

    const deleteData = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/gold/${id}`);
            console.log(response.data.message);
            navigate('/')
            // Handle success response
        } catch (error) {
            console.error(error);
            // Handle error response
        }
    };


    return (
        <div className=" container flex flex-col items-center justify-center w-full h-full ">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 mt-3">Gold Rate Calculator</h1>
    
        <div className="flex flex-col md:flex-row items-center justify-between w-3/5 mb-8">
          <h3 className="text-lg font-medium text-gray-700 md:mr-4 mb-4 md:mb-0">Select your Currency</h3>
          <div className="w-full md:w-2/5">
            <label htmlFor="currency" className="block text-gray-700 font-medium mb-2">
              Currency
            </label>
            <Select
              id="currency"
              options={currencyOptions}
              value={{ value: currency, label: currency }}
              onChange={(option) => setCurrency(option.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={handleClick}
          >
            <FaSearch className="inline-block mr-2" />
            Find Todays Rate
          </button>
        </div>
    
        <div className="container mx-auto my-8 flex  items-center justify-center">
          <div className="bg-white shadow-md rounded-lg p-6 w-3/5 ">
            <h3 className="text-xl font-bold text-green-700 mb-4  text-center">Todays 24k gold rate = {parseInt(k24)}/g</h3>
          </div>
        </div>
    
        <div className="flex flex-col md:flex-row items-center justify-between w-3/4 mb-8">
          <div className="w-full md:w-2/5">
            <label htmlFor="weight" className="block text-gray-700 font-medium mb-2">
              Weight (in grams)
            </label>
            <input
              type="number"
              id="weight"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="w-full md:w-2/5 md:mx-4">
            <label htmlFor="karat" className="block text-gray-700 font-medium mb-2">
              Karat
            </label>
            <select
              id="karat"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
              value={karat}
              onChange={(e) => setKarat(e.target.value)}
            >
              <option value="">Select karat</option>
              <option value={k24}>24K</option>
              <option value={k22}>22K</option>
              <option value={k21}>21K</option>
              <option value={k20}>20K</option>
              <option value={k18}>18K</option>
            </select>
          </div>
          <button
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={calculateGoldPrice}
          >
            <FaCalculator className="inline-block mr-2" />
            Calculate
          </button>
        </div>
    
        <div className="container mx-auto my-8 flex  items-center justify-center">
          <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="col d-flex align-items-center">
                        <div className="my-div">
                            <h1 className='text-3xl font-bold text-green-700 mb-4  text-center'>Gold Price</h1>
                            <h2 className='text-3xl font-bold text-green-700 mb-4  text-center'>{parseInt(goldData?.goldPrice) || 0} {currency}</h2>

                        </div>
                    </div>
                </div>
            </div>

            <div className='cal'>
            <table className="table table-striped table-dark " style={{width:'700px'}}>
                <thead>
                    <tr>
                        <th className='text-center' scope="col">Description</th>
                        <th className='text-center' scope="col">Rate ({currency})</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='text-center'>Actual Gold Price </td>
                        <td className='text-center'>{parseInt(goldData?.actualPrice) || 0} {currency}</td>
                    </tr>
                    <tr>
                        <td className='text-center'>Making Charges (15%)</td>
                        <td className='text-center'>{parseInt(goldData?.makingCharges) || 0} {currency}</td>
                    </tr>
                    <tr>
                        <td className='text-center'>GST (3%)</td>
                        <td className='text-center'>{parseInt(goldData?.gst) || 0} {currency}</td>
                    </tr>
                    <tr>
                        <td className="font-bold text-center">Total Gold Price</td>
                        <td className="font-bold text-center">{parseInt(goldData?.goldPrice) || 0} {currency}</td>
                    </tr>
                </tbody>
            </table>
            </div>

            <div className='mt-6'>
                <button className='bg-red-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300' onClick={deleteData}> Go Back</button>
            </div>

        </div>





    );
}

export default GoldCalculator;