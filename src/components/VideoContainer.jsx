
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { YOUTUBE_API_URL } from '../utils/constants'
import VideoCard from './VideoCard'

const VideoContainer = () => {
    const [videos,Setvideos]=useState([])
    useEffect(()=>{
      getVideoData()
    },[])

    const getVideoData=async()=>{
const res=await fetch(YOUTUBE_API_URL);
const json=await res.json();
Setvideos(json.items)
    }
  return (
    <div className='flex flex-wrap'>
      {
          videos.map((video)=>(
            <Link to={"/watch?v="+video.id} key={video.id}>
            <VideoCard info={video}/>
        </Link>
        ))
      }
    </div>
  )
}

export default VideoContainer
