import React, { PureComponent, createRef, MouseEvent, CSSProperties, TouchEvent } from 'react'

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
    canvasStyle?: CSSProperties
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
        if (!this.canvas.current || onSave === undefined) {
            return
        }
        const dataURL = this.canvas.current.toDataURL('image/jpeg')
        onSave(dataURItoBlob(dataURL))
    }

    private clear = (): void => {
        if (!this.canvas.current) {
            return
        }
        const { width, height } = this.props
        this.ctx.clearRect(0, 0, width!, height!)
    }

    private handleMousedown = (event: MouseEvent<HTMLCanvasElement>) => {
        event.preventDefault()
        const ctx = this.ctx
        const canvas = this.canvas.current!
        this.canDraw = true
        this.originX = event.clientX - canvas.offsetLeft
        this.originY = event.clientY - canvas.offsetTop
        ctx.strokeStyle = this.props.color!
        ctx.lineWidth = this.props.lineWidth!
    }

    private handleTouchStart = (event: TouchEvent<HTMLCanvasElement>) => {
        event.preventDefault()
        const ctx = this.ctx
        const canvas = this.canvas.current!
        this.canDraw = true
        this.originX = event.touches[0].clientX - canvas.getBoundingClientRect().left
        this.originY = event.touches[0].clientY - canvas.getBoundingClientRect().top
        ctx.strokeStyle = this.props.color!
        ctx.lineWidth = this.props.lineWidth!
    }

    private handleMousemove = (event: MouseEvent<HTMLCanvasElement>) => {
        event.preventDefault()
        if (!this.canDraw) {
            return
        }
        const canvas = this.canvas.current!
        const ctx = this.ctx
        const x = event.clientX - canvas.offsetLeft
        const y = event.clientY - canvas.offsetTop
        ctx.beginPath()
        ctx.moveTo(this.originX, this.originY)
        ctx.lineTo(x, y)
        ctx.stroke()
        this.originX = x
        this.originY = y
    }

    private handleTouchMove = (event: TouchEvent<HTMLCanvasElement>) => {
        event.preventDefault()
        if (!this.canDraw) {
            return
        }
        const canvas = this.canvas.current!
        const ctx = this.ctx
        const x = event.touches[0].clientX - canvas.getBoundingClientRect().left
        const y = event.touches[0].clientY - canvas.getBoundingClientRect().top
        ctx.beginPath()
        ctx.moveTo(this.originX, this.originY)
        ctx.lineTo(x, y)
        ctx.stroke()
        this.originX = x
        this.originY = y
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
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.stopDraw}
                onTouchMove={this.handleTouchMove}
                width={width}
                height={height}
                ref={this.canvas}
                style={this.props.canvasStyle}
            />
        )
        return isFunction(children) ? children({ save: this.save, drawingBoard, clear: this.clear }) : null
    }
}

export default DrawingBoard
