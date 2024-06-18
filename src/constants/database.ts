export const DATABASE = {
    TABLES_HISTORY: {// tabela de histórico de versões(não remover)
        'ID': 'INTEGER PRIMARY KEY AUTOINCREMENT',
        'DATE': 'DATETIME DEFAULT CURRENT_TIMESTAMP',
        'VERSION': 'VARCHAR(20) NOT NULL',
        'TABLES': 'TEXT NOT NULL'
    },
    TBL_AUDITORIA: {
        'ID': 'INTEGER PRIMARY KEY AUTOINCREMENT',
        'CDUSUARIO': 'INT',
        'NMTABELA': 'VARCHAR(50)',
        'DSACAO': 'VARCHAR(200)',
        'DTAUDITORIA': 'DATETIME DEFAULT CURRENT_TIMESTAMP',
        'DSOBSERVACAO': 'TEXT'
    },
    TBL_USUARIO: {
        'DSNOME': 'VARCHAR(50)',
        'NMIDADE': 'INT',
        'DSEMAIL': 'VARCHAR(50)'
    },
    TBL_PRODUTO: {
        'DSNOME': 'VARCHAR(50)',
        'NMVALOR': 'DECIMAL(10,2)',
        'DSDESCRICAO': 'TEXT'
    },
    TBL_CATEGORIA: {
        'DSCATEGORIA': 'VARCHAR(50)'
    },
    TBL_PRODUTO_CATEGORIA: {
        'CDPRODUTO': 'INT',
        'CDCATEGORIA': 'INT'
    },
    TBL_VENDA: {
        'CDUSUARIO': 'INT',
        'DTVENCTO': 'DATE',
        'DTREALIZADA': 'DATE',
        'VLVENDA': 'DECIMAL(10,2)',
        'VLDESCONTO': 'DECIMAL(10,2)',
    },
    TBL_VENDA_PRODUTO: {
        'CDVENDA': 'INT',
        'CDPRODUTO': 'INT',
        'QTDE': 'INT'
    },
    TBL_VENDA_PAGAMENTO: {
        'CDVENDA': 'INT',
        'DTPAGAMENTO': 'DATE',
        'VLPAGAMENTO': 'DECIMAL(10,2)',
        'DSPAGAMENTO': 'VARCHAR(50)',
    },
    TBL_PAGAMENTO: {
        'DSPAGAMENTO': 'VARCHAR(50)',
    }
}