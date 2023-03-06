import { useState } from "react";
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import CreateHomeRun from '../components/CreateHomeRun'
import ListHomeRuns from '../components/ListHomeRuns'

function Home({ data }) {


  const [myData, setMyData] = useState(data);

  const refreshData = (newData) => {
    setMyData(newData);
    console.log("data refreshed ", newData);
  };

  return (
      <div className={styles.content}>
        <CreateHomeRun myData={myData} refreshData={refreshData} />
        <ListHomeRuns myData={myData} refreshData={refreshData} />
      </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external APIs
  const res = await fetch('http://query-service:5200/api/query');
  const data = await res.json();
  console.log("server side props ", data);

  // Pass data to the page via props
  return { props: { data }};
}

export default Home;
