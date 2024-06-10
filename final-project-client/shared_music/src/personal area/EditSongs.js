import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Loading from "../loading/loading";

import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';

import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Rating, Tooltip } from '@mui/material';
import axios from 'axios';
import { deleteSong, updateSong } from '../Songs/SongsSlice';
import { GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';




export default function EditSongs() {
    console.log("i am here editinggggggggggggggggg");
    const dispatch = useDispatch();
    const userId = useSelector(state => state.login.user).id;
    const categories = useSelector(state => state.categories.categories)
    const allSongs = useSelector(state => state.songs.songs);
    const status = useSelector(state => state.songs.status);

    let songs = [];
    if (Array.isArray(allSongs) && userId) { songs = allSongs?.map((song, i) => ({ ...song, indexAtAllSongs: i })).filter((song) => song.userId === userId) || [] };


    const [rows, setRows] = React.useState(songs?.map((song, i) => ({
        ...song,
        index: i + 1,
        uploadDate: new Date(song?.uploadDate.slice(0, 10) + 'Z'),
        image: { avatar: song.image },
        category: categories?.find(c => c.id === song.categoryId).name,
    })
    ));

    const [rowModesModel, setRowModesModel] = React.useState({});
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => async () => {
        try {
            await axios.delete(`https://localhost:7001/api/Song/${id}`);
            dispatch(deleteSong(id));
            setRows(rows.filter((row) => row.id !== id));

        }
        catch (err) {
            console.log(err);
        }
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        console.log(editedRow);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow) => {
        if (newRow.name.length < 5 || newRow.name.length > 50 || !/^[A-Za-z\s-,.()!]+$/.test(newRow.name)) {
            // Alert user about invalid name
            alert("Invalid name. Name should be between 5-50 characters and contain only letters A-Z or a-z or -, . ( ) !");

        }
        else {
            // Validate description length and characters
            if (newRow.description.length < 5 || newRow.description.length > 100 || !/^[A-Za-z\s-,.()!]+$/.test(newRow.description)) {
                // Alert user about invalid description
                alert("Invalid description. Description should be between 5-100 characters and contain only letters A-Z or a-z or -, . ( ) !");
                return newRow; // Return without saving
            }
            else {
                const updatedRow = { ...newRow, isNew: false, };

                setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
                try {
                    // for (var key in newRow) {
                    //     if (key !== "index" && key !== "category" && key !== "image" && key !== "isNew"&&key!==) {
                    //         console.log(key[0].toUpperCase() + key.slice(1) + ":" + newRow[key]);
                    //         formData.append(key[0].toUpperCase() + key.slice(1), newRow[key]);
                    //     }

                    // }
                    const formData = new FormData();
                    const songForUpdating = { name: updatedRow.name, description: updatedRow.description, categoryId: updatedRow.categoryId }
                    formData.append('Name', updatedRow.name);
                    formData.append('Description', updatedRow.description);
                    formData.append('CategoryId', updatedRow.categoryId);
                    // formData.append('image', updatedRow.image);
                    await axios.put(`https://localhost:7001/api/Song/UpdateSong/${updatedRow.id}`, formData);
                    dispatch(updateSong({ index: updatedRow.indexAtAllSongs, song: songForUpdating }));
                }
                catch (err) {
                    console.log(err)
                }
                return updatedRow;
            }
        }


    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: "index", headerName: "#", width: 40 },
        {
            field: "image",
            headerName: "IMAGE",
            // type: 'actions',
            width: 78,
            editable: true,
            renderCell: (params) => {

                return (
                    <Link to="/songView"
                        state={{ songId: params?.row?.id }}>
                        <Avatar
                            sx={{ width: 56, height: 56 }}
                            variant="rounded"
                            src={params.value.avatar} className="playImage">
                        </Avatar>
                    </Link>
                );
            }
        },
        { field: 'name', headerName: 'NAME', width: 350, editable: true },
        {
            field: 'uploadDate',
            headerName: 'UPLOAD',
            type: 'date',
            width: 120,
            // editable: true,
        },
        { field: 'description', headerName: 'DESCRIPTION', width: 180, editable: true },
        {
            field: 'category',
            headerName: 'CATEGORY',
            width: 120,
            editable: true,
            type: 'singleSelect',
            valueOptions: categories ? categories.map(category => category.name) : [""],
        },
        {
            field: 'numOfRaters',
            headerName: 'RATERS',
            type: 'number',
            width: 80,
            align: 'center',
            headerAlign: 'left',
        },
        {
            field: 'ratingStars',
            headerName: 'RATING',
            width: 130,
            renderCell: (params) => {

                return (
                    <Tooltip title={params.value}>
                        <Rating name="read-only" value={params.value} readOnly />
                    </Tooltip>
                );
            }
        },
        {
            field: 'numOfPlays',
            headerName: 'PLAYBACKS',
            type: 'number',
            width: 90,
            align: 'center',
            headerAlign: 'left',
        },
        {
            field: 'numOfDownloads',
            headerName: 'DOWNLOADS',
            type: 'number',
            width: 100,
            align: 'center',
            headerAlign: 'left',
        },
        {
            field: 'numOfLikes',
            headerName: 'LIKES',
            type: 'number',
            width: 70,
            align: 'center',
            headerAlign: 'left',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 90,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon color="primary" />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon color="primary" />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (<>
        {status === 'iddle' && <Loading />}
        {status === 'fulfilled' && <Box

            sx={{
                height: "100vh",
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
                paddingTop: '12.7vh'
            }}
        >
            <DataGrid
                sx={{
                    border: "none", padding: "1.8rem",
                    // disable cell selection style
                    '.MuiDataGrid-cell:focus': {
                        outline: 'none'
                    },

                }}
                rows={rows}
                columns={columns}
                rowHeight={80}
                editMode="row"
                hideFooterSelectedRowCount
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: GridToolbar,
                }}
                slotProps={{
                    toolbar: {
                        setRows, setRowModesModel, showQuickFilter: true,
                    },
                }}
                initialState={{

                    pagination: {
                        paginationModel: {
                            pageSize:5,
                        },
                    },
                }}
            />
        </Box>}
    </>
    );
}


/*     -private string name;
       -private string description;
       ?private string image;
       -private long categoryId;
       private string song1;
              private long artistId;
              private double length;
              -private int numOfPlays;
              -private int ratingStars;
              -private DateTime uploadDate;
              -private int numOfRaters;







*/
