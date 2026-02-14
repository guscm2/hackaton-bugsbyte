import json
from flask import Flask, request, jsonify
from database.conexao import executar_query

app = Flask(__name__)

@app.route("/query", methods=["POST"])
def query():
    dados = request.get_json()
    if not dados:
        return jsonify({"erro": "Nenhum dado enviado"}), 400
    
    indice = dados.get("indice")
    args = dados.get("args", [])
    
    resultado_json = executar_query(indice, tuple(args))
    
    return jsonify(json.loads(resultado_json))

if __name__ == "__main__":
    app.run(debug=True, port=5000)
