import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function LoadingPage() {
    const [timerExpired, setTimerExpired] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimerExpired(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const handleChangeAPI = () => {
        navigate("/config/api");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-amber-300 text-gray-700 dark:bg-gray-700 dark:text-gray-100 animate-pulse">
            <p>加载中</p>

            {timerExpired && <div className={"absolute align-bottom bottom-5 bg-sky-500 rounded p-2 text-amber-200 flex justify-center cursor-pointer"} onClick={handleChangeAPI}>
                遇到问题?切换API
            </div>}
        </div>
    );
}

export default LoadingPage;