import {useEffect, useState} from "react";
import axios from "axios";
import {Competition, Page, RestBean} from "../../entities.ts";
import {jwtToken} from "../../utils/auth-utils.ts";
import CompetitionCard from "../CompetitionCard/CompetitionCard.tsx";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

function HomePage() {
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const [competitions, setCompetitions] = useState<Competition[]>([]);

    const [error, setError] = useState<string | null>(null);

    const loadCompetitions = async () => {
        try {
            const response = await axios.get<RestBean<Page<Competition>>>(`/api/competition?page=${page}`, {
                headers: {
                    "Authorization": `Bearer ${jwtToken()}`
                }
            });
            setPage(response.data.data.number);
            setMaxPage(response.data.data.totalPages);
            setCompetitions(response.data.data.content);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message);
            } else {
                setError("Failed to fetch competitions");
            }
        }
    }

    useEffect(() => {
        loadCompetitions();
    }, [page]);

    return (<>
        <div className="flex flex-wrap gap-3 p-2 m-4">
            {error && <div className={"text-red-500"}>{error}</div>}
            {competitions && competitions.map((competition: Competition) => (
                <CompetitionCard key={competition.id} id={competition.id} name={competition.name}
                                 description={competition.description} host={competition.host}
                                 endDate={competition.endDate}/>
            ))}
        </div>
        <div className={"fixed m-4 right-0 bottom-0 flex flex-row gap-3"}>
            {(page !== 0) && <div className={"rounded-full p-1 bg-white text-black cursor-pointer hover:bg-amber-300"}>
                <FaArrowLeft size={25}/>
            </div>}
            <label className={"text-xl"}>{page}/{maxPage}</label>
            {(page < maxPage) && <div className={"rounded-full p-1 bg-white text-black cursor-pointer hover:bg-amber-300"}>
                <FaArrowRight size={25}/>
            </div>}
        </div>
    </>);
}

export default HomePage;