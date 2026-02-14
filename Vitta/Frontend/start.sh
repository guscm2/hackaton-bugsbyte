#!/bin/bash

echo "Iniciando servidor Python..."
python3 app.py &

npm install
npm run dev &

wait
