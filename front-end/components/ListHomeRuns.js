import styles from '../styles/Home.module.css'
import ListStats from "./ListStats";
import CreateStat from "./CreateStat";

const ListHomeRuns = ({ myData, refreshData }) => {

  const renderHomeRuns = Object.values(myData).map((homerun) => {
    return (
      <div
        className={styles.card}
        key={homerun.homerunId}
      >
        <h1>HomeRun</h1>
        <p>{homerun.player}</p>
        <ListStats stats={homerun.stats} />
        <CreateStat homerunId={homerun.homerunId} refreshData={refreshData} myData={myData} />
      </div>
    );
  });

  return (
    <div>
      {renderHomeRuns}
    </div>
  );
};

export default ListHomeRuns;