import React, { Component } from 'react'
import Snake from './Snake'
import Food from './Food'

const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max-min+1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max-min+1) + min) / 2) * 2;
    return [x,y]
}

const boardStyle = {
    position: 'relative',
    margin: '50px auto',
    width: '600px',
    height: '600px',
    border: '2px solid #000'
}

const initialState = {
    snakeDots: [
        [0,0],
        [2,0]
    ],
    food: getRandomCoordinates(),
    direction: 'RIGHT',
    speed: 200
}

class Board extends Component {
   
    //Set the initial state - food must be initially generated in componentDidMount, otherwise it causes server/client mismatch in the values
    //..and many hours of debugging
    state = {
        snakeDots: [
            [0,0],
            [2,0]
        ],
        food: [],
        direction: 'RIGHT',
        speed: 200
    }

    //Move the snake ever *speed* milliseconds
    componentDidMount() {
        this.setState({ food: getRandomCoordinates() })
        this.interval = setInterval(this.moveSnake, this.state.speed);
        document.onkeydown = this.onKeyDown;
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    //Check if game is over on every component update
    componentDidUpdate() {
        this.checkBorders();
        this.checkEatingItself();
        this.checkIfEatingFood();
    }

    //Set the direction in the state on pressed arrow key
    onKeyDown = (e) => {
        e = e || window.event ;
        switch (e.keyCode) {
            case 38:
                this.setState({direction: 'UP'});
                break;
            case 40:
                this.setState({direction: 'DOWN'});
                break;
            case 37:
                this.setState({direction: 'LEFT'});
                break;
            case 39:
                this.setState({direction: 'RIGHT'});
                break;
            case 90:
                this.speedUp();
                break;
        }
    }

    //Move snake according to the direction
    moveSnake = () => {
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length - 1];

        switch (this.state.direction) {
            case 'RIGHT':
                head = [head[0] + 2, head[1]];
                break;
            case 'LEFT':
                head = [head[0] - 2, head[1]];
                break;
            case 'DOWN':
                head = [head[0], head[1] + 2];
                break;
            case 'UP':
                head = [head[0], head[1] - 2];
                break;
        }

        dots.push(head);
        dots.shift();

        this.setState({
            snakeDots: dots
        })
    }

    //Check if the snake passe through the food
    checkIfEatingFood() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        let food = this.state.food;
        if (head[0] == food[0] && head[1] == food[1]) {
            this.setState({
                food: getRandomCoordinates()
            })
            this.feedSnake();
        }
    }

    //Make the snake bigger
    feedSnake() {
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift([]);
        this.setState({
            snakeDots: newSnake
        }) 
    }

    //Check if the head is eating itself
    checkEatingItself() {
        let snake = [...this.state.snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach(dot => {
            if (head[0] == dot[0] && head[1] == dot[1]) {
                this.gameOver();
            }
        })
    }

    //Check if the the snake is out of borders and end the game
    checkBorders() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] <0) {
            this.gameOver();
        }
    }

    //Increase the speed with every bite taken
    speedUp() {
        if (this.state.speed > 10) {
            this.setState({
                speed: this.state.speed - 10
            })
        }
    }

    //TODO: End the game with something other than alert
    gameOver() {
        alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
        this.setState(initialState);
    }
    
    render() {
        return (
            <div style = {boardStyle}>
                <Snake snakeDots = {this.state.snakeDots} />
                <Food dot = {this.state.food} />
            </div>
        )
    }

}

export default Board