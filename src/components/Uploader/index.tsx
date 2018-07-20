import React, { Component, createRef, ChangeEvent } from 'react'
import EXIF from 'exif-js'

import { getId, isFunction } from '../_untils'

const inputStyle = {
    display: 'none'
}

const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

export interface UploaderRenderProps {
    triggerId: string
    fileList: FileItem[]
    deleteFile: (id: string) => void
}

export interface FileItem {
    id: string
    progress: number
    status: 'waiting' | 'uploading' | 'error' | 'success'
    name: string
    response: any
    src: string
}

interface T {
    status: 'error' | 'success'
    url: string
    [key: string]: any
}

interface UploaderProps {
    multiple?: boolean
    children?: (props: UploaderRenderProps) => JSX.Element
    triggerId: string
    name?: string
    action: string
    accept?: string[]
    headers?: { [key: string]: string }
    maximum?: number
    maxsize?: number
    maxWidth?: number
    maxHeight?: number
    fileList: FileItem[]
    onError?: (errorMessage: string) => void
    onComplete: (response: any) => T
    onChange: (files: FileItem[]) => void
}

interface UploaderState {}

class Uploader extends Component<UploaderProps, UploaderState> {
    static defaultProps = {
        multiple: false,
        name: 'file',
        headers: {},
        accept: ['jpeg', 'jpg', 'png', 'gif'],
        maximum: 5,
        maxsize: 5 * 1024,
        maxWidth: 750,
        maxHeight: 1334,
        fileList: [],
        triggerId: 'uploadTrigger',
        onError: (errorMessage: string) => {
            // console.log(errorMessage)
        }
    }

    state = {}

