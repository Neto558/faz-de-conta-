/**
 * FAZ DE CONTA BUFFET INFANTIL - CYBER TECH & NEON EXPERIENCE
 * Scripts de animação AOS, efeitos dinâmicos, tabs unificadas de eventos e integração WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '5519997685316';
  const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

  /* ==========================================================================
     1. INICIALIZAÇÃO DE ANIMAÇÕES AO ROLAR (AOS)
     ========================================================================== */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 850,
      once: false,
      easing: 'ease-out-cubic',
      offset: 80,
      delay: 50
    });
  }

  /* ==========================================================================
     2. HEADER DINÂMICO NO SCROLL
     ========================================================================== */
  const header = document.getElementById('main-header');
  function handleScrollHeader() {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  /* ==========================================================================
     3. MENU MOBILE DRAWER
     ========================================================================== */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeMenuBtn = document.getElementById('close-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-menu-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('translate-x-full');
    if (mobileBackdrop) {
      mobileBackdrop.classList.remove('hidden');
      setTimeout(() => mobileBackdrop.classList.remove('opacity-0'), 10);
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('translate-x-full');
    if (mobileBackdrop) {
      mobileBackdrop.classList.add('opacity-0');
      setTimeout(() => mobileBackdrop.classList.add('hidden'), 300);
    }
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openMobileMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeLightbox();
    }
  });

  /* ==========================================================================
     4. TABS UNIFICADAS DE EVENTOS: DIAS DE SEMANA VS FINAIS DE SEMANA
     ========================================================================== */
  const tabWeekdays = document.getElementById('tab-weekdays');
  const tabWeekends = document.getElementById('tab-weekends');
  const contentWeekdays = document.getElementById('events-weekdays');
  const contentWeekends = document.getElementById('events-weekends');

  function switchTab(activeTab) {
    if (!tabWeekdays || !tabWeekends || !contentWeekdays || !contentWeekends) return;

    if (activeTab === 'weekdays') {
      tabWeekdays.classList.add('bg-cyan-500', 'text-slate-950', 'shadow-lg', 'shadow-cyan-500/30');
      tabWeekdays.classList.remove('text-cyan-400', 'hover:text-white');
      
      tabWeekends.classList.remove('bg-cyan-500', 'text-slate-950', 'shadow-lg', 'shadow-cyan-500/30');
      tabWeekends.classList.add('text-cyan-400', 'hover:text-white');

      contentWeekdays.classList.remove('hidden');
      contentWeekends.classList.add('hidden');
    } else {
      tabWeekends.classList.add('bg-cyan-500', 'text-slate-950', 'shadow-lg', 'shadow-cyan-500/30');
      tabWeekends.classList.remove('text-cyan-400', 'hover:text-white');

      tabWeekdays.classList.remove('bg-cyan-500', 'text-slate-950', 'shadow-lg', 'shadow-cyan-500/30');
      tabWeekdays.classList.add('text-cyan-400', 'hover:text-white');

      contentWeekends.classList.remove('hidden');
      contentWeekdays.classList.add('hidden');
    }

    if (typeof AOS !== 'undefined') {
      setTimeout(() => AOS.refresh(), 100);
    }
  }

  if (tabWeekdays) tabWeekdays.addEventListener('click', () => switchTab('weekdays'));
  if (tabWeekends) tabWeekends.addEventListener('click', () => switchTab('weekends'));

  /* ==========================================================================
     5. BOTÕES DE ORÇAMENTO RÁPIDO NOS CARDS DE EVENTO
     ========================================================================== */
  const planButtons = document.querySelectorAll('.btn-plan-quote');
  planButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planName = btn.getAttribute('data-plan-name') || 'Evento / Festa';
      const planPeriod = btn.getAttribute('data-plan-period') || 'Período sob consulta';

      const message = 
