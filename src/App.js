// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import io from 'socket.io-client';
import './App.css';

type Props = {};

type State = {
  mouseDown: boolean,
  x: number,
  y: number,
};

type Line = {
  color: string,
  size: number,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
};

class App extends Component<Props, State> {
  state = {
    mouseDown: false,
    x: 0,
    y: 0,
  };

  canvas: null | HTMLCanvasElement = null;
  ctx: null | HTMLCanvasElement = null;

  getMousePos = (e: SyntheticMouseEvent<>) => {
    const rect = this.canvas.getBoundingClientRect();

    // use cursor pos as default
    let clientX = e.clientX;
    let clientY = e.clientY;

    // use first touch if available
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    // return mouse/touch position inside canvas
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  drawLine = (line: Line) => {
    if (!this.ctx) return;

    this.ctx.strokeStyle = line.color;
    this.ctx.lineWidth = line.size;
    this.ctx.lineCap = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(line.startX, line.startY);
    this.ctx.lineTo(line.endX, line.endY);
    this.ctx.stroke();
  };

  drawStart = (e: SyntheticMouseEvent<>) => {
    const { x, y } = this.getMousePos(e);
    this.setState(() => ({ mouseDown: true, x, y }));

    // make sure we start painting, useful to draw simple dots
    this.draw(e);
  };

  drawEnd = () => {
    this.setState(() => ({ mouseDown: false }));
  };

  draw = (e: SyntheticMouseEvent<>) => {
    if (!this.state.mouseDown) return;

    // calculate the current x, y coords
    const { x, y } = this.getMousePos(e);

    // Offset by 1 to ensure drawing a dot on click
    const newX = x + 1;
    const newY = y + 1;

    // create current line object
    const line = {
      color: 'black',
      size: 5,
      startX: this.state.x,
      startY: this.state.y,
      endX: newX,
      endY: newY,
    };

    // actually draw the line
    this.drawLine(line);

    // set current x, y coords
    this.setState(() => ({ x: newX, y: newY }));
  };

  render() {
    return (
      <canvas
        width={3000}
        height={3000}
        style={{
          display: 'block',
          background: '#fff',
          touchAction: 'none',
        }}
        ref={(canvas: null | HTMLCanvasElement) => {
          if (canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
          }
        }}
        onMouseDown={this.drawStart}
        onMouseUp={this.drawEnd}
        onMouseOut={this.drawEnd}
        onMouseMove={this.draw}
        onTouchStart={this.drawStart}
        onTouchMove={this.draw}
        onTouchEnd={this.drawEnd}
        onTouchCancel={this.drawEnd}
      />
    );
  }
}

export default App;
