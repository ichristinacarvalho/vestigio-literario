// Importa a conexão do banco de dados configurada
import { db } from './firebase-config.js';

import './indicacao.js';
import './resenhas.js';

// Teste de conexão 
console.log("Central de comando iniciada! Firebase conectado:", db);