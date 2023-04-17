import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import avatar from '../../Images/profile.png';
import styles from '../../styles/Username.module.css'
import extend from '../../styles/Profile.module.css';
import toast,{ Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import useFetch from '../../hooks/fetch.hook';

import { updateUser } from '../../helper/helper';


function Profile() {
  const navigate = useNavigate();
  const [file,setFile]= useState()
  const [{isLoading,apiData,serverError}]=useFetch()

  const formik = useFormik({
    initialValues :{
      firstName : apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address : apiData?.address || ''
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur:false,
    validateOnChange:false,
  onSubmit: async values =>{
    values = await Object.assign(values,{profile : file || apiData?.profile || ''})
    let updatePromise = updateUser(values)
    toast.promise(updatePromise, {
      loading: 'Updating...',
      success : <b>Update Successfully...!</b>,
      error: <b>Could not Update!</b>
    });
    // console.log(values)

  },
  });


    /** formik doensn't support file upload so we need to create this handler */
    const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  if(isLoading) return<h1 className='text-2xl font-bold'>Loading...!</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>;

  
  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }


  return (

    <div className="container mx-auto" >
    <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={`${styles.cal} ${extend.glass}`} style={{height:'90%', width:'45%', padding:"25px"}}>

          <div className="titel flex flex-col items-center">
            <h4 className='text-5xl font-bold '>Profile</h4>
            <span className='py-3 text-xl w-2/3 text-center text-gray-500'>You can update the details.</span>
          </div>

          <form action=""  onSubmit={formik.handleSubmit} >
            <div className="profile flex justify-center py-2">
            <label htmlFor="profile">
              <img src={apiData?.profile || file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
            </label>
            <input onChange={onUpload} type="file"  id="profile" name='profile' />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
                <div className="name flex w-3/4 gap-10">
                  <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='FirstName' />
                  <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='LastName' />
                </div>

                <div className="name flex w-3/4 gap-10">
                  <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' />
                  <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
                </div>

               
                  <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address' />
                  <button className={styles.btn} type='submit'>Update</button>
               
                  
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>come back later? </span> <button  className='border bg-red-500 w-1/4 py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center' onClick={userLogout}>Logout</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile 