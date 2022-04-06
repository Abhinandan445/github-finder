import React, { useState, useContext } from 'react';
import AlertConext from '../../context/alert/AlertContext';
import { searchUser } from '../../context/github/GithubActions';
import GithubConext from '../../context/github/GithubContext';

function UserSearch() {

  const [ text, setText ] = useState('');

  const {users, dispatch, clearSearch} = useContext(GithubConext);
  const {setAlert} =  useContext(AlertConext);

  const handlechange = (e) => {
           setText(e.target.value); 
  } 

  const handleSubmit = async(e) => {
        e.preventDefault();
            if(text === ''){
                setAlert('Please enter some value', 'error')
            }else{
                //@todo - search users
               dispatch({ type: 'SET_LOADING'}) 
               const users = await searchUser(text)
               dispatch({
                   type: 'GET_USERS',
                   payload: users,
               })
               setText('');
            }
  }

  const clickHandler = (e) => {
        clearSearch();
  } 

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grod-cols-2 mb-8 gap-8'>
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <div className="relative">
                        <input type="text"
                         className="w-full pr-40 bg-gray-200 input input-lg text-black"
                         placeholder='Search'
                         value={text}
                         onChange = {handlechange}
                          />
                         <button
                         type='submit'
                         className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
                             Go
                         </button>
                    </div>
                </div>
            </form>
        </div>
      
            {users.length > 0 && (
            <div>
                <button className="btn btn-ghost btn-lg" onClick={()=> dispatch({type: 'CLEAR_SEARCH'})}>
                    Clear
                </button>
            </div>
            )}
        
    </div>
  )
}

export default UserSearch;