import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    reviews: [],
    status: 'idle',
}

export const fetchreviews = createAsyncThunk(
    'fetchreviews',
    async (thunkAPI) => {
        try {
            const response = await axios.get('https://localhost:7001/api/Review');
            console.log("in fetch reviews");
            let reviews = response.data;
            if (response.status === 200) {
                // for (let index = 0; index < reviews.length; index++) {
                //     const img = await axios.get(`https://localhost:7001/api/review/getImage/${reviews[index].image}`);
                //     const review = await axios.get(`https://localhost:7001/api/review/getreview/${reviews[index].review1}`)
                //     reviews[index] = { ...reviews[index], fileImage: img.data,reviewName:reviews[index].review1,filereview:review.data }
                // }
                return reviews;
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);

export const getImage = createAsyncThunk(
    'getImage',
    async (reviews) => {
        try {
            const response = await axios.get(`https://localhost:7001/api/review/getImage/${reviews.urlImage.toString()}`)
            // console.log(response.data);
            const image = { img: response.data, id: reviews.id };
            return image;

        } catch (error) {
            console.log(error);
        }
    }
)

export const addreview = createAsyncThunk(
    'addreview',
    async (review) => {
        try {
            const formData = new FormData();
            formData.append('Content', review.Content);
            formData.append('RatingStars', +review.RatingStars);
            formData.append('UserId', +review.UserId);
            formData.append('SongId', +review.SongId);

            const response = await axios.post(`https://localhost:7001/api/Review`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {

                const img = await axios.get(`https://localhost:7001/api/User/getImage/${response.data.user.profilImage}`)
                response.data.user.profilImage = img.data;
            }
            // const review = await axios.get(`https://localhost:7001/api/review/getreview/${response.data.review1}`)
            // response.data.review = review.data;
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }
);


// export const updatereviews = createAsyncThunk(
//     'updatereviews',
//     async (reviews) => {
//         try {
//             const formData = new FormData();
//             formData.append('Name', reviews.Name);
//             formData.append('Price', reviews.Price);
//             formData.append('Description', reviews.Description);
//             formData.append('CategoryId', reviews.CategoryId);
//             formData.append('StoreId', reviews.StoreId);
//             formData.append('Image', reviews.Image);

//             const response = await axios.put(`https://localhost:7229/api/reviews/${reviews.Id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             return response.data;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// );

// export const updatereview = (state, action) => {
//     const { index, review } = action.payload;
//     // state.reviews[index] = review;
//     for (const key in review) {
//         // Check if the field has a non-empty value
//         if (Object.prototype.hasOwnProperty.call(review, key) && review[key] !== undefined) {
//             // Update the corresponding field in the review at the specified index
//             state.reviews[index][key] = review[key];
//         }
//     }
// };

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        // updatereview: (state, action) => {
        //     const { index, review } = action.payload;
        //     // state.reviews[index] = review;
        //     for (const key in review) {
        //         // Check if the field has a non-empty value
        //         if (Object.prototype.hasOwnProperty.call(review, key) && review[key] !== undefined) {
        //             // Update the corresponding field in the review at the specified index
        //             state.reviews[index][key] = review[key];
        //         }
        //     }
        // },
        // deletereview: (state, action) => {
        //     state.reviews = state.reviews.filter(review => review.id != action.payload);
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchreviews.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.reviews = action.payload
        })

        builder.addCase(getImage.fulfilled, (state, action) => {
            state.imgStatus = 'fulfilled'
            state.images.push(action.payload);
        })
        builder.addCase(addreview.fulfilled, (state, action) => {
            state?.reviews?.push(action.payload); // Push the new review to the reviews array
        })

    },
})

export const { } = reviewsSlice.actions

export default reviewsSlice.reducer

