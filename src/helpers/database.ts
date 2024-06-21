import { QuickSQLiteConnection, open, QueryResult } from 'react-native-quick-sqlite'
import type { Column, TableColumn, TableColumns, TableName, TableRows, Tables } from '../entities/commons/database'
import { DATABASE } from '../constants/database';
import { getReadableVersion } from 'react-native-device-info';
import { makeSnapshot } from './fileSystem';

export class Database {

    private db: QuickSQLiteConnection;
    private Tables: Tables;

    constructor(tableName = 'pesagem', database = DATABASE) {
        this.db = open({ name: tableName + '.db' });
        this.Tables = database as Tables;
    }

    init() {
        this.registerSnapshot()
            .then(() => this.createTables()).catch(console.error);
    }

    private async registerSnapshot() {
        const tables = JSON.stringify(this.Tables);
        const result: TableRows<'TABLES_HISTORY'> = await this.selectTop('TABLES_HISTORY', ['TX_TABLES'], 1, 'ID != 0 ORDER BY ID DESC');
        const oldTables = result[0].TX_TABLES as string;
        if (oldTables?.length !== tables.length || oldTables !== tables) {
            await this.insert('TABLES_HISTORY', { VERSION: getReadableVersion(), TABLES: tables } as TableColumns<'TABLES_HISTORY'>);
            makeSnapshot();
        }
    }

    private async createTables() {
        Object.entries(this.Tables).forEach(async ([tableName, table]) => {
            const columns: Column[] = Object.entries(table).map(([name, type]) => ({ name: name, type: type as string }))
            await this.createTable(tableName as TableName, columns);
        })
    }

    async checkTableExists(tableName: TableName): Promise<boolean> {
        const result = await this.execute(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`);
        return !!result.rows?.length;
    }

    async getColumns(tableName: TableName): Promise<string[]> {
        const result = await this.execute(`PRAGMA table_info(${tableName});`);
        return result.rows?._array.map((row: any) => row.name) || [];
    }

    async getTables(): Promise<string[]> {
        const result = await this.execute(`SELECT name FROM sqlite_master WHERE type='table';`);
        return result.rows?._array.map((row: any) => row.name) || [];
    }

    /**
     * cria uma tabela no banco de dados
     * @param  tableName {@link TableName nome} da tabela a ser criada
     * @param  columns lista de {@link Column colunas} a serem adicionadas na tabela
     * @returns retorna um {@link QueryResult}.
     */
    async createTable(tableName: TableName, columns: Column[]) {
        if (await this.checkTableExists(tableName)) {
            const tableColumns = await this.getColumns(tableName);
            const newColumns = columns.filter(column => !tableColumns?.includes(column.name));
            const removedColumns = tableColumns?.filter(column => !columns.find(col => col.name === column));

            if (!removedColumns.length && !newColumns.length) {
                return { rowsAffected: 0 } as QueryResult;
            } else {
                if (newColumns.length)
                    await this.execute(`ALTER TABLE ${tableName} ADD COLUMN ${newColumns.map(c => `${c.name} ${c.type}`).join(', ')};`);
                if (removedColumns.length)
                    await this.execute(`ALTER TABLE ${tableName} DROP COLUMN ${removedColumns.join(', ')};`);
            }
        }
        const columnsString = columns.map(column => `${column.name} ${column.type}`).join(', ')
        return this.execute(`CREATE TABLE IF NOT EXISTS ${tableName} (${columnsString});`)
    }


    /**
     * insere valores em uma tabela
     * @param tableName {@link TableName nome} da tabela para inserir os valores
     * @param values lista de {@link TableColumns valores} a serem inseridos
     * @returns retorna um {@link QueryResult}.
     */
    async insert(tableName: TableName, values: TableColumns<TableName>) {
        const columns = Object.keys(values).join(', ');
        const valuesString = columns.replace(/[^,]+/g, '?');
        const valuesArray: any[] = Object.keys(values).map(key => values[key as keyof TableColumns<TableName>]);
        return this.execute(`INSERT INTO ${tableName} (${columns}) VALUES (${valuesString});`, valuesArray);
    }

    /**
     * faz uma busca dentro de uma tabela
     * @param tableName {@link TableName nome} da tabela a ser consultada
     * @param columns lista de {@link Column colunas} a serem retornadas
     * @param where filtro da busca
     * ```sql
     *  CD_OS = ? AND CD_EMPRESA = ?
     * ```
     * @param whereArgs argumentos do filtro
     * ```
     * [1, 1]
     * ```
     * @returns retorna os dados em formato {@link TableRows}.
     */
    async select(tableName: TableName, columns: string[] | '*', where?: string, whereArgs?: any[]): Promise<TableRows<TableName>> {
        const columnsString = columns != '*' ? columns.join(', ') : '*';
        const data = await this.execute(`SELECT ${columnsString} FROM ${tableName} ${where ? `WHERE ${where}` : ''};`, whereArgs);
        return data.rows?._array || [] as TableRows<TableName>;
    }

    /**
     * atualiza valores de uma tabela
     * @param tableName {@link TableName nome} da tabela a ser atualizada
     * @param columns lista de {@link TableColumn colunas} a serem atualizados
     * @param values lista dos valores das colunas a serem atualizados
     * @param values lista de {@link TableColumn valores} a serem atualizados
     * @param where filtro da atualização
     * ```sql
     *  CD_OS = ? AND CD_EMPRESA = ?
     * ```
     * @param whereArgs argumentos do filtro
     * ```
     * [1, 1]
     * ```
     * @returns retorna um {@link QueryResult}.
     */
    async update(tableName: TableName, columns: string[], values: any[], where: string, whereArgs: any[]) {
        const cols = columns.map(col => `${col} = ?`).join(', ');
        return this.execute(`UPDATE ${tableName} SET ${cols} WHERE ${where};`, [...values, ...whereArgs]);
    }

    /**
     * deleta valores de uma tabela
     * @param tableName {@link TableName nome} da tabela a ser deletada
     * @param where filtro da deleção
     * ```sql
     *  CD_OS = ? AND CD_EMPRESA = ?
     * ```
     * @param whereArgs argumentos do filtro
     * ```
     * [1, 1]
     * ```
     * @returns retorna um {@link QueryResult}.
     */
    async delete(tableName: TableName, where: string, whereArgs: any[]) {
        return this.execute(`DELETE FROM ${tableName} WHERE ${where};`, whereArgs);
    }

    /**
     * deleta uma tabela
     * @param tableName {@link TableName nome} da tabela a ser deletada
     * @returns retorna um {@link QueryResult}.
     */
    async dropTable(tableName: TableName) {
        return this.execute(`DROP TABLE ${tableName};`);
    }

    async selectTop(tableName: TableName, columns: string[] | '*', top: number, where?: string, whereArgs?: any[]): Promise<TableRows<TableName>> {
        const columnsString = columns != '*' ? columns.join(', ') : '*';
        const data = await this.execute(`SELECT ${columnsString} FROM ${tableName} ${where ? `WHERE ${where}` : ''} LIMIT ${top};`, whereArgs);
        return data.rows?._array || [] as TableRows<TableName>;
    }

    async execute(query: string, args?: any[]): Promise<QueryResult> {
        return this.db.executeAsync(query, args);
    }
}

export const db = new Database();