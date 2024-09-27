const express = require('express');
const printer = require('printer');
const app = express();

// Middleware para receber dados JSON do front-end
app.use(express.json());

// Rota para impressão
app.post('/imprimir', (req, res) => {
    const { driver } = req.body;

    if (!driver) {
        return res.status(400).send('Driver não informado.');
    }

    // Comando ZPL ou texto que você quer imprimir
    const zplCommand = `
        ^XA
        ^FO50,50^ADN,36,20^FDDriver: ${driver}^FS
        ^XZ
    `;

    // Impressão direta via Node.js
    printer.printDirect({
        data: zplCommand,
        printer: 'Nome_da_sua_impressora', // Substitua pelo nome correto
        type: 'RAW',
        success: (jobID) => {
            console.log(`Impressão enviada com ID: ${jobID}`);
            res.send(`Impressão enviada com sucesso! ID: ${jobID}`);
        },
        error: (err) => {
            console.error(`Erro na impressão: ${err}`);
            res.status(500).send('Erro ao imprimir.');
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
