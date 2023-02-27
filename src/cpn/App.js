import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import SignIn from './routes/SignIn';
import "../css/index.scss";

export default () => {

    const dispatch      = useDispatch();
    const unique_string = useSelector( state => state.unique_string );
    const isSigned      = useSelector( state => state.is_signed );
    const credential    = useSelector( state => state.credential );
    const _token = localStorage.getItem("_token");
    const credential_string = localStorage.getItem("credential_string");

    useEffect(() => {
        fetch('/api/get/the/god/damn/api/key/with/ridiculous/long/url/string', {
            headers: {
                "Authorization": _token,
            },
        })
        .then( res => res.json() )
        .then( ({ unique_string }) => {
            dispatch({
                type: "setUniqueString",
                payload: { unique_string }
            })
            const creadential_string_request_url = `/api/${ unique_string }/user/getall/${ credential_string }`
            fetch(creadential_string_request_url, {
                headers: {
                    "Authorization": _token,
                },
            }).then( res => res.json() ).then((data) => {
                console.log(data)
            })
        })

    }, [])

    return (
        <div className="app">
            { !_token ?
                <SignIn />
                :
                <React.StrictMode>
                    { credential.account_role === "admin" ?

                    <Router>
                        <Routes>
                            <Route exac path = '/' element={
                                <React.StrictMode>
                                  <h1>Home ADMIN</h1>
                            </React.StrictMode>
                            }/>
                        </Routes>
                     </Router>


                    :
                    <Router>
                         <Routes>
                             <Route exac path = '/' element={
                                 <React.StrictMode>
                                   <div>
                                       <h1>User Home</h1>
                                    </div>
                                    </React.StrictMode>
                                }/>
                            </Routes>

                     </Router>
                    }
                </React.StrictMode>
            }
        </div>
    )
}
