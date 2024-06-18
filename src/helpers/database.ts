import { QuickSQLiteConnection, open, QueryResult } from 'react-native-quick-sqlite'
import type { Column, TableColumn, TableColumns, TableName, Tables } from '../entities/commons/database'
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
        const result = await this.selectTop('TABLES_HISTORY', ['TABLES'], 1, 'ID != 0 ORDER BY ID DESC');
        const oldTables: string = result?.rows?._array[0].TABLES;
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

    async checkTableExists(tableName: TableName) {
        const result = await this.execute(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`);
        return !!result.rows?.length;
    }

    async getColumns(tableName: TableName) {
        const result = await this.execute(`PRAGMA table_info(${tableName});`);
        return result.rows?._array.map((row: any) => row.name);
    }

    async getTables() {
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
            const newColumns: Column[] = columns.filter(column => !tableColumns?.includes(column.name));
            const removedColumns: Column[] = tableColumns?.filter(column => !columns.find(col => col.name === column)) as Column[];

            if (!removedColumns.length && !newColumns.length) {
                return { rowsAffected: 0 } as QueryResult;
            } else {
                if (newColumns.length) await this.execute(`ALTER TABLE ${tableName} ADD COLUMN ${newColumns.map(c => `${c.name} ${c.type}`).join(', ')};`);
                if (removedColumns.length) await this.execute(`ALTER TABLE ${tableName} DROP COLUMN ${removedColumns.map(col => col.name).join(', ')};`);
            }
        }
        const columnsString = columns.map(column => `${column.name} ${column.type}`).join(', ')
        return await this.execute(`CREATE TABLE IF NOT EXISTS ${tableName} (${columnsString});`)
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
        return await this.execute(`INSERT INTO ${tableName} (${columns}) VALUES (${valuesString});`, valuesArray);
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
     * @returns retorna um {@link QueryResult}.
     */
    async select(tableName: TableName, columns: string[] | '*', where?: string, whereArgs?: any[]) {
        const columnsString = columns != '*' ? columns.join(', ') : '*';
        return await this.execute(`SELECT ${columnsString} FROM ${tableName} ${where ? `WHERE ${where}` : ''};`, whereArgs);
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
        return await this.execute(`UPDATE ${tableName} SET ${cols} WHERE ${where};`, [...values, ...whereArgs]);
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
        return await this.execute(`DELETE FROM ${tableName} WHERE ${where};`, whereArgs);
    }

    /**
     * deleta uma tabela
     * @param tableName {@link TableName nome} da tabela a ser deletada
     * @returns retorna um {@link QueryResult}.
     */
    async dropTable(tableName: TableName) {
        return await this.execute(`DROP TABLE ${tableName};`);
    }

    async selectTop(tableName: TableName, columns: string[] | '*', top: number, where?: string, whereArgs?: any[]) {
        try {
            const columnsString = columns != '*' ? columns.join(', ') : '*';
            return await this.execute(`SELECT ${columnsString} FROM ${tableName} ${where ? `WHERE ${where}` : ''} LIMIT ${top};`, whereArgs);
        } catch (error) {
            const columnsString = columns != '*' ? columns.join(', ') : '*';
            console.log(`SELECT ${columnsString} FROM ${tableName} ${where ? `WHERE ${where}` : ''} LIMIT ${top};`);
        }
    }

    async execute(query: string, args?: any[]): Promise<QueryResult> {
        try {
            return await this.db.executeAsync(query, args);
        } catch (error) {
            console.error(error);
            return { rowsAffected: 0, } as QueryResult;
        }

    }
}

export const db = new Database();