import React, { Component } from 'react';
import io from 'socket.io-client';
import './drawingBoard.css';

class DrawingBoard extends Component {
  constructor() {
    super();

    this.state = {
      lines: [],
      isDrawing: false,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.socket = io.connect('http://localhost:3020');
    this.socket.on('updateLines', (data) => {
      this.setState({ lines: data.lines });
    });
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button !== 0) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    const lines = this.state.lines;
    lines.push([point]);
    this.setState(prevState => ({
      lines,
      isDrawing: true,
    }));
  }

  handleMouseMove(mouseEvent) {
    if (!this.state.isDrawing) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    const lines = this.state.lines;
    lines[lines.length - 1].push(point);
    this.setState({ lines });
  }

  handleMouseUp() {
    this.setState({ isDrawing: false });
    this.socket.emit('updateLines', { lines: this.state.lines });
  }

  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.drawArea.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    };
  }

  render() {
    return (
      <div
        className="drawArea"
        ref={el => (this.drawArea = el)}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        role="OnMouseMove"
      >
        <Drawing lines={this.state.lines} />
      </div>
    );
  }
}

function Drawing({ lines }) {
  return (
    <svg className="drawing">
      {lines.map((line, index) => (
        <DrawingLine key={index} line={line} />
      ))}
    </svg>
  );
}

function DrawingLine({ line }) {
  const pathData = `M ${line.map(p => `${p.x} ${p.y}`).join(' L ')}`;

  return <path className="path" d={pathData} />;
}

export default DrawingBoard;
