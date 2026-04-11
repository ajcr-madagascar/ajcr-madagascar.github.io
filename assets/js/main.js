/**
Name: AJCR (Association des jeunes citoyens responsables)
*/

(function () {
  "use strict";

  /**
   * Applique la classe scrolled au body lorsque la page est déroulée vers le bas 
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle 
   * (mune mobile) ou bouton pour ouvrir/fermer la navigation mobile
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Masquer le menu mobile lorsqu'on clique sur un lien vers la même page/un ancre
   */
  document.querySelectorAll('#Menu-de-navigation a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns 
   * basculer les menus déroulants de la navigation mobile
   */
  document.querySelectorAll('.Menu-de-navigation .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button 
   * bouton de retour en haut
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Initialiser la fonction d'animation lors du défilement.
   */
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      /* on attend que Swiper, PureCounter et Glightboxa aient fait leurs calculs */
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: false,
        mirror: true
      });
      /* Recalcule toutes les positions après le chargement */
      AOS.refresh();
    }, 200)
  });

  /**
   * Initialiser glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initialise les sliders avec glissement
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initialiser Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle 
   * basculer les questions fréquemment posées
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
      AOS.refresh();
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   * Ajuster le défilement au chargement pour les liens d'ancrage
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   * Menu de navigation avec suivi de défilement
   */
  let navmenulinks = document.querySelectorAll('.Menu-de-navigation a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.Menu-de-navigation a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/* Changement du bouton voir plus en voir moins et vis versa */
document.querySelectorAll('.toggle-text').forEach(btn => {
  const target = document.querySelector(btn.getAttribute('href'));
  //quand on ouvre le collapse
  target.addEventListener('shown.bs.collapse', function () { btn.textContent = '...Voir moins'; });
  //Après que le collapse est complétement ouvert 
  target.addEventListener('shown.bs.collapse', function () { AOS.refresh(); });
  //quand on ferme le collapse 
  target.addEventListener('hidden.bs.collapse', function () { btn.textContent = '...Voir plus'; });

});

/* apparition et disparition de la section modal */
const showBtn = document.getElementById('show-files-btn');
const modal = document.getElementById('file-modal');
const closeBtn = document.getElementById('close-file-modal');

if (document.getElementById('show-files-btn')) {
  showBtn.addEventListener('click', () => {
    modal.style.display = 'flex'; // Affiche la modale
  });
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'; // ferme la modale
  });
  // fermer en cliquant en dehors de la boîte
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}
/* dans la page section celui qui gére l'apparition et disparition des 
block section-box */
// Selectionne tous les boutons 
document.querySelectorAll('[data-bs-toggle="tab"]').forEach(link => {
  link.addEventListener('shown.bs.tab', (e) => {
    // cacher tous les div extras
    document.querySelectorAll('.section-box-container').forEach(el => el.classList.add('d-none'));
    // afficher les div lié à ce bouton
    const targetExtra = e.target.getAttribute('data-target-extra');
    const extraDiv =
      document.querySelector(targetExtra); if (extraDiv) extraDiv.classList.remove('d-none');
  });
});

/* dans la page section celui qui gére swiper */
const swiper = new Swiper('.swiper', { autoplay: { delay: 3000, }, loop: true, });
