## Usage

```javascript
import React, { Component } from 'react'
import LazyloadImg from 'typescript-react-components/lib/LazyloadImg'

const src = 'https://github.com/sundaypig/blog/raw/master/images/component.gif'

const src2 = 'https://github.com/sundaypig/blog/raw/master/images/screenshot2.png'

const placeholder =
    // tslint:disable-next-line:max-line-length
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNTBweCcgaGVpZ2h0PSc1MHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgY2xhc3M9InVpbC1kZWZhdWx0Ij48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIgY2xhc3M9ImJrIj48L3JlY3Q+PHJlY3QgIHg9JzQ2JyB5PSc0MCcgd2lkdGg9JzgnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nI2MwYzBjMCcgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScwLjdzJyBiZWdpbj0nMHMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0NicgeT0nNDAnIHdpZHRoPSc4JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNjMGMwYzAnIHRyYW5zZm9ybT0ncm90YXRlKDQ1IDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzAuN3MnIGJlZ2luPScwLjA4NzVzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYnIHk9JzQwJyB3aWR0aD0nOCcgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjYzBjMGMwJyB0cmFuc2Zvcm09J3JvdGF0ZSg5MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScwLjdzJyBiZWdpbj0nMC4xNzVzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYnIHk9JzQwJyB3aWR0aD0nOCcgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjYzBjMGMwJyB0cmFuc2Zvcm09J3JvdGF0ZSgxMzUgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMC43cycgYmVnaW49JzAuMjYyNDk5OTk5OTk5OTk5OTZzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYnIHk9JzQwJyB3aWR0aD0nOCcgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjYzBjMGMwJyB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMC43cycgYmVnaW49JzAuMzVzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYnIHk9JzQwJyB3aWR0aD0nOCcgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjYzBjMGMwJyB0cmFuc2Zvcm09J3JvdGF0ZSgyMjUgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMC43cycgYmVnaW49JzAuNDM3NXMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0NicgeT0nNDAnIHdpZHRoPSc4JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNjMGMwYzAnIHRyYW5zZm9ybT0ncm90YXRlKDI3MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScwLjdzJyBiZWdpbj0nMC41MjQ5OTk5OTk5OTk5OTk5cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2JyB5PSc0MCcgd2lkdGg9JzgnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nI2MwYzBjMCcgdHJhbnNmb3JtPSdyb3RhdGUoMzE1IDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzAuN3MnIGJlZ2luPScwLjYxMjQ5OTk5OTk5OTk5OTlzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48L3N2Zz4='

class LazyloadImgDemo extends Component {
    render() {
        return (
            <>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <LazyloadImg src={src} placeholder={placeholder} alt="test" />
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <p>请往下滚动</p>
                <LazyloadImg src={src2} placeholder={placeholder} alt="test" />
            </>
        )
    }
}

export default LazyloadImgDemo
```

## Props

| prop             | type           | default    | description                                               | required |
|------------------|----------------|------------|-----------------------------------------------------------|----------|
| src              | string         | -          | 真实图片资源                                               | true     |
| placeholder      | string         | -          | 图片占位                                                   | true     |
| offset           | number         | 0          | 偏移量                                                     | false    |
