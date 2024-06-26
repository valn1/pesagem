export const DATABASE = {
    TABLES_HISTORY: {// tabela de histórico de versões(não remover)
        'CD_ID': 'INTEGER PRIMARY KEY AUTOINCREMENT',
        'DT_DATE': 'DATETIME DEFAULT CURRENT_TIMESTAMP',
        'DS_VERSION': 'VARCHAR(20) NOT NULL',
        'TX_TABLES': 'TEXT NOT NULL'
    },
    TBL_AUDITORIAS: {// tabela de auditoria  (não remover)
        'CD_ID': 'INTEGER PRIMARY KEY AUTOINCREMENT',
        'CD_USUARIO': 'INT',
        'NR_TABELA': 'VARCHAR(50)',
        'DS_ACAO': 'VARCHAR(200)',
        'DT_AUDITORIA': 'DATETIME DEFAULT CURRENT_TIMESTAMP',
        'DS_OBSERVACAO': 'TEXT'
    },
    TBL_BALANCAS: {
        'CD_ID': 'INTEGER PRIMARY KEY AUTOINCREMENT',
        'DS_TYPE': 'ENUM("tcp", "bluetooth")',
        'DS_HOST': 'VARCHAR(50)',
        'NR_PORT': 'INT',
        'NM_NOME': 'VARCHAR(50)',
    },
}