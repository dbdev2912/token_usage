import { useState } from 'react';
import { useSelector } from 'react-redux';
export default () => {

    const unique_string = useSelector( state => state.unique_string );

    const [ auth, setAuth ] = useState({});

    const enterTriggered = (e) => {
        if( e.keyCode === 13 ){
            submit()
        }
    }
    /* Error modals */

    const submit = () => {

        if( auth.account_string && auth.pwd_string ){
            fetch(`/${ unique_string }/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(auth)
            })
            .then( res => res.json() )
            .then( (data) => {
                console.log(data)
                const { success, message, role, _token, credential_string } = data;
                if( success ){
                    localStorage.setItem("_token", _token)
                    localStorage.setItem("credential_string", credential_string)

                    window.location ="/"

                }
            })
        }else{
            /* Alert */
            console.log({ success: false, msg: "Một vài trường đang khum có dữ liệu" })
        }
    }

    return(
        <div className="fullscreen flex-no-wrap fade-in-ease" >
            <div className="fullscreen fixed-default flex flex-middle overflow">
                <div className="login-form shadow p-2 rel flex flex-middle">
                    <div className="form-field abs-default w-100-pct">
                        <span className="text-24-px block p-2 text-center upper">DIPE MANAGER UI</span>
                    </div>
                    <div className="w-100-pct">
                        <div className="form-field m-0-5 w-100-pct">
                            <span className="text-14-px block upper">Tài khoản</span>
                            <div className="block w-100-pct ">
                                <input className="w-100-pct block border-1 p-0-5 text-14-px" type="text"
                                onKeyUp = { enterTriggered }
                                onChange = {(e) => { setAuth({...auth, account_string: e.target.value }) }}
                                />
                            </div>
                        </div>
                        <div className="form-field m-0-5 w-100-pct">
                            <span className="text-14-px block upper">Mật khẩu</span>
                            <div className="block w-100-pct ">
                                <input className="w-100-pct block border-1 p-0-5 text-14-px" type="password"
                                onKeyUp = { enterTriggered }
                                onChange = {(e) => { setAuth({...auth, pwd_string: e.target.value }) }}
                                />
                            </div>
                        </div>
                        <div className="m-0-5 m-t-1 w-100-pct flex flex-no-wrap">
                            <div className="form-field flex flex-no-wrap w-50-pct">
                                <input type="checkbox" className="block w-24-px"/>
                                <span className="block w-100-pct p-0-5">Ghi nhớ tôi</span>
                            </div>
                            <div className="form-field w-50-pct">
                                <button onClick={ submit } className="lg-btn block w-100-pct p-0-5 ml-auto text-center text-14-px bg-white pointer">Đăng nhập</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
