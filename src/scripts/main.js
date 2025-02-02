import '../styles/reset.css';
import '../styles/fonts.css';
import '../styles/main.css';
import {changeSubmit, getRandomNumber, hideLoader, updateTextAndFontSize} from './helpers'

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    let lang = urlParams.get('lang') || navigator.language.substring(0, 2);
    const supportedLanguages = ['de', 'en', 'es', 'fr', 'ja', 'pt'];

    if (!supportedLanguages.includes(lang)) {
        lang = 'en';
    }

    fetch(`../assets/lang/${lang}.json`)
        .then(response => response.json())
        .then(data =>  {
            updateTextAndFontSize(data)
            hideLoader()
        })
        .catch(error => {
            console.error('Ошибка загрузки языкового файла:', error);
        });

    const selectors = document.querySelectorAll('.selector');
    selectors.forEach(selector => {
        selector.addEventListener('click', () => {
            selectors.forEach(sel => sel.classList.remove('active'));
            selector.classList.add('active');
            changeSubmit(selector);
        });
    });

    // Анимация изображений на bg
    const cols = document.querySelectorAll('.col');
    cols.forEach(col => {
        const randomY = getRandomNumber(-50, 50);
        col.style.setProperty('--random-y', `${randomY}px`);
    });
});


