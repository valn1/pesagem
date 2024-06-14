import { QuickSQLiteConnection, open, QueryResult } from 'react-native-quick-sqlite'
import type { Column, TableColumn, TableColumns, TableName, Tables } from '../entities/commons/database'
import { DATABASE } from '../constants/database';

class Database {

    private db: QuickSQLiteConnection;
    private Tables: Tables;

    constructor() {
        this.db = {} as QuickSQLiteConnection;
        this.Tables = {} as Tables;
    }

    init() {
        this.db = open({ name: 'pesagem.db' });
        this.Tables = DATABASE as Tables;
        this.createTables();
    }

    private async createTables() {
        Object.keys(this.Tables).forEach(async key => {
            const tableName = key as TableName;
            const table = this.Tables[tableName];
            const columns: Column[] = [];

            Object.keys(table).forEach(key => {
                const column = key as keyof TableColumns<typeof tableName>;
                columns.push({ name: column, type: table[column] });
            })
            await this.createTable(tableName as TableName, columns);
        })
    }

    private async checkTableExists(tableName: TableName) {
        const result = await this.db.executeAsync(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`);
        return !!result.rows?.length;
    }

    private async checkColumnExists(tableName: TableName, columnName: string) {
        const result = await this.db.executeAsync(`PRAGMA table_info(${tableName});`);
        const columns = result.rows?._array.map((row: any) => row.name);
        return columns?.includes(columnName);
    }

    /**
     * cria uma tabela no banco de dados
     * @param  tableName {@link TableName nome} da tabela a ser criada
     * @param  columns lista de {@link Column colunas} a serem adicionadas na tabela
     * @returns retorna um {@link QueryResult}.
     */
    async createTable(tableName: TableName, columns: Column[]) {
        if (await this.checkTableExists(tableName)) {
            const newColumns: Column[] = [];
            await Promise.all(columns.map(async column => {
                if (!await this.checkColumnExists(tableName, column.name)) newColumns.push(column);
            }));
            if (newColumns.length) {
                const columnsString = newColumns.map(column => `${column.name} ${column.type}`).join(', ')
                console.log(`Adicionando colunas ${columnsString} na tabela ${tableName}.`);
                return await this.db.executeAsync(`ALTER TABLE ${tableName} ADD COLUMN ${columnsString};`)
            } else {
                console.log(`Tabela ${tableName} já existe.`);
                return { rowsAffected: 0 } as QueryResult;
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