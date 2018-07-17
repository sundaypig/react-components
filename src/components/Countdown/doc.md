## Usage

```javascript
import React, { Component, createRef } from 'react'
import Countdown from 'typescript-react-components/lib/Countdown'

class Demo extends Component {
    countdown = createRef<Countdown>()

    handleClick = async (): Promise<void> => {
        this.countdown.current.start()
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 3000)
        })
        this.countdown.current.reset()
    }

    render() {
        return (
            <Countdown ref={this.countdown} initialRemaining={10} initialContent="获取验证码">
                {({ content, running }) => (
                    <button onClick={this.handleClick} disabled={running}>
                        {content}
                    </button>
                )}
            </Countdown>
        )
    }
}

export default Demo
```

## Props

| prop             | type           | default    | description                                               |
|------------------|----------------|------------|-----------------------------------------------------------|
| initialRemaining | number         | 60         | 倒计时时间                                                 |
| initialContent   | string         | 获取验证码  | 按钮初始文本                                               |
| children         | ()=>JSX.Element|    -       | 展示元素                                                   |
| interval         | number         | 1000       | 时间间隔                                                   |
  
## methods  
  
```start```  
开始倒计时  

```reset```  
重置倒计时  
