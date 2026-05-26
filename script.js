// --- Gestion des Modales ---
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    // On utilise un petit délai pour que la classe .show gère l'opacité et le scale
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    // On attend la fin de l'animation CSS (0.3s) pour cacher l'élément
    setTimeout(() => {
        modal.style.display = 'none';
        
        // Si c'est la modale du Lore, on arrête la vidéo Youtube en rechargeant l'iframe
        if(modalId === 'loreModal') {
            const iframe = modal.querySelector('iframe');
            if(iframe) {
                let iframeSrc = iframe.src;
                iframe.src = iframeSrc;
            }
        }
    }, 300);
}

// Fermer la modale si on clique en dehors du contenu
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
}

// --- Animation des éléments au scroll (Intersection Observer) ---
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // L'animation se déclenche quand 10% de l'élément est visible
    });

    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    elementsToReveal.forEach(el => observer.observe(el));
});

// --- FLUX DE TÉLÉCHARGEMENT ---
let currentDownloadUrl = "";

function startDownloadFlow(os) {
    if (os === 'windows') {
        currentDownloadUrl = "downloads/Among_Wolf_3D_Windows.zip";
    }
    
    // Ferme la modale de sélection d'OS et ouvre celle de don
    closeModal('downloadModal');
    
    // Petit délai pour laisser l'animation de fermeture se faire
    setTimeout(() => {
        openModal('donationModal');
    }, 300);
}

function proceedToDownload() {
    // Ferme la modale de don et ouvre celle de chargement
    closeModal('donationModal');
    
    setTimeout(() => {
        openModal('progressModal');
        triggerActualDownload();
    }, 300);
}

function triggerActualDownload() {
    // 1. Met à jour le lien de secours (fallback) au cas où le navigateur bloque le DL auto
    const fallbackLink = document.getElementById('fallbackLink');
    fallbackLink.href = currentDownloadUrl;

    // 2. Déclenche le téléchargement automatiquement après 1.5 secondes (pour l'effet UX)
    setTimeout(() => {
        const tempLink = document.createElement('a');
        tempLink.href = currentDownloadUrl;
        tempLink.setAttribute('download', ''); // Force le DL
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    }, 1500);
}