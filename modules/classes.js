import { viderAttaqueSpecialeError } from "./affichage.js";
import { attaqueSpecialeError } from "./globales.js";
import { genererNombreAleatoire } from "./fonctionsAnnexes.js";

export class Personnage {
    constructor(pseudo, classe, sante, santeMax, attaque, esquive) {
    this.pseudo = pseudo;
    this.classe = classe;
    this.santeMax = santeMax;
    this.sante = sante;
    this.attaque = attaque;
    this.magie = 0;
    this.esquive = esquive
}


    attaquer(personnage) {
        personnage.sante -= this.attaque;
        this.magie ++;
        viderAttaqueSpecialeError();
    }

    attaqueSpeciale(personnage) {
        if (this.magie >= 5) {
            personnage.sante -= this.attaque * 4;
            this.magie -=5
            viderAttaqueSpecialeError();
        return true
        }
        else
            attaqueSpecialeError.innerHTML = "Vous avez besoin de 5 points de magie pour lancer une attaque spéciale";
            attaqueSpecialeError.style.color = "red";
        return false
    }        

    attendre() {
        this.magie = this.magie + 3;
        viderAttaqueSpecialeError();
    }


    seSoigner() {
        this.sante += 0.25*this.santeMax
        if (this.sante >= this.santeMax) {
            this.sante = this.santeMax
        }
        viderAttaqueSpecialeError()
    }
}

export class Guerrier extends Personnage {
    constructor(pseudo, classe) {
        super(pseudo, classe, 600, 600, 40, 0);
}
}

export class Mage extends Personnage {
    constructor(pseudo, classe) {
        super(pseudo, classe, 400, 400, 70, 0);
    }

}

export class Archer extends Personnage {
    constructor(pseudo, classe) {
        super(pseudo, classe, 350, 450, 50, 20)
        this.critique = 25;

    }

    attaquer(personnage) {
    let nombreAleatoire = genererNombreAleatoire();
    viderAttaqueSpecialeError();

    if (nombreAleatoire <= this.critique) {
        this.coupCritique(personnage)
        
    }
    else {
        super.attaquer(personnage)
    }
}
    coupCritique(personnage) {
        personnage.sante -= this.attaque * 2
        this.magie++     
    }
    } 
  

export class Monstre extends Personnage {
    constructor (pseudo, sante, santeMax, attaque, difficulte ) {
    super(pseudo, "Monstre", sante, santeMax, attaque)
    this.difficulte = difficulte
       
}
}