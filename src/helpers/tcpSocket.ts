import TcpSocket from 'react-native-tcp-socket';

export const tcpConnect = (port: number, host: string) => {
    return new Promise<TcpSocket.Socket>((resolve, reject) => {
        const client = TcpSocket.createConnection({ port, host }, () => {
            client.setEncoding('utf-8');
            resolve(client);
            reject = () => { };
        });

        client.on('error', reject);
    });
}