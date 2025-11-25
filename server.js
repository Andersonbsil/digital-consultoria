const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/contato', async (req, res) => {
    const data = req.body;

    await fs.ensureFile('./dados/contatos.json');

    let contatos = [];
    try {
        contatos = JSON.parse(await fs.readFile('./dados/contatos.json'));
    } catch (e) {}

    contatos.push({
        ...data,
        recebido_em: new Date().toISOString()
    });

    await fs.writeFile('./dados/contatos.json', JSON.stringify(contatos, null, 2));

    res.json({ message: "Contato recebido com sucesso!" });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
