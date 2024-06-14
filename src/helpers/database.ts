import { QuickSQLiteConnection, open, QueryResult } from 'react-native-quick-sqlite'
import type { Column, TableColumn, TableColumns, TableName, Tables } from '../entities/commons/database'
import { DATABASE } from '../constants/database';

export class Database {

    private db: QuickSQLiteConnection;
    private Tables: Tables;
    private tableName: string = '';

    constructor() {
        this.db = {} as QuickSQLiteConnection;
        this.Tables = {} as Tables;
        this.tableName = 'pesagem.db';
    }

    init() {
        this.db = open({ name: this.tableName });
        this.Tables = DATABASE as Tables;
        this.createTables();
    }

    private async createTables() {
        Object.entries(this.Tables).forEach(async ([tableName, table]) => {
            const columns: Column[] = Object.entries(table).map(([name, type]) => ({ name: name, type: type as string }))
            await this.createTable(tableName as TableName, columns);
        })
        const tables = await this.getTables();
        //todo: make backups for the columns that were removed
    }

    async checkTableExists(tableName: TableName) {
        const result = await this.db.executeAsync(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`);
        return !!result.rows?.length;
    }

    async getColumns(tableName: TableName) {
        const result = await this.db.executeAsync(`PRAGMA table_info(${tableName});`);
        return result.rows?._array.map((row: any) => row.name);
    }

    async getTables() {
        const result = await this.db.executeAsync(`SELECT name FROM sqlite_master WHERE type='table';`);
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
                console.log(`Tabela ${tableName} já existe.`);
            } else {
                if (newColumns.length) await this.db.executeAsync(`ALTER TABLE ${tableName} ADD COLUMN ${newColumns.map(c => `${c.name} ${c.type}`).join(', ')};`);
                if (removedColumns.length) await this.db.executeAsync(`ALTER TABLE ${tableName} DROP COLUMN ${removedColumns.map(col => col.name).join(', ')};`);
            }
        }
        const columnsString = columns.map(column => `${column.name} ${column.type}`).join(', ')
        return await this.db.executeAsync(`CREATE TABLE IF NOT EXISTS ${tableName} (${columnsString});`)
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
        return await this.db.executeAsync(`INSERT INTO ${tableName} (${columns}) VALUES (${valuesString});`, valuesArray);
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
    async select(tableName: TableName, columns: TableColumn<TableName>[] | '*', where?: string, whereArgs?: any[]) {
        const columnsString = columns != '*' ? columns.join(', ') : '*';
        return await this.db.executeAsync(`SELECT ${columnsString} FROM ${tableName} ${where ? `WHERE ${where}` : ''};`, whereArgs);
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
    async update(tableName: TableName, columns: TableColumn<TableName>[], values: any[], where: string, whereArgs: any[]) {
        const cols = columns.map(col => `${col} = ?`).join(', ');
        return await this.db.executeAsync(`UPDATE ${tableName} SET ${cols} WHERE ${where};`, [...values, ...whereArgs]);
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
        return await this.db.executeAsync(`DELETE FROM ${tableName} WHERE ${where};`, whereArgs);
    }

    /**
     * deleta uma tabela
     * @param tableName {@link TableName nome} da tabela a ser deletada
     * @returns retorna um {@link QueryResult}.
     */
    async dropTable(tableName: TableName) {
        return await this.db.executeAsync(`DROP TABLE ${tableName};`);
    }

    async execute(query: string, args?: any[]) {
        return await this.db.executeAsync(query, args);
    }
}

export const db = new Database();