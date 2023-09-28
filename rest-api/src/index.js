const express = require('express')
const { Pool } = require('pg')
const cors = require('cors');
require('dotenv').config()


const PORT = 3333
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
})

const app = express()
app.use(express.json())
app.use(cors());
//-------------------------------ROTAS DESENVOLVEDORES-------------------------------
//default
app.get('/', (req, res) => {console.log('ola mundo')})
//Lista desenvolvedores
app.get('/desenvolvedores', async (req,res) => {
    try{
        const {rows} = await pool.query('SELECT ' +
        'desenvolvedor.id, ' +
        'desenvolvedor.nome, ' +
        'desenvolvedor.sexo, ' +
        'desenvolvedor.datanascimento, ' +
        'desenvolvedor.idade, ' +
        'desenvolvedor.hobby, ' +
        'niveis.nivel ' +
      'FROM desenvolvedor ' +
      'INNER JOIN niveis ON desenvolvedor.nivel_id = niveis.id;')
        return res.status(200).send(rows)
    }catch(err) {
        return res.status(400).send(err)
    }
})
//Busca DEV por ID
app.get('/desenvolvedores/:id', async (req, res) => {
  const { id } = req.params; // Obtém o ID da URL

  try {
    const { rows } = await pool.query(
      'SELECT ' +
        'desenvolvedor.id, ' +
        'desenvolvedor.nome, ' +
        'desenvolvedor.sexo, ' +
        'desenvolvedor.datanascimento, ' +
        'desenvolvedor.idade, ' +
        'desenvolvedor.hobby, ' +
        'desenvolvedor.nivel_id ' +
        'FROM desenvolvedor ' +
        'INNER JOIN niveis ON desenvolvedor.nivel_id = niveis.id ' +
        'WHERE desenvolvedor.id = $1', // Filtra pelo ID fornecido na URL
      [id] // Valor do ID da URL
    );

    if (rows.length === 0) {
      // Se não encontrou nenhum registro com o ID fornecido
      return res.status(404).send('Desenvolvedor não encontrado');
    }

    return res.status(200).send(rows[0]); // Retorna o primeiro registro encontrado
  } catch (err) {
    return res.status(400).send(err);
  }
});
//Cadastra um desenvolvedor
app.post('/create/desenvolvedor', async (req, res) => {
    try {
      const { nome, sexo, datanascimento, idade, hobby, nivel_id } = req.body;
    
      // Executa a inserção na tabela "desenvolvedor"
      const insertQuery = `
        INSERT INTO desenvolvedor (nome, sexo, datanascimento, idade, hobby, nivel_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
  
      const values = [ nome, sexo, datanascimento, idade, hobby, nivel_id ];
      const result = await pool.query(insertQuery, values);
  
      res.status(201).json(result.rows[0]); // Retorna o registro inserido
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro durante a inserção.' });
    }
  });
//Edita um desenvolvedor
app.put('/edit/desenvolvedor/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nivel_id, nome, sexo, datanascimento, idade, hobby } = req.body;
  
      // Executa a atualização na tabela "desenvolvedor"
      const updateQuery = `
        UPDATE desenvolvedor
        SET nivel_id = $1, nome = $2, sexo = $3, datanascimento = $4, idade = $5, hobby = $6
        WHERE id = $7
        RETURNING *;
      `;
  
      const values = [nivel_id, nome, sexo, datanascimento, idade, hobby, id];
      const result = await pool.query(updateQuery, values);
  
      if (result.rowCount === 1) {
        res.json(result.rows[0]); // Retorna o registro atualizado
      } else {
        res.status(404).json({ error: 'Desenvolvedor não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro durante a edição.' });
    }
  });
//Remove um desenvolvedor
app.delete('/delete/desenvolvedor/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Executa a exclusão na tabela "desenvolvedor"
      const deleteQuery = `
        DELETE FROM desenvolvedor
        WHERE id = $1
        RETURNING *;
      `;
  
      const values = [id];
      const result = await pool.query(deleteQuery, values);
  
      if (result.rowCount === 1) {
        res.json({ message: 'Desenvolvedor removido com sucesso.' });
      } else {
        res.status(404).json({ error: 'Desenvolvedor não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro durante a remoção.' });
    }
  });

//-------------------------------ROTAS NIVEIS-------------------------------
//Lista niveis
app.get('/niveis', async (req,res) => {
    try{
        const {rows} = await pool.query('SELECT * FROM NIVEIS')
        return res.status(200).send(rows)
    }catch(err) {
        return res.status(400).send(err)
    }
})
//Lista nivel por ID
app.get('/niveis/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query('SELECT * FROM NIVEIS WHERE id = $1', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Nível não encontrado' });
    }

    return res.status(200).json(rows[0]);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
//Cadastra um nível
app.post('/create/niveis', async (req, res) => {
    try {
      const { nivel } = req.body;
  
      // Executa a inserção na tabela "niveis"
      const insertQuery = 'INSERT INTO niveis (nivel) VALUES ($1) RETURNING *';
      const values = [nivel];
      const result = await pool.query(insertQuery, values);
  
      res.status(201).json(result.rows[0]); // Retorna o novo registro de nível
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro durante o cadastro do nível.' });
    }
  });
//Edita um nivel
app.put('/edit/niveis/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nivel } = req.body;
  
      // Executa a atualização na tabela "niveis"
      const updateQuery = 'UPDATE niveis SET nivel = $1 WHERE id = $2 RETURNING *';
      const values = [nivel, id];
      const result = await pool.query(updateQuery, values);
  
      if (result.rowCount === 1) {
        res.json(result.rows[0]); // Retorna o registro de nível atualizado
      } else {
        res.status(404).json({ error: 'Nível não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro durante a edição do nível.' });
    }
  });
//Remove um nivel
app.delete('/delete/niveis/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Executa a exclusão na tabela "niveis"
      const deleteQuery = 'DELETE FROM niveis WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(deleteQuery, values);
  
      if (result.rowCount === 1) {
        res.json({ message: 'Nível removido com sucesso.' });
      } else {
        res.status(404).json({ error: 'Nível não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro durante a remoção do nível.' });
    }
  });


app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`))