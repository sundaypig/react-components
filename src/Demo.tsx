import React, { Component, createRef } from 'react'

import Countdown from './components/Countdown'

class Demo extends Component {
    countdown = createRef<Countdown>()

    handleClick = (): void => {
        this.countdown.current.start()
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
