let personnagePrincipal;
let pseudo;
let classe;
let monstreChoisi;
let actionChoisie;
let nombreAleatoire
let combat = document.querySelector("#combat");


class Personnage {
    constructor(pseudo, classe, sante, santeMax, attaque) {
    this.pseudo = pseudo;
    this.classe = classe;
    this.santeMax = santeMax;
    this.sante = sante;
    this.attaque = attaque;
    this.magie = 0;
}


    attaquer(personnage) {
        personnage.sante -= this.attaque;
        this.magie ++;
        let deroulementCombat = document.createElement("div");
        deroulementCombat.innerHTML = `${this.pseudo} attaque ${personnage.pseudo} et lui inflige ${this.attaque} dégats.`;
        deroulementCombat.style.color = "green";
        combat.append(deroulementCombat);
    }

    attaqueSpeciale(personnage) {
        let attaqueSpecialeError = document.querySelector("#attaqueSpecialeError");
        if (this.magie >= 5) {
            personnage.sante -= this.attaque * 5;
            this.magie = 0
            attaqueSpecialeError.innerHTML = "";
            let deroulementCombat = document.createElement("div");
            deroulementCombat.innerHTML = `${this.pseudo} lance une attaque puissante sur ${personnage.pseudo} et lui inflige ${this.attaque * 5} dégats.`;
            deroulementCombat.style.color = "green";
            combat.append(deroulementCombat);
        }
        else
        attaqueSpecialeError.innerHTML = "Vous avez besoin de 5 points de magie pour lancer une attaque spéciale";
        attaqueSpecialeError.style.color = "red";
        let deroulementCombat = document.createElement("div");
        combat.append(deroulementCombat);
        return
    }        

    attendre() {
        this.magie = this.magie + 3;
        let deroulementCombat = document.createElement("div");
        deroulementCombat.innerHTML = `${this.pseudo} attend et se prépare pour le prochain tour. Il gagne 3 points de magie.`;
        deroulementCombat.style.color = "green";
        combat.append(deroulementCombat);
    }

// Ajouter fonction défendre

    seSoigner() {
        this.sante += 0.25*this.santeMax
        let deroulementCombat = document.createElement("div");
        deroulementCombat.innerHTML = `${this.pseudo} se soigner et récupère 50 points de vie`
        deroulementCombat.style.color = "green";
        combat.append(deroulementCombat);
    }
}

class Guerrier extends Personnage {
    constructor(pseudo, classe) {
        super(pseudo, classe, 350, 350, 40);
}
}

class Mage extends Personnage {
    constructor(pseudo, classe) {
        super(pseudo, classe, 200, 200, 70);
    }

}

class Monstre extends Personnage {
    constructor (pseudo, sante, santeMax, attaque ) {
    super(pseudo, "Monstre", sante, santeMax, attaque)
       
}
}

function creerPersonnage(classe) {
    switch (classe) {
    case "Guerrier" :
        return new Guerrier(pseudo, classe);
    
    case "Mage" :
        return new Mage(pseudo, classe);
    }
}

function choisirMonstre() {
    let monstres = [
        new Monstre("Slime", 100, 100, 10),
        new Monstre("Loup Garou", 150, 150, 30),
        new Monstre("Dragon", 200, 200, 70),
    ]

    let containerChoixMonstre = document.querySelector("#containerChoixMonstre");
 
    monstres.forEach((monstre) => {
       let choixMonstre = document.createElement("button");
       choixMonstre.textContent = monstre.pseudo;
       choixMonstre.style.padding = "10px";
       choixMonstre.style.margin = "5px";
       containerChoixMonstre.append(choixMonstre);
    
        choixMonstre.addEventListener ("click", () => {
            containerChoixMonstre.textContent = "Vous rencontrez un " + monstre.pseudo + " qui possède " + monstre.sante + " points de vie et " + monstre.attaque + " d'attaque.";
            choixMonstre.style.display = "none";

            monstreChoisi = monstre
            combattre()
        }
        )
     } 
    )
         }

function etat(personnage, monstre) {
    let etat = document.createElement("div");
    etat.innerHTML = `${personnage.pseudo}: ${personnage.sante} points de vie, ${personnage.magie} points de magie. / ${monstre.pseudo}: ${monstre.sante} points de vie, ${monstre.magie} points de magie`
    etat.style.color = "blue"
    combat.append(etat);
}

function genererNombreAleatoire() {
    nombreAleatoire = Math.floor((Math.random() * 100)+ 1);
}

function combattre() {
    let containerChoixAction = document.querySelector("#containerChoixAction");

    containerChoixAction.textContent = "Que voulez-vous faire?";

    let actions = ["Attaquer", "Lancer une attaque spéciale", "Attendre", "Se soigner"];
    
    actions.forEach ((action) => {
        let choixAction = document.createElement("button");
        choixAction.textContent = action;
        containerChoixAction.append(choixAction);
  
    choixAction.addEventListener("click", () => {
    switch(action) {
        case "Attaquer" :
            personnagePrincipal.attaquer(monstreChoisi);
            break
        case "Lancer une attaque spéciale" :
            personnagePrincipal.attaqueSpeciale(monstreChoisi);
            break
        case "Attendre" : 
            personnagePrincipal.attendre();
            break
        case "Se soigner":
            personnagePrincipal.seSoigner();
            break
            }
    etat(personnagePrincipal, monstreChoisi);

    if (monstreChoisi.sante <= 0) {

        finDuCombat(`${monstreChoisi.pseudo} est vaincu! Félicitations, vous avez gagné!`);
        return
    }

       genererNombreAleatoire();
    if(monstreChoisi.magie < 5) {
        if (nombreAleatoire < 33 && monstreChoisi.sante != monstreChoisi.santeMax) {
                monstreChoisi.seSoigner();
            }
         else if ((nombreAleatoire < 33 && monstreChoisi.sante == monstreChoisi.santeMax) || nombreAleatoire >= 66) {
                monstreChoisi.attaquer(personnagePrincipal);
            }
        else {
                monstreChoisi.attendre();
            }

        }
    else monstreChoisi.attaqueSpeciale(personnagePrincipal)
    
    etat(monstreChoisi, personnagePrincipal);
    if (personnagePrincipal.sante <= 0) {
        finDuCombat(`${personnagePrincipal.pseudo} est vaincu! Dommage, vous avez perdu!`)

    }
     })  
    
    })
}

function finDuCombat(message) {
    let body = document.querySelector("body");

    let containerCombat = document.querySelector("#containerChoixAction");
    if (containerCombat) containerCombat.innerHTML = "";

    let messageDeFin = document.createElement("div");
    messageDeFin.textContent = message;
    messageDeFin.style.color = message.includes("gagné") ? "green" : "red";
    messageDeFin.style.fontSize = "24px";
    messageDeFin.style.fontWeight = "bold";
    messageDeFin.style.margin = "20px 0";

    body.appendChild(messageDeFin);


    let recommencer = document.createElement("button");
    recommencer.textContent = "Recommencer un combat";
    recommencer.style.padding = "10px 20px";
    recommencer.style.marginTop = "20px";
    recommencer.style.fontSize = "16px";

    recommencer.addEventListener("click", () => {
        location.reload(); // Recharge la page
    });

    body.appendChild(recommencer);

    
}


let pseudoInput = document.querySelector("#pseudoInput");
let choisirPseudo = document.querySelector("#choisirPseudo");

choisirPseudo.addEventListener("submit", (e) => {
    e.preventDefault()
        pseudo = pseudoInput.value.trim();
        if (!pseudo) {
         let pseudoError = document.querySelector("#pseudoError");
         pseudoError.style.display = "block";
         return
        }

        else
        choisirPseudo.style.display = "none";
        let containerChoixGuerrier = document.querySelector("#containerChoixGuerrier");
        let choixGuerrier = document.createElement("button");
        choixGuerrier.innerHTML = "Guerrier";
        choixGuerrier.style.padding = "10px";
        choixGuerrier.style.margin = "10px";
        containerChoixGuerrier.append(choixGuerrier);
        let containerChoixMage = document.querySelector("#containerChoixMage");
        let choixMage = document.createElement("button");
        choixMage.innerHTML = "Mage";
        choixMage.style.padding = "10px";
        choixMage.style.margin = "10px";
       containerChoixMage.append(choixMage);     

       choixGuerrier.addEventListener("click", () => {
            classe = "Guerrier"
            personnagePrincipal = creerPersonnage(classe);
            choixGuerrier.style.display = "none";
            choixMage.style.display = "none";
            choisirMonstre()
            }
        
    )
        choixMage.addEventListener("click", () => {
            classe = "Mage"
            personnagePrincipal = creerPersonnage(classe);
            choixGuerrier.style.display = "none";
            choixMage.style.display = "none";
            choisirMonstre()
            }
        )
        }
    )





