document.addEventListener('DOMContentLoaded', function() {

    // --- Seleciona todos os elementos da interface ---
    const inputs = {
        tempD: document.getElementById('temp-d'),
        pressD: document.getElementById('press-d'),
        umidD: document.getElementById('umid-d'),
        tempE: document.getElementById('temp-e'),
        pressE: document.getElementById('press-e'),
        umidE: document.getElementById('umid-e')
    };
    // ... (outros seletores omitidos para brevidade, mas estão no código final)
    const apiKeyInput = document.getElementById('gemini-key');
    const generateButton = document.getElementById('generate-recommendation');
    const loader = document.getElementById('loader');
    const aiRecommendationText = document.getElementById('ai-recommendation-text');
    // (O resto dos seletores da v3 continuam aqui)
    const values = {
        tempD: document.getElementById('temp-d-value'),
        pressD: document.getElementById('press-d-value'),
        umidD: document.getElementById('umid-d-value'),
        tempE: document.getElementById('temp-e-value'),
        pressE: document.getElementById('press-e-value'),
        umidE: document.getElementById('umid-e-value')
    };
    const displays = {
        tempD: document.getElementById('display-temp-d'),
        pressD: document.getElementById('display-press-d'),
        umidD: document.getElementById('display-umid-d'),
        tempE: document.getElementById('display-temp-e'),
        pressE: document.getElementById('display-press-e'),
        umidE: document.getElementById('display-umid-e')
    };
    const cards = {
        tempD: document.getElementById('card-temp-d'),
        pressD: document.getElementById('card-press-d'),
        umidD: document.getElementById('card-umid-d'),
        tempE: document.getElementById('card-temp-e'),
        pressE: document.getElementById('card-press-e'),
        umidE: document.getElementById('card-umid-e')
    };
    const statusGeral = {
        container: document.getElementById('status-geral'),
        icon: document.getElementById('status-geral-icon'),
        titulo: document.getElementById('status-geral-titulo'),
        texto: document.getElementById('status-geral-texto')
    };
    const recommendation = {
        container: document.getElementById('recommendation-card'),
        text: aiRecommendationText // Agora o texto da recomendação será o da IA
    };


    // --- Lógica de Risco (a mesma da v3) ---
    function getTempStatus(temp, outroTemp) {
        const diff = Math.abs(temp - outroTemp);
        if (temp >= 35 || temp <= 22) return 'danger';
        if (diff >= 2.2 || temp > 33.5 || temp < 25) return 'warning';
        if (temp >= 28 && temp <= 33) return 'ok';
        return 'warning';
    }
    function getPressStatus(press) {
        if (press > 700) return 'danger';
        if (press > 100) return 'warning'; // Ajustado conforme a regra
        return 'ok';
    }
    function getUmidStatus(umid) {
        if (umid > 80 || umid < 20) return 'danger';
        if (umid > 60 || umid < 30) return 'warning';
        return 'ok';
    }

    // --- Função de Atualização da UI (a mesma da v3, mas sem a recomendação) ---
    function updateUI() {
        const currentValues = {
            tempD: parseFloat(inputs.tempD.value), pressD: parseInt(inputs.pressD.value), umidD: parseInt(inputs.umidD.value),
            tempE: parseFloat(inputs.tempE.value), pressE: parseInt(inputs.pressE.value), umidE: parseInt(inputs.umidE.value),
        };

        // Atualiza textos dos sliders e displays
        Object.keys(values).forEach(key => {
            const isTemp = key.includes('temp');
            const unit = isTemp ? ' °C' : (key.includes('press') ? ' kPa' : ' %');
            const value = isTemp ? currentValues[key].toFixed(1) : currentValues[key];
            values[key].textContent = value;
            displays[key].textContent = `${value}${unit}`;
        });

        const statuses = {
            tempD: getTempStatus(currentValues.tempD, currentValues.tempE), tempE: getTempStatus(currentValues.tempE, currentValues.tempD),
            pressD: getPressStatus(currentValues.pressD), pressE: getPressStatus(currentValues.pressE),
            umidD: getUmidStatus(currentValues.umidD), umidE: getUmidStatus(currentValues.umidE),
        };

        const statusClasses = ['status-ok', 'status-warning', 'status-danger'];
        Object.keys(cards).forEach(key => {
            cards[key].classList.remove(...statusClasses);
            cards[key].classList.add(`status-${statuses[key]}`);
        });

        const allStatuses = Object.values(statuses);
        let overallStatus = 'ok';
        if (allStatuses.includes('danger')) overallStatus = 'danger';
        else if (allStatuses.includes('warning')) overallStatus = 'warning';

        statusGeral.container.classList.remove(...statusClasses);
        statusGeral.container.classList.add(`status-${overallStatus}`);
        recommendation.container.classList.remove(...statusClasses);
        recommendation.container.classList.add(`status-${overallStatus}`);

        // Atualiza o status geral, mas não a recomendação (que virá da IA)
        switch (overallStatus) {
            case 'danger':
                statusGeral.icon.textContent = '🚨'; statusGeral.titulo.textContent = 'Risco Elevado';
                statusGeral.texto.textContent = 'Um ou mais parâmetros estão em nível crítico.'; break;
            case 'warning':
                statusGeral.icon.textContent = '⚠️'; statusGeral.titulo.textContent = 'Sinal de Alerta';
                statusGeral.texto.textContent = 'Parâmetros fora da normalidade. Recomenda-se análise da IA.'; break;
            default:
                statusGeral.icon.textContent = '✔️'; statusGeral.titulo.textContent = 'Monitoramento Normal';
                statusGeral.texto.textContent = 'Parâmetros dentro da faixa de segurança.';
        }
    }
    
    // --- NOVA FUNÇÃO: Chamar a API Gemini ---
    async function getAiRecommendation() {
        const apiKey = apiKeyInput.value;
        if (!apiKey) {
            alert('Por favor, insira sua API Key Gemini no campo indicado.');
            return;
        }

        loader.style.display = 'flex';
        generateButton.disabled = true;
        aiRecommendationText.textContent = 'Analisando...';
        
        const currentValues = {
            tempD: inputs.tempD.value, pressD: inputs.pressD.value, umidD: inputs.umidD.value,
            tempE: inputs.tempE.value, pressE: inputs.pressE.value, umidE: inputs.umidE.value,
        };

        const prompt = `
            Você é um assistente especialista em prevenção de complicações do pé diabético. Sua função é analisar os dados de sensores de uma palmilha inteligente e fornecer uma recomendação clara, concisa e acionável para o paciente, em português do Brasil.

            Use o seguinte conhecimento base para sua análise:
            - Temperatura: Ideal entre 28-33°C. Uma diferença de >= 2.2°C entre os pés é um forte sinal de alerta para inflamação. Acima de 35°C indica infecção provável. Abaixo de 23°C indica isquemia severa.
            - Pressão Plantar: Ideal < 100 kPa (baixo risco). Entre 100-500 kPa é risco moderado. Acima de 700 kPa é alto risco de úlcera.
            - Umidade: Ideal entre 30-50%. Abaixo de 20% causa fissuras (risco alto). Acima de 60% causa maceração e risco de infecção (alerta). Acima de 80% é maceração severa (risco alto).

            Analise os seguintes dados do paciente:
            - Temperatura Pé Direito: ${currentValues.tempD} °C
            - Pressão Máxima Pé Direito: ${currentValues.pressD} kPa
            - Umidade Pé Direito: ${currentValues.umidD} %
            - Temperatura Pé Esquerdo: ${currentValues.tempE} °C
            - Pressão Máxima Pé Esquerdo: ${currentValues.pressE} kPa
            - Umidade Pé Esquerdo: ${currentValues.umidE} %

            Com base nesses dados, forneça uma recomendação começando com um título de nível de risco (Risco Baixo, Alerta ou Risco Elevado) e, em seguida, um parágrafo curto com a principal ação que o paciente deve tomar.
        `;

        const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

        try {
            const response = await fetch(`${API_URL}?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }

            const data = await response.json();
            const recommendationText = data.candidates[0].content.parts[0].text;
            aiRecommendationText.textContent = recommendationText;

        } catch (error) {
            console.error("Erro ao chamar a API Gemini:", error);
            aiRecommendationText.textContent = "Não foi possível gerar a recomendação. Verifique sua API Key e a conexão com a internet.";
        } finally {
            loader.style.display = 'none';
            generateButton.disabled = false;
        }
    }

    // --- Adiciona os 'event listeners' ---
    Object.values(inputs).forEach(input => input.addEventListener('input', updateUI));
    generateButton.addEventListener('click', getAiRecommendation);

    // --- Inicia a UI ---
    updateUI();
});