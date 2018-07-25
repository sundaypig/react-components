import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import CountdownDemo from './CountdownDemo'
import UploaderDemo from './UploaderDemo'
import LazyloadImgDemo from './LazyloadImgDemo'
import DrawingBoardDemo from './DrawingBoardDemo'

storiesOf('DEMO', module)
    .add('Countdown', () => <CountdownDemo />)
    .add('Uploader', () => <UploaderDemo />)
    .add('LazyloadImg', () => <LazyloadImgDemo />)
    .add('DrawingBoard', () => <DrawingBoardDemo />)
