// let dadosPlanilha = []; // Array para armazenar os dados da planilha
// let historicoBuscas = []; // Array para armazenar o histórico de buscas

// // Função para ler a planilha
// document.getElementById("input-excel").addEventListener("change", (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: 'array' });

//         // Supondo que a planilha está na primeira aba
//         const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//         // Armazenar os dados da planilha no formato de objetos
//         dadosPlanilha = jsonData.map(row => ({
//             codigo: row[0], // Coluna A
//             driver: row[1]  // Coluna B
//         }));

//         console.log("Dados importados da planilha:", dadosPlanilha); // Para depuração
//     };

//     reader.readAsArrayBuffer(file);
// });

// // Função para buscar pelo código
// function buscarPorCodigo() {
//     const codigoInput = document.getElementById("codigo").value.trim();
//     const resultadosDiv = document.getElementById("resultado");
//     resultadosDiv.innerHTML = ""; // Limpa resultados anteriores

//     if (codigoInput === "") {
//         resultadosDiv.innerHTML = "Por favor, insira um código para buscar.";
//         return;
//     }

//     // Busca pelo código
//     const resultado = dadosPlanilha.find(item => item.codigo.toString() === codigoInput);

//     if (resultado) {
//         resultadosDiv.innerHTML = `Código: <strong>${resultado.codigo}</strong> - Driver: <span class="highlight">${resultado.driver}</span>`;

//         // Adiciona ao histórico de buscas
//         historicoBuscas.push({
//             codigo: resultado.codigo,
//             driver: resultado.driver
//         });
//         atualizarHistorico();

//         // Chama a função para imprimir o driver encontrado
//         imprimirEtiqueta(resultado.driver);
//         printLabel(resultado.driver); // Adiciona impressão direta
//     } else {
//         resultadosDiv.innerHTML = "Nenhum resultado encontrado.";
//     }

//     // Limpa o campo de busca e mantém o foco
//     document.getElementById("codigo").value = "";
//     document.getElementById("codigo").focus();
// }

// // Função para atualizar o histórico de buscas na tela
// function atualizarHistorico() {
//     const listaHistorico = document.getElementById("lista-historico");
//     listaHistorico.innerHTML = ""; // Limpa o histórico anterior

//     historicoBuscas.forEach(item => {
//         const li = document.createElement("li");
//         li.innerHTML = `Código: <strong>${item.codigo}</strong> - Driver: <span class="highlight">${item.driver}</span>`;
//         listaHistorico.appendChild(li);
//     });
// }

// // Função para filtrar o histórico de buscas
// function filtrarHistorico() {
//     const filtro = document.getElementById("filtro").value.toLowerCase();
//     const listaHistorico = document.getElementById("lista-historico");
//     listaHistorico.innerHTML = ""; // Limpa a lista atual

//     // Exibe os registros filtrados
//     historicoBuscas.forEach(item => {
//         if (item.codigo.toString().toLowerCase().includes(filtro) || 
//             item.driver.toLowerCase().includes(filtro)) {
//             const li = document.createElement("li");
//             li.innerHTML = `Código: <strong>${item.codigo}</strong> - Driver: <span class="highlight">${item.driver}</span>`;
//             listaHistorico.appendChild(li);
//         }
//     });
// }

// // Função para imprimir a etiqueta do driver
// function imprimirEtiqueta(driver) {
//     const frame = document.getElementById("frame-impressao");
//     const doc = frame.contentWindow.document;
//     doc.open();
//     doc.write(`
//         <html>
//         <head>
//             <title>Impressão de Etiqueta</title>
//             <style>
//                 body {
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     height: 100vh;
//                     margin: 0;
//                 }
//                 .driver-label {
//                     font-size: 50px; /* Tamanho da fonte maior */
//                     text-align: center;
//                     width: 100%;
//                 }
//             </style>
//         </head>
//         <body>
//             <div class="driver-label">Driver: ${driver}</div>
//             <script>
//                 window.onload = function() {
//                     setTimeout(() => {
//                         window.print(); // Abre o diálogo de impressão
//                     }, 100); // Atraso para garantir que o conteúdo esteja carregado
//                 }
//             </script>
//         </body>
//         </html>
//     `);
//     doc.close();
// }

// // Função para impressão direta via USB ou rede
// function printLabel(driver) {
//     const printer = require('printer'); // Certifique-se de que a biblioteca 'printer' está instalada

//     // Comando ZPL para a etiqueta (ajuste conforme necessário)
//     const zplCommand = `
//         ^XA
//         ^FO50,50^ADN,36,20^FDDriver: ${driver}^FS
//         ^XZ
//     `;

//     printer.printDirect({
//         data: zplCommand,
//         printer: 'Nome da sua impressora', // Substitua pelo nome da sua impressora
//         type: 'RAW',
//         success: function(jobID) {
//             console.log(`Sent to printer with ID: ${jobID}`);
//         },
//         error: function(err) {
//             console.error(`Printing failed: ${err}`);
//         }
//     });
// }

// // Função para gerar PDF do histórico
// function gerarPDF() {
//     const { jsPDF } = window.jspdf; // Referência à biblioteca jsPDF
//     const doc = new jsPDF(); // Cria um novo documento PDF

//     // Adiciona o título no PDF
//     doc.text("Histórico de Drivers", 10, 10);

//     // Adiciona os resultados do histórico ao PDF
//     let y = 20; // Posição vertical inicial no PDF
//     historicoBuscas.forEach(item => {
//         doc.text(`Código: ${item.codigo}, Driver: ${item.driver}`, 10, y);
//         y += 10; // Incrementa a posição vertical para cada entrada
//     });

//     // Baixa o PDF com o nome "historico_buscas.pdf"
//     doc.save("historico_bipagem.pdf");
// }

// // Alerta de confirmação ao recarregar a página
// window.addEventListener('beforeunload', function (event) {
//     const message = "Deseja recarregar a página? Seu histórico será perdido.";
//     event.returnValue = message; // Para a maioria dos navegadores
//     return message; // Para Firefox
// });


let dadosPlanilha = []; // Array para armazenar os dados da planilha
let historicoBuscas = []; // Array para armazenar o histórico de buscas

// Função para ler a planilha
document.getElementById("input-excel").addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Supondo que a planilha está na primeira aba
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Armazenar os dados da planilha no formato de objetos
        dadosPlanilha = jsonData.map(row => ({
            codigo: row[0], // Coluna A
            driver: row[1]  // Coluna B
        }));

        console.log("Dados importados da planilha:", dadosPlanilha); // Para depuração
    };

    reader.readAsArrayBuffer(file);
});

// Função para buscar pelo código
function buscarPorCodigo() {
    const codigoInput = document.getElementById("codigo").value.trim();
    const resultadosDiv = document.getElementById("resultado");
    resultadosDiv.innerHTML = ""; // Limpa resultados anteriores

    if (codigoInput === "") {
        resultadosDiv.innerHTML = "Por favor, insira um código para buscar.";
        return;
    }

    // Busca pelo código
    const resultado = dadosPlanilha.find(item => item.codigo.toString() === codigoInput);

    if (resultado) {
        resultadosDiv.innerHTML = `Código: <strong>${resultado.codigo}</strong> - Driver: <span class="highlight">${resultado.driver}</span>`;

        // Adiciona ao histórico de buscas
        historicoBuscas.push({
            codigo: resultado.codigo,
            driver: resultado.driver
        });
        atualizarHistorico();

        // Chama a função para imprimir o driver encontrado
        imprimirEtiqueta(resultado.driver);

        // Chama a função para enviar o driver ao servidor Node.js para impressão
        enviarParaImpressao(resultado.driver);
    } else {
        resultadosDiv.innerHTML = "Nenhum resultado encontrado.";
    }

    // Limpa o campo de busca e mantém o foco
    document.getElementById("codigo").value = "";
    document.getElementById("codigo").focus();
}

// Função para enviar os dados de impressão ao servidor
function enviarParaImpressao(driver) {
    fetch('http://localhost:3000/imprimir', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ driver: driver })
    })
    .then(response => response.text())
    .then(result => {
        console.log(result); // Resultado do servidor
        alert('Impressão enviada com sucesso!');
    })
    .catch(error => {
        console.error('Erro ao enviar para impressão:', error);
        alert('Erro ao enviar para impressão.');
    });
}

// Função para atualizar o histórico de buscas na tela
function atualizarHistorico() {
    const listaHistorico = document.getElementById("lista-historico");
    listaHistorico.innerHTML = ""; // Limpa o histórico anterior

    historicoBuscas.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `Código: <strong>${item.codigo}</strong> - Driver: <span class="highlight">${item.driver}</span>`;
        listaHistorico.appendChild(li);
    });
}

// Função para filtrar o histórico de buscas
function filtrarHistorico() {
    const filtro = document.getElementById("filtro").value.toLowerCase();
    const listaHistorico = document.getElementById("lista-historico");
    listaHistorico.innerHTML = ""; // Limpa a lista atual

    // Exibe os registros filtrados
    historicoBuscas.forEach(item => {
        if (item.codigo.toString().toLowerCase().includes(filtro) || 
            item.driver.toLowerCase().includes(filtro)) {
            const li = document.createElement("li");
            li.innerHTML = `Código: <strong>${item.codigo}</strong> - Driver: <span class="highlight">${item.driver}</span>`;
            listaHistorico.appendChild(li);
        }
    });
}

// Função para imprimir a etiqueta do driver
function imprimirEtiqueta(driver) {
    const frame = document.getElementById("frame-impressao");
    const doc = frame.contentWindow.document;
    doc.open();
    doc.write(`
        <html>
        <head>
            <title>Impressão de Etiqueta</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .driver-label {
                    font-size: 50px; /* Tamanho da fonte maior */
                    text-align: center;
                    width: 100%;
                }
            </style>
        </head>
        <body>
            <div class="driver-label">Driver: ${driver}</div>
            <script>
                window.onload = function() {
                    setTimeout(() => {
                        window.print(); // Abre o diálogo de impressão
                    }, 100); // Atraso para garantir que o conteúdo esteja carregado
                }
            </script>
        </body>
        </html>
    `);
    doc.close();
}

// Função para gerar PDF do histórico
function gerarPDF() {
    const { jsPDF } = window.jspdf; // Referência à biblioteca jsPDF
    const doc = new jsPDF(); // Cria um novo documento PDF

    // Adiciona o título no PDF
    doc.text("Histórico de Drivers", 10, 10);

    // Adiciona os resultados do histórico ao PDF
    let y = 20; // Posição vertical inicial no PDF
    historicoBuscas.forEach(item => {
        doc.text(`Código: ${item.codigo}, Driver: ${item.driver}`, 10, y);
        y += 10; // Incrementa a posição vertical para cada entrada
    });

    // Baixa o PDF com o nome "historico_buscas.pdf"
    doc.save("historico_bipagem.pdf");
}

// Alerta de confirmação ao recarregar a página
window.addEventListener('beforeunload', function (event) {
    const message = "Deseja recarregar a página? Seu histórico será perdido.";
    event.returnValue = message; // Para a maioria dos navegadores
    return message; // Para Firefox
});
