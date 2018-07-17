export const isFunction = function(functionToCheck: any) {
    const getType = {}
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}

export const getId = (length: number): string => {
    return Number(
        Math.random()
            .toString()
            .substr(3, length) + Date.now()
    ).toString(36)
}
