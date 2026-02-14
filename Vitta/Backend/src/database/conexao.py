import sqlite3
import json
from querys import QUERIES

DB_PATH = "basedados.db"

def executar_query(indice, args=()):
    if indice < 0 or indice >= len(QUERIES):
        return json.dumps({"erro": "Índice de query inválido"})
    
    query = QUERIES[indice]
    
    try:
        with sqlite3.connect(DB_PATH) as conexao:
            cursor = conexao.cursor()
            cursor.execute(query, args)
            
            # Se for SELECT, retorna os resultados
            if query.strip().upper().startswith("SELECT"):
                colunas = [desc[0] for desc in cursor.description]
                resultados = [dict(zip(colunas, row)) for row in cursor.fetchall()]
                return json.dumps(resultados, ensure_ascii=False)
            else:
                conexao.commit()
                return json.dumps({"status": "ok", "linhas_afetadas": cursor.rowcount})
    except Exception as e:
        return json.dumps({"erro": str(e)})
