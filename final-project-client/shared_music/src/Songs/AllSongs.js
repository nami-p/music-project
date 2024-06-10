import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import SongHeader from "./SongHeader";
import Songs from "./Songs";

const AllSongs = () => {

    return (<div className="page"><SongHeader></SongHeader>
        <Songs ></Songs></div>);
}

export default AllSongs;