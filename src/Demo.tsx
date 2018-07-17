import React, { Component, createRef } from 'react'

import Countdown from './components/Countdown'

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
