
import { PersistGate } from 'redux-persist/integration/react';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from './main/store';
import RouterComponents from './main/RouterComponent';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect } from 'react';
import { fetchSongs } from './Songs/SongsSlice';
import { fetchcategories } from './AllCategories/CategoriesSlice';
import { fetchusers } from './Users/UsersSlice';

const theme = createTheme({
  mode: 'light',
  typography: {
    fontFamily: [
      '"Segoe UI"',
      'Roboto',
      'cursive',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#72e2e3',
    },
    secondary: {
      main: '#ffaeb5',
    },
    background: {
      default: '#ffffff',
    },
  },
});


function App() {

  const dispatch = useDispatch();
  const statusSong = useSelector(state => {console.log (state) ;return state.songs.status})
  const statusCategory = useSelector(state => state.categories.status)

  useEffect(() => {
    const fetchData = async () => {
      if (statusSong != "fulfilled")
        dispatch(fetchSongs());
      if (statusCategory != "fulfilled")
        dispatch(fetchcategories());
     
    };
    fetchData();
  }, []);

  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <RouterComponents />
        </ThemeProvider>
      </PersistGate>
    </>);
}

export default App;
