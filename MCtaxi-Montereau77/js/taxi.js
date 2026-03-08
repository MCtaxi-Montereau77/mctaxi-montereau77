/* ══════════════════════════════════════════════════════
   1. NAVBAR — fond opaque au scroll
   ══════════════════════════════════════════════════════ */

// On récupère l'élément navbar du HTML
const navbar = document.getElementById('navbar');

// On écoute chaque fois que l'utilisateur fait défiler la page
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    // Plus de 50px scrollés → on ajoute le fond flou
    navbar.classList.add('scrolled');
  } else {
    // En haut de page → on retire le fond
    navbar.classList.remove('scrolled');
  }
});


/* ══════════════════════════════════════════════════════
   2. FORMULAIRE DE DEVIS — affichage du message de succès
   ══════════════════════════════════════════════════════ */

function submitDevis(event) {
  // Empêche le rechargement de page par défaut du navigateur
  event.preventDefault();

  // On cache le formulaire
  document.getElementById('devisForm').style.display = 'none';

  // On affiche le message de confirmation
  document.getElementById('formSuccess').style.display = 'block';

  // Défilement doux vers le message pour que l'utilisateur le voie
  document.getElementById('formSuccess').scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });

  /*
    ⚠️ Pour envoyer les données par email en vrai, utilisez Formspree :
    1. Créez un compte sur https://formspree.io
    2. Remplacez l'action du formulaire HTML par votre URL Formspree
    3. Supprimez le onsubmit="submitDevis(event)" et laissez le formulaire
       se soumettre normalement vers Formspree
  */
}


/* ══════════════════════════════════════════════════════
   3. ANIMATIONS AU SCROLL — apparition des cartes
   ══════════════════════════════════════════════════════ */

// On sélectionne tous les éléments à animer à l'entrée dans l'écran
const animatedElements = document.querySelectorAll(
  '.service-card, .review-card, .devis-form, .devis-info'
);

// État de départ : invisible et décalé vers le bas
animatedElements.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// IntersectionObserver : surveille si les éléments entrent dans le champ de vision
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {

      // Délai en cascade : chaque carte apparaît 80ms après la précédente
      setTimeout(() => {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 80);

      // On arrête d'observer cet élément une fois animé (économie de ressources)
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 }); // Se déclenche dès que 10% de l'élément est visible

// On démarre la surveillance pour chaque élément
animatedElements.forEach(el => observer.observe(el));