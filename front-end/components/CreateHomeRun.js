import { useState } from "react";
import axios from "axios";
import styles from '../styles/Home.module.css';

const CreateHomeRun = ({ myData, refreshData }) => {

  const [player, setHomeRun] = useState("");

  const onSubmit = (event) => {

    event.preventDefault();

    axios.post("/api/homerun", { player: player })
      .then(res => {
        res.data["stats"] = [];
        const newData = Object.assign([], myData);
        newData.push(res.data);
        refreshData(newData);
      })
      .catch(err => console.log(err));

    setHomeRun("");

  };

  const onChange = (event) => {
    setHomeRun(event.target.value);
  };


  return (
    <div className={styles.card}>
      <h1>Create a HomeRun</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="player"
          placeholder="HomeRun"
          value={player}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Create HomeRun"
        />
      </form>
    </div>
  );
}

export default CreateHomeRun;