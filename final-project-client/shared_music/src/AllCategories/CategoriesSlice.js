import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    categories: [],
    status: 'idle',
}

export const fetchcategories = createAsyncThunk(
    'fetchcategories',
    async () => {

        try {
            const response = await axios.get("https://localhost:7001/api/Category");
            // console.log(response.data);
            let categories = response.data.map((Category) =>
            ({
                id: Category.id,
                name: Category.name,
                fileImage: Category.fileImage,
                image: Category.image,
                description: Category.description,
                songs: Category.songs,
            }));
            return categories;

            // console.log("categories", categories)
        } catch (error) {
            console.error(error);
        }

        // try {
        //     if (response.status === 200) {
        //         for (let index = 0; index < categories.length; index++) {
        //             const img = await axios.get(`https://localhost:7001/api/Song/getImage/${categories[index].ImageUrl}`)
        //             categories[index] = { ...categories[index], fileImage: img.data }
        //         }
        //         return categories;
        //     }
        // } catch (error) {
        //     console.log(error);
        //     return (error.message);
        // }
    }
);


export const addCategory = createAsyncThunk(
    'addcategories',
    async (song) => {
        try {
            const formData = new FormData();
            formData.append('Name', song.name);
            formData.append('Description', song.description);
            formData.append('FileImage', song.fileImage);
            formData.append('FileSong', song.fileSong);
            formData.append('UserId', song.userId);
            formData.append('CategoryId', song.Image);

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


export const updatecategories = createAsyncThunk(
    'updatecategories',
    async (categories) => {
        try {
            const formData = new FormData();
            formData.append('Name', categories.Name);
            formData.append('Price', categories.Price);
            formData.append('Description', categories.Description);
            formData.append('CategoryId', categories.CategoryId);
            formData.append('StoreId', categories.StoreId);
            formData.append('Image', categories.Image);

            const response = await axios.put(`https://localhost:7229/api/categories/${categories.Id}`, formData, {
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

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchcategories.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.categories = action.payload
        })
    
       
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.categories.push(action.payload); // Push the new song to the categories array
        })

    },
})

export const { } = categoriesSlice.actions

export default categoriesSlice.reducer

