import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import CountdownDemo from './CountdownDemo'
import UploaderDemo from './UploaderDemo'

storiesOf('DEMO', module)
    .add('Countdown', () => <CountdownDemo />)
    .add('Uploader', () => <UploaderDemo />)
