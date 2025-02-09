import { genererNombreAleatoire, creerPersonnage, compteurTour, lancerConfettis } from "./fonctionsAnnexes.js";
import { Monstre } from "./classes.js";
import {containerStatsPersonnagePrincipal, containerStatsMonstreChoisi, statsMonstreChoisi, statsPersonnagePrincipal, barreSanteMonstre, barreSantePersonnage, containerButtons, combat} from "./globales.js"
import { reinitialiserCompteur } from "./compteur.js";

let personnagePrincipal;
export let pseudo;
let monstreChoisi;
let deroulementCombat;
let imagePersonnagePrincipal;
let nombreAleatoire;
let imageMonstreChoisi;



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
        choisirPseudo.style.display = "none";
        document.body.style.justifyContent = "start";

        afficherChoixClasse();
    }
    )
}

function afficherChoixClasse() {

    let retourChoixPseudo = document.createElement("button");
    retourChoixPseudo.innerHTML = "Retour au choix du pseudo";
    retourChoixPseudo.classList.add("button");
    document.body.prepend(retourChoixPseudo);
    retourChoixPseudo.addEventListener("click", () => {
        location.reload();
    } )
    
    
    let choixGuerrier = document.createElement("button");
    let containerGuerrier = document.createElement("div");
    containerGuerrier.append(choixGuerrier);  
    containerGuerrier.classList.add("containerGuerrier");
    choixGuerrier.innerHTML = "Guerrier <br><br> PV: 600<br>Attaque: 40";
    choixGuerrier.classList.add("button"); 
    containerButtons.append(containerGuerrier);

    let choixMage = document.createElement("button");
    let containerMage = document.createElement("div");
    containerMage.append(choixMage);
    containerMage.classList.add("containerMage");
    choixMage.innerHTML = "Mage <br><br> PV: 400 <br> Attaque: 70";
    choixMage.classList.add("button");
    containerButtons.append(containerMage);

    let choixArcher = document.createElement("button");
    let containerArcher = document.createElement("div");
    containerArcher.append(choixArcher);
    containerArcher.classList.add("containerArcher");
    choixArcher.innerHTML = "Archer <br><br> PV: 350 <br> Attaque: 50 <br><br> Critique: 25% <br><br> Esquive: 20%";
    choixArcher.classList.add("button");
    containerButtons.append(containerArcher);

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

    choixGuerrier.style.display = "none";
    choixMage.style.display = "none";
    choixArcher.style.display = "none";
    containerGuerrier.style.display = "none";
    containerMage.style.display = "none";
    containerArcher.style.display = "none";
    containerChoix.textContent = "Quel monstre veux-tu affronter?";
    choisirMonstre()
    }


function choisirMonstre() {

    let retourChoixClasse = document.createElement("button");
    retourChoixClasse.innerHTML = "Changer de classe";
    retourChoixClasse.classList.add("button")
    document.body.prepend(retourChoixClasse)
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
    //Création bouton de retour au choix du monstre
    let retourChoixMonstre = document.createElement("button");
    retourChoixMonstre.innerHTML = "Choisir un autre monstre";
    retourChoixMonstre.classList.add("button")
    retourChoixMonstre.classList.add("retourChoixMonstre")
    document.body.prepend(retourChoixMonstre);

    retourChoixMonstre.addEventListener("click", () => {
        containerStatsMonstreChoisi.classList.add("hidden");
        containerStatsPersonnagePrincipal.classList.add("hidden");
        containerButtons.innerHTML = "",
        combat.innerHTML = "";
        document.querySelector("#pseudoPersonnagePrincipal").innerHTML = "";
        document.querySelector("#containerImagePersonnagePrincipal").innerHTML = "";
        document.querySelector("#pseudoMonstreChoisi").innerHTML = "";
        document.querySelector("#containerImageMonstreChoisi").innerHTML = "";
        choisirMonstre();
        retourChoixMonstre.remove();
        personnagePrincipal.magie = 0;
        personnagePrincipal.sante = personnagePrincipal.santeMax;
        reinitialiserCompteur();
    })

    afficherCombattants();
    afficherStats(personnagePrincipal, statsPersonnagePrincipal, containerStatsPersonnagePrincipal, barreSantePersonnage, containerStatsPersonnagePrincipal);
    afficherStats(monstreChoisi, statsMonstreChoisi, containerStatsMonstreChoisi, barreSanteMonstre, containerStatsMonstreChoisi);
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
            deroulementCombat = document.createElement("div");
            deroulementCombat.style.background = "lightgreen";
            deroulementCombat.classList.add("deroulementCombat")
            afficherStats(personnagePrincipal, statsPersonnagePrincipal, containerStatsPersonnagePrincipal, barreSantePersonnage, containerStatsPersonnagePrincipal);
            afficherStats(monstreChoisi, statsMonstreChoisi, containerStatsMonstreChoisi, barreSanteMonstre, containerStatsMonstreChoisi);

            if (nombreAleatoire <= personnagePrincipal.critique) {
                deroulementCombat.innerHTML = `Coup critique! ${personnagePrincipal.pseudo} inflige ${personnagePrincipal.attaque*2} dégats à ${monstreChoisi.pseudo}. Il gagne 1 point de magie.`;   
            }
            
            else {
            deroulementCombat.innerHTML = `${personnagePrincipal.pseudo} attaque ${monstreChoisi.pseudo} et lui inflige ${personnagePrincipal.attaque} dégats. Il gagne 1 point de magie.`;
            }
 
            combat.prepend(deroulementCombat);
            break


        case "Lancer une attaque spéciale" :
            if (personnagePrincipal.attaqueSpeciale(monstreChoisi)){
            deroulementCombat = document.createElement("div");
            deroulementCombat.style.background = "lightgreen";
            deroulementCombat.classList.add("deroulementCombat")
            deroulementCombat.innerHTML = `${personnagePrincipal.pseudo} lance une attaque puissante sur ${monstreChoisi.pseudo} et lui inflige ${personnagePrincipal.attaque * 5} dégats.`;
            combat.prepend(deroulementCombat);
            afficherStats(personnagePrincipal, statsPersonnagePrincipal, containerStatsPersonnagePrincipal, barreSantePersonnage, containerStatsPersonnagePrincipal);
            afficherStats(monstreChoisi, statsMonstreChoisi, containerStatsMonstreChoisi, barreSanteMonstre, containerStatsMonstreChoisi);
            }
            
            else return
            break
        case "Attendre" : 
            personnagePrincipal.attendre();
            deroulementCombat = document.createElement("div");
            deroulementCombat.style.background = "lightgreen";
            deroulementCombat.classList.add("deroulementCombat")
            deroulementCombat.innerHTML = `${personnagePrincipal.pseudo} attend et se prépare pour le prochain tour. Il gagne 3 points de magie.`;
            combat.prepend(deroulementCombat);
            afficherStats(personnagePrincipal, statsPersonnagePrincipal, containerStatsPersonnagePrincipal, barreSantePersonnage, containerStatsPersonnagePrincipal);
            afficherStats(monstreChoisi, statsMonstreChoisi, containerStatsMonstreChoisi, barreSanteMonstre, containerStatsMonstreChoisi);
            break
        case "Se soigner":
            personnagePrincipal.seSoigner();
            deroulementCombat = document.createElement("div");
            deroulementCombat.style.background = "lightgreen";
            deroulementCombat.classList.add("deroulementCombat")
            deroulementCombat.innerHTML = `${personnagePrincipal.pseudo} se soigne et récupère ${0.25*personnagePrincipal.santeMax} points de vie`;
            combat.prepend(deroulementCombat);
            afficherStats(personnagePrincipal, statsPersonnagePrincipal, containerStatsPersonnagePrincipal, barreSantePersonnage, containerStatsPersonnagePrincipal);
            afficherStats(monstreChoisi, statsMonstreChoisi, containerStatsMonstreChoisi, barreSanteMonstre, containerStatsMonstreChoisi);
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
                deroulementCombat = document.createElement("div");
                deroulementCombat.style.background = "lightcoral";
                deroulementCombat.classList.add("deroulementCombat")
                deroulementCombat.innerHTML = `${monstreChoisi.pseudo} se soigne et récupère ${0.25*monstreChoisi.santeMax} points de vie`;
                combat.prepend(deroulementCombat);
                afficherStats(personnagePrincipal, statsPersonnagePrincipal, containerStatsPersonnagePrincipal, barreSantePersonnage, containerStatsPersonnagePrincipal);
                afficherStats(monstreChoisi, statsMonstreChoisi, containerStatsMonstreChoisi, barreSanteMonstre, containerStatsMonstreChoisi);
            }
         else if ((nombreAleatoire < 33 && monstreChoisi.sante == monstreChoisi.santeMax) || nombreAleatoire >= 66) {
               nombreAleatoire = genererNombreAleatoire()
                if(nombreAleatoire > personnagePrincipal.esquive) {
                monstreChoisi.attaquer(personnagePrincipal);
                deroulementCombat = document.createElement("div");
                deroulementCombat.style.background = "lightcoral";
                deroulementCombat.classList.add("deroulementCombat")
                deroulementCombat.innerHTML = `${monstreChoisi.pseudo} attaque ${personnagePrincipal.pseudo} et lui inflige ${monstreChoisi.attaque} dégats. Il gagne 1 point de magie.`;
                combat.prepend(deroulementCombat);
                afficherStats(personnagePrincipal, statsPersonnagePrincipal, containerStatsPersonnagePrincipal, barreSantePersonnage, containerStatsPersonnagePrincipal);
                afficherStats(monstreChoisi, statsMonstreChoisi, containerStatsMonstreChoisi, barreSanteMonstre, containerStatsMonstreChoisi);
                }
                else {
                    attaqueManquee(personnagePrincipal, monstreChoisi)
                }
            }
        else {
                monstreChoisi.attendre();
                deroulementCombat = document.createElement("div");
                deroulementCombat.style.background = "lightcoral";
                deroulementCombat.classList.add("deroulementCombat")
                deroulementCombat.innerHTML = `${monstreChoisi.pseudo} attend et se prépare pour le prochain tour. Il gagne 3 points de magie.`;
                combat.prepend(deroulementCombat);
                afficherStats(personnagePrincipal, statsPersonnagePrincipal, containerStatsPersonnagePrincipal, barreSantePersonnage, containerStatsPersonnagePrincipal);
                afficherStats(monstreChoisi, statsMonstreChoisi, containerStatsMonstreChoisi, barreSanteMonstre, containerStatsMonstreChoisi);
            }

        }
    else {
        nombreAleatoire = genererNombreAleatoire()
        if(nombreAleatoire > personnagePrincipal.esquive) {
        monstreChoisi.attaqueSpeciale(personnagePrincipal);             
        deroulementCombat = document.createElement("div");
        deroulementCombat.style.background = "lightcoral";
        deroulementCombat.classList.add("deroulementCombat")
        deroulementCombat.innerHTML = `${monstreChoisi.pseudo} lance une attaque puissante sur ${personnagePrincipal.pseudo} et lui inflige ${monstreChoisi.attaque * 5} dégats.`;
        combat.prepend(deroulementCombat);
        afficherStats(personnagePrincipal, statsPersonnagePrincipal, containerStatsPersonnagePrincipal, barreSantePersonnage, containerStatsPersonnagePrincipal);
        afficherStats(monstreChoisi, statsMonstreChoisi, containerStatsMonstreChoisi, barreSanteMonstre, containerStatsMonstreChoisi);
        }
        else {
            attaquePuissanteManquee(personnagePrincipal, monstreChoisi)
            afficherStats(personnagePrincipal, statsPersonnagePrincipal, containerStatsPersonnagePrincipal, barreSantePersonnage, containerStatsPersonnagePrincipal);
            afficherStats(monstreChoisi, statsMonstreChoisi, containerStatsMonstreChoisi, barreSanteMonstre, containerStatsMonstreChoisi);
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


function afficherCombattants() {
   let pseudoPersonnagePrincipal = document.querySelector("#pseudoPersonnagePrincipal");
   let containerImagePersonnagePrincipal = document.querySelector("#containerImagePersonnagePrincipal");
   let pseudoMonstreChoisi = document.querySelector("#pseudoMonstreChoisi");
   let containerImageMonstreChoisi = document.querySelector("#containerImageMonstreChoisi");

    if (personnagePrincipal.classe == "Guerrier") {
        imagePersonnagePrincipal = document.createElement("img");
        imagePersonnagePrincipal.classList.add("guerrier");
        containerImagePersonnagePrincipal.append(imagePersonnagePrincipal)
        pseudoPersonnagePrincipal.append(personnagePrincipal.pseudo)

    }
    else if (personnagePrincipal.classe === "Mage") {
        imagePersonnagePrincipal = document.createElement("img");
        imagePersonnagePrincipal.classList.add("mage");
        containerImagePersonnagePrincipal.append(imagePersonnagePrincipal);
        pseudoPersonnagePrincipal.append(personnagePrincipal.pseudo);
    }

    else {
        imagePersonnagePrincipal = document.createElement("img");
        imagePersonnagePrincipal.classList.add("archer");
        containerImagePersonnagePrincipal.append(imagePersonnagePrincipal);
        pseudoPersonnagePrincipal.append(personnagePrincipal.pseudo);
    }


if (monstreChoisi.pseudo == "Slime") {
    imageMonstreChoisi = document.createElement("img");
    imageMonstreChoisi.classList.add("Slime")
    containerImageMonstreChoisi.append(imageMonstreChoisi);
    pseudoMonstreChoisi.append(monstreChoisi.pseudo);
}

else if (monstreChoisi.pseudo == "Loup-Garou") {
    imageMonstreChoisi = document.createElement("img");
    imageMonstreChoisi.classList.add("Loup-Garou")
    containerImageMonstreChoisi.append(imageMonstreChoisi);
    pseudoMonstreChoisi.append(monstreChoisi.pseudo);
}

else {
    imageMonstreChoisi = document.createElement("img");
    imageMonstreChoisi.classList.add("Dragon");
    containerImageMonstreChoisi.append(imageMonstreChoisi);
    pseudoMonstreChoisi.append(monstreChoisi.pseudo);
}
}

function attaqueManquee(personnage, monstre) {
    deroulementCombat = document.createElement("div");
    deroulementCombat.style.background = "lightcoral";
    deroulementCombat.classList.add("deroulementCombat")
    deroulementCombat.innerHTML = `${personnage.pseudo} esquive l'attaque! ${monstre.pseudo} n'inflige aucun dégat mais il gagne 1 point de magie.`;
    combat.prepend(deroulementCombat);
}

function attaquePuissanteManquee(personnage, monstre) {
    deroulementCombat = document.createElement("div");
    deroulementCombat.style.background = "lightcoral";
    deroulementCombat.classList.add("deroulementCombat")
    deroulementCombat.innerHTML = `Incroyable! ${personnage.pseudo} esquive l'attaque puissante de ${monstre.pseudo} qui n'inflige aucun dégat. Il gagne quand même 1 point de magie.`;
    combat.prepend(deroulementCombat);
    monstre.magie -= 5;
}


function afficherStats(personnage, div, container, barreSante, containerStats) {
    containerStats.classList.remove("hidden");
    barreSante.style.width = personnage.sante/personnage.santeMax * 100 + "%";
    barreSante.classList.remove("hidden");
    div.innerHTML = `PV: ${personnage.sante}/${personnage.santeMax} <br> Magie: ${personnage.magie} points`;
    if (!container.contains(div))
    container.append(div)
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


choisirPseudo();