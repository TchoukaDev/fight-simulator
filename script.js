let personnagePrincipal;
let pseudo;
let classe;
let monstreChoisi;
let actionChoisie;

let deroulementCombat = document.querySelector("#deroulementCombat");

class Personnage {
    constructor(pseudo, classe, sante, attaque) {
    this.pseudo = pseudo;
    this.classe = classe;
    this.sante = sante;
    this.attaque = attaque;
    this.magie = 0;
}


    attaquer(personnage) {
        personnage.sante -= this.attaque;
        this.magie ++;
        personnage.verifierSante();
        deroulementCombat.innerHTML = `${this.pseudo} attaque ${personnage.pseudo} et lui inflige ${this.attaque} dégats.`;
        deroulementCombat.style.color = "green";
    }

    attaqueSpeciale(personnage) {
        let attaqueSpecialeError = document.querySelector("#attaqueSpecialeError");
        if (this.magie >= 5) {
            personnage.sante -= this.attaque * 5;
            this.magie = 0
            attaqueSpecialeError.innerHTML = "";
            personnage.verifierSante();
            deroulementCombat.innerHTML = `${this.pseudo} attaque ${personnage.pseudo} et lui inflige ${this.attaque * 5} dégats.`;
            deroulementCombat.style.color = "green";
        }
        else
        attaqueSpecialeError.innerHTML = "Vous avez besoin de 5 points de magie pour lancer une attaque spéciale";
        attaqueSpecialeError.style.color = "red";
        return
    }        

    attendre() {
        this.magie = this.magie + 3;
        deroulementCombat.innerHTML = `${this.pseudo} attendre et se prépare pour le prochain tour. Il gagne 3 points de magie.`;
        deroulementCombat.style.color = "green";
    }

// Ajouter fonction défendre

    seSoigner() {
        // ajouter paramètre santeMax au personnage pour soigner un % des points de vie maximum
        this.sante += 50;
        deroulementCombat.innerHTML = `${this.pseudo} se soigner et récupère 50 points de vie`
        deroulementCombat.style.color = "green";
    }
    
    
    verifierSante() {
        if (this.sante <= 0) {
            this.sante = 0;
            alert(`${this.pseudo} est vaincu!`);
        } 
    }
}
class Guerrier extends Personnage {
    constructor(pseudo, classe) {
        super(pseudo, classe, 350, 40);
}
}

class Mage extends Personnage {
    constructor(pseudo, classe) {
        super(pseudo, classe, 200, 70);
    }

}

class Monstre extends Personnage {
    constructor (pseudo, sante, attaque ) {
    super(pseudo, "Monstre", sante, attaque)
       
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
        new Monstre("Slime", 100, 10),
        new Monstre("Loup Garou", 150, 30),
        new Monstre("Dragon", 200, 70),
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
  })
        })
    
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





