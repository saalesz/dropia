const conquistasData = [
  {
    id: 1,
    badge: '../assets/icon-chuva.svg',
    titulo: 'Chuva de Conhecimento',
    subtitulo: 'Leitor consciente',
    statusLabel: 'Nível 3',
    porcentagem: 72,
    cores: { primary: '#2463EB' }
  },
  {
    id: 2,
    badge: '../assets/icon-guardiao.svg', 
    titulo: 'Guardião da Água',
    subtitulo: '7 dias consecutivos',
    statusLabel: 'Desbloqueado!',
    porcentagem: 100,
    cores: { primary: '#059669' }
  },
  {
    id: 3,
    badge: '../assets/icon-alert.svg', 
    titulo: 'Alerta: Deserto',
    subtitulo: 'Reservatório crítico',
    statusLabel: 'Zona de risco!',
    porcentagem: 18,
    cores: { primary: '#FF6B00' }
  }
];

function renderCards() {
  const container = document.getElementById('cards-container');
  if (!container) return; 

  container.innerHTML = conquistasData.map(card => {
    const styleVariables = `
      --card-primary: ${card.cores.primary}; 
    `;

    return `
      <div class="card-conquista" style="${styleVariables}">
        <div class="card-header">
          <div class="conquista-content">
            <h3>${card.titulo}</h3>
            <p class="card-subtitle">${card.subtitulo}</p>
          </div>
          
          <div class="icon-wrapper">
            <img src="${card.badge}" alt="Ícone ${card.titulo}" class="card-icon" />
          </div>
        </div>

        <div class="card-footer">
          <div class="status-info">
            <span>${card.statusLabel}</span>
            <span class="percentage-val">${card.porcentagem}%</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: 0%" data-percentage="${card.porcentagem}"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // 🔥 SE OS CARDS JÁ EXISTEM NO DOM, DISPARA A FUNÇÃO DE ANIMAÇÃO!
  if (typeof animarConquistas === "function") {
    animarConquistas();
  }
}

document.addEventListener('DOMContentLoaded', renderCards);