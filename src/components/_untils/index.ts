import { ComponentType } from 'react'

export const isFunction = <T extends Function>(value: any): value is T => typeof value === 'function'

export const getId = (length: number): string => {
    return Number(
        Math.random()
            .toString()
            .substr(3, length) + Date.now()
    ).toString(36)
}

export const getComponentName = (component: ComponentType<any>) => component.displayName || (component as any).name

export const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
    defaultProps: DP,
    Cmp: ComponentType<P>
) => {
    // we are extracting props that need to be required
    type RequiredProps = Omit<P, keyof DP>
    // we are re-creating our props definition by creating and intersection type
    // between all original props mapped to be optional and required to be required
    type Props = Partial<DP> & Required<RequiredProps>

    // here we set our defaultProps
    Cmp.defaultProps = defaultProps

    // we override return type definition by turning type checker off
    // for original props  and setting the correct return type
    return (Cmp as ComponentType<any>) as ComponentType<Props>
}

export const dataURItoBlob = (dataURL: string): Blob => {
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