    private input = createRef<HTMLInputElement>()
    private _isMounted: boolean
    private fileList = this.props.fileList
    private uploadTasks = this.props.fileList.filter(item => item.status !== 'success')
    private xhrs: XMLHttpRequest[] = []

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
        for (let xhr of this.xhrs) {
            if (xhr && xhr.readyState && xhr.readyState !== 0 && xhr.readyState !== 4) {
                xhr.abort()
            }
        }
    }

    private handleInputChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        event.preventDefault()
        const files = Array.from(event.target.files!)
        const { maxsize, onError } = this.props
        if (!this.checkLength(files.length)) {
            return
        }
        if (!files.every(this.checkType)) {
            onError!('不支持的上传类型')
            return
        }
        if (!files.every(this.checkSize)) {
            onError!(`图片大小不能超过${maxsize! / 1024}M`)
            return
        }
        this.resetInput()
        const promiseImages = files.map(image => {
            const id = getId(3)
            return this.fileToDataUrl(image).then(dataUrl => {
                this.fileList.push({
                    id,
                    progress: 0,
                    status: 'waiting',
                    response: null,
                    name: image.name,
                    src: dataUrl as string
                })
                this.uploadTasks.push({
                    id,
                    progress: 0,
                    status: 'waiting',
                    response: null,
                    name: image.name,
                    src: dataUrl as string
                })
                this.props.onChange([...this.fileList])
            })
        })
        await Promise.all(promiseImages)
        const promiseuploads = this.uploadTasks.filter(item => item.status === 'waiting').map(image => {
            return this.upload(image)
        })
        await Promise.all(promiseuploads)
    }

    private upload = (image: FileItem): Promise<void> => {
        return new Promise((resolve, reject) => {
            const { action, headers, name } = this.props
            const xhr = new XMLHttpRequest()
            this.xhrs.push(xhr)
            xhr.upload.addEventListener('progress', e => this.handleProgress(e, image.id), false)
            const data = new FormData()
            data.append(name!, this.dataURItoBlob(image.src))
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const xhrRes = JSON.parse(xhr.responseText)
                    const res = this.props.onComplete(xhrRes)
                    this.updateUploadStatus(image.id, res)
                    resolve()
                }
            }
            xhr.onerror = err => {
                this.updateUploadStatus(image.id, { url: '', status: 'error' })
                reject(err)
            }
            xhr.open('post', action, true)
            for (let key in headers!) {
                if (true) {
                    xhr.setRequestHeader(key, headers![key])
                }
            }
            xhr.send(data)
            this.updateStatusToUploading(image.id)
        })
    }

    private updateStatusToUploading = (id: string): void => {
        const _uploadTarget = this.uploadTasks[this.uploadTasks.findIndex(item => item.id === id)]
        const _previewTarget = this.fileList[this.fileList.findIndex(item => item.id === id)]
        if (!_uploadTarget || !_previewTarget) {
            return
        }
        _uploadTarget.status = _previewTarget.status = 'uploading'
        const newPreviewImages = this.fileList.map(item => {
            return item.id === id ? Object.assign(item, { status: 'uploading' }) : item
        })
        this.props.onChange(newPreviewImages)
    }

    private updateUploadStatus = (id: string, res: T): void => {
        const _uploadTarget = this.uploadTasks[this.uploadTasks.findIndex(item => item.id === id)]
        const _previewTarget = this.fileList[this.fileList.findIndex(item => item.id === id)]
        if (!_uploadTarget || !_previewTarget) {
            return
        }
        let newPreviewImages = this.fileList.map(item => {
            return item.id === id ? Object.assign(item, { progress: 100, response: res, status: res.status }) : item
        })
        this.props.onChange(newPreviewImages)
        _uploadTarget.status = _previewTarget.status = res.status
        _uploadTarget.response = _previewTarget.response = res
    }

    private handleProgress = (e: ProgressEvent, id: string): void => {
        if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100)
            const _previewTarget = this.fileList[this.fileList.findIndex(item => item.id === id)]
            if (!_previewTarget) {
                return
            }
            _previewTarget.progress = progress
            const newPreviewImages = this.fileList.map(item => {
                return item.id === id ? { ...item, progress } : item
            })
            this.props.onChange(newPreviewImages)
        }
    }

    private resetInput = (): void => {
        if (!this._isMounted) {
            return
        }
        this.input.current!.value = ''
    }

    private dataURItoBlob = (dataURL: string): Blob => {
        const BASE64_MARKER = ';base64,'
        let parts
        let contentType
        let raw
        if (dataURL.indexOf(BASE64_MARKER) === -1) {
            parts = dataURL.split(',')
            contentType = parts[0].split(':')[1]
            raw = parts[1]
            return new Blob([raw], { type: contentType })
        }

        parts = dataURL.split(BASE64_MARKER)
        contentType = parts[0].split(':')[1]
        raw = window.atob(parts[1])
        const rawLength = raw.length

        const uInt8Array = new Uint8Array(rawLength)

        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i)
        }

        return new Blob([uInt8Array], { type: contentType })
    }

    private checkLength = (len: number): boolean => {
        const { maximum, fileList } = this.props
        if (typeof maximum !== 'number') {
            throw new Error('maximum必须为数字类型')
        }
        if (maximum < 1) {
            throw new Error('maximum必须大于等于1')
        }
        if (len + fileList.length > maximum) {
            this.props.onError!(`最多只能选择${maximum}张图片`)
            return false
        }
        return true
    }

    private checkType = (image: File): boolean => {
        const { accept } = this.props
        return accept!.indexOf(image.type.split('/')[1]) !== -1
    }

    private checkSize = (image: File): boolean => {
        const { maxsize } = this.props
        return image.size <= maxsize! * 1024
    }

    private fileToDataUrl = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            const that = this
            reader.onload = () => {
                EXIF.getData(file as any, function() {
                    EXIF.getAllTags(this)
                    const orientation = EXIF.getTag(this, 'Orientation')
                    that.compressImage(reader.result, orientation, file, resolve)
                })
            }
            reader.readAsDataURL(file)
        })
    }

    private handleDelete = (imageId: string): void => {
        this.fileList.splice(this.fileList.findIndex(item => item.id === imageId), 1)
        this.uploadTasks.splice(this.uploadTasks.findIndex(item => item.id === imageId), 1)
        this.props.onChange([...this.fileList])
        this.resetInput()
    }

    private compressImage = (src: string, orientation: number, file: File, resolve: (s: string) => void) => {
        const image = new Image()
        const that = this
        image.src = src
        image.onload = function() {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')!
            let originWidth = image.width
            let originHeight = image.height
            const { maxWidth, maxHeight } = that.props
            let targetWidth = originWidth
            let targetHeight = originHeight
            if (originWidth > maxWidth! || originHeight > maxHeight!) {
                if (originWidth / originHeight > maxWidth! / maxHeight!) {
                    targetWidth = maxWidth!
                    targetHeight = Math.round(maxWidth! * (originHeight / originWidth))
                } else {
                    targetHeight = maxHeight!
                    targetWidth = Math.round(maxHeight! * (originWidth / originHeight))
                }
            }
            canvas.width = targetWidth
            canvas.height = targetHeight
            switch (orientation) {
                // iphone 横屏拍摄，此时 home 键在左侧 旋转180度
                case 3:
                    ctx.rotate(Math.PI)
                    ctx.drawImage(image, -targetWidth, -targetHeight, targetWidth, targetHeight)
                    break
                // iphone 竖屏拍摄，此时 home 键在下方(正常拿手机的方向) 旋转90度
                case 6:
                    canvas.width = targetHeight
                    canvas.height = targetWidth
                    ctx.rotate(Math.PI / 2)
                    ctx.drawImage(image, 0, -targetHeight, targetWidth, targetHeight)
                    break
                // iphone 竖屏拍摄，此时 home 键在上方 旋转270度
                case 8:
                    canvas.width = targetHeight
                    canvas.height = targetWidth
                    ctx.rotate((3 * Math.PI) / 2)
                    ctx.drawImage(image, -targetWidth, 0, targetWidth, targetHeight)
                    break
                default:
                    ctx.drawImage(image, 0, 0, targetWidth, targetHeight)
            }
            const dataUrl = canvas.toDataURL(file.type, 0.6)
            resolve(dataUrl)
        }
    }

    render() {
        const { multiple, triggerId, children, fileList } = this.props
        const restProps: any = {}
        if (!isiOS) {
            restProps.capture = 'camera'
        }
        return (
            <>
                {isFunction(children) ? children!({ triggerId, fileList, deleteFile: this.handleDelete }) : null}
                <input
                    ref={this.input}
                    type="file"
                    id={triggerId}
                    accept="image/*"
                    multiple={multiple}
                    onChange={this.handleInputChange}
                    style={inputStyle}
                    {...restProps}
                />
            </>
        )
    }
}

export default Uploader
