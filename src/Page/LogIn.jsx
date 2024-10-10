import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function LogIn() {
  const [Name, setName] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const EmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const nav=useNavigate();
  const handleSignUp = () => {
    if (Name === "" || Email === "" ) {
      alert("Please fill all fields");
    } else if (!EmailRegex.test(Email)) {
      alert("Invalid email address");
    }  else {
      axios.post(`https://6706eeeaa0e04071d228b5e1.mockapi.io/users`, {
        Name: Name,
        Email: Email,
        Password: password,
      })
        .then(res =>  {
            console.log(res)
            nav(`/HomeUser/${Name}`)
        })
    }
  };

  return (
    <div className="flex items-center justify-evenly  h-screen p-8 max-sm:flex-col bg-[#386b57]">
      <div className='grid grid-cols-1 gap-4 border p-10 rounded-lg bg-[#f8f8f8]'>
      <h1 className='text-center font-bold text-lg '>SignUp</h1>

        <div>
          <input value={Name} onChange={(e) => { setName(e.target.value) }} className='" border border-gray-300 text-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Name'></input>
        </div>
        <div>
          <input value={Email} onChange={(e) => { setEmail(e.target.value) }} className='" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Email'></input>
        </div>
        <div>
          <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500' type='password' placeholder='Password'></input>
        </div>
       
        <button className= "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleSignUp} >SignUp</button>
      </div>
      <div>
        <img 
        src='https://static.vecteezy.com/system/resources/previews/023/575/435/original/an-organized-and-neat-stack-of-books-is-displayed-on-a-transparent-background-in-a-highly-realistic-design-generative-ai-png.png'
        className='w-80 max-sm:w-60'
        />
      </div>
    </div>
  );
}

export default LogIn;
