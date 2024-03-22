const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const pdf = require('html-pdf');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir o acesso apenas entre 08:00 e 17:00
const accessControlMiddleware = (req, res, next) => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 8 || hour > 22) {
        return res.status(403).json({ message: 'Acesso não permitido fora do horário comercial' });
    }
    next();
};

app.use(bodyParser.json());

// Rota GET para obter todos os laboratórios
app.get('/laboratorio/todos', (req, res) => {
    // Simulação de um banco de dados
    const laboratorios = [
        { nome: 'Lab 1', capacidade: 20, descricao: 'Laboratório de informática' },
        { nome: 'Lab 2', capacidade: 15, descricao: 'Laboratório de física' },
        { nome: 'Lab 3', capacidade: 25, descricao: 'Laboratório de quimica' },
        { nome: 'Lab 4', capacidade: 35, descricao: 'Laboratório de biologia' },
        { nome: 'Lab 5', capacidade: 45, descricao: 'Laboratório de matematica' },
        { nome: 'Lab 6', capacidade: 55, descricao: 'Laboratório de geografia' },
        // Adicione os outros laboratórios aqui
    ];
    res.json(laboratorios);
});

// Rota POST para cadastrar um novo laboratório
app.post('/laboratorio/novo', (req, res) => {
    // Dados do laboratório são passados no corpo da requisição
    const novoLaboratorio = req.body;
    // Lógica para cadastrar o novo laboratório
    res.status(201).json({ message: 'Laboratório cadastrado com sucesso' });
});

// Middleware de controle de acesso
app.use(accessControlMiddleware);

// Rota GET para gerar relatório em PDF
app.get('/laboratorio/relatorio', (req, res) => {
    // Lógica para gerar o relatório em PDF
    const html = '<h1>Relatório de Laboratórios</h1><p>Aqui vai o conteúdo do relatório...</p>';
    pdf.create(html).toStream((err, stream) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao gerar o relatório em PDF' });
        }
        res.setHeader('Content-Type', 'application/pdf');
        stream.pipe(res);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
