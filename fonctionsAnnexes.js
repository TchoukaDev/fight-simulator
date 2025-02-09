import { Guerrier, Mage, Archer } from "./classes.js";
import { pseudo } from "./script.js";

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