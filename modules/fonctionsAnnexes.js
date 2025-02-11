import { Guerrier, Mage, Archer } from "./classes.js";
import { afficherCompteur, incrementerCompteur } from "./compteur.js";
import { pseudo, retourChoixPseudo, choisirClasse } from "../script.js";
import { containerArcher, containerGuerrier, containerMage, choixArcher, choixGuerrier, choixMage } from "./globales.js";
import { creerDeroulementCombat } from "./affichage.js";


export function genererNombreAleatoire() {
    return Math.floor((Math.random() * 100)+ 1);
}

export function creerPersonnage(classe) {
    switch (classe) {
    case "Guerrier" :
        return new Guerrier(pseudo, classe);
    
    case "Mage" :
        return new Mage(pseudo, classe);

    case "Archer":
        return new Archer(pseudo, classe, 25, 20)
    }
}


export function gererEcouteursChoixClasse() {
    choixGuerrier.removeEventListener("click", ecouteur["Guerrier"]);
    choixMage.removeEventListener("click", ecouteur["Mage"]);
    choixArcher.removeEventListener("click", ecouteur["Archer"]);


    choixGuerrier.addEventListener("click", ecouteur["Guerrier"]);
    choixMage.addEventListener("click", ecouteur["Mage"]);
    choixArcher.addEventListener("click", ecouteur["Archer"])
}

function ecouteurChoixClasse(classe) {
    choisirClasse(classe,choixGuerrier, choixMage, choixArcher, containerGuerrier, containerMage, containerArcher),
        retourChoixPseudo.remove()
}
// Stocker la référence de la fonction anonyme dans une variable pour qu'elle ne change pas
const ecouteur = {
    "Guerrier" : () => ecouteurChoixClasse("Guerrier"),
    "Mage": () => ecouteurChoixClasse("Mage"),
    "Archer": () => ecouteurChoixClasse("Archer")
}

export function attaqueManquee(personnage, monstre) {
    creerDeroulementCombat("lightcoral", `${personnage.pseudo} esquive l'attaque! ${monstre.pseudo} n'inflige aucun dégat mais il gagne 1 point de magie.`)
    
}

export function attaquePuissanteManquee(personnage, monstre) {
    creerDeroulementCombat("lightcoral", `Incroyable! ${personnage.pseudo} esquive l'attaque puissante de ${monstre.pseudo} qui n'inflige aucun dégat. Il gagne quand même 1 point de magie.`);
    monstre.magie -= 5;
}

export function compteurTour() {
    incrementerCompteur()
    let compteurTour = document.createElement("div");
    compteurTour.innerHTML = `Tour ${afficherCompteur()}`;
    compteurTour.style.textAlign = "center";
    compteurTour.style.background = "lightblue";
    compteurTour.classList.add("deroulementCombat");
    combat.prepend(compteurTour);
}

