import React, { PureComponent } from 'react'

import Uploader, { FileItem } from '../../src/components/Uploader'
import styles from './index.less'

type State = Readonly<{ files: FileItem[] }>

class UploaderDemo extends PureComponent<{}, State> {
    readonly state: State = {
        files: []
    }

    handleChange = (files: FileItem[]) => {
        this.setState({ files })
    }

    handleComplete = (res: any) => {
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
                action="http://registry.adh123.com/index/upload?type=1&mark=da49ay17aenp6ivb"
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
                                            style={{
                                                background: `url(${image.src}) no-repeat center center / contain`
                                            }}
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
