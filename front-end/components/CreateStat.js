import { useState } from "react";
import axios from "axios";

const CreateStat = ({ homerunId, refreshData, myData }) => {

    const [stat, setStat] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        axios.post(`/api/stats/${homerunId}`, { stat: stat })
            .then(res => {
                const newData = Object.assign([], myData);
                newData.forEach(homerun => {
                    if (homerun.homerunId === homerunId) {
                        homerun.stats.push(res.data);
                    }
                });

                console.log("Create Stat newData ", newData);

                refreshData(newData);
            })
            .catch(err => console.log(err));
        setStat("");
    };

    const onChange = (event) => {
        setStat(event.target.value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="stat"
                    placeholder="Stat"
                    value={stat}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value="Create Stat"
                />
            </form>
        </div>
    );
}

export default CreateStat;