import styles from '../styles/Home.module.css'

const ListStats = ({ stats }) => {

  const renderStats = Object.values(stats).map((stat) => {
    return (
      <div
        className={styles.card}
        key={stat.statId}
      >
        <h1>Stat</h1>
        <p>{stat.stat}</p>
      </div>
    );
  });

  return (
    <div>
      {renderStats}
    </div>
  );
};

export default ListStats;