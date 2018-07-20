## Usage

```javascript
import React, { Component } from 'react'

import Uploader from 'typescript-react-components/lib/Uploader'

const styles = require('./style.less')

class UploaderDemo extends PureComponent {
    state = {
        files: []
    }

    handleChange = files => {
        this.setState({ files })
    }

    handleComplete = res => {
        return {
            url: res.errcode === 0 ? (res.file_path as string) : '',
            status: (res.errcode === 0 ? 'success' : 'error') as 'success' | 'error',
            source: res.source
        }
    }

    render() {
        return (
            <Uploader
                triggerId="file"
                action="XXXX"
                fileList={this.state.files}
                onChange={this.handleChange}
                onComplete={this.handleComplete}
            >
                {({ fileList, triggerId, deleteFile }) => (
                    <>
                        <div className={styles.uploaderHeader}>
                            <p>图片上传</p>
                        </div>
                        <div className={styles.uploadView}>
                            {fileList.map(image => (
                                <div className={styles.wrapper} key={image.id}>
                                    <div className={styles.container}>
                                        <div
                                            style={{ background: `url(${image.src}) no-repeat center center / contain` }}
                                        />
                                        {(image.progress === 100 && image.status !== 'uploading') ||
                                        image.status === 'error' ? null : (
                                            <span>{`${image.progress}%`}</span>
                                        )}
                                    </div>
                                    {image.status === 'success' || image.status === 'uploading' ? (
                                        <div className={styles.deleteBtn} onClick={() => deleteFile(image.id)}>
                                            <span />
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                            <div className={styles.plusBtnWrapper}>
                                <label className={styles.plusBtn} htmlFor={triggerId} />
                            </div>
                        </div>
                    </>
                )}
            </Uploader>
        )
    }
}

export default UploaderDemo
```

## Props

| prop       | type                                                                                                                                                         | default       | description          | necessity |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | -------------------- | --------- |
| multiple   | boolean                                                                                                                                                      | false         | 是否需要多选         | false     |
| triggerId  | string                                                                                                                                                       | uploadTrigger | 触发元素 Id          | true      |
| children   | ()=>JSX.Element                                                                                                                                              | -             | 展示元素             | true      |
| name       | string                                                                                                                                                       | file          | 上传图片给后台的字段 | false     |
| action     | string                                                                                                                                                       | -             | 上传地址             | true      |
| headers    | { [key: string]: string }                                                                                                                                    | {}            | 请求头               | false     |
| maximum    | number                                                                                                                                                       | 5             | 图片最大选择数量     | false     |
| maxsize    | number                                                                                                                                                       | 5 \* 1024     | 单张图片最大上传尺寸 | false     |
| fileList   | Array<{ id: string; progress: number; status: 'waiting' \| 'uploading' \| 'error' \| 'success'; name: string; response: any; src: string }>                  | []            | 图片数组             | true      |
| onChange   | (files: Array<{ id: string; progress: number; status: 'waiting' \| 'uploading' \| 'error' \| 'success'; name: string; response: any; src: string }>) => void | -             | 文件状态改变回调     | true      |
| onComplete | (response: any) => { status: 'error' \| 'success'; url: string; [key: string]: any }                                                                         | -             | 上传成功回调         | true      |
| onError    | onError?: (errorMessage: string) => void                                                                                                                     | -             | 错误处理回调         | false     |
