import { genererNombreAleatoire, creerPersonnage, compteurTour, lancerConfettis, viderAttaqueSpecialeError } from "./fonctionsAnnexes.js";
import { Monstre } from "./classes.js";
import {choixGuerrier, containerGuerrier, containerMage, choixMage, choixArcher, containerArcher, containerStatsPersonnagePrincipal, containerStatsMonstreChoisi, statsMonstreChoisi, statsPersonnagePrincipal, barreSanteMonstre, barreSantePersonnage, containerButtons, combat, objetDeroulementCombat} from "./globales.js"
import { reinitialiserCompteur } from "./compteur.js";

let personnagePrincipal;
export let pseudo;
let monstreChoisi;
let imagePersonnagePrincipal;
let nombreAleatoire;
let imageMonstreChoisi;
let retourChoixPseudo;
let retourChoixClasse;
let retourChoixMonstre;




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

function afficherInfosClasse(choix, container, classeCSS, texte) {
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

function afficherChoixClasse() {
    retourChoixPseudo = creerBoutonRetour("Retour au choix du pseudo", "button")

    retourChoixPseudo.addEventListener("click", () => {
        location.reload();
    } )
    
    afficherInfosClasse(choixGuerrier, containerGuerrier, "containerGuerrier", "Guerrier <br><br> PV: 600<br>Attaque: 40");
    afficherInfosClasse(choixMage, containerMage, "containerMage", "Mage <br><br> PV: 400 <br> Attaque: 70");
    afficherInfosClasse(choixArcher, containerArcher, "containerArcher", "Archer <br><br> PV: 350 <br> Attaque: 50 <br><br> Critique: 25% <br><br> Esquive: 20%");


    choixGuerrier.addEventListener("click", () => {
        choisirClasse("Guerrier",choixGuerrier, choixMage, choixArcher, containerGuerrier, containerMage, containerArcher),
        retourChoixPseudo.remove()
        }
    );
    choixMage.addEventListener("click", () => {
        choisirClasse("Mage", choixGuerrier, choixMage, choixArcher, containerGuerrier, containerMage, containerArcher),
        retourChoixPseudo.remove()
        }
    );
    choixArcher.addEventListener("click", () => {
        choisirClasse("Archer", choixGuerrier, choixMage, choixArcher, containerGuerrier, containerMage, containerArcher),
        retourChoixPseudo.remove()
        }   
    );
}

function choisirClasse(classe, choixGuerrier, choixMage, choixArcher, containerGuerrier, containerMage, containerArcher) {
   
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

    containerChoix.textContent = "Que voulez-vous faire?"
    let actions = ["Attaquer", "Lancer une attaque spéciale", "Attendre", "Se soigner"];
    
    actions.forEach ((action) => {
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

    setTimeout(() => {
    if (monstreChoisi.sante <= 0) {
        imageMonstreChoisi.remove();
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
 

    if (personnagePrincipal.sante <= 0) {
        imagePersonnagePrincipal.remove();
        finDuCombat(`${personnagePrincipal.pseudo} est vaincu! Dommage, vous avez perdu!`)

    }
}, 500)
     })  
    })

}

function creerDeroulementCombat(couleur, texte){
    objetDeroulementCombat.deroulementCombat = (document.createElement("div"));
    objetDeroulementCombat.deroulementCombat.style.background = couleur;
    objetDeroulementCombat.deroulementCombat.classList.add("deroulementCombat")
    objetDeroulementCombat.deroulementCombat.innerHTML = texte;
    combat.prepend(objetDeroulementCombat.deroulementCombat)
}

function afficherCombattants() {
   let pseudoPersonnagePrincipal = document.querySelector("#pseudoPersonnagePrincipal");
   let containerImagePersonnagePrincipal = document.querySelector("#containerImagePersonnagePrincipal");
   let pseudoMonstreChoisi = document.querySelector("#pseudoMonstreChoisi");
   let containerImageMonstreChoisi = document.querySelector("#containerImageMonstreChoisi");

   afficherPersonnage(personnagePrincipal, containerImagePersonnagePrincipal, pseudoPersonnagePrincipal);
   afficherPersonnage(monstreChoisi, containerImageMonstreChoisi, pseudoMonstreChoisi);
}

function afficherPersonnage(personnage, containerImage, containerPseudo) {
    let image = document.createElement ("img");
    let classCSS = personnage.classe === "Monstre"? personnage.pseudo : personnage.classe.toLowerCase();
    console.log(classCSS)
    image.classList.add(classCSS)
    containerImage.append(image)
    containerPseudo.append(personnage.pseudo)

}

function attaqueManquee(personnage, monstre) {
    creerDeroulementCombat("lightgreen", `${personnage.pseudo} esquive l'attaque! ${monstre.pseudo} n'inflige aucun dégat mais il gagne 1 point de magie.`)
    
}

function attaquePuissanteManquee(personnage, monstre) {
    creerDeroulementCombat("lightgreen", `Incroyable! ${personnage.pseudo} esquive l'attaque puissante de ${monstre.pseudo} qui n'inflige aucun dégat. Il gagne quand même 1 point de magie.`);
    monstre.magie -= 5;
}


function afficherStats(personnage, div, container, barreSante, containerStats) {
    containerStats.classList.remove("hidden");
    barreSante.style.width = personnage.sante/personnage.santeMax * 100 + "%";
    barreSante.classList.remove("hidden");
    if (personnage.sante <= 0) {    //Eviter les PV négatifs//
        personnage.sante = 0
    }
    div.innerHTML = `PV: ${personnage.sante}/${personnage.santeMax} <br> Magie: ${personnage.magie} points`;
    if (!container.contains(div))
    container.append(div)
}

function mettreAJourStats() {
    afficherStats(personnagePrincipal, statsPersonnagePrincipal, containerStatsPersonnagePrincipal, barreSantePersonnage, containerStatsPersonnagePrincipal);
    afficherStats(monstreChoisi, statsMonstreChoisi, containerStatsMonstreChoisi, barreSanteMonstre, containerStatsMonstreChoisi);
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
    document.querySelector("#monstreChoisi").style.display = "none"
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

function creerBoutonRetour(texte, classe1, classe2) {

    let boutonRetour = document.createElement("button");
        boutonRetour.innerHTML = texte;
        boutonRetour.classList.add(classe1, classe2);
        document.body.prepend(boutonRetour)
    return boutonRetour
}
choisirPseudo();