import { LifeWorld } from "./lifeworld.js";

const canvasWidth = 600, canvasHeight = 400;
const cellWidth = 10;
const fps = 12;
let canvas, ctx;
let lifeworld;

const init = () => {
	canvas = document.querySelector("canvas");
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx = canvas.getContext("2d");
    lifeworld = new LifeWorld(60,40,.2);
	loop();
};

const loop = () => {
	setTimeout(loop,1000/fps);
    lifeworld.step();
	drawBackground();
	drawWorld();
};

const drawBackground = () => {
	ctx.save();
	ctx.fillStyle = "black";
	ctx.globalAlpha = 4/fps;
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
	ctx.restore();
};

const drawWorld = () => {
    ctx.save();
    for(let col = 0; col < lifeworld.numCols; col++){
        for(let row = 0; row <lifeworld.numRows; row++){
            drawCell(col,row,cellWidth,lifeworld.world[col][row]);
        }
    }
    ctx.restore();
};

const drawCell = (col,row,dimensions,alive) => {
    ctx.beginPath();
    ctx.rect(col*dimensions, row*dimensions,dimensions,dimensions);
    ctx.fillStyle = alive ? `red` : `rgba(0,0,0,0)`;
    ctx.fill();
};

init();