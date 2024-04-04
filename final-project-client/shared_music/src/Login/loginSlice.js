
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isConnect: false,
    user: null,
    rememberMeChecked: false, // Rename rememberMe to rememberMeChecked to avoid naming conflict
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        disconnect: (state) => {
            state.isConnect = false;
            state.user = null;
        },
        connectu: (state,action) => {
            console.log('connnect: ', action.payload);
            // state.isConnect = true;
            state.isConnect=action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserProfilImage:(state,action)=>{
            state.user.profilImage = action.payload;
        },

        rememberMeChecked: (state, action) => {
            state.rememberMeChecked = action.payload;

        }
        },
    })
// const rememberMeReducer = (state = initialState.rememberMe, action) => {
//     switch (action.type) {
//       case 'login/rememberMe':
//         return action.payload.remember;
//       default:
//         return state;
//     }
//   };

export const { disconnect, connectu, setUser, rememberMeChecked ,setUserProfilImage} = loginSlice.actions;



export default loginSlice.reducer