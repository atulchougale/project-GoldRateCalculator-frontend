import React from "react";
import { Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faInstagram ,faFacebook,faGithub,faGoogle } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* Your page content goes here */}
      </div>
      <Navbar
        position="fixed"
        color="success"
        className="w-full lg:w-auto"
      >
        <div className="justify-between items-center mx-2 lg:mx-auto lg:max-w-7xl">
          <h4 className="text ">
            © {new Date().getFullYear()} AC Gold Rate Calculate
          </h4>
          <div className="flex justify-between ">
            <button aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} className="text-white-500 text-[30px] py-2 hover:text-blue-500" />
            </button>
            <button aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} className="text-white-500 text-[30px] py-2 hover:text-pink-500" />
            </button>
            <button aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} className="text-white-500 text-[30px] py-2 hover:text-balck-700" />
            </button>
            <button aria-label="Google">
            <FontAwesomeIcon icon={faGoogle} className="text-white-500 text-[30px] py-2  hover:text-red-500" />
            </button>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default Footer;
