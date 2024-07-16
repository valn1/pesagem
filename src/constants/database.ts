export const DATABASE = {
    TABLES_HISTORY: {// tabela de histórico de versões(não remover)
        'CD_ID':              'INTEGER PRIMARY KEY AUTOINCREMENT',
        'DT_DATE':            'DATETIME DEFAULT CURRENT_TIMESTAMP',
        'DS_VERSION':         'VARCHAR(20) NOT NULL',
        'TX_TABLES':          'TEXT NOT NULL'
    },
    TBL_AUDITORIAS: {// tabela de auditoria  (não remover)
        'CD_ID':              'INTEGER PRIMARY KEY AUTOINCREMENT',
        'CD_USUARIO':         'INT',
        'NR_TABELA':          'VARCHAR(50)',
        'DS_ACAO':            'VARCHAR(200)',
        'DT_AUDITORIA':       'DATETIME DEFAULT CURRENT_TIMESTAMP',
        'DS_OBSERVACAO':      'TEXT'
    },
    TBL_BALANCAS: {
        'CD_ID':              'INTEGER PRIMARY KEY AUTOINCREMENT',
        'DS_TYPE':            'CHECK(DS_TYPE IN ("tcp", "bluetooth"))',
        'DS_HOST':            'VARCHAR(50)',
        'NR_PORT':            'INT',
        'NM_NOME':            'VARCHAR(50)',
    },
    TBL_USUARIOS: {
        'CD_ID':              'INTEGER PRIMARY KEY AUTOINCREMENT',
        'NM_NOME':            'VARCHAR(50)',
        'DS_LOGIN':           'VARCHAR(50)',
        'DS_MD5_SENHA':       'VARCHAR(32)',
        'DS_TOKEN':           'VARCHAR(255)',
    },
    TBL_CONFIGURACAO: {
        'CD_ID':              'INTEGER PRIMARY KEY AUTOINCREMENT',
        'DS_CHAVE':           'VARCHAR(50) UNIQUE NOT NULL',
        'DS_VALOR':           'TEXT',
        'X_CONSTRAINED':      'BOOLEAN DEFAULT FALSE',
        'FK_CD_USUARIO':      'INTEGER FOREIGN KEY REFERENCES TBL_USUARIOS(CD_ID)',
    },
    TBL_VALORES_VALIDOS: {
        'CD_ID':              'INTEGER PRIMARY KEY AUTOINCREMENT',
        'DS_VALOR':           'TEXT',
        'FK_CD_CONFIGURACAO': 'INTEGER FOREIGN KEY REFERENCES TBL_CONFIGURACOES(CD_ID)',
    },
}