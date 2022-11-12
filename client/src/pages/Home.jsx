import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
// fetching random videos.
const [videos, setVideos] = useState([]);

// fetching data whenever this page will be refresh.
useEffect(()=> {
  const fetchingVideos = async() =>{
    const res = await axios.get(`/videos/${type}`);
    setVideos(res.data);
  }
  fetchingVideos();
},[type])

// fetching all the video and each video showing a card
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
        ))}    
    </Container>
  );
};

export default Home;

// 1:51:34
