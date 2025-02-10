import { attaqueSpecialeError, containerButtons, objetDeroulementCombat, combat, statsPersonnagePrincipal, statsMonstreChoisi} from "./globales.js";
import { personnagePrincipal, monstreChoisi } from "../script.js";


export function afficherInfosClasse(choix, container, classeCSS, texte) {
    let containerADevoiler = [choix, container];
    containerADevoiler.forEach((container) => {
        container.style.display = "flex"
    })
    container.append(choix);
    container.classList.add(classeCSS)
    choix.innerHTML = texte;
    choix.classList.add("button");
    containerButtons.append(container)
}

export function creerDeroulementCombat(couleur, texte){
    objetDeroulementCombat.deroulementCombat = (document.createElement("div"));
    objetDeroulementCombat.deroulementCombat.style.background = couleur;
    objetDeroulementCombat.deroulementCombat.classList.add("deroulementCombat")
    objetDeroulementCombat.deroulementCombat.innerHTML = texte;
    combat.prepend(objetDeroulementCombat.deroulementCombat)
}

export function creerBoutonRetour(texte, classe1, classe2) {

    let boutonRetour = document.createElement("button");
        boutonRetour.innerHTML = texte;
        boutonRetour.classList.add(classe1, classe2);
        document.body.prepend(boutonRetour)
    return boutonRetour
}

export function viderAttaqueSpecialeError() {
    attaqueSpecialeError.innerHTML = "";
}


export function afficherCombattants() {
    let pseudoPersonnagePrincipal = document.querySelector("#pseudoPersonnagePrincipal");
    let containerImagePersonnagePrincipal = document.querySelector("#containerImagePersonnagePrincipal");
    let pseudoMonstreChoisi = document.querySelector("#pseudoMonstreChoisi");
    let containerImageMonstreChoisi = document.querySelector("#containerImageMonstreChoisi");
    const imageMonstreChoisi = document.querySelector("#imageMonstreChoisi");   
    const imagePersonnagePrincipal = document.querySelector("#imagePersonnagePrincipal");
 
    afficherPersonnage(personnagePrincipal, containerImagePersonnagePrincipal, pseudoPersonnagePrincipal);
    afficherPersonnage(monstreChoisi, containerImageMonstreChoisi, pseudoMonstreChoisi);
 }
 
 function afficherPersonnage(personnage, containerImage, containerPseudo) {
     let image = document.createElement ("img");
     image.id = personnage.classe === "Monstre"? "imageMonstreChoisi" : "imagePersonnagePrincipal";
     let classCSS = personnage.classe === "Monstre"? personnage.pseudo : personnage.classe.toLowerCase(); //si le personnage n'est pas un monstre, mettre en miniscule
     image.classList.add(classCSS)
     containerImage.append(image)
     containerPseudo.append(personnage.pseudo)
 }

 export function getImageMonstreChoisi() {
    return document.querySelector("#imageMonstreChoisi")
}

export function getImagePersonnagePrincipal() {
    return document.querySelector("#imagePersonnagePrincipal")
}

 function afficherStats(personnage, div, container, barreSante, containerStats) {
    containerStats.classList.remove("hidden");
    barreSante.style.width = personnage.sante/personnage.santeMax * 100 + "%"; //taille de la barre de vie 
    barreSante.classList.remove("hidden");
    if (personnage.sante <= 0) {    //Eviter les PV négatifs//
        personnage.sante = 0
    }
    div.innerHTML = `PV: ${personnage.sante}/${personnage.santeMax} <br> Magie: ${personnage.magie} points`;
    if (!container.contains(div))
    container.append(div)
}

export function mettreAJourStats() { //Eviter répétitions
    afficherStats(personnagePrincipal, statsPersonnagePrincipal, containerStatsPersonnagePrincipal, barreSantePersonnage, containerStatsPersonnagePrincipal);
    afficherStats(monstreChoisi, statsMonstreChoisi, containerStatsMonstreChoisi, barreSanteMonstre, containerStatsMonstreChoisi);
}

export function lancerConfettis() {
    const duration = 2 * 1000; // Durée de 2 secondes
    const end = Date.now() + duration;

    // Fonction récursive pour produire un flux continu de confettis
    (function frame() {
        // Lancer les confettis depuis un point aléatoire
        confetti({
            particleCount: 5, // Nombre de particules par "salve"
            angle: 60, // Angle de départ
            spread: 55, // Éparpillement
            origin: { x: Math.random(), y: Math.random() - 0.2 } // Position aléatoire
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

