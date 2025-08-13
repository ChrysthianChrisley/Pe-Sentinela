// Arquivo script.js (Principal, para o index.html)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Documento carregado. Iniciando scripts para index.html.');

    // --- Funcionalidade para a página index.html ---
    // Desenha o gráfico de Prova de Conceito no dashboard
    const chartCanvas = document.getElementById('sensorChart');
    if (chartCanvas) { 
        const ctx = chartCanvas.getContext('2d');

        // Dados Simulados para 24 horas (agora com umidade)
        const labels = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
        const tempData = [29, 29, 29.5, 30, 30, 30.5, 31, 31, 31.5, 32, 32, 32.5, 33, 33, 33.5, 34, 35.5, 36, 36.5, 37, 37, 36.5, 36, 35];
        const pressData = [20, 22, 21, 25, 28, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 95, 110, 120, 125, 115, 110, 90, 70, 50];
        const umidData = [45, 46, 45, 48, 50, 52, 55, 58, 61, 64, 66, 68, 70, 72, 75, 78, 81, 82, 83, 82, 80, 75, 70, 65]; 

        // Lógica para criar um fundo de alerta
        const alertBackgroundPlugin = {
            id: 'alertBackground',
            beforeDatasetsDraw(chart, args, options) {
                const { ctx, chartArea: { top, bottom, left, right }, scales: { x } } = chart;
                ctx.save();
                const alertStartIndex = 16; 
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
                }, { // NOVO DATASET DE UMIDADE
                    label: 'Umidade (%)',
                    data: umidData,
                    borderColor: 'rgb(46, 204, 113)',
                    backgroundColor: 'rgba(46, 204, 113, 0.5)',
                    yAxisID: 'y_umid',
                    tension: 0.3,
                    hidden: true // Começa escondido para não poluir o gráfico
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
                            drawOnChartArea: false, 
                        },
                    },
                    y_umid: { // NOVO EIXO Y PARA UMIDADE
                        type: 'linear',
                        display: false, // Não mostra o eixo para não poluir
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Umidade (%)'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                },
                plugins: {
                    legend: {
                        onClick: (e, legendItem, legend) => {
                            // Comportamento padrão da legenda
                            Chart.defaults.plugins.legend.onClick(e, legendItem, legend);
                            
                            // Lógica customizada para mostrar/esconder eixos Y
                            const clickedIndex = legendItem.datasetIndex;
                            const chart = legend.chart;
                            
                            // Controla a visibilidade dos eixos com base no dataset clicado
                            if (clickedIndex === 0) chart.options.scales.y_temp.display = !chart.options.scales.y_temp.display;
                            if (clickedIndex === 1) chart.options.scales.y_press.display = !chart.options.scales.y_press.display;
                            if (clickedIndex === 2) chart.options.scales.y_umid.display = !chart.options.scales.y_umid.display;
                            
                            chart.update();
                        }
                    }
                }
            },
            plugins: [alertBackgroundPlugin]
        });
        console.log('Gráfico do dashboard renderizado com 3 variáveis.');
    }
});