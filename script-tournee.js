const etapes = [
  { nom: "Pôle Nord",   dateStr: "2026-12-24T18:00:00", top: 28, left: 52 },
  { nom: "Groenland",   dateStr: "2026-12-24T19:00:00", top: 40, left: 43 },
  { nom: "Canada",      dateStr: "2026-12-24T20:00:00", top: 51, left: 22 },
  { nom: "États-Unis",  dateStr: "2026-12-24T21:00:00", top: 70, left: 18 },
  { nom: "Norvège",     dateStr: "2026-12-24T22:00:00", top: 46, left: 58 },
  { nom: "Royaume-Uni", dateStr: "2026-12-24T23:00:00", top: 59, left: 53 },
  { nom: "Irlande",     dateStr: "2026-12-25T00:00:00", top: 62, left: 51 },
  { nom: "Espagne",     dateStr: "2026-12-25T01:00:00", top: 77, left: 53 },
  { nom: "Italie",      dateStr: "2026-12-25T02:00:00", top: 72, left: 61 },
  { nom: "Allemagne",   dateStr: "2026-12-25T02:30:00", top: 62, left: 60 },
  { nom: "France",      dateStr: "2026-12-25T03:00:00", top: 68, left: 70 }
];
const etapesDates = etapes.map(e => ({
  ...e,
  timestamp: new Date(e.dateStr).getTime()
}));

function mettreAJourTournee() {
  const maintenant = new Date();
  const tempsActuel = maintenant.getTime();
  const debutTournee = etapesDates[0].timestamp;
  const finTournee = etapesDates[etapesDates.length - 1].timestamp;

  const traineau = document.getElementById('traineau');
  const message = document.getElementById('message-noel');

  if (tempsActuel < debutTournee) {
    if (traineau) traineau.style.display = 'none';
    if (message) message.innerText = "🎁 Le Père Noël prépare sa tournée au Pôle Nord...";
    return;
  }
  if (tempsActuel >= finTournee) {
    const tempsRetourPoli = new Date('2026-12-25T03:30:00').getTime();

    if (tempsActuel >= tempsRetourPoli) {
      if (traineau) {
        traineau.style.display = 'block';
        const poleNord = etapes[0];
        traineau.style.top = poleNord.top + '%';
        traineau.style.left = poleNord.left + '%';
      }
      if (message) {
        message.innerText = "💤 Le Père Noël est rentré se reposer au Pôle Nord en attendant l'année prochaine !";
      }
    } else {
      if (traineau) {
        traineau.style.display = 'block';
        const derniereEtape = etapes[etapes.length - 1];
        traineau.style.top = derniereEtape.top + '%';
        traineau.style.left = derniereEtape.left + '%';
      }
      if (message) {
        message.innerText = "🎄 Le Père Noël est bien arrivé en France ! Joyeux Noël !";
      }
    }
    return;
  }

  if (traineau) traineau.style.display = 'block';

  for (let i = 0; i < etapesDates.length - 1; i++) {
    const etapeCourante = etapesDates[i];
    const etapeSuivante = etapesDates[i + 1];

    if (tempsActuel >= etapeCourante.timestamp && tempsActuel < etapeSuivante.timestamp) {
        const dureeSegment = etapeSuivante.timestamp - etapeCourante.timestamp;
      const tempsParcouru = tempsActuel - etapeCourante.timestamp;
      const ratio = tempsParcouru / dureeSegment;
      const top = etapeCourante.top + (etapeSuivante.top - etapeCourante.top) * ratio;
      const left = etapeCourante.left + (etapeSuivante.left - etapeCourante.left) * ratio;

      if (traineau) {
        traineau.style.top = top + '%';
        traineau.style.left = left + '%';
      }

      if (message) {
        message.innerText = `🎅 Le Père Noël voyage de ${etapeCourante.nom} vers ${etapeSuivante.nom}...`;
      }
      break;
    }
  }
}
setInterval(mettreAJourTournee, 1000);
mettreAJourTournee();


const selecteur = document.getElementById('selecteur-musique');
const lecteur = document.getElementById('lecteur-audio');
const audioSource = document.getElementById('audio-source');

if (selecteur && lecteur && audioSource) {
selecteur.addEventListener('change', function() {
  const choixMusique = this.value;
  
  audioSource.src = choixMusique;
  
  localStorage.setItem('noel_current_music', choixMusique);
  
  lecteur.load();
  lecteur.play();
  localStorage.setItem('noel_is_playing', 'true');
});
}



function mettreAJourDecompte() {
    const maintenant = new Date();
    const anneeActuelle = maintenant.getFullYear();
    
    // Le 25 décembre à 3h00 (11 = décembre)
    let dateCible = new Date(anneeActuelle, 11, 25, 3, 0, 0);
    
    // Si on a dépassé le 25 décembre à 3h, on vise l'année prochaine
    if (maintenant > dateCible) {
        dateCible = new Date(anneeActuelle + 1, 11, 25, 3, 0, 0);
    }
    
    const tempsRestant = dateCible - maintenant;
    console.log("Temps restant en millisecondes :", tempsRestant); // Pour voir dans la console (F12)
    
    const jours = Math.floor(tempsRestant / (1000 * 60 * 60 * 24));
    const heures = Math.floor((tempsRestant % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((tempsRestant % (1000 * 60 * 60)) / (1000 * 60));
    const secondes = Math.floor((tempsRestant % (1000 * 60)) / 1000);
    
    // Injection directe dans les éléments HTML (sans bloquer si le calcul paraît bizarre)
    const elJours = document.getElementById("jours");
    const elHeures = document.getElementById("heures");
    const elMinutes = document.getElementById("minutes");
    const elSecondes = document.getElementById("secondes");

    if (elJours) elJours.innerText = String(Math.max(0, jours)).padStart(2, '0');
    if (elHeures) elHeures.innerText = String(Math.max(0, heures)).padStart(2, '0');
    if (elMinutes) elMinutes.innerText = String(Math.max(0, minutes)).padStart(2, '0');
    if (elSecondes) elSecondes.innerText = String(Math.max(0, secondes)).padStart(2, '0');
}

// Lancer le décompte immédiatement puis toutes les secondes
mettreAJourDecompte();
setInterval(mettreAJourDecompte, 1000);







document.addEventListener('DOMContentLoaded', function() {
    function mettreAJourJauges() {
        const maintenant = new Date();
        const annee = maintenant.getFullYear();
        
        // Date de fin : 20 Décembre à 23:59:59
        const dateFin = new Date(annee, 11, 20, 23, 59, 59);
        
        // Date de début (1er novembre)
        const dateDebut = new Date(annee, 10, 1);

        let pourcentageProduction = 50;

        if (maintenant >= dateFin) {
            pourcentageProduction = 100;
        } else if (maintenant > dateDebut) {
            const tempsTotal = dateFin - dateDebut;
            const tempsEcoule = maintenant - dateDebut;
            const ratio = tempsEcoule / tempsTotal;
            
            pourcentageProduction = Math.round(50 + (ratio * 50));
        }

        // Sécurité pour la production (entre 50% et 100%)
        pourcentageProduction = Math.min(100, Math.max(50, pourcentageProduction));

        // Calcul inverse pour la construction (100% - production, avec un minimum de 0%)
        const pourcentageConstruction = 100 - pourcentageProduction;

        // Récupération des éléments HTML de production
        const barreProd = document.getElementById('jauge-production');
        const texteProd = document.getElementById('texte-production');

        // Récupération des éléments HTML de construction
        const barreConst = document.getElementById('jauge-construction');
        const texteConst = document.getElementById('texte-construction');

        // Application des modifications pour la Production
        if (barreProd && texteProd) {
            barreProd.style.width = pourcentageProduction + '%';
            texteProd.textContent = `${pourcentageProduction}% des jouets sont déjà emballés par les lutins !`;
        }

        // Application des modifications pour la Construction (sens inverse)
        if (barreConst && texteConst) {
            barreConst.style.width = pourcentageConstruction + '%';
            texteConst.textContent = `${pourcentageConstruction}% des cadeaux restent à construire par les lutins !`;
        }
    }

    // Lancer la fonction au chargement
    mettreAJourJauges();
});





document.addEventListener('DOMContentLoaded', function() {
    function mettreAJourMeteoPoleNord() {
        const maintenant = new Date();
        const annee = maintenant.getFullYear();
        const mois = maintenant.getMonth();
        const jour = maintenant.getDate();
        
        // Graine unique stable pour toute la journée
        const seed = (annee * 1000) + (mois * 50) + jour;
        const randomStable = Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000);

        // Température cohérente pour le Pôle Nord (entre -18°C et -2°C)
        const temperature = Math.round(-18 + randomStable * 16);

        // Liste des conditions météo possibles
        const conditions = [
            { texte: "Neige forte", vent: "Vent: 35 km/h Nord", visibilite: "Moyenne", piste: "Délicate" },
            { texte: "Flocons magiques", vent: "Vent: 18 km/h Nord-Ouest", visibilite: "Bonne", piste: "Dégagée" },
            { texte: "Léger Blizzard", vent: "Vent: 52 km/h Nord", visibilite: "Réduite", piste: "Surveillée" },
            { texte: "Grande fraîcheur", vent: "Vent: 12 km/h Nord", visibilite: "Excellente", piste: "Parfaite" },
            { texte: "Nuages polaires", vent: "Vent: 22 km/h Est", visibilite: "Bonne", piste: "Dégagée" }
        ];

        const meteoDuJour = conditions[Math.floor(randomStable * conditions.length)];

        // Récupération des éléments HTML via leurs id
        const elTemp = document.getElementById('meteo-temp');
        const elCondition = document.getElementById('meteo-condition');
        const elVent = document.getElementById('meteo-vent');
        const elVisibilite = document.getElementById('meteo-visibilite');
        const elPiste = document.getElementById('meteo-piste');

        // Application des modifications dans la page
        if (elTemp) elTemp.textContent = temperature + "°C";
        if (elCondition) elCondition.textContent = meteoDuJour.texte;
        if (elVent) elVent.textContent = meteoDuJour.vent;
        if (elVisibilite) elVisibilite.textContent = meteoDuJour.visibilite;
        if (elPiste) elPiste.textContent = meteoDuJour.piste;
    }

    // Lancement de la fonction au chargement
    mettreAJourMeteoPoleNord();
});




function mettreAJourTraineauMagique() {
    const maintenant = new Date();
    const annee = maintenant.getFullYear();
    
    const dateDebut = new Date(annee, 11, 1, 0, 0, 0);   // 1er décembre
    const dateCible = new Date(annee, 11, 20, 23, 59, 59); // 20 décembre
    
    const elementNiveau = document.getElementById("poussiere-niveau");
    const elementTexteStatut = document.getElementById("texte-statut");
    
    if (!elementNiveau || !elementTexteStatut) return;

    let pourcentage = 60;

    if (maintenant >= dateCible) {
        pourcentage = 100;
        elementTexteStatut.innerText = "Prêt pour le grand voyage";
    } else if (maintenant > dateDebut) {
        const tempsTotal = dateCible - dateDebut;
        const tempsEcoule = maintenant - dateDebut;
        const progression = tempsEcoule / tempsTotal;
        pourcentage = Math.round(60 + (progression * 40));
        
        elementTexteStatut.innerText = "Presque prêt pour le grand voyage";
    } else {
        elementTexteStatut.innerText = "Presque prêt pour le grand voyage";
    }

    elementNiveau.innerText = pourcentage + "%";
}

document.addEventListener("DOMContentLoaded", mettreAJourTraineauMagique);





const btnEnvoi = document.querySelector(".bouton-envoi");
const zoneConfirmation = document.getElementById("zone-confirmation");
const textareaSouhaits = document.querySelector(".liste-souhaits");

if (btnEnvoi && zoneConfirmation) {
    btnEnvoi.addEventListener("click", (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // 1. Masquer le bouton et afficher la zone de confirmation en retirant la classe cache
        btnEnvoi.style.display = "none";
        zoneConfirmation.classList.remove("cache"); // Retire la classe qui cachait l'élément
        zoneConfirmation.style.display = "block";   // Force l'affichage

        // 2. Timer de 10 secondes pour réinitialiser
        setTimeout(() => {
            // Masquer le message de confirmation et remettre la classe cache
            zoneConfirmation.style.display = "none";
            zoneConfirmation.classList.add("cache");
            
            // Réafficher le bouton d'envoi
            btnEnvoi.style.display = "inline-block"; 
            
            // Vider le champ texte pour une nouvelle lettre
            if (textareaSouhaits) {
                textareaSouhaits.value = "";
            }
        }, 10000);
    });
}




const zoneJeu = document.getElementById("zone-jeu");
const scoreSpan = document.getElementById("score");
const scoreFinalSpan = document.getElementById("score-final");
const ecranFin = document.getElementById("ecran-fin");
const btnRejouer = document.getElementById("btn-rejouer"); // <-- Vérifie bien que cette variable existe

let score = 0;
let jeuEnCours = true;
let intervalCadeaux;
let cadeauxActifs = [];
let tempsDebutPartie = 0;
const emojisCadeaux = ["🎁", "🧸", "⭐", "🎄", "🍬"];



function demarrerJeu() {
    if (!zoneJeu) return;
    score = 0;
    scoreSpan.innerText = score;
    ecranFin.style.display = "none";
    jeuEnCours = true;
    cadeauxActifs = [];
    
    tempsDebutPartie = Date.now(); // Enregistre l'heure de début

    clearInterval(intervalCadeaux);
    intervalCadeaux = setInterval(creerCadeau, 900);
    requestAnimationFrame(mettreAJourJeu);
}

function creerCadeau() {
    if (!jeuEnCours || !zoneJeu) return;

    const cadeau = document.createElement("div");
    cadeau.classList.add("cadeau");
    cadeau.innerText = emojisCadeaux[Math.floor(Math.random() * emojisCadeaux.length)];

    const largeurMax = zoneJeu.clientWidth - 40;
    const posX = Math.random() * largeurMax;
    cadeau.style.left = posX + "px";
    cadeau.style.top = "-40px";

    // --- CALCUL DE LA VITESSE PROGRESSIVE ---
    // Calcule le nombre de secondes écoulées depuis le début
    const secondesEcoulees = (Date.now() - tempsDebutPartie) / 1000;
    
    let vitesseBase;
    if (secondesEcoulees < 60) {
        // Pendant la première minute : vitesse lente (entre 1 et 1.5)
        vitesseBase = 1 + Math.random() * 0.5;
    } else {
        // Après 1 minute : ça commence à accélérer progressivement selon le temps
        const facteurAcceleration = Math.min((secondesEcoulees - 60) / 30, 3); // Plafonné pour que ça reste jouable
        vitesseBase = 1.5 + Math.random() * 1 + (facteurAcceleration * 0.8);
    }

    const objetCadeau = { element: cadeau, x: posX, y: -40, vitesse: vitesseBase };

    const attraperCadeau = (e) => {
        e.preventDefault();
        if (!jeuEnCours) return;

        score++;
        scoreSpan.innerText = score;
        cadeau.remove();
        cadeauxActifs = cadeauxActifs.filter(c => c !== objetCadeau);
    };

    cadeau.addEventListener("mousedown", attraperCadeau);
    cadeau.addEventListener("touchstart", attraperCadeau);

    zoneJeu.appendChild(cadeau);
    cadeauxActifs.push(objetCadeau);
}

function mettreAJourJeu() {
    if (!jeuEnCours || !zoneJeu) return;

    const hauteurZone = zoneJeu.clientHeight;

    for (let i = cadeauxActifs.length - 1; i >= 0; i--) {
        let c = cadeauxActifs[i];
        c.y += c.vitesse;
        c.element.style.top = c.y + "px";

        if (c.y >= hauteurZone - 30) {
            terminerJeu();
            return;
        }
    }

    if (jeuEnCours) {
        requestAnimationFrame(mettreAJourJeu);
    }
}

function terminerJeu() {
    jeuEnCours = false;
    clearInterval(intervalCadeaux);

    cadeauxActifs.forEach(c => c.element.remove());
    cadeauxActifs = [];

    if (scoreFinalSpan) scoreFinalSpan.innerText = score;
    if (ecranFin) ecranFin.style.display = "flex";
}

function rejouerJeu() {
    demarrerJeu();
}

// --- BRANCHEMENT DU BOUTON REJOUER ---
document.addEventListener("DOMContentLoaded", () => {
    if (btnRejouer) {
        btnRejouer.addEventListener("click", rejouerJeu);
    }
    demarrerJeu();
});