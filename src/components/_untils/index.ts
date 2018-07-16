export const isFunction = function(functionToCheck: any) {
    const getType = {}
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}
