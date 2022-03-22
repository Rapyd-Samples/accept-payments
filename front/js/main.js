import * as modules from './grouped-modules.js';

function init() {
    //initData();
    showSection();
    initWebhooks();
}
function showSection() {
    location.hash = location.hash || '#create_customer';
    document.querySelectorAll('#content section').forEach(section => {
        if ('#'+section.id == location.hash) {
            section.style.display = 'initial';
        } else {
            section.style.display = 'none';
        }
    });
}
function initData() {
    document.querySelectorAll('input[name$="_url"]').forEach(input => {
        input.value = location.href;
    });
}
function initWebhooks() {
    modules.webhooks.init();
}

window.addEventListener('load', init);
window.addEventListener('hashchange', showSection);

for (const form of document.querySelectorAll("form")) {
    form.addEventListener("submit", e => {
        e.preventDefault();
        const form = e.target;
        modules[form.name].sendRequest(form);
    });
}
