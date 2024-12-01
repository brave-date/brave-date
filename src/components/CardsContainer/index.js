import React, { useState, useMemo, useRef } from "react";
import { Box } from "@mui/material";
import TinderCard from "react-tinder-card";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BoltIcon from "@mui/icons-material/Bolt";
import { users } from "../../redux/matchReducer/selectors";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMatch } from "../../api/MatchAPI";
import moment from "moment";

const CardsContainer = () => {
  const dispatch = useDispatch();
  const todayDate = moment.utc().format("DD-MM-YYYY");
  const db = useSelector(users);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [, setLastDirection] = useState();
  const [currentDirection, setCurrentDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db.length]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = async (direction, email, index) => {
    setLastDirection(direction);
    setCurrentDirection(direction);
    updateCurrentIndex(index - 1);
    setTimeout(() => {
      setCurrentDirection("");
      if (direction === "right") {
        dispatch(setSelectedMatch(db[index]));
      }
    }, 1000);
  };

  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <Box className="main-box-root">
      <Box mb={2}>
        <Box className="card-container">
          {db.map((character, index) => (
            <TinderCard
              className="swipe"
              ref={childRefs[index]}
              key={character.id}
              onSwipe={(dir) => swiped(dir, character.email, index)}
              onCardLeftScreen={() => outOfFrame(character.email, index)}
            >
              <Box
                className="card"
                style={{
                  backgroundImage: character.profile_picture,
                }}
              >
                <Box
                  variant="span"
                  sx={{
                    marginLeft: "25px",
                    color: "#fff",
                    bottom: "100px",
                    position: "absolute",
                    fontSize: "30px",
                  }}
                >
                  {character.first_name}{" "}
                  {todayDate.split("-")[2] - character.birthday.split("-")[2]}
                </Box>
                {currentDirection === "left" && currentIndex === index - 1 ? (
                  <Box
                    variant="span"
                    sx={{
                      color: "red",
                      transform: "rotate(25deg)",
                      padding: "2px",
                      border: "5px solid #f60d0d",
                      marginLeft: "25px",
                      right: "20px",
                      top: "40px",
                      position: "absolute",
                      fontSize: "50px",
                    }}
                  >
                    NOPE
                  </Box>
                ) : null}
                {currentDirection === "right" && currentIndex === index - 1 ? (
                  <Box
                    variant="span"
                    sx={{
                      color: "lightgreen",
                      transform: "rotate(-25deg)",
                      padding: "2px",
                      border: "5px solid lightgreen",
                      marginLeft: "25px",
                      left: "20px",
                      top: "40px",
                      position: "absolute",
                      fontSize: "50px",
                    }}
                  >
                    LIKE
                  </Box>
                ) : null}

                <Box className="card-footer">
                  <Box className="card-footer-bottons">
                    <ReplayIcon
                      sx={{
                        cursor: "pointer",
                        padding: "10px",
                        border: "1px solid orange",
                        borderRadius: "40px",
                        position: "relative",
                        height: "42px",
                        width: "42px",
                        marginRight: "10px",
                        left: "10px",
                        top: "25px",
                        "& > *": {
                          color: "orange",
                          opacity: "1",
                        },
                      }}
                      onClick={() => goBack()}
                    />
                    <CloseIcon
                      sx={{
                        cursor: "pointer",
                        padding: "10px",
                        border: "1px solid #ff6036",
                        borderRadius: "50px",
                        position: "relative",
                        height: "50px",
                        width: "50px",
                        marginRight: "10px",
                        left: "10px",
                        top: "25px",
                        "& > *": {
                          color: "#ff6036",
                          opacity: "1",
                        },
                      }}
                      onClick={() => swipe("left")}
                    />
                    <StarIcon
                      sx={{
                        cursor: "pointer",
                        padding: "10px",
                        border: "1px solid lightblue",
                        borderRadius: "40px",
                        position: "relative",
                        height: "42px",
                        width: "42px",
                        marginRight: "10px",
                        left: "10px",
                        top: "25px",
                        "& > *": {
                          color: "lightblue",
                          opacity: "1",
                        },
                      }}
                      onClick={() => {}}
                    />
                    <FavoriteIcon
                      sx={{
                        cursor: "pointer",
                        padding: "20px",
                        border: "1px solid lightgreen",
                        borderRadius: "50px",
                        position: "relative",
                        height: "31px",
                        width: "31px",
                        marginRight: "10px",
                        left: "10px",
                        top: "25px",
                        "& > *": {
                          color: "lightgreen",
                          opacity: "1",
                        },
                      }}
                      onClick={() => {
                        swipe("right");
                      }}
                    />
                    <BoltIcon
                      sx={{
                        cursor: "pointer",
                        padding: "15px",
                        border: "1px solid #a64aa6",
                        borderRadius: "30px",
                        position: "relative",
                        height: "32px",
                        width: "32px",
                        marginRight: "10px",
                        left: "10px",
                        top: "25px",
                        "& > *": {
                          color: "#a64aa6",
                          opacity: "1",
                        },
                      }}
                      onClick={() => {}}
                    />
                  </Box>
                </Box>
              </Box>
            </TinderCard>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CardsContainer;
