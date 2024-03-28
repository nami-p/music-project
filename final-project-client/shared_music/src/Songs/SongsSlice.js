import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    songs: [],
    songsToUser: [],
    status: 'idle',
    songsToUserStatus: 'idle',
}

export const fetchSongs = createAsyncThunk(
    'fetchSongs',
    async (thunkAPI) => {
        try {
            const response = await axios.get('https://localhost:7001/api/Song');
            console.log("in fetch songs");
            let songs = response.data;
            if (response.status === 200) {
                // for (let index = 0; index < songs.length; index++) {
                //     const img = await axios.get(`https://localhost:7001/api/Song/getImage/${songs[index].image}`);
                //     const song = await axios.get(`https://localhost:7001/api/Song/getSong/${songs[index].song1}`)
                //     songs[index] = { ...songs[index], fileImage: img.data,songName:songs[index].song1,fileSong:song.data }
                // }
                return songs;
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);
export const fetchSongsForUser = createAsyncThunk(
    'fetchSongsForUser',
    async (id) => {
        try {
            const response = await axios.get(`https://localhost:7001/sharedMusic/SongToUser/User/${id}`);
            let songs = response.data;
            // if (response.status === 200) {
            //     for (let index = 0; index < songs.length; index++) {
            //         const img = await axios.get(`https://localhost:7001/api/Song/getImage/${songs[index].ImageUrl}`)
            //         songs[index] = { ...songs[index], fileImage: img.data }
            //     }
            console.log(songs,'song to user');
            return songs;
        }
        catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);

export const getImage = createAsyncThunk(
    'getImage',
    async (songs) => {
        try {
            const response = await axios.get(`https://localhost:7001/api/Song/getImage/${songs.urlImage.toString()}`)
            // console.log(response.data);
            const image = { img: response.data, id: songs.id };
            return image;

        } catch (error) {
            console.log(error);
        }
    }
)

export const addsong = createAsyncThunk(
    'addsongs',
    async (song) => {
        try {
            const formData = new FormData();
            formData.append('Name', song.Name);
            formData.append('Description', song.Description);
            formData.append('FileImage', song.FileImage);
            formData.append('FileSong', song.FileSong);
            formData.append('UserId', song.UserId);
            formData.append('CategoryId', (Number)(song.CategoryId));

            const response = await axios.post(`https://localhost:7001/api/song`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                const img = await axios.get(`https://localhost:7001/api/Song/getImage/${response.data.image}`)
                response.data.image=img.data;
                const song=await axios.get(`https://localhost:7001/api/Song/getSong/${response.data.song1}`)
                response.data.song=song.data;
                return response.data;
            }
            } catch (error) {
                console.log(error);
            }
        }
);


export const updatesongs = createAsyncThunk(
    'updatesongs',
    async (songs) => {
        try {
            const formData = new FormData();
            formData.append('Name', songs.Name);
            formData.append('Price', songs.Price);
            formData.append('Description', songs.Description);
            formData.append('CategoryId', songs.CategoryId);
            formData.append('StoreId', songs.StoreId);
            formData.append('Image', songs.Image);

            const response = await axios.put(`https://localhost:7229/api/songs/${songs.Id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

// export const updateSong = (state, action) => {
//     const { index, song } = action.payload;
//     // state.songs[index] = song;
//     for (const key in song) {
//         // Check if the field has a non-empty value
//         if (Object.prototype.hasOwnProperty.call(song, key) && song[key] !== undefined) {
//             // Update the corresponding field in the song at the specified index
//             state.songs[index][key] = song[key];
//         }
//     }
// };

export const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        updateSong: (state, action) => {
            const { index, song } = action.payload;
            // state.songs[index] = song;
            for (const key in song) {
                // Check if the field has a non-empty value
                if (Object.prototype.hasOwnProperty.call(song, key) && song[key] !== undefined) {
                    // Update the corresponding field in the song at the specified index
                    state.songs[index][key] = song[key];
                }
            }
        },
        deleteSong: (state, action) => {
            state.songs = state.songs.filter(song => song.id != action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSongs.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.songs = action.payload
        })
        builder.addCase(fetchSongsForUser.fulfilled, (state, action) => {
            state.songsToUserStatus = 'fulfilled'
            state.songsToUser = action.payload
        })
        builder.addCase(getImage.fulfilled, (state, action) => {
            state.imgStatus = 'fulfilled'
            state.images.push(action.payload);
        })
        builder.addCase(addsong.fulfilled, (state, action) => {
            state.songs.push(action.payload); // Push the new song to the songs array
        })

    },
})

export const { updateSong, deleteSong } = songsSlice.actions

export default songsSlice.reducer

