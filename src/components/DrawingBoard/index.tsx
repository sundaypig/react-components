import React, { PureComponent, createRef, MouseEvent, CSSProperties } from 'react'

import { isFunction, dataURItoBlob } from '../_untils'

type DrawingBoardRenderProps = {
    save: () => void
    clear: () => void
    drawingBoard: JSX.Element
}

type DrawingBoardProps = {
    width?: number
    height?: number
    color?: string
    lineWidth?: number
    onSave?: (blob: Blob) => void
    children(props: DrawingBoardRenderProps): JSX.Element
}

const canvasStyle: CSSProperties = {
    display: 'block'
}

class DrawingBoard extends PureComponent<DrawingBoardProps> {
    static defaultProps = {
        width: 300,
        height: 300,
        lineWidth: 3,
        color: '#000'
    }

    private originX = 0
    private originY = 0
    private canDraw = false
    private canvas = createRef<HTMLCanvasElement>()
    private ctx: CanvasRenderingContext2D

    componentDidMount() {
        if (!this.canvas.current) {
            return
        }
        this.ctx = this.canvas.current.getContext('2d')!
    }

    private save = (): void => {
        const { onSave } = this.props
        if (!this.canvas.current) {
            return
        }
        if (onSave === undefined) {
            return
        }
        const dataURL = this.canvas.current!.toDataURL('image/jpeg')
        onSave(dataURItoBlob(dataURL))
    }

    private clear = (): void => {
        const { width, height } = this.props
        this.ctx.clearRect(0, 0, width!, height!)
    }

    private handleMousedown = (event: MouseEvent<HTMLCanvasElement>) => {
        const ctx = this.ctx
        const canvas = this.canvas.current!
        this.canDraw = true
        this.originX = event.clientX - canvas.offsetLeft
        this.originY = event.clientY - canvas.offsetTop
        ctx.strokeStyle = this.props.color!
        ctx.lineWidth = this.props.lineWidth!
        ctx.moveTo(this.originX, this.originY)
        ctx.beginPath()
    }

    private handleMousemove = (event: MouseEvent<HTMLCanvasElement>) => {
        if (!this.canDraw) {
            return
        }
        const canvas = this.canvas.current!
        const ctx = this.ctx
        const x = event.clientX - canvas.offsetLeft
        const y = event.clientY - canvas.offsetTop
        ctx.lineTo(x, y)
        ctx.stroke()
    }

    private stopDraw = () => {
        if (this.canDraw) {
            const ctx = this.ctx
            ctx.closePath()
            this.canDraw = false
        }
    }

    render() {
        const { children, width, height } = this.props
        const drawingBoard = (
            <canvas
                onMouseDown={this.handleMousedown}
                onMouseUp={this.stopDraw}
                onMouseLeave={this.stopDraw}
                onMouseMove={this.handleMousemove}
                width={width}
                height={height}
                ref={this.canvas}
                style={canvasStyle}
            />
        )
        return isFunction(children) ? children({ save: this.save, drawingBoard, clear: this.clear }) : null
    }
}

export default DrawingBoard
