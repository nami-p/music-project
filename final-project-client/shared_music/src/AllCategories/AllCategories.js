import { useEffect, useState } from "react";
import '../design/categories/cardImage.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../loading/loading";

const AllCategories = (props) => {

    // const [songs,setSongs]=useState("");

    // const SongToJson = (songs) => {
    //     // create an object to store the newly formatted data
    //     let output_data = {};
    //     // the code in here is run once for each item in songs
    //     for (let i = 0; i < songs.length; i++) {
    //         // get the current item's title
    //         const name = songs[i].name;
    //         // use the title as the key in the output data
    //         //  and assign the other values to that key
    //         output_data[name] = {
    //             id: songs[i].id,
    //             userId: songs[i].userId
    //         };
    //     }

    //     // use JSON.stringify() to make a valid JSON string
    //     const json= JSON.stringify(output_data);
    //     console.log(typeof json);
    //     return json;
    //     // now use the variable json which contains your JSON string
    // }
    const categories = useSelector((state) => state.categories.categories);
    const status = useSelector((state) => state.categories.status);

    let songsArray = [];

    useEffect(() => {
        const handleMouseLeave = () => {
            const elements = document.querySelectorAll('.hover');
            elements.forEach(element => {
                element.classList.remove('hover');
            });
        };

        const hoverElements = document.querySelectorAll('.hover');
        hoverElements.forEach(element => {
            element.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            hoverElements.forEach(element => {
                element.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    // const fetchCategories = async () => {
    //     try {
    //         const response = await axios.get("https://localhost:7001/api/Category");
    //         // console.log(response.data);
    //         setCategories(response.data.map((Category) =>
    //         ({
    //             id: Category.id,
    //             name: Category.name,
    //             fileImage: Category.fileImage,
    //             image: Category.image,
    //             description: Category.description,
    //             songs: Category.songs,
    //         })));
    //         // console.log("categories", categories)
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setIsLoading(false); // Set loading to false regardless of success or error
    //     }

    // }
    return (
        <>
            {status === 'idle' && <Loading />}
            {status === "fulfilled" &&
                <div className="image-container">
                    {categories?.map((c) => {

                        return (
                            <div className="row page">
                                <figure className="snip1187">
                                    <img src={c.image} alt="sq-sample27" />
                                    <figcaption>
                                        <div className="circle"></div>
                                        <div className="icon">
                                            <span><i className="ion-ios-play-outline"></i></span>
                                        </div>

                                        <h2>{c.name.split(" ")[0] + " "}<span>{c.name.split(" ")[1] + " "}
                                            {c.name.split(" ")[2] || ""}</span></h2>
                                        {/* { songsArray=c.songs.map((song)=>({image :song.image,length:song.length,}))} */}
                                    </figcaption>
                                    <Link to="/playlist"
                                        state={{
                                            songs: c.songs, category: c, isPlaylist: true
                                        }}
                                    />
                                </figure>
                            </div>
                        )
                    }

                    )}
                </div>}
        </>
    )
}

export default AllCategories;