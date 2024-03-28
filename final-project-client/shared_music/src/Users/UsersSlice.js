import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    users: [],
    status: 'idle',
}

export const fetchusers = createAsyncThunk(
    'fetchusers',
    async () => {

        try {
            const response = await axios.get("https://localhost:7001/api/User");
            // console.log(response.data);
            let users = response.data.map((user) =>
            ({
                id: user.id,
                name: user.firstName+" "+user.lastName,
                email:user.email,
                profilImage: user.profilImage,
                description: user.description,
                age:user.age,
            }));
            console.log(users ,"users");
            return users;

            // console.log("users", users)
        } catch (error) {
            console.error(error);
        }

        // try {
        //     if (response.status === 200) {
        //         for (let index = 0; index < users.length; index++) {
        //             const img = await axios.get(`https://localhost:7001/api/Song/getImage/${users[index].ImageUrl}`)
        //             users[index] = { ...users[index], fileImage: img.data }
        //         }
        //         return users;
        //     }
        // } catch (error) {
        //     console.log(error);
        //     return (error.message);
        // }
    }
);


export const adduser = createAsyncThunk(
    'addusers',
    async (song) => {
        try {
            const formData = new FormData();
            formData.append('Name', song.name);
            formData.append('Description', song.description);
            formData.append('FileImage', song.fileImage);
            formData.append('FileSong', song.fileSong);
            formData.append('UserId', song.userId);
            formData.append('userId', song.Image);

            const response = await axios.post(`https://localhost:7001/api/song`, formData, {
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


export const updateusers = createAsyncThunk(
    'updateusers',
    async (users) => {
        try {
            const formData = new FormData();
            formData.append('Name', users.Name);
            formData.append('Price', users.Price);
            formData.append('Description', users.Description);
            formData.append('userId', users.userId);
            formData.append('StoreId', users.StoreId);
            formData.append('Image', users.Image);

            const response = await axios.put(`https://localhost:7229/api/users/${users.Id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchusers.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.users = action.payload
        })
    
       
        builder.addCase(adduser.fulfilled, (state, action) => {
            state.users.push(action.payload); // Push the new song to the users array
        })

    },
})

export const { } = usersSlice.actions

export default usersSlice.reducer

