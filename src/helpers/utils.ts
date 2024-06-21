export const getTimeNow = () => [
    new Date().toLocaleDateString().split('/').join('-'),
    [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].join('.')
].join('-');

export const handleTCPData = (data: string | Buffer) => {
    const parsedData = data.toString();
    return {
        estabilidade: parsedData.substring(0, 2).replace(/\s/g, ''),
        tipoPeso: parsedData.substring(3, 5).replace(/\s/g, ''),
        prefix: parsedData.substring(6, 7).replace(/\s/g, ''),
        valor: parsedData.substring(7, 15).replace(/\s/g, ''),
        unidade: parsedData.includes('Neh') ? '' : parsedData.substring(17, 19).replace(/\s/g, ''),
        terminacao: parsedData.substring(19, 25).replace(/\s/g, ''),
    };
}