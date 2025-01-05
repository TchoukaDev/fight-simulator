let pseudoInput = document.querySelector("#pseudoInput");
let choisirPseudo = document.querySelector("#choisirPseudo");
let personnagePrincipal;
let pseudo;
let classe;
let monstreChoisi;

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
        }
        )
     } 
    )
         }

class Personnage {
    constructor(pseudo, classe, sante, attaque) {
    this.pseudo = pseudo;
    this.classe = classe;
    this.sante = sante;
    this.attaque = attaque
}

get informations() {
    return `${this.pseudo} ${this.classe} ${this.sante} ${this.attaque}`
}

    attaquer() {}
    defendre() {}
    seSoigner() {}
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


choisirPseudo.addEventListener("submit", (e) => {
    e.preventDefault()
        pseudo = pseudoInput.value.trim();
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
            choixGuerrier.remove()
            choixMage.remove;
            choisirMonstre()
            }
        
    )
        choixMage.addEventListener("click", () => {
            classe = "Mage"
            personnagePrincipal = creerPersonnage(classe);
            choixGuerrier.style.display = "none";
            choixMage.style.display = "none"
            choisirMonstre()
            }
        )
        }
    )





