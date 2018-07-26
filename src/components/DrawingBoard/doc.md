## Usage

```javascript
import React, { Component } from 'react'
import DrawingBoard from 'typescript-react-components/lib/DrawingBoard'

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
                lineWidth={3}
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

```

## Props

| prop             | type           | default    | description                                               | required |
|------------------|----------------|------------|-----------------------------------------------------------|----------|
| width            | number         | 300        | canvas宽度                                                 | false   |
| height           | number         | 300        | canvas高度                                                 | false    |
| color            | string         | #000       | 笔触颜色                                                   | false    |
| lineWidth        | number         | 3          | 笔触宽度                                                   | false    |
| onSave           | (blob: Blob) => void |  -   | 保存回调                                                   | false    |
| children         | () => JSX.Element |  -      | 展示元素                                                   | true     |
| canvasStyle      | CSSProperties  | -          | canvas样式                                                 | false    |
