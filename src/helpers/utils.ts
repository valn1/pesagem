export const getTimeNow = () => [
    new Date().toLocaleDateString().split('/').join('-'),
    [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].join('.')
].join('-');