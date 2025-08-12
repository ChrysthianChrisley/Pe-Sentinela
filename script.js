// Arquivo script.js unificado

document.addEventListener('DOMContentLoaded', function() {
    console.log('Documento carregado. Iniciando scripts.');

    // --- Funcionalidade para a página analiseComparativa.html ---
    // Adiciona um 'tooltip' (dica de texto) a células muito grandes da tabela
    const cells = document.querySelectorAll('td');
    if (cells.length > 0) { // Executa apenas se encontrar células de tabela
        cells.forEach(cell => {
            if (cell.textContent.length > 150) {
                cell.setAttribute('title', 'Esta célula contém informações detalhadas.');
            }
        });
        console.log('Funcionalidade de tooltip da tabela ativada.');
    }


    // --- Funcionalidade para a página index.html ---
    // Desenha o gráfico de Prova de Conceito no dashboard
    const chartCanvas = document.getElementById('sensorChart');
    if (chartCanvas) { // Executa apenas se encontrar o elemento do gráfico
        const ctx = chartCanvas.getContext('2d');

        // Dados Simulados para 24 horas
        const labels = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
        const tempData = [29, 29, 29.5, 30, 30, 30.5, 31, 31, 31.5, 32, 32, 32.5, 33, 33, 33.5, 34, 35.5, 36, 36.5, 37, 37, 36.5, 36, 35];
        const pressData = [20, 22, 21, 25, 28, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 95, 110, 120, 125, 115, 110, 90, 70, 50];

        // Lógica para criar um fundo de alerta
        const alertBackgroundPlugin = {
            id: 'alertBackground',
            beforeDatasetsDraw(chart, args, options) {
                const { ctx, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;
                ctx.save();
                const alertStartIndex = 16; // Começa o alerta às 16:00
                const alertStartX = x.getPixelForValue(labels[alertStartIndex]);
                
                const gradient = ctx.createLinearGradient(alertStartX, 0, right, 0);
                gradient.addColorStop(0, 'rgba(231, 76, 60, 0)');
                gradient.addColorStop(1, 'rgba(231, 76, 60, 0.3)');

                ctx.fillStyle = gradient;
                ctx.fillRect(alertStartX, top, right - alertStartX, bottom - top);
                ctx.restore();
            }
        };

        const sensorChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperatura (°C)',
                    data: tempData,
                    borderColor: 'rgb(231, 76, 60)',
                    backgroundColor: 'rgba(231, 76, 60, 0.5)',
                    yAxisID: 'y_temp',
                    tension: 0.3
                }, {
                    label: 'Pressão (kPa)',
                    data: pressData,
                    borderColor: 'rgb(52, 152, 219)',
                    backgroundColor: 'rgba(52, 152, 219, 0.5)',
                    yAxisID: 'y_press',
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    y_temp: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Temperatura (°C)'
                        }
                    },
                    y_press: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Pressão (kPa)'
                        },
                        grid: {
                            drawOnChartArea: false, // não desenha a grade para este eixo
                        },
                    }
                }
            },
            plugins: [alertBackgroundPlugin]
        });
        console.log('Gráfico do dashboard renderizado.');
    }
});