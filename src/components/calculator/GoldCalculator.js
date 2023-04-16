import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FaCalculator } from 'react-icons/fa';

import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GoldCalculator.css';


function GoldCalculator() {
    const [goldPrice, setGoldPrice] = useState(0);
    const [weight, setWeight] = useState('');
    const [karat, setKarat] = useState('');
    const [currency, setCurrency] = useState('');
    const [actualGoldPrice, setActualGoldPrice] = useState(0);
    const [makingCharges, setMakingCharges] = useState(0);
    const [GST, setGST] = useState(0);
    const [id, setId] = useState('');
    const [updates, setUpdates] = useState('');



    const currencyOptions = [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'INR', label: 'INR' },
    ];





    const [data, setData] = useState([]);

    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,

    };
    const handleClick = () => {
        fetch(`http://localhost:5000/gold/${currency}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setData(result)
            })
            .catch(error => console.log('error', error));

    }


    useEffect(() => {
        setId(data.goldRate._id)

    }, []);
    console.log(id)
    const totalGoldPrice =async () => {
        try {
            const actualPrice = weight * karat;
            const making = (actualPrice * 15) / 100;
            const gst = ((actualPrice + making) * 3) / 100;
            const total = actualPrice + making + gst;
    
            setActualGoldPrice(actualPrice);
            setMakingCharges(making);
            setGST(gst);
            setGoldPrice(total);
            setUpdates(
                {
                    actualGoldPrice:actualGoldPrice,
                    makingCharges:makingCharges,
                    GST:GST,
                    goldPrice:goldPrice
                }
            )
            const res = await axios.put(`/gold/${id}`, updates);
           
            console.log(res.data); // you can remove this line, it's just to see the response in the console
          } catch (err) {
            console.error(err);
          }
        
      
    }

    return (
        <div className=' justify-content-center GoldCalculator' >

            <Row>
                <Col className=' justify-content-center'>
                    <h1 className='font-weight-bold text-secondary'>Gold Rate Calculator</h1>
                </Col>
            </Row>
            <Row style={{ marginBottom: '20px' }} >
                <Col>
                    <h3>Select your Currency </h3>
                </Col>
                <Col>
                    <Form.Group controlId='currency'>
                        <Form.Label>Currency</Form.Label>
                        <Select
                            options={currencyOptions}
                            value={{ value: currency, label: currency }}
                            onChange={(option
                            ) => { setCurrency(option.value) }}

                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Button variant='primary' style={{ marginTop: '33px' }} onClick={handleClick} >
                        <FaCalculator />
                        &nbsp;Calculate
                    </Button>
                </Col>
            </Row>

            <div className="container mt-3 mb-3">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <div className="my-div">
                            <h3>Todays 24k gold rate = {data.data.price_gram_24k}/g </h3>

                        </div>
                    </div>
                </div>
            </div>

            <Row >
                <Col>
                    <Form.Group controlId='weight'>
                        <Form.Label>Weight (in grams)</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter weight'
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='karat'>
                        <Form.Label>Karat</Form.Label>
                        <Form.Control
                            as='select'
                            value={karat}
                            onChange={(e) => setKarat(e.target.value)}
                        >
                            <option value=''>Select karat</option>
                            <option value={data.data.price_gram_22k}>22K</option>
                            <option value={data.data.price_gram_24k}>24K</option>
                            <option value={data.data.price_gram_21k}>21K</option>
                            <option value={data.data.price_gram_20k}>20K</option>
                            <option value={data.data.price_gram_18k}>18K</option>
                        </Form.Control>
                    </Form.Group>
                </Col>

                <Col>
                    <Button variant='primary' style={{ marginTop: '33px' }} onClick={totalGoldPrice} >
                        <FaCalculator />
                        &nbsp;Calculate
                    </Button>
                </Col>
            </Row>



            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex align-items-center">
                        <div className="my-div">
                            <h1>Gold Price</h1>
                            <h2>{parseInt(goldPrice)} {currency}</h2>

                        </div>
                    </div>
                </div>
            </div>

            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Rate ({currency})</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Actual Gold Price </td>
                        <td>{parseInt(actualGoldPrice)} {currency}</td>
                    </tr>
                    <tr>
                        <td>Making Charges (15%)</td>
                        <td>{parseInt(makingCharges)} {currency}</td>
                    </tr>
                    <tr>
                        <td>GST (3%)</td>
                        <td>{parseInt(GST)} {currency}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Total Gold Price</td>
                        <td className="font-weight-bold">{parseInt(goldPrice)} {currency}</td>
                    </tr>
                </tbody>
            </table>



        </div>


    );
}

export default GoldCalculator;