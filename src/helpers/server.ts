import { TableColumns } from '../entities/commons/database';
import {db} from './database'

class Server {

    public url  :string = '';
    public host :string = '';
    public route:string = '';

    public async getServer(): Promise<{ url: string; host: string; route: string; } | undefined> {

        const response: TableColumns<'TBL_SERVIDOR'> = await db.selectFirst('TBL_SERVIDOR','*', 'CD_ID > ? ORDER BY CD_ID DESC', [0]);

        if (!response.DS_HOST || ! response.DS_ROUTE) return;

        this.host = `${response.DS_HOST}`;
        this.route = `${response.DS_ROUTE}`;
        this.url = `${response.DS_HOST}${response.DS_ROUTE}`;

        return { 
            url: `${response.DS_HOST}${response.DS_ROUTE}`,
            host: `${response.DS_HOST}`, 
            route: `${response.DS_ROUTE}` 
        };
    }

    public updateServer(host: string, route: string) {
        const values: TableColumns<'TBL_SERVIDOR'> = { DS_HOST: host, DS_ROUTE: route };
        db.insert('TBL_SERVIDOR', values);
    }

}
export const server = new Server();