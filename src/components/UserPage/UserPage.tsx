import {logout} from "../../utils/auth-utils.ts";

function UserPage() {
    return (<>
        <div className={"h-screen flex items-start justify-center"}>
            <div className={"flex flex-col w-svh m-4 shadow-xl p-4 rounded gap-3 backdrop-blur"}>
                <h1 className={"text-4xl"}>用户面板</h1>
                <div onClick={logout} className={"rounded p-2 bg-red-500 w-fit select-none cursor-pointer"}>
                    退出登录
                </div>
                <div className={"m-3 gap-1"}>
                    <h2 className={"text-2xl m-1"}>重置密码</h2>
                    <form className={"flex flex-col gap-2 w-fit"}>
                        <input placeholder={"旧的密码"} className={"p-2 rounded border hover:border-amber-300"}/>
                        <input placeholder={"新的密码"} className={"p-2 rounded border hover:border-amber-300"}/>
                        <input placeholder={"再输入一次新密码"} className={"p-2 rounded border hover:border-amber-300"}/>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default UserPage;