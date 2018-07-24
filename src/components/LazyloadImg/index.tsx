import React, { PureComponent, createRef } from 'react'

type LazyloadImgProps = {
    src: string
    placeholder: string
    offset?: number
    [key: string]: any
}

type LazyloadImgState = Readonly<{
    src: string
}>

const noUseProps = ['src', 'placeholder', 'offset']

class LazyloadImg extends PureComponent<LazyloadImgProps, LazyloadImgState> {
    static defaultProps = {
        offset: 0
    }

    readonly state: LazyloadImgState = {
        src: this.props.placeholder
    }

    private element = createRef<HTMLImageElement>()

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    private handleScroll = () => {
        if (this.elementIsVisible) {
            const { src } = this.props
            this.setState({ src })
        }
    }

    get elementIsVisible(): boolean {
        const position = this.element.current!.getBoundingClientRect()
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth
        const offset = this.props.offset!
        return (
            position.bottom >= 0 - offset &&
            position.right >= 0 - offset &&
            position.top < viewportHeight + offset &&
            position.left < viewportWidth + offset
        )
    }

    get imageProps() {
        return Object.keys(this.props)
            .filter((item: string): boolean => noUseProps.indexOf(item) === -1)
            .reduce((props, key) => ({ ...props, [key]: this.props[key] }), {})
    }

    render() {
        return <img ref={this.element} src={this.state.src} {...this.imageProps} />
    }
}

export default LazyloadImg
