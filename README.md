# 🦶 Modelagem Preditiva com IA para Prevenção de Complicações no Pé Diabético

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Linguagem](https://img.shields.io/badge/linguagem-Python-blue.svg)
![Frameworks](https://img.shields.io/badge/frameworks-Scikit--learn%20%7C%20Pandas-orange)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green)

Este repositório contém o desenvolvimento do meu projeto de Mestrado Profissional em Telessaúde e Saúde Digital pela Universidade do Estado do Rio de Janeiro (UERJ).

---

## 📖 Sobre o Projeto

O objetivo deste projeto é desenvolver um **sistema de alerta precoce** para o risco de desenvolvimento de complicações nos pés em pacientes diabéticos. A abordagem combina o uso de um dispositivo vestível (*wearable*) para coleta de dados biométricos e a aplicação de técnicas de Inteligência Artificial para criar um modelo de predição robusto e personalizado.

### 🚑 O Problema

O "pé diabético" é uma das complicações mais graves e onerosas do Diabetes Mellitus, levando frequentemente a úlceras, infecções e um número alarmante de amputações. No Brasil, estima-se que 85% desses casos poderiam ser prevenidos com diagnóstico e acompanhamento adequados. Os métodos atuais de avaliação de risco baseiam-se em exames clínicos pontuais, que muitas vezes não são sensíveis o suficiente para detectar alterações subclínicas antes que o dano se torne irreversível.

### ✨ A Solução Proposta

Nossa solução se baseia na **coleta de dados longitudinal e simultânea** de três biomarcadores chave, capturados por uma palmilha sensorizada desenvolvida para este projeto:
1.  **Pressão Plantar:** Para identificar áreas de sobrecarga mecânica.
2.  **Temperatura:** Para detectar sinais inflamatórios precoces.
3.  **Umidade:** Para avaliar fatores que contribuem para a maceração da pele.

Esses dados alimentarão um modelo de Machine Learning treinado para identificar padrões complexos que indiquem um risco elevado de complicações, gerando alertas para pacientes e profissionais de saúde antes da manifestação clínica dos problemas.

---

## 🎯 Diferenciais e Contribuição para a Área

Este projeto se diferencia da literatura existente por quatro pilares principais:

* **Metodologia de Coleta Inovadora e Completa:** Nenhum dos trabalhos analisados combina a coleta **longitudinal e simultânea de pressão, temperatura e umidade** através de um dispositivo vestível (wearable). Estamos propondo um monitoramento contínuo, no dia a dia do paciente.
* **Foco na Predição *Antes* da Úlcera:** O objetivo é um **alerta precoce** para PREVENIR o surgimento da complicação. Isso se contrapõe a trabalhos que focam em estágios mais avançados, como prever a amputação em quem já tem úlcera ou analisar a úlcera depois que ela já existe.
* **Desenvolvimento de um Sistema Aplicado (Mestrado Profissional):** Nossa proposta vai além do modelo matemático e visa entregar um **sistema funcional** com interface, alertas e recomendações, o que representa uma contribuição tecnológica direta e com potencial de implementação.
* **Contexto Nacional (Brasil/SUS) com Coleta de Dados Primários:** Vamos gerar um conjunto de dados para a **população brasileira**. Um modelo de IA treinado com dados de pacientes do SUS terá muito mais relevância e acurácia para a nossa realidade do que modelos baseados em outras populações.

---

## 🛠️ Tecnologias Utilizadas

O projeto será desenvolvido utilizando as seguintes tecnologias:

* **Hardware:**
    * Placa de Desenvolvimento: `ESP32 DevKit`
    * Sensores: Sensores de Pressão (FSR), Temperatura e Umidade.
* **Software & Data Science:**
    * Linguagem: `Python`
    * Bibliotecas Principais: `Pandas`, `NumPy`, `Scikit-learn`, `Matplotlib`, `Seaborn`.
    * Potencialmente: `TensorFlow` ou `PyTorch` para modelos de Redes Neurais.

---

## 🚀 Status do Projeto

O projeto encontra-se atualmente na fase de **Desenvolvimento do Protótipo e Planejamento da Coleta de Dados**.

---

## 🗺️ Roadmap

- [x] Definição do Projeto e Revisão da Literatura
- [ ] Desenvolvimento do Protótipo Hardware (Palmilha Sensorizada)
- [ ] Submissão e Aprovação no Comitê de Ética em Pesquisa (CEP)
- [ ] Coleta de Dados com Pacientes e Grupo Controle
- [ ] Pré-processamento e Análise Exploratória dos Dados
- [ ] Treinamento e Validação dos Modelos de Machine Learning
- [ ] Desenvolvimento da Interface do Sistema de Alerta
- [ ] Avaliação do Sistema em Estudo Clínico Controlado
- [ ] Redação da Dissertação e Artigos Científicos

---

## 📫 Contato

Chrysthian Chrisley Tadeu Santos Silva - [cytchrisley@gmail.com](mailto:cytchrisley@gmail.com)

Link do Projeto: [https://github.com/ChrysthianChrisley/Pe-Sentinela.git](https://github.com/ChrysthianChrisley/Pe-Sentinela.git)

---

## 🙏 Agradecimentos

* Agradeço à **Universidade do Estado do Rio de Janeiro (UERJ)** e ao programa de Mestrado Profissional em Telessaúde e Saúde Digital pela oportunidade e suporte.