import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../design/reviews/reviews.css"
import { Link } from "react-router-dom";
import { addreview, fetchreviews } from "./ReviewsSlice";
import StarsRating from "./starsRating";
import AddNewSong from "../personal area/AddNewSong";
import { fDate } from '../utils/format-time';


const SongComments = ({ songId }) => {


    const dispatch = useDispatch();
    const contentRef = useRef(null);
    const reviews = useSelector(state => state.reviews.reviews);
    const status = useSelector(state => state.reviews.status);
    const user = useSelector((state) => state.login.user);
    const validContent = /^[A-Za-z\s\-,\.()!\?]{4,200}$/;
    const errors = [];
    const [songReviews, setSongReviews] = useState([]);
    const [open, setOpen] = useState(false);
    const [openRating, setOpenRating] = useState(false);
    const [newReview, setNewReview] = useState(user ? { SongId: `${songId}`, UserId: `${user.id}`, Content: '' } : '');
    const [hasComment, setHasComment] = useState(false);
    const [starsRating, setStarsRating] = useState(5);


    const handleClickOpen = () => {
        if (!validContent.test(contentRef?.current?.value)) {
            errors.push('Please enter a valid description (contain just letters).');
            alert(errors[0]);
        }
        else {
            if (contentRef?.current?.value) {
                setNewReview(prev => ({ ...prev, Content: contentRef?.current?.value, UserId: user.id }))
                setOpen(true);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAutoRate = () => {
        setNewReview(prev => ({ ...prev, RatingStars: 5 }));
        if (errors.length === 0) {
            // dispatch(addreview(newReview));
            // setOpen(false);
        }
        else {
            alert(errors[0]);
        }
    }

    const handleOpenRate = () => {
        setOpenRating(true);
    }

    const handleCloseRating = () => {
        setOpenRating(false);
    };

    const handleRate = (rating) => {
        setStarsRating(rating);
    };

    const handleRating = () => {
        setNewReview(prev => ({ ...prev, RatingStars: starsRating }));
        // dispatch(addreview(newReview));
    };

    useEffect(() => {
        if (status != "fulfilled")
            dispatch(fetchreviews());

    }, [])


    useEffect(() => {
        if (status === 'fulfilled' && reviews[0] && typeof reviews[0] === 'object') {
            const songReviews1 = reviews.filter(r => {
                if (r.songId == songId) {
                    if (user && r.userId === user.id)
                        setHasComment(true);
                    return r.songId == songId
                }

            });
            setSongReviews(
                songReviews1
            )
        }
    }, [reviews, status,])

    useEffect(() => {
        if (newReview?.RatingStars) {
            dispatch(addreview(newReview));

        }
    }, [newReview?.RatingStars])

    return (
        <div id="songComment">
            <div className="commentsConntainer">
                <div className="commentCount">{songReviews.length} comments</div>
                {!hasComment ? user && <div className="container1">
                    <Avatar src={user?.profilImage} />
                    <div className="column">
                        <div className="inputSection">
                            <div className="textInputContainer">
                                <div className="textInputField">
                                    <textarea ref={contentRef} className="textInput" placeholder="Add your comments..." style={{ "height": "1.188rem !important" }}></textarea>
                                </div>
                            </div>
                            <Button variant="contained" style={{ "borderRadius": "24px", "color": "white" }} onClick={handleClickOpen}>
                                Continue
                            </Button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Add your rating stars"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Let Tune wave help users and determine the popularity.
                                        If you you choose don't rate , your comment will be mark as 5 stars rating.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleAutoRate}>Continue</Button>
                                    <Button onClick={handleOpenRate} autoFocus>
                                        Rate
                                    </Button>

                                </DialogActions>
                            </Dialog>
                            <Dialog
                                open={openRating}
                                onClose={handleCloseRating}

                            >
                                <StarsRating handleRate={handleRate} />
                                <DialogActions>
                                    <Button onClick={handleCloseRating}>Cancel</Button>
                                    <Button onClick={handleRating}>ok</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </div> :
                    <Box sx={{ borderRadius: '24px', border: 1, padding: '17px' }} style={{ 'borderColor': '#72e2e3' }}>
                        every user can review once ! we invite you to rate and review other tracks.
                    </Box>}
                {status === 'fulfilled' && songReviews[0] && typeof songReviews[0] === 'object' &&

                    songReviews?.map((review) => {
                        const userProfile = "/userProfile/" + review.user.id;
                        const userName = review.user.firstName + " " + review.user.lastName;
                        return (
                            <>
                                <div className="commentList">
                                    <div className="commentConntainer">
                                        <Link to={userProfile}>
                                            <Avatar src={review.user.profilImage} />
                                        </Link>
                                        <div className="commentInner">
                                            <div className="commentTitles">
                                                <Link to={userProfile}>
                                                    {userName}
                                                </Link>
                                                <div className="commentTime">
                                                    {/* 3 month ago */}
                                                    {fDate(review.date)}
                                                </div>

                                            </div>
                                            <div className="contentContainer">
                                                <div className="text">
                                                    {review.content}

                                                </div>
                                                <div className="commentRate">
                                                    <Rating name="read-only" value={review.ratingStars} readOnly />

                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    )
                }
            </div>
        </div>);
}
export default SongComments;

