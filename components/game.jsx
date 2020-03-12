import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const ballRadius = 10;
        let x = canvas.width / 2;
        let y = canvas.height - 30;
        let dx = 2;
        let dy = -2;
        const paddleHeight = 10;
        const paddleWidth = 75;
        let paddleX = (canvas.width - paddleWidth) / 2;
        let rightPressed = false;
        let leftPressed = false;
        const brickRowCount = 3;
        const brickColumnCount = 5;
        const brickWidth = 75;
        const brickHeight = 20;
        const brickPadding = 10;
        const brickOffsetTop = 30;
        const brickOffsetLeft = 30;
        let score = 0;
        let lives = 3;

        let bricks = [];
        for (let c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }

        document.addEventListener("keydown", keyDownHandle, false);
        document.addEventListener("keyup", keyUpHandle, false);
        document.addEventListener("mousemove", mouseMoveHandler, false);

        function mouseMoveHandler(e) {
            const relativeX = e.clientX - canvas.offsetLeft;
            if (relativeX > 0 && relativeX < canvas.width) {
                paddleX = relativeX - paddleWidth / 2;
            }
        }

        function keyDownHandle(e) {
            if (e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = true;
            }
            else if (e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = true;
            }
        }

        function keyUpHandle(e) {
            if (e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = false;
            }
            else if (e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = false;
            }
        }

        function collisionDetection() {
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    let b = bricks[c][r];
                    if (b.status == 1) {
                        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                            dy = -dy;
                            b.status = 0;
                            score++;
                            if (score == brickColumnCount * brickRowCount) {
                                alert("YOU WON!");
                                document.location.reload();
                            }
                        }
                    }
                }
            }
        }

        function drawScore() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText("Score: " + score, 8, 20)
        }

        function drawLives() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#66FCF1";
            ctx.fill();
            ctx.closePath();
        }

        function drawBricks() {
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    if (bricks[c][r].status === 1) {
                        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        if (r === 0) {
                            ctx.fillStyle = "#6F2232";
                        } else if (r === 1) {
                            ctx.fillStyle = "#950740";
                        } else if (r === 2) {
                            ctx.fillStyle = "#C3073F";
                        }
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#1A1A1D";
            ctx.fill();
            ctx.closePath();
            drawBricks();
            drawBall();
            drawPaddle();
            drawScore();
            drawLives();
            collisionDetection();

            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                dx = -dx;
            }
            if (y + dy < ballRadius) {
                dy = -dy;
            } else if (y + dy > canvas.height - ballRadius) {
                if (x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                } else {
                    lives--;
                    if (!lives) {
                        alert("GAME OVER");
                        document.location.reload();
                    } else {
                        x = canvas.width / 2;
                        y = canvas.height - 30;
                        dx = 2;
                        dy = -2;
                        paddleX = (canvas.width - paddleWidth) / 2;
                    }

                }
            }

            if (rightPressed) {
                paddleX += 7;
                if (paddleX + paddleWidth > canvas.width) {
                    paddleX = canvas.width - paddleWidth;
                }
            } else if (leftPressed) {
                paddleX -= 7;
                if (paddleX < 0) {
                    paddleX = 0;
                }
            }

            x += dx;
            y += dy;

            requestAnimationFrame(draw);
        }

        draw();
    }

    render() {
        return (
            <div className="modal-background">
                <canvas id='game-canvas' ref='canvas' width="480" height="320">
                </canvas>
            </div>   
        )
    }
}

export default Game;