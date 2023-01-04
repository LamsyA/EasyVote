import React, { useState } from 'react';


function FormExample() {
  // Declare state variables to store the form data
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [picture, setPicture] = useState(null);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // You could now submit the form data to a server or do something else with it here
  }

  // Handle file input change
  const handleFileChange = (event) => {
    setPicture(event.target.files[0]);
  }

  return (
    <div className=' flex flex-col justify-start items-start mx-10 py-10'>
      <h2 className='font-semibold text-2xl mb-5 dark:text-[#e0f] text-red-700'> VOTER REGISTRATION FORM</h2>
      {/* <br className='my-6 border-collapse' /> */}
      <div className='py-2 text-center dark:border-white' >
    <form onSubmit={handleSubmit}>
      <label className='flex justify-center items-center '>
        Name:  
        <input className=' form-control block w-full px-3
        py-1.5 text-base font-normal dark:text-white bg-clip-padding border
        border-solid border-gray-700 dark:bg-transparent rounded transition ease-in-out
        m-0 shadow-md focus:text-gray-500 focus:outline-none dark:border-gray-500
        '
         type="text" value={name} onChange={event => setName(event.target.value)} />
      </label>
      
      <br />
     
      <label className='flex'> 
        Age:
        <input
        className=' form-control block w-full px-3
        py-1.5 text-base font-normal dark:text-white bg-clip-padding border
        border-solid border-gray-700 dark:bg-transparent rounded transition ease-in-out
        m-0 shadow-md focus:text-gray-500 focus:outline-none dark:border-gray-500
        '
        type="number" value={age} onChange={event => setAge(event.target.value)} />
      </label>
      <br />
      <label className='flex rounded-sm '>
        Picture:
        <input type="file" onChange={handleFileChange} />
      </label>
      <br />
      <button className='px-4 py-2.5 rounded-full leading-tight duration-150
       w-1/4 bg-[#e0f] hover:bg-[#E507] transition ease-in-out ' type="submit">Submit</button>
      {name && age && picture && (
        <div className='block justify-start items-start space-x-3 
        rounded-full my-4 cursor-pointer pr-3'>
          <p className='grid text-xl'>Name: {name}</p>
          <p className='grid text-xl'>Age: {age}</p>
          <img className='w-15 h-150 object-contain rounded-full' src={URL.createObjectURL(picture)} alt={name} />
        </div>
      )}
    </form>
    </div>
    </div>
  );
}

export default FormExample;
