import {useParams} from "react-router-dom";

function CompetitionInfo() {
    const { id } = useParams();

    return (<>
        {id}
    </>);
}

export default CompetitionInfo;