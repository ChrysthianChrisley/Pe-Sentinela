// Arquivo analise_script.js
// Este script adiciona interatividade à página de análise comparativa.

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script da página de análise carregado.');
    
    // Funcionalidade: Adicionar um 'tooltip' (dica de texto) a células com muito texto.
    const cells = document.querySelectorAll('td');
    
    cells.forEach(cell => {
        if (cell.textContent.length > 150) { // Adiciona tooltip apenas a células com muito texto
            cell.setAttribute('title', 'Esta célula contém informações detalhadas. Passe o mouse para ler.');
        }
    });
});