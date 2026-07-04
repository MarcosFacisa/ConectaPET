// ===== DADOS DE PETS (Simulação de Banco de Dados) =====
const petsDatabase = [
    {
        id: 1,
        nome: "Thor",
        tipo: "cachorro",
        raca: "Labrador",
        idade: "adulto",
        tamanho: "grande",
        localizacao: "São Paulo, SP",
        descricao: "Thor é um labrador amigável e energético. Adora brincar e fazer novos amigos.",
        emoji: "🐕",
        protetor: "ONG Patinhas Felizes",
        telefone: "(11) 98765-4321"
    },
    {
        id: 2,
        nome: "Luna",
        tipo: "gato",
        raca: "Siamês",
        idade: "filhote",
        tamanho: "pequeno",
        localizacao: "Rio de Janeiro, RJ",
        descricao: "Luna é uma gatinha dócil e carinhosa. Perfeita para apartamento.",
        emoji: "🐱",
        protetor: "Protetor Independente - Carlos",
        telefone: "(21) 99876-5432"
    },
    {
        id: 3,
        nome: "Max",
        tipo: "cachorro",
        raca: "Poodle",
        idade: "adulto",
        tamanho: "pequeno",
        localizacao: "Belo Horizonte, MG",
        descricao: "Max é um cachorro inteligente e tranquilo. Excelente companhia.",
        emoji: "🐕",
        protetor: "ONG Amigas de Patinhas",
        telefone: "(31) 97654-3210"
    },
    {
        id: 4,
        nome: "Bella",
        tipo: "gato",
        raca: "Persa",
        idade: "adulto",
        tamanho: "pequeno",
        localizacao: "Curitiba, PR",
        descricao: "Bella é uma gatinha elegante e independente. Gosta de rotina.",
        emoji: "🐱",
        protetor: "ONG Gatos Resgatados",
        telefone: "(41) 98876-7654"
    },
    {
        id: 5,
        nome: "Rex",
        tipo: "cachorro",
        raca: "Bulldog",
        idade: "idoso",
        tamanho: "medio",
        localizacao: "Salvador, BA",
        descricao: "Rex é um bulldog calmo e protetor. Precisa de um lar tranquilo.",
        emoji: "🐕",
        protetor: "Protetor Independente - Ana",
        telefone: "(71) 99654-8765"
    },
    {
        id: 6,
        nome: "Mimi",
        tipo: "gato",
        raca: "Vira-lata",
        idade: "filhote",
        tamanho: "pequeno",
        localizacao: "Brasília, DF",
        descricao: "Mimi é uma gatinha brincalhona e carinhosa. Muito fofa!",
        emoji: "🐱",
        protetor: "ONG Vidas Resgatadas",
        telefone: "(61) 97876-5432"
    },
    {
        id: 7,
        nome: "Buddy",
        tipo: "cachorro",
        raca: "Golden Retriever",
        idade: "filhote",
        tamanho: "grande",
        localizacao: "Porto Alegre, RS",
        descricao: "Buddy é um filhote alegre, dócil e muito afetuoso com crianças.",
        emoji: "🐕",
        protetor: "ONG Amigos de Patas",
        telefone: "(51) 98765-1234"
    },
    {
        id: 8,
        nome: "Nala",
        tipo: "gato",
        raca: "Angora",
        idade: "adulto",
        tamanho: "medio",
        localizacao: "Fortaleza, CE",
        descricao: "Nala é uma gata elegante que gosta de carinho. Muito dócil.",
        emoji: "🐱",
        protetor: "Protetor Independente - Marina",
        telefone: "(85) 99876-4321"
    }
];

let petsFavoritos = JSON.parse(localStorage.getItem('petsFavoritos')) || [];

// ===== CARREGAR PETS NA PÁGINA ===== 
document.addEventListener('DOMContentLoaded', () => {
    renderizarPets(petsDatabase);
    atualizarContadorFavoritos();
});

// ===== RENDERIZAR PETS =====
function renderizarPets(pets) {
    const petsGrid = document.getElementById('petsGrid');
    petsGrid.innerHTML = '';

    if (pets.length === 0) {
        petsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px;">Nenhum pet encontrado com esses filtros.</p>';
        return;
    }

    pets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.className = 'pet-card';
        petCard.innerHTML = `
            <div class="pet-image">${pet.emoji}</div>
            <div class="pet-info">
                <div class="pet-name">${pet.nome}</div>
                <div class="pet-details">
                    <div class="pet-detail-item">
                        <i class="fas fa-venus-mars"></i>
                        <span>${pet.raca}</span>
                    </div>
                    <div class="pet-detail-item">
                        <i class="fas fa-birthday-cake"></i>
                        <span>${traduzirIdade(pet.idade)}</span>
                    </div>
                    <div class="pet-detail-item">
                        <i class="fas fa-ruler"></i>
                        <span>${traduzirTamanho(pet.tamanho)}</span>
                    </div>
                    <div class="pet-detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${pet.localizacao}</span>
                    </div>
                </div>
                <div class="pet-footer">
                    <button class="pet-adopt" onclick="abrirModalAdocao(${pet.id})">
                        <i class="fas fa-heart"></i> Adotar
                    </button>
                    <button class="pet-favorite ${petsFavoritos.includes(pet.id) ? 'active' : ''}" 
                            onclick="toggleFavorito(${pet.id})">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
            </div>
        `;
        petsGrid.appendChild(petCard);
    });
}

// ===== FILTRAR PETS =====
function filtrarPets() {
    const tipo = document.getElementById('tipo').value;
    const idade = document.getElementById('idade').value;
    const tamanho = document.getElementById('tamanho').value;
    const localizacao = document.getElementById('localizacao').value.toLowerCase();

    const petsFiltrados = petsDatabase.filter(pet => {
        return (tipo === '' || pet.tipo === tipo) &&
               (idade === '' || pet.idade === idade) &&
               (tamanho === '' || pet.tamanho === tamanho) &&
               (localizacao === '' || pet.localizacao.toLowerCase().includes(localizacao));
    });

    renderizarPets(petsFiltrados);
}

// ===== LIMPAR FILTROS =====
function limparFiltros() {
    document.getElementById('tipo').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('tamanho').value = '';
    document.getElementById('localizacao').value = '';
    renderizarPets(petsDatabase);
}

// ===== TRADUZIR VALORES =====
function traduzirIdade(idade) {
    const traducao = {
        'filhote': '🐣 Filhote',
        'adulto': '🐕 Adulto',
        'idoso': '👴 Idoso'
    };
    return traducao[idade] || idade;
}

function traduzirTamanho(tamanho) {
    const traducao = {
        'pequeno': '🟢 Pequeno',
        'medio': '🟡 Médio',
        'grande': '🔴 Grande'
    };
    return traducao[tamanho] || tamanho;
}

// ===== MODAL DE ADOÇÃO =====
function abrirModalAdocao(petId) {
    const pet = petsDatabase.find(p => p.id === petId);
    if (!pet) return;

    document.getElementById('modalPetName').textContent = pet.nome;
    document.getElementById('modalPetImage').textContent = pet.emoji;
    document.getElementById('modalPetRaca').textContent = pet.raca;
    document.getElementById('modalPetIdade').textContent = traduzirIdade(pet.idade);
    document.getElementById('modalPetTamanho').textContent = traduzirTamanho(pet.tamanho);
    document.getElementById('modalPetLocal').textContent = pet.localizacao;
    document.getElementById('modalPetDesc').textContent = pet.descricao;

    document.getElementById('adoptionModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('adoptionModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('adoptionModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// ===== SUBMIT ADOÇÃO =====
function submitAdoption(event) {
    event.preventDefault();
    
    const nome = document.getElementById('adoptNome').value;
    const email = document.getElementById('adoptEmail').value;
    const telefone = document.getElementById('adoptTel').value;
    const cidade = document.getElementById('adoptCidade').value;
    const mensagem = document.getElementById('adoptMensagem').value;

    console.log('Interesse em adoção recebido:');
    console.log({ nome, email, telefone, cidade, mensagem });

    alert(`Obrigado, ${nome}!\n\nSeu interesse foi registrado.\nEntraremos em contato em breve!`);
    
    document.getElementById('adoptionModal').style.display = 'none';
    document.querySelector('.adoption-form').reset();
}

// ===== FAVORITOS =====
function toggleFavorito(petId) {
    const index = petsFavoritos.indexOf(petId);
    if (index > -1) {
        petsFavoritos.splice(index, 1);
    } else {
        petsFavoritos.push(petId);
    }
    localStorage.setItem('petsFavoritos', JSON.stringify(petsFavoritos));
    atualizarContadorFavoritos();
    filtrarPets();
}

function toggleFavoritos() {
    const favoritos = petsDatabase.filter(pet => petsFavoritos.includes(pet.id));
    if (favoritos.length === 0) {
        alert('Você não tem pets favoritos ainda!');
        return;
    }
    renderizarPets(favoritos);
    document.getElementById('pets').scrollIntoView({ behavior: 'smooth' });
}

function atualizarContadorFavoritos() {
    document.querySelector('.favoritos-count').textContent = petsFavoritos.length;
}

// ===== SUBMIT PET PARA ADOÇÃO =====
function submitPet(event) {
    event.preventDefault();

    const dados = {
        nome: document.getElementById('petNome').value,
        tipo: document.getElementById('petTipo').value,
        raca: document.getElementById('petRaca').value,
        idade: document.getElementById('petIdade').value,
        genero: document.getElementById('petGenero').value,
        tamanho: document.getElementById('petTamanho').value,
        descricao: document.getElementById('petDescricao').value,
        nomeProtetor: document.getElementById('nomeProtetor').value,
        localizacao: document.getElementById('localizacaoPet').value,
        telefone: document.getElementById('telefonePet').value,
        email: document.getElementById('emailPet').value
    };

    console.log('Pet disponibilizado:', dados);
    alert(`Obrigado por disponibilizar ${dados.nome}!\n\nEm breve seu pet estará no site!`);
    
    document.getElementById('petForm').reset();
}

// ===== FUNÇÕES AUXILIARES =====
function scrollTo(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function toggleMenu() {
    // Para implementar menu móvel
    console.log('Menu móvel');
}

// ===== FAQ =====
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// ===== MENSAGENS NO CONSOLE =====
console.log('%c🐾 CONECTA PET - Adoção Responsável 🐾', 'font-size: 20px; color: #ff6b9d; font-weight: bold;');
console.log('Bem-vindo! Projeto Integrador - Sistemas de Informação 2024');
console.log('Autores: Marcos Gabriel Alves Maciel | Cristian Vieira Silva Lins');
