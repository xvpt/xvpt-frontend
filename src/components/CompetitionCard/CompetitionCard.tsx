import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import axios from 'axios';
import {AuthorizeToken} from "../../entities.ts";

interface Props {
    id: string;
    name: string;
    description: string;
    host: string;
    endDate: number;
}

function calculateDaysLeft(endDate: number) {
    const currentDate = new Date();
    const end = new Date(endDate);
    const timeDifference = end.getTime() - currentDate.getTime();

    if (timeDifference <= 0) {
        return "已结束";
    }

    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return `剩余 ${daysLeft} 天`;
}

function CompetitionCard(props: Props) {
    const navigate = useNavigate();
    const daysLeft = calculateDaysLeft(props.endDate);

    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        const item = localStorage.getItem("token");
        if (item === null) return; // not login
        const token: AuthorizeToken = JSON.parse(item);
        const fetchImage = async () => {
            try {
                const reqUrl = `/api/competition/thumbnail?id=${props.id}`
                const response = await axios.get(reqUrl, {
                    headers: {
                        'Authorization': `Bearer ${token.token}`,
                    },
                    responseType: 'blob', // 确保获取的是 blob 类型数据
                });

                const url = URL.createObjectURL(response.data);
                setImageSrc(url); // 更新图片源

            } catch (error) {
                console.error("请求失败:", error);
            }
        };

        fetchImage();
    }, [props.id]);

    const handleClick = () => {
        navigate(`/competition/${props.id}`)
    }

    return (<>
        <div
            className="max-w-sm rounded-lg shadow-lg backdrop-blur overflow-hidden bg-opacity-30 hover:scale-105 cursor-pointer transition-all duration-300"
            onClick={handleClick}
        >
            <div className="p-4">
                {imageSrc ? <img src={imageSrc} alt={props.name} className={"rounded-lg w-40 h-40"}/> :
                    <div className={"flex space-x-4 animate-pulse"}>
                        <div className="flex-1 space-y-6 py-1 w-40 h-40">
                            <div className="h-2 rounded bg-gray-200"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                    <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                    <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                    <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                    <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                </div>
                                <div className="h-2 rounded bg-gray-200"></div>
                                <div className="h-2 rounded bg-gray-200"></div>
                            </div>
                        </div>
                    </div>}
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{props.name}</h2>
                <p className="text-gray-600 dark:text-gray-100 mt-2">{props.description}</p>
                <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-200">举办者: {props.host}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-200 mt-1">结束日期: {daysLeft}</p>
                </div>
            </div>
        </div>
    </>);
}

export default CompetitionCard;