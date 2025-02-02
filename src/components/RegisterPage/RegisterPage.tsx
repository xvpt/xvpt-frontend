import * as React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {AuthorizeToken, RestBean, User} from "../../entities.ts";
import {updateToken} from "../../utils/auth-utils.ts";

function RegisterPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const processRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("密码不一样");
            return;
        }

        try {
            const response = await axios.post<RestBean<User>>(`/api/user/register`, {
                    username: username,
                    password: password
                }
            );

            if (!(response.data.code === 200)) {
                setError(response.data.message);
                return
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message);
            } else {
                setError("Unknown error");
            }
        }
        try {
            const response: AxiosResponse<RestBean<AuthorizeToken>> = await axios.post('/api/user/login', `username=${username}&password=${password}`);
            if (response.data.code === 200) {
                // success
                updateToken(response.data.data); // update token
            } else {
                setError(response.data.message)
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message);
            } else {
                setError("注册成功,但是无法登入");
            }
        }
    }

    const goLogin = () => {
        navigate("/");
    }

    return (<>
        <div className={"flex justify-center items-center h-screen"}>
            <form onSubmit={processRegister}
                  className={"flex flex-col shadow-xl backdrop-blur items-center justify-center p-4 gap-3 w-svh h-96 transition"}>
                <h1 className={"text-5xl"}>Xrk's Vision Photo Contest</h1>
                {error && <p className={"text-red-500"}>{error}</p>}
                <div className={"flex flex-col items-center gap-4"}>
                    <input placeholder={"用户名"}
                           value={username}
                           onChange={(e) => {
                               setUsername(e.target.value)
                           }}
                           required={true}
                           className={"rounded border hover:border-2 hover:border-amber-400 p-2 hover:scale-110 transition-all"}/>
                    <input placeholder={"密码"}
                           value={password}
                           onChange={(e) => {
                               setPassword(e.target.value)
                           }}
                           type={"password"}
                           required={true}
                           className={"rounded border hover:border-2 hover:border-amber-400 p-2 hover:scale-110 transition-all"}/>
                    <input placeholder={"再输入一次密码"}
                           value={confirmPassword}
                           onChange={(e) => {
                               setConfirmPassword(e.target.value)
                           }}
                           type={"password"}
                           required={true}
                           className={"rounded border hover:border-2 hover:border-amber-400 p-2 hover:scale-110 transition-all"}/>
                </div>
                <button type={"submit"}
                        className={"cursor-pointer px-8 py-2 m-2 border rounded hover:bg-slate-600"}>注册
                </button>
                <div
                    className={"align-bottom select-none cursor-pointer p-2 m-2 right-0 bottom-0 absolute hover:scale-105 transition"}
                    onClick={goLogin}>登录账户
                </div>
            </form>
        </div>
    </>);
}

export default RegisterPage;