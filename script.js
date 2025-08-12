// Arquivo script.js
// Este arquivo pode ser usado para adicionar interatividade futura à página,
// como filtros na tabela, gráficos ou funcionalidades de clique.

document.addEventListener('DOMContentLoaded', function() {
    console.log('Documento carregado e pronto para interatividade.');
    
    // Exemplo de funcionalidade: Adicionar um 'tooltip' simples às células
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        if (cell.textContent.length > 150) { // Adiciona tooltip apenas a células com muito texto
            cell.setAttribute('title', 'Esta célula contém informações detalhadas.');
        }
    });
});