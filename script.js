let personnagePrincipal;
let pseudo;
let classe;
let monstreChoisi;
let actionChoisie;
let nombreAleatoire
let containerButtons = document.querySelector("#containerButtons");
let containerStats = document.querySelector("#containerStats");
let choixGuerrier = document.createElement("button");
let containerGuerrier = document.createElement("div");
let combat = document.querySelector("#combat");
let deroulementCombat;


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

    }

    attaqueSpeciale(personnage) {
        let attaqueSpecialeError = document.querySelector("#attaqueSpecialeError");
        if (this.magie >= 5) {
            personnage.sante -= this.attaque * 5;
            this.magie = 0
            attaqueSpecialeError.innerHTML = "";
        }
        else
        attaqueSpecialeError.innerHTML = "Vous avez besoin de 5 points de magie pour lancer une attaque spéciale";
        attaqueSpecialeError.style.color = "red";
        return
    }        

    attendre() {
        this.magie = this.magie + 3;
    }


    seSoigner() {
        this.sante += 0.25*this.santeMax
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
        new Monstre("Loup-Garou", 150, 150, 30),
        new Monstre("Dragon", 200, 200, 70),
    ]

    monstres.forEach((monstre) => {
        let containerMonstre = document.createElement("div");
        containerMonstre.id = monstre.pseudo;
        containerButtons.append(containerMonstre);
       let choixMonstre = document.createElement("button");
       choixMonstre.innerHTML = `${monstre.pseudo}<br><br> PV: ${monstre.sante}<br> Attaque: ${monstre.attaque}`;
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
                })
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
    etat.style.background = "lightblue";
    combat.prepend(etat);
}

function genererNombreAleatoire() {
    nombreAleatoire = Math.floor((Math.random() * 100)+ 1);
}

function combattre() {
    containerChoix.textContent = "Que voulez-vous faire?"
    let actions = ["Attaquer", "Lancer une attaque spéciale", "Attendre", "Se soigner"];
    
    actions.forEach ((action) => {
        let choixAction = document.createElement("button");
        choixAction.textContent = action;
        choixAction.classList.add("button");
        containerButtons.append(choixAction);
  
    choixAction.addEventListener("click", () => {
    switch(action) {
        case "Attaquer" :
            personnagePrincipal.attaquer(monstreChoisi);
            deroulementCombat = document.createElement("div");
            deroulementCombat.style.background = "lightgreen";
            deroulementCombat.innerHTML = `${personnagePrincipal.pseudo} attaque ${monstreChoisi.pseudo} et lui inflige ${personnagePrincipal.attaque} dégats.`;
            combat.prepend(deroulementCombat);
            break
        case "Lancer une attaque spéciale" :
            personnagePrincipal.attaqueSpeciale(monstreChoisi);
            deroulementCombat = document.createElement("div");
            deroulementCombat.style.background = "lightgreen";
            deroulementCombat.innerHTML = `${personnagePrincipal.pseudo} lance une attaque puissante sur ${monstreChoisi.pseudo} et lui inflige ${personnagePrincipal.attaque * 5} dégats.`;
            combat.prepend(deroulementCombat);
            break
        case "Attendre" : 
            personnagePrincipal.attendre();
            deroulementCombat = document.createElement("div");
            deroulementCombat.style.background = "lightgreen";
            deroulementCombat.innerHTML = `${personnagePrincipal.pseudo} attend et se prépare pour le prochain tour. Il gagne 3 points de magie.`;
            combat.prepend(deroulementCombat);
            break
        case "Se soigner":
            personnagePrincipal.seSoigner();
            deroulementCombat = document.createElement("div");
            deroulementCombat.style.background = "lightgreen";
            deroulementCombat.innerHTML = `${this.pseudo} se soigne et récupère ${0.25*this.santeMax} points de vie`;
            combat.prepend(deroulementCombat);
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
                deroulementCombat = document.createElement("div");
                deroulementCombat.style.background = "lightcoral";
                deroulementCombat.innerHTML = `${monstreChoisi.pseudo} se soigne et récupère ${0.25*monstreChoisi.santeMax} points de vie`;
                combat.prepend(deroulementCombat);;

            }
         else if ((nombreAleatoire < 33 && monstreChoisi.sante == monstreChoisi.santeMax) || nombreAleatoire >= 66) {
                monstreChoisi.attaquer(personnagePrincipal);
                deroulementCombat = document.createElement("div");
                deroulementCombat.style.background = "lightcoral";
                deroulementCombat.innerHTML = `${monstreChoisi.pseudo} attaque ${personnagePrincipal.pseudo} et lui inflige ${monstreChoisi.attaque} dégats.`;
                combat.prepend(deroulementCombat);
            }
        else {
                monstreChoisi.attendre();
                deroulementCombat = document.createElement("div");
                deroulementCombat.style.background = "lightcoral";
                deroulementCombat.innerHTML = `${monstreChoisi.pseudo} attend et se prépare pour le prochain tour. Il gagne 3 points de magie.`;
                combat.prepend(deroulementCombat);
            }

        }
    else {
        monstreChoisi.attaqueSpeciale(personnagePrincipal);             
        deroulementCombat = document.createElement("div");
        deroulementCombat.style.background = "lightcoral";
        deroulementCombat.innerHTML = `${monstreChoisi.pseudo} lance une attaque puissante sur ${personnagePrincipal.pseudo} et lui inflige ${monstreChoisi.attaque * 5} dégats.`;
        combat.prepend(deroulementCombat);
    }
    
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
    recommencer.classList.add("button")
    recommencer.style.fontSize = "16px";

    recommencer.addEventListener("click", () => {
        location.reload(); // Recharge la page
    });

    body.appendChild(recommencer);

    
}


let pseudoInput = document.querySelector("#pseudoInput");
let choisirPseudo = document.querySelector("#choisirPseudo");
let containerChoix = document.querySelector("#containerChoix");

choisirPseudo.addEventListener("submit", (e) => {
    e.preventDefault()
        pseudo = pseudoInput.value.trim();
        if (!pseudo) {
         let pseudoError = document.querySelector("#pseudoError");
         pseudoError.style.display = "block";
         return
        }

        else
        containerChoix.style.display = "block";
        containerChoix.textContent = "Choisis ta classe:"
        choisirPseudo.style.display = "none";
        choixGuerrier.innerHTML = "Guerrier <br><br> PV: 350<br>Attaque: 40";
        choixGuerrier.classList.add("button");
        containerGuerrier.append(choixGuerrier);
        containerGuerrier.classList.add("containerGuerrier");
        containerButtons.append(containerGuerrier);

        let choixMage = document.createElement("button");
        let containerMage = document.createElement("div");
        choixMage.innerHTML = "Mage <br><br> PV: 200 <br> Attaque: 270";
        choixMage.classList.add("button");
        containerMage.append(choixMage);
        containerMage.classList.add("containerMage");
        containerButtons.append(containerMage);

       choixGuerrier.addEventListener("click", () => {
            classe = "Guerrier"
            personnagePrincipal = creerPersonnage(classe);
            choixGuerrier.style.display = "none";
            choixMage.style.display = "none";
            containerGuerrier.style.display = "none";
            containerMage.style.display = "none";
            containerChoix.textContent= "Quel monstre veux-tu affronter?"
            choisirMonstre()
            }
        
    )
        choixMage.addEventListener("click", () => {
            classe = "Mage"
            personnagePrincipal = creerPersonnage(classe);
            choixGuerrier.style.display = "none";
            choixMage.style.display = "none";
            containerGuerrier.style.display = "none";
            containerMage.style.display = "none";
            containerChoix.textContent= "Quel monstre veux-tu affronter?"
            choisirMonstre()
            }
        )
        }
    )





