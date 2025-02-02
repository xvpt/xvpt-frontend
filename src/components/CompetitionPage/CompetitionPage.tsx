import {useParams} from "react-router-dom";

function CompetitionPage() {
    const { id } = useParams();

    return (<>
        {id}
    </>);
}

export default CompetitionPage;