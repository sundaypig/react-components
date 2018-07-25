import React, { Component, CSSProperties } from 'react'

import DrawingBoard from '../../src/components/DrawingBoard'

function blobToDataURL(blob: Blob, callback: Function) {
    var a = new FileReader()
    a.onload = function(e: any) {
        callback(e.target.result)
    }
    a.readAsDataURL(blob)
}

const canvasStyle: CSSProperties = {
    border: '1px solid #ccc',
    display: 'inline-block'
}

class DrawingBoardDemo extends Component {
    state = {
        src: ''
    }

    render() {
        return (
            <DrawingBoard
                color="red"
                lineWidth={30}
                onSave={blob => {
                    blobToDataURL(blob, src => {
                        this.setState({ src })
                    })
                }}
            >
                {({ drawingBoard, save, clear }) => (
                    <>
                        <div>
                            <button onClick={clear}>清除</button>
                            <button onClick={save}>保存</button>
                        </div>
                        <div style={canvasStyle}>{drawingBoard}</div>
                        <img src={this.state.src} alt="" />
                    </>
                )}
            </DrawingBoard>
        )
    }
}

export default DrawingBoardDemo