`✨ *Olá, Faz de Conta Buffet!*
Gostaria de verificar a disponibilidade e receber o orçamento detalhado para o *${planName}* (${planPeriod}).
Poderiam me passar mais informações sobre as datas livres e valores?`;

      const url = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  /* ==========================================================================
     6. FORMULÁRIO DE ORÇAMENTO COM ENVIO DIRETO PARA WHATSAPP
     ========================================================================== */
  const quoteForm = document.getElementById('quote-form');
  const phoneInput = document.getElementById('form-phone');

  // Máscara brasileira para telefone (19) 99999-9999
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      
      if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
      } else if (value.length > 0) {
        value = value.replace(/^(\d*)$/, '($1');
      }
      e.target.value = value;
    });
  }

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim() || '';
      const phone = document.getElementById('form-phone')?.value.trim() || '';
      const eventType = document.getElementById('form-event-type')?.value || 'Não informado';
      const dayType = document.getElementById('form-day-type')?.value || 'A definir';
      const eventDate = document.getElementById('form-date')?.value || 'A definir';
      const guests = document.getElementById('form-guests')?.value || 'A definir';
      const notes = document.getElementById('form-notes')?.value.trim() || 'Nenhuma observação extra';

      if (!name || !phone) {
        showToast('Por favor, informe seu nome e WhatsApp de contato.', 'warning');
        return;
      }

      let formattedDate = eventDate;
      if (eventDate && eventDate !== 'A definir' && eventDate.includes('-')) {
        const parts = eventDate.split('-');
        if (parts.length === 3) {
          formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
      }

      const message = 
`⚡ *SOLICITAÇÃO DE ORÇAMENTO - FAZ DE CONTA BUFFET* ⚡

👤 *Nome do Cliente:* ${name}
📱 *WhatsApp:* ${phone}
🧸 *Tipo de Evento:* ${eventType}
📅 *Preferência de Período:* ${dayType}
🗓️ *Data Desejada:* ${formattedDate}
👥 *Quantidade de Convidados:* ${guests}
🍭 *Mensagem / Observações:* ${notes}

---
_Enviado pelo portal oficial Faz de Conta Buffet (Pirassununga - SP)_`;

      const encodedMessage = encodeURIComponent(message);
      const url = `${WHATSAPP_BASE_URL}?text=${encodedMessage}`;

      showToast('Conectando ao WhatsApp do Faz de Conta Buffet...', 'success');
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
      }, 600);
    });
  }

  /* ==========================================================================
     7. ACCORDION DO FAQ
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-open');
            otherItem.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  /* ==========================================================================
     8. GALERIA: FILTROS E LIGHTBOX
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentGalleryIndex = 0;
  let activeGalleryItems = Array.from(galleryItems);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter') || 'all';

      filterBtns.forEach(b => {
        b.classList.remove('bg-cyan-500', 'text-slate-950');
        b.classList.add('bg-slate-900', 'text-slate-400', 'hover:text-cyan-400');
      });
      btn.classList.add('bg-cyan-500', 'text-slate-950');
      btn.classList.remove('bg-slate-900', 'text-slate-400', 'hover:text-cyan-400');

      activeGalleryItems = [];
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          activeGalleryItems.push(item);
        } else {
          item.style.display = 'none';
        }
      });

      if (typeof AOS !== 'undefined') {
        setTimeout(() => AOS.refresh(), 100);
      }
    });
  });

  function openLightbox(index) {
    if (!lightbox || !lightboxImg || !activeGalleryItems[index]) return;
    currentGalleryIndex = index;
    const item = activeGalleryItems[currentGalleryIndex];
    const imgEl = item.querySelector('img');
    const titleEl = item.querySelector('.gallery-title');

    if (imgEl) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt || 'Foto Faz de Conta Buffet';
    }
    if (lightboxCaption && titleEl) {
      lightboxCaption.textContent = titleEl.textContent;
    }

    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
  }

  function prevLightbox() {
    if (activeGalleryItems.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + activeGalleryItems.length) % activeGalleryItems.length;
    openLightbox(currentGalleryIndex);
  }

  function nextLightbox() {
    if (activeGalleryItems.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % activeGalleryItems.length;
    openLightbox(currentGalleryIndex);
  }

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const index = activeGalleryItems.indexOf(item);
      if (index !== -1) openLightbox(index);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* ==========================================================================
     9. BOTÃO COPIAR ENDEREÇO
     ========================================================================== */
  const copyAddressBtn = document.getElementById('btn-copy-address');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const address = 'Av. Newton Prado, 3599 - Centro, Pirassununga - SP, 13631-045';
      navigator.clipboard.writeText(address).then(() => {
        showToast('Endereço copiado para a área de transferência!', 'success');
      }).catch(() => {
        showToast('Endereço: Av. Newton Prado, 3599 - Centro, Pirassununga - SP', 'info');
      });
    });
  }

  /* ==========================================================================
     10. NOTIFICAÇÕES TOAST COM GLOW NEON
     ========================================================================== */
  function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-24 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgColors = {
      success: 'bg-emerald-600 text-white shadow-emerald-500/50 border border-emerald-400',
      warning: 'bg-amber-600 text-white shadow-amber-500/50 border border-amber-400',
      info: 'bg-slate-900 text-cyan-300 shadow-cyan-500/40 border border-cyan-500'
    };

    toast.className = `${bgColors[type] || bgColors.info} px-5 py-3.5 rounded-2xl shadow-2xl text-xs sm:text-sm font-bold flex items-center gap-3 transition-all transform duration-300 translate-y-4 opacity-0 pointer-events-auto backdrop-blur-md`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    }, 20);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-4');
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }
});
