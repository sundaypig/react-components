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
