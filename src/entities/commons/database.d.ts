import { DATABASE } from "../../constants/database";

/**
 * @name nome da coluna da tabela
 * @type tipo de dado da coluna + detalhes como tamanho, se é chave primária, se é autoincremento, etc
 *```sql
 * INTEGER PRIMARY KEY AUTOINCREMENT
 * ```
 */
export type Column = {
    name: string;
    type: string;
}

export type TableName = keyof typeof DATABASE;

export type TableColumns<Table extends TableName> = {
    [Column in keyof typeof DATABASE[Table]]?: string | number | boolean | null;
}

export type TableRows<Table extends TableName> = TableColumns<Table>[];

export type TableColumn<Table extends TableName> = keyof typeof DATABASE[Table];

export type Tables = Record<TableName, Record<TableColumns<TableName>, string>>