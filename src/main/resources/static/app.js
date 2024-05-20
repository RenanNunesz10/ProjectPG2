function showSection(sectionId) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    showSection('cidade');
    document.getElementById('btn-cidade').addEventListener('click', () => showSection('cidade'));
    document.getElementById('btn-pais').addEventListener('click', () => showSection('pais'));
    document.getElementById('btn-time').addEventListener('click', () => showSection('time'));
});

function listarCidades() {
    fetch('/cidades')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                console.error('Resposta inesperada do servidor:', data);
                alert('Erro ao listar cidades.');
                return;
            }
            const list = document.getElementById('cidade-list');
            list.innerHTML = '';
            data.forEach(cidade => {
                const item = document.createElement('div');
                item.textContent = `ID: ${cidade.id} Nome: ${cidade.nome}, Estado: ${cidade.estado}, País: ${cidade.pais}, População: ${cidade.populacao}`;
                list.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Erro ao listar cidades:', error);
            alert('Erro ao listar cidades.');
        });
}

function listarPaises() {
    fetch('/paises')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                console.error('Resposta inesperada do servidor:', data);
                alert('Erro ao listar países.');
                return;
            }
            const list = document.getElementById('pais-list');
            list.innerHTML = '';
            data.forEach(pais => {
                const item = document.createElement('div');
                item.textContent = `ID: ${pais.id} Nome: ${pais.nome}, Continente: ${pais.continente}, População: ${pais.populacao}`;
                list.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Erro ao listar países:', error);
            alert('Erro ao listar países.');
        });
}

function listarTimes() {
    fetch('/times')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                console.error('Resposta inesperada do servidor:', data);
                alert('Erro ao listar times.');
                return;
            }
            const list = document.getElementById('time-list');
            list.innerHTML = '';
            data.forEach(time => {
                const item = document.createElement('div');
                item.textContent = `ID: ${time.id} Nome: ${time.nome}, Ano de Fundação: ${time.anoFundacao}, Cidade: ${time.cidade}, Estado: ${time.estado}`;
                list.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Erro ao listar times:', error);
            alert('Erro ao listar times.');
        });
}

function adicionarCidade(event) {
    event.preventDefault();
    const nome = document.getElementById('cidade-nome').value;
    const estado = document.getElementById('cidade-estado').value;
    const pais = document.getElementById('cidade-pais').value;
    const populacao = document.getElementById('cidade-populacao').value;

    fetch('/cidades', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, estado, pais, populacao})
    })
    .then(response => response.json())
    .then(cidade => {
        alert('Cidade adicionada com sucesso!');
        listarCidades();
    })
    .catch(error => {
        console.error('Erro ao adicionar cidade:', error);
        alert('Erro ao adicionar cidade.');
    });
}

function atualizarCidade() {
    const id = document.getElementById('cidade-id').value;
    const nome = document.getElementById('cidade-nome').value;
    const estado = document.getElementById('cidade-estado').value;
    const pais = document.getElementById('cidade-pais').value;
    const populacao = document.getElementById('cidade-populacao').value;

    fetch(`/cidades/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, estado, pais, populacao})
    })
    .then(response => response.json())
    .then(data => {
        alert('Cidade atualizada com sucesso!');
        listarCidades();
    })
    .catch(error => {
        console.error('Erro ao atualizar cidade:', error);
        alert('Erro ao atualizar cidade.');
    });
}

function deletarCidade() {
    const id = document.getElementById('cidade-id').value;

    fetch(`/cidades/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Cidade deletada com sucesso!');
            listarCidades();
        } else {
            alert('Falha ao deletar cidade.');
        }
    })
    .catch(error => {
        console.error('Erro ao deletar cidade:', error);
        alert('Erro ao deletar cidade.');
    });
}

function adicionarPais(event) {
    event.preventDefault();
    const nome = document.getElementById('pais-nome').value;
    const continente = document.getElementById('pais-continente').value;
    const populacao = document.getElementById('pais-populacao').value;

    fetch('/paises', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, continente, populacao})
    })
    .then(response => response.json())
    .then(pais => {
        alert('País adicionado com sucesso!');
        listarPaises();
    })
    .catch(error => {
        console.error('Erro ao adicionar país:', error);
        alert('Erro ao adicionar país.');
    });
}

function atualizarPais() {
    const id = document.getElementById('pais-id').value;
    const nome = document.getElementById('pais-nome').value;
    const continente = document.getElementById('pais-continente').value;
    const populacao = document.getElementById('pais-populacao').value;

    fetch(`/paises/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, continente, populacao})
    })
    .then(response => response.json())
    .then(data => {
        alert('País atualizado com sucesso!');
        listarPaises();
    })
    .catch(error => {
        console.error('Erro ao atualizar país:', error);
        alert('Erro ao atualizar país.');
    });
}

function deletarPais() {
    const id = document.getElementById('pais-id').value;

    fetch(`/paises/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('País deletado com sucesso!');
            listarPaises();
        } else {
            alert('Falha ao deletar país.');
        }
    })
    .catch(error => {
        console.error('Erro ao deletar país:', error);
        alert('Erro ao deletar país.');
    });
}

function adicionarTime(event) {
    event.preventDefault();
    const nome = document.getElementById('time-nome').value;
    const anoFundacao = document.getElementById('time-anoFundacao').value;
    const cidade = document.getElementById('time-cidade').value;
    const estado = document.getElementById('time-estado').value;

    fetch('/times', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, anoFundacao, cidade, estado})
    })
    .then(response => response.json())
    .then(time => {
        alert('Time adicionado com sucesso!');
        listarTimes();
    })
    .catch(error => {
        console.error('Erro ao adicionar time:', error);
        alert('Erro ao adicionar time.');
    });
}

function atualizarTime() {
    const id = document.getElementById('time-id').value;
    const nome = document.getElementById('time-nome').value;
    const anoFundacao = document.getElementById('time-anoFundacao').value;
    const cidade = document.getElementById('time-cidade').value;
    const estado = document.getElementById('time-estado').value;

    fetch(`/times/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome, anoFundacao, cidade, estado})
    })
    .then(response => response.json())
    .then(data => {
        alert('Time atualizado com sucesso!');
        listarTimes();
    })
    .catch(error => {
        console.error('Erro ao atualizar time:', error);
        alert('Erro ao atualizar time.');
    });
}

function deletarTime() {
    const id = document.getElementById('time-id').value;

    fetch(`/times/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Time deletado com sucesso!');
            listarTimes();
        } else {
            alert('Falha ao deletar time.');
        }
    })
    .catch(error => {
        console.error('Erro ao deletar time:', error);
        alert('Erro ao deletar time.');
    });
}