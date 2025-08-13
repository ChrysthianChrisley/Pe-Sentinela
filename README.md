# 🦶 Projeto Pé-Sentinela

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Tecnologia](https://img.shields.io/badge/tecnologia-HTML%2FCSS%2FJS-blue.svg)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green)

Este repositório contém o desenvolvimento e a documentação do projeto de Mestrado Profissional em Telessaúde e Saúde Digital (UERJ): **Modelagem Preditiva com IA para Prevenção de Complicações no Pé Diabético**.

---

## 🚀 Demonstração ao Vivo

Acesse a página principal do projeto, que contém a documentação, os protótipos e a prova de conceito interativa:

* **[Página Principal do Projeto](https://chrysthianchrisley.github.io/Pe-Sentinela/)**

A partir da página principal, você pode navegar para:
* **Análise Comparativa:** Uma tabela detalhada que contextualiza este projeto frente à literatura científica.
* **Protótipo Interativo:** Uma simulação da interface do aplicativo, incluindo um simulador de risco com IA (requer chave da API Gemini).

---

## 📖 Sobre o Projeto

O objetivo é desenvolver um **sistema de alerta precoce** para o risco de complicações nos pés em pacientes diabéticos, combinando um dispositivo vestível (*wearable*) com Inteligência Artificial para criar um modelo de predição robusto.

### 🚑 O Problema

O "pé diabético" é uma das complicações mais graves do Diabetes Mellitus. No Brasil, estima-se que **85% das amputações decorrentes da doença poderiam ser prevenidas** com diagnóstico e acompanhamento adequados. Os métodos atuais, baseados em exames clínicos pontuais, muitas vezes falham em detectar os sinais precoces de inflamação e sobrecarga mecânica.

### ✨ A Solução Proposta

Nossa solução se baseia na **coleta de dados longitudinal e simultânea** de três biomarcadores chave (pressão plantar, temperatura e umidade), capturados por uma palmilha sensorizada. Esses dados alimentarão um modelo de Machine Learning treinado para identificar padrões de risco e gerar alertas precoces para pacientes e profissionais de saúde.

---

## 📂 Estrutura do Projeto

O projeto segue uma estrutura padrão para aplicações web, visando a clareza e manutenibilidade:
Pe-Sentinela/
├── .gitignore
├── README.md
├── index.html
├── .hintrc
├── pages/
│   ├── analiseComparativa.html
│   └── prototipo.html
├── css/
│   └── style.css
└── js/
├── main_script.js
└── prototipo_script.js

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** `HTML5`, `CSS3`, `JavaScript`
* **Bibliotecas JS:** `Chart.js` (para visualização de dados)
* **API de IA:** Google Gemini API (para recomendações dinâmicas no protótipo)
* **Hardware (Planejado):** `ESP32 DevKit`, Sensores de Pressão (FSR), Temperatura e Umidade.
* **Data Science (Planejado):** `Python`, `Pandas`, `Scikit-learn`.

---

## 📫 Contato

Chrysthian Chrisley Tadeu Santos Silva - [cytchrisley@gmail.com](mailto:cytchrisley@gmail.com)

---

## 🙏 Agradecimentos

* Agradeço à **Universidade do Estado do Rio de Janeiro (UERJ)** e ao programa de Mestrado Profissional em Telessaúde e Saúde Digital pela oportunidade e suporte.
