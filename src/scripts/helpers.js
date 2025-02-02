import { KEYS_BY_SELECTOR_INDEX, NO_WRAP_LISTS, REPLACEABLE_ELEMENTS } from "./constants";

export const updateContent = (data) => {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const key = REPLACEABLE_ELEMENTS[element.dataset.lang];
        const template = data[key];
        const price = element.dataset.price;
        element.innerHTML = template
            .replace("{{price}}", `$${price}`)
            .replace(/<br>/g, "<br>");
    });
}

// Смена ссылки по submit
export const changeSubmit = (selected) => {
    const submitBtn = document.querySelector('.btn-submit');
    const selectors = document.querySelectorAll('.selector')
    let matchingIndex = -1;

    selectors.forEach((selector, index) => {
        if (selector === selected) {
            matchingIndex = index;
        }
    });

    submitBtn.setAttribute('formaction',
        matchingIndex !== -1
        ? KEYS_BY_SELECTOR_INDEX[matchingIndex]
        : KEYS_BY_SELECTOR_INDEX[0])
}

export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const hideLoader = () => {
    const loader = document.querySelector('.loader_wrapper');
    loader.style.display = 'none';
}

export const updateTextAndFontSize = (data) => {
    updateContent(data);
    NO_WRAP_LISTS.forEach(list => {
        list.forEach(title => adjustFontSize(title))
    })
}

export const adjustFontSize = (element) => {
    const container = element.parentElement;
    let fontSize = parseFloat(window.getComputedStyle(element).fontSize);
    while (element.scrollWidth > container.offsetWidth && fontSize > 1) {
        fontSize -= 0.1;
        element.style.fontSize = `${fontSize}vh`;
    }
}


