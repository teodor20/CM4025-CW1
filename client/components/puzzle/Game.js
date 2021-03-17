import React, { useState, useEffect, useRef } from "react";
import cloneDeep from 'lodash.clonedeep'
import { useEvent, getColors } from "./Util";
import Swipe from "react-easy-swipe";
import {Redirect, Link} from 'react-router-dom'
import auth from '../../auth/auth-helper'
import Block from './Block'
import {createGame} from '../api/api-game'

const style = {
  newGameButton: {
    padding: 10,
    background: "#846F5B",
    color: "#F8F5F0",
    width: 95,
    borderRadius: 7,
    fontWeight: "900",
    marginLeft: "auto",
    marginBottom: "auto",
    cursor: "pointer",
  },
  tryAgainButton: {
    padding: 10,
    background: "#846F5B",
    color: "#F8F5F0",
    width: 80,
    borderRadius: 7,
    fontWeight: "900",
    cursor: "pointer",
    margin: "auto",
    marginTop: 20,
  },
  gameOverOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    left: 0,
    top: 0,
    borderRadius: 5,
    background: "rgba(238,228,218,.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
}

export default function Game() {
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated();

    const [data, setData] = useState([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  
    const [gameOver, setGameOver] = useState(false);

    const UP_ARROW = 38;
    const DOWN_ARROW = 40;
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;
    const timer = useRef(0);
    let intervalId = 0;
  
    //Record game start
    const recordGame = () => {

      clearInterval(intervalId);

      const game = {
        type: '2048',
        user: jwt.user._id,
        duration: timer.current
      }

      createGame( {userId: jwt.user._id},
                  {t: jwt.token},
                  game ).then((data) => {
                    if (data && data.error) {
                      console.log(data.error)
                    }
                  })

      clearInterval(intervalId);
    }

    // Initialize the grid
    const initialize = () => {
  
      let newGrid = cloneDeep(data);
  
      addNumber(newGrid);
      addNumber(newGrid);
      setData(newGrid);
    };
  
    // Add a random number
    const addNumber = (newGrid) => {
      let added = false;
      let gridFull = false;
      let attempts = 0;
      while (!added) {
        if (gridFull) {
          break;
        }
  
        let rand1 = Math.floor(Math.random() * 4);
        let rand2 = Math.floor(Math.random() * 4);
        attempts++;
        if (newGrid[rand1][rand2] === 0) {
          newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
          added = true;
        }
        if (attempts > 50) {
          gridFull = true;
          let gameOverr = checkIfGameOver();
          if (gameOverr) {
            alert("game over");
          }
        }
      }
    };
    // Swipe Left
    const swipeLeft = (dummy) => {
      let oldGrid = data;
      let newArray = cloneDeep(data);
  
      for (let i = 0; i < 4; i++) {
        let b = newArray[i];
        let slow = 0;
        let fast = 1;
        while (slow < 4) {
          if (fast === 4) {
            fast = slow + 1;
            slow++;
            continue;
          }
          if (b[slow] === 0 && b[fast] === 0) {
            fast++;
          } else if (b[slow] === 0 && b[fast] !== 0) {
            b[slow] = b[fast];
            b[fast] = 0;
            fast++;
          } else if (b[slow] !== 0 && b[fast] === 0) {
            fast++;
          } else if (b[slow] !== 0 && b[fast] !== 0) {
            if (b[slow] === b[fast]) {
              b[slow] = b[slow] + b[fast];
              b[fast] = 0;
              fast = slow + 1;
              slow++;
            } else {
              slow++;
              fast = slow + 1;
            }
          }
        }
      }
      if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
        addNumber(newArray);
      }
      if (dummy) {
        return newArray;
      } else {
        setData(newArray);
      }
    };
  
    const swipeRight = (dummy) => {
      let oldData = data;
      let newArray = cloneDeep(data);
  
      for (let i = 3; i >= 0; i--) {
        let b = newArray[i];
        let slow = b.length - 1;
        let fast = slow - 1;
        while (slow > 0) {
          if (fast === -1) {
            fast = slow - 1;
            slow--;
            continue;
          }
          if (b[slow] === 0 && b[fast] === 0) {
            fast--;
          } else if (b[slow] === 0 && b[fast] !== 0) {
            b[slow] = b[fast];
            b[fast] = 0;
            fast--;
          } else if (b[slow] !== 0 && b[fast] === 0) {
            fast--;
          } else if (b[slow] !== 0 && b[fast] !== 0) {
            if (b[slow] === b[fast]) {
              b[slow] = b[slow] + b[fast];
              b[fast] = 0;
              fast = slow - 1;
              slow--;
            } else {
              slow--;
              fast = slow - 1;
            }
          }
        }
      }
      if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
        addNumber(newArray);
      }
      if (dummy) {
        return newArray;
      } else {
        setData(newArray);
      }
    };
  
    const swipeDown = (dummy) => {
      let b = cloneDeep(data);
      let oldData = JSON.parse(JSON.stringify(data));
      for (let i = 3; i >= 0; i--) {
        let slow = b.length - 1;
        let fast = slow - 1;
        while (slow > 0) {
          if (fast === -1) {
            fast = slow - 1;
            slow--;
            continue;
          }
          if (b[slow][i] === 0 && b[fast][i] === 0) {
            fast--;
          } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
            b[slow][i] = b[fast][i];
            b[fast][i] = 0;
            fast--;
          } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
            fast--;
          } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
            if (b[slow][i] === b[fast][i]) {
              b[slow][i] = b[slow][i] + b[fast][i];
              b[fast][i] = 0;
              fast = slow - 1;
              slow--;
            } else {
              slow--;
              fast = slow - 1;
            }
          }
        }
      }
      if (JSON.stringify(b) !== JSON.stringify(oldData)) {
        addNumber(b);
      }
      if (dummy) {
        return b;
      } else {
        setData(b);
      }
    };
  
    const swipeUp = (dummy) => {
      let b = cloneDeep(data);
      let oldData = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < 4; i++) {
        let slow = 0;
        let fast = 1;
        while (slow < 4) {
          if (fast === 4) {
            fast = slow + 1;
            slow++;
            continue;
          }
          if (b[slow][i] === 0 && b[fast][i] === 0) {
            fast++;
          } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
            b[slow][i] = b[fast][i];
            b[fast][i] = 0;
            fast++;
          } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
            fast++;
          } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
            if (b[slow][i] === b[fast][i]) {
              b[slow][i] = b[slow][i] + b[fast][i];
              b[fast][i] = 0;
              fast = slow + 1;
              slow++;
            } else {
              slow++;
              fast = slow + 1;
            }
          }
        }
      }
      if (JSON.stringify(oldData) !== JSON.stringify(b)) {
        addNumber(b);
      }
      if (dummy) {
        return b;
      } else {
        setData(b);
      }
    };
  
    // Check if the game is over
    const checkIfGameOver = () => {
      let checker = swipeLeft(true);
  
      if (JSON.stringify(data) !== JSON.stringify(checker)) {
        return false;
      }
  
      let checker2 = swipeDown(true);
      if (JSON.stringify(data) !== JSON.stringify(checker2)) {
        return false;
      }
  
      let checker3 = swipeRight(true);
  
      if (JSON.stringify(data) !== JSON.stringify(checker3)) {
        return false;
      }
  
      let checker4 = swipeUp(true);
  
      if (JSON.stringify(data) !== JSON.stringify(checker4)) {
        return false;
      }
  
      return true;
    };
    // Reset the game
    const resetGame = () => {
      setGameOver(false);
      const emptyGrid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
  
      addNumber(emptyGrid);
      addNumber(emptyGrid);
      setData(emptyGrid);
      recordGame();
      timer.current=0;

    };
  
    const handleKeyDown = (event) => {
      if (gameOver) {
        return;
      }
      switch (event.keyCode) {
        case UP_ARROW:
          swipeUp();
          break;
        case DOWN_ARROW:
          swipeDown();
          break;
        case LEFT_ARROW:
          swipeLeft();
          break;
        case RIGHT_ARROW:
          swipeRight();
          break;
        default:
          break;
      }
  
      let gameOverr = checkIfGameOver();
      if (gameOverr) {
        setGameOver(true);
      }
    };
  
    useEvent("keydown", handleKeyDown);

    useEffect(() => {
      const abortController = new AbortController();
      if (!jwt) {
          setRedirectToSignin(true);
          return function cleanup(){
              abortController.abort()
          }
      }
      
      //Create a Game in the db if tab/browser is closed
      window.addEventListener("beforeunload", recordGame);

      //Start timer
      intervalId = setInterval(() => {
        timer.current++;
      }, 1000);

      //Initialise the game
      initialize();
      // eslint-disable-next-line

      return () => {
        //Create a Game in the db if component is closed        
        recordGame();
        clearInterval(intervalId);
        window.removeEventListener("beforeunload", recordGame);
      }
    }, []);
  
    if (redirectToSignin) {
        return <Redirect to='/signin'/>
    }

    return (
      <div>
        <div
          style={{
            width: 345,
            margin: "auto",
            marginTop: 30
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                fontFamily: "sans-serif",
                flex: 1,
                fontWeight: "700",
                fontSize: 60,
                color: "#776e65",
              }}
            >
              2048
            </div>
            <div
              style={{
                flex: 1,
                marginTop: "auto",
              }}
            >
              <div onClick={resetGame} style={style.newGameButton}>
                NEW GAME
              </div>
            </div>
          </div>
          <div
            style={{
              background: "#AD9D8F",
              width: "max-content",
              height: "max-content",
              margin: "auto",
              padding: 5,
              borderRadius: 5,
              marginTop: 10,
              position: "relative",
            }}
          >
            {gameOver && (
              <div style={style.gameOverOverlay}>
                <div>
                  <div
                    style={{
                      fontSize: 30,
                      fontFamily: "sans-serif",
                      fontWeight: "900",
                      color: "#776E65",
                    }}
                  >
                    Game Over
                  </div>
                  <div>
                    <div
                      style={{
                        flex: 1,
                        marginTop: "auto",
                      }}
                    >
                      <div onClick={resetGame} style={style.tryAgainButton}>
                        Try Again
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Swipe
              onSwipeDown={() => {
                swipeDown();
              }}
              onSwipeLeft={() => swipeLeft()}
              onSwipeRight={() => swipeRight()}
              onSwipeUp={() => swipeUp()}
              style={{ overflowY: "hidden" }}
            >
              {data.map((row, oneIndex) => {
                return (
                  <div style={{ display: "flex" }} key={oneIndex}>
                    {row.map((digit, index) => (
                      <Block num={digit} key={index} />
                    ))}
                  </div>
                );
              })}
            </Swipe>
          </div>
  
          <div style={{ width: "inherit" }}>
            <p>
              <strong className="important">How to play:</strong> Use your{" "}
              <strong>arrow keys</strong> to move the tiles. When two tiles with
              the same number touch, they <strong>merge into one!</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }