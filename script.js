import { genererNombreAleatoire, creerPersonnage, compteurTour, attaqueManquee, attaquePuissanteManquee, gererEcouteursChoixClasse} from "./modules/fonctionsAnnexes.js";
import { Monstre } from "./modules/classes.js";
import {choixGuerrier, containerGuerrier, containerMage, choixMage, choixArcher, containerArcher, containerStatsPersonnagePrincipal, containerStatsMonstreChoisi, containerButtons, combat, objetDeroulementCombat} from "./modules/globales.js"
import { reinitialiserCompteur } from "./modules/compteur.js";
import { getImageMonstreChoisi, getImagePersonnagePrincipal, lancerConfettis, mettreAJourStats, viderAttaqueSpecialeError, afficherInfosClasse, creerDeroulementCombat, afficherCombattants, creerBoutonRetour } from "./modules/affichage.js";

export let personnagePrincipal;
export let pseudo;
export let monstreChoisi;
export let retourChoixPseudo;
export let nombreAleatoire;
let retourChoixClasse;
let retourChoixMonstre;

choisirPseudo();

function choisirPseudo() {
let pseudoInput = document.querySelector("#pseudoInput");
let choisirPseudo = document.querySelector("#choisirPseudo");
let containerChoix = document.querySelector("#containerChoix");

choisirPseudo.addEventListener("submit", (e) => {
    e.preventDefault()
        pseudo = pseudoInput.value.trim();
        if (!pseudo) {
         let pseudoError = document.querySelector("#pseudoError");
         pseudoError.classList.remove("hidden");
         return
        }

        else
        containerChoix.classList.remove("hidden");
        containerChoix.textContent = "Choisis ta classe:"
        choisirPseudo.classList.add("hidden");
        document.body.style.justifyContent = "start";

        afficherChoixClasse();
    }
    )
}

function afficherChoixClasse() {
    retourChoixPseudo = creerBoutonRetour("Retour au choix du pseudo", "button")

    retourChoixPseudo.addEventListener("click", () => {
        location.reload();
    } )
    
    afficherInfosClasse(choixGuerrier, containerGuerrier, "containerGuerrier", "Guerrier <br><br> PV: 600<br>Attaque: 40");
    afficherInfosClasse(choixMage, containerMage, "containerMage", "Mage <br><br> PV: 400 <br> Attaque: 70");
    afficherInfosClasse(choixArcher, containerArcher, "containerArcher", "Archer <br><br> PV: 350 <br> Attaque: 50 <br><br> Critique: 25% <br><br> Esquive: 20%");

    gererEcouteursChoixClasse();
}

export function choisirClasse(classe, choixGuerrier, choixMage, choixArcher, containerGuerrier, containerMage, containerArcher) {
   
    personnagePrincipal = creerPersonnage(classe);

    let containerACacher = [choixGuerrier, choixArcher, choixMage, containerArcher, containerGuerrier, containerMage]
    containerACacher.forEach ((container) => {
        container.style.display = "none";
    })
    containerChoix.textContent = "Quel monstre veux-tu affronter?";
    choisirMonstre()
    }


function choisirMonstre() {
    retourChoixClasse = creerBoutonRetour("Changer de classe", "button");

    retourChoixClasse.addEventListener("click", () => {
        containerButtons.innerHTML ="";
        retourChoixClasse.remove();
        afficherChoixClasse();
    })

    let monstres = [
        new Monstre("Slime", 400, 400, 20, "facile"),
        new Monstre("Loup-Garou", 500, 500, 30, "intermédiaire"),
        new Monstre("Dragon", 700, 700, 50, "difficile"),
    ]

    monstres.forEach((monstre) => {
        let containerMonstre = document.createElement("div");
        containerMonstre.id = monstre.pseudo;
        containerButtons.append(containerMonstre);
       let choixMonstre = document.createElement("button");
       choixMonstre.innerHTML = `${monstre.pseudo} (${monstre.difficulte})<br><br> PV: ${monstre.sante}<br> Attaque: ${monstre.attaque}`;
       choixMonstre.classList.add("button");
       let statsMonstre = document.createElement("div");
       containerMonstre.append(statsMonstre);
       statsMonstre.append(choixMonstre);
       let imageMonstre = document.createElement("div");
       imageMonstre.className = monstre.pseudo;
       containerMonstre.prepend(imageMonstre);
    
    
        choixMonstre.addEventListener ("click", () => {
                monstres.forEach((nom) => {
                    let idMonstre = document.getElementById(nom.pseudo);
                    idMonstre.style.display = "none";
                    retourChoixClasse.remove()
                })
            monstreChoisi = monstre
            combattre()
        }
        )
     } 
    )
         }


function combattre() {

    retourChoixMonstre = creerBoutonRetour("Choisir un autre monstre", "button", "retourChoixMonstre")

    retourChoixMonstre.addEventListener("click", () => {
        containerStatsMonstreChoisi.classList.add("hidden");
        containerStatsPersonnagePrincipal.classList.add("hidden");
        containerButtons.innerHTML = "",
        combat.innerHTML = "";
        document.querySelector("#pseudoPersonnagePrincipal").innerHTML = "";
        document.querySelector("#containerImagePersonnagePrincipal").innerHTML = "";
        document.querySelector("#pseudoMonstreChoisi").innerHTML = "";
        document.querySelector("#containerImageMonstreChoisi").innerHTML = "";
        retourChoixMonstre.remove();
        personnagePrincipal.magie = 0;
        personnagePrincipal.sante = personnagePrincipal.santeMax;
        viderAttaqueSpecialeError();
        reinitialiserCompteur();
        choisirMonstre();
    })

    afficherCombattants();
    mettreAJourStats();
    compteurTour();


    //Tour du joueur
    containerChoix.textContent = "Que voulez-vous faire?"
    let actions = ["Attaquer", "Lancer une attaque spéciale", "Attendre", "Se soigner"];
        actions.forEach ((action) => {      //Créer boutons action
        let choixAction = document.createElement("button");
        choixAction.textContent = action;
        choixAction.classList.add("button");
        containerButtons.append(choixAction);
  
    choixAction.addEventListener("click", () => {
        let boutonsAction = containerButtons.querySelectorAll("button");
        
        boutonsAction.forEach((button) => {
            button.disabled = true
        })

        setTimeout(() => {
            boutonsAction.forEach((button) => {
            button.disabled = false;
        })
        }, 500)

    switch(action) {
        case "Attaquer" :
            personnagePrincipal.attaquer(monstreChoisi);
            creerDeroulementCombat("lightgreen")
            mettreAJourStats();

            if (nombreAleatoire <= personnagePrincipal.critique) {
                objetDeroulementCombat.deroulementCombat.innerHTML = `Coup critique! ${personnagePrincipal.pseudo} inflige ${personnagePrincipal.attaque*2} dégats à ${monstreChoisi.pseudo}. Il gagne 1 point de magie.`;   
            }
            
            else {
                objetDeroulementCombat.deroulementCombat.innerHTML = `${personnagePrincipal.pseudo} attaque ${monstreChoisi.pseudo} et lui inflige ${personnagePrincipal.attaque} dégats. Il gagne 1 point de magie.`;
            }
            break


        case "Lancer une attaque spéciale" :
            if (personnagePrincipal.attaqueSpeciale(monstreChoisi)){
            creerDeroulementCombat("lightgreen",`${personnagePrincipal.pseudo} lance une attaque puissante sur ${monstreChoisi.pseudo} et lui inflige ${personnagePrincipal.attaque * 5} dégats.`);
            mettreAJourStats();
            }
            
            else return
            break
        case "Attendre" : 
            personnagePrincipal.attendre();
            creerDeroulementCombat("lightgreen", `${personnagePrincipal.pseudo} attend et se prépare pour le prochain tour. Il gagne 3 points de magie.`);
            mettreAJourStats();
            break
        case "Se soigner":
            personnagePrincipal.seSoigner();
            creerDeroulementCombat("lightgreen",`${personnagePrincipal.pseudo} se soigne et récupère ${0.25*personnagePrincipal.santeMax} points de vie`);
            mettreAJourStats();
            break
            }


            //Tour du monstre
    setTimeout(() => {
    if (monstreChoisi.sante <= 0) {         //Victoire du joueur
        getImageMonstreChoisi().remove();
        document.querySelector("#monstreChoisi").style.display = "none";
        finDuCombat(`${monstreChoisi.pseudo} est vaincu! Félicitations, vous avez gagné!`);
        lancerConfettis();
        return
    }

       nombreAleatoire = genererNombreAleatoire();
    if(monstreChoisi.magie < 5) {
        if (nombreAleatoire < 33 && monstreChoisi.sante != monstreChoisi.santeMax) {
                monstreChoisi.seSoigner();
                creerDeroulementCombat("lightcoral", `${monstreChoisi.pseudo} se soigne et récupère ${0.25*monstreChoisi.santeMax} points de vie`);
                mettreAJourStats();
            }
         else if ((nombreAleatoire < 33 && monstreChoisi.sante == monstreChoisi.santeMax) || nombreAleatoire >= 66) {
               nombreAleatoire = genererNombreAleatoire()
                if(nombreAleatoire > personnagePrincipal.esquive) {
                monstreChoisi.attaquer(personnagePrincipal);
                creerDeroulementCombat ("lightcoral", `${monstreChoisi.pseudo} attaque ${personnagePrincipal.pseudo} et lui inflige ${monstreChoisi.attaque} dégats. Il gagne 1 point de magie.`);
                mettreAJourStats();
                }
                else {
                    attaqueManquee(personnagePrincipal, monstreChoisi)
                }
            }
        else {
                monstreChoisi.attendre();
                creerDeroulementCombat("lightcoral", `${monstreChoisi.pseudo} attend et se prépare pour le prochain tour. Il gagne 3 points de magie.`);
                mettreAJourStats();
            }

        }
    else {
        nombreAleatoire = genererNombreAleatoire()
        if(nombreAleatoire > personnagePrincipal.esquive) {
        monstreChoisi.attaqueSpeciale(personnagePrincipal); 
        creerDeroulementCombat("lightcoral", `${monstreChoisi.pseudo} lance une attaque puissante sur ${personnagePrincipal.pseudo} et lui inflige ${monstreChoisi.attaque * 5} dégats.`)            
        mettreAJourStats();
        }
        else {
            attaquePuissanteManquee(personnagePrincipal, monstreChoisi)
            mettreAJourStats()
        }
    }
    
    compteurTour();
     //Fin du tour ,passage au tour suivant.

    if (personnagePrincipal.sante <= 0) { //Défaite du joueur
        getImagePersonnagePrincipal().remove();
        document.querySelector("#personnagePrincipal").style.display = "none";
        finDuCombat(`${personnagePrincipal.pseudo} est vaincu! Dommage, vous avez perdu!`)

    }
}, 500)
     })  
    })

}

function finDuCombat(message) {
    document.querySelector(".retourChoixMonstre").remove()
    let containerCombat = document.querySelector("#containerChoixAction");
    if (containerCombat) containerCombat.innerHTML = "";

    let containerMessageFin = document.querySelector("#containerMessageFin")
    let messageDeFin = document.createElement("div");
    messageDeFin.textContent = message;
    messageDeFin.style.color = message.includes("gagné") ? "green" : "red";
    messageDeFin.style.fontSize = "24px";
    messageDeFin.style.fontWeight = "bold";
    messageDeFin.style.margin = "20px 0";

    containerMessageFin.appendChild(messageDeFin);
    document.querySelector("#containerAll").style.gap = "50px"
    containerChoix.classList.add("hidden");
    containerButtons.style.display = "none";

    let recommencer = document.createElement("button");
    recommencer.textContent = "Recommencer un combat";
    recommencer.classList.add("button")
    recommencer.style.fontSize = "16px";

    recommencer.addEventListener("click", () => {
        location.reload(); // Recharge la page
    });

    containerMessageFin.appendChild(recommencer);
}
