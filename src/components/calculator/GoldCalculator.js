import React, { useState, } from 'react';
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';
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
    const [data, setData] = useState([]);

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
            setData(data);
            setK24(data.data.price_gram_24k);
            setK22(data.data.price_gram_22k);
            setK21(data.data.price_gram_21k);
            setK20(data.data.price_gram_20k);
            setK18(data.data.price_gram_18k);
        } catch (error) {
            console.log(error)
            setData(null);
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
        <div className="justify-content-center GoldCalculator">
            <Row>
                <Col className="justify-content-center">
                    <h1 className="font-weight-bold text-secondary">Gold Rate Calculator</h1>
                </Col>
            </Row>
            <Row style={{ marginBottom: '20px' }}>
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
                        <FaSearch />
                        &nbsp;Find Todays Rate
                    </Button>
                </Col>
            </Row>

            <div className="container mt-3 mb-3">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <div className="my-div">
                            <h3>Todays 24k gold rate = {parseInt(k24)}/g </h3>

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
                            <option value={k24}>24K</option>
                            <option value={k22}>22K</option>
                            <option value={k21}>21K</option>
                            <option value={k20}>20K</option>
                            <option value={k18}>18K</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Button variant='primary' style={{ marginTop: '33px' }} onClick={calculateGoldPrice}>
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
                            <h2>{parseInt(goldData?.goldPrice) || 0} {currency}</h2>

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
                        <td>{parseInt(goldData?.actualPrice) || 0} {currency}</td>
                    </tr>
                    <tr>
                        <td>Making Charges (15%)</td>
                        <td>{parseInt(goldData?.makingCharges) || 0} {currency}</td>
                    </tr>
                    <tr>
                        <td>GST (3%)</td>
                        <td>{parseInt(goldData?.gst) || 0} {currency}</td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Total Gold Price</td>
                        <td className="font-weight-bold">{parseInt(goldData?.goldPrice) || 0} {currency}</td>
                    </tr>
                </tbody>
            </table>

            <div>
                <button onClick={deleteData}> Go Back</button>
            </div>

        </div>





    );
}

export default GoldCalculator;