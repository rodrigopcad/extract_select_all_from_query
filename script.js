function generateScript() {
    const q = document.querySelector('#query').value;
    const regex = /(?<=(from|join)(\s))(\w)+\.?\w+(\.\w+)?/gmi;
    const match = Array.from(new Set(q.match(regex)))
        .map(v => 'SELECT * FROM ' + v)
        .join('\n');
    document.querySelector('#result').value = match;
    const modal = document.querySelector('#dialog');

    if (match.length > 0) {
        modal.querySelector('h2').innerText = 'Lista de SELECTs gerada.\nCopiado para a área de transferência.'
        navigator.clipboard.writeText(match);
    }


    if (match.length === 0) {
        modal.querySelector('h2').innerText = 'Não há SELECTs para copiar.'
    }

    modal.showModal();

    setTimeout(() => {
        modal.classList.add('hide');
        modal.addEventListener('webkitAnimationEnd', function () {
            modal.classList.remove('hide');
            modal.close();
            modal.removeEventListener('webkitAnimationEnd', arguments.callee, false);
        }, false);
    }, 3000);
}

async function paste() {
    const q = document.querySelector('#query');
    document.querySelector('#result').value = '';
    q.value = await navigator.clipboard.readText().then(data => data);
}