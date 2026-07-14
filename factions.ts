import { Pirate } from "./pirate.ts";

// --- SINGLETON ---
export class ThousandSunny {
    private static instance: ThousandSunny;
    private crewMembers: Pirate[] = [];
    private totalBountySum: number = 0;

    private constructor() {}

    public static getInstance(): ThousandSunny {
        if (!ThousandSunny.instance) {
            ThousandSunny.instance = new ThousandSunny();
            console.log("Barco creado");
        }
        return ThousandSunny.instance;
    }

    public addPirate(pirate: Pirate): void {
        this.crewMembers.push(pirate);
        this.totalBountySum += pirate.bounty;
        console.log(`${pirate.name} se unió a la tripulación`);
    }

    public showCrew(): void {
        console.log("\n--- TRIPULACIÓN ACTUAL ---");
        console.log(`Integrantes: ${this.crewMembers.length}`);
        console.log(`Recompensa total: ${this.totalBountySum.toLocaleString()} berries`);
        this.crewMembers.forEach((pirate) => pirate.showInfo());
    }

    public getCrew(): Pirate[] {
        return this.crewMembers;
    }
}

// --- ABSTRACT FACTORY ---
export interface EnemyShip { sail(): void; }
export interface EnemySoldier { attack(): void; }

class MarineWarship implements EnemyShip {
    sail(): void { console.log("Un Buque de la Marina emerge de la niebla con cañones listos."); }
}
class MarineSoldier implements EnemySoldier {
    attack(): void { console.log("Soldado de la Marina: ¡Fuego contra los Mugiwara en nombre de la Justicia!"); }
}
class BeastPirateShip implements EnemyShip {
    sail(): void { console.log("El barco principal de los Piratas de las Bestias embiste las olas."); }
}
class BeastPirateSoldier implements EnemySoldier {
    attack(): void { console.log("Gifter de Kaido: ¡Por el Capitán Kaido, destruyan su barco!"); }
}

export interface EncounterFactory {
    createShip(): EnemyShip;
    createSoldier(): EnemySoldier;
}

export class MarineEncounterFactory implements EncounterFactory {
    createShip(): EnemyShip { return new MarineWarship(); }
    createSoldier(): EnemySoldier { return new MarineSoldier(); }
}
export class BeastEncounterFactory implements EncounterFactory {
    createShip(): EnemyShip { return new BeastPirateShip(); }
    createSoldier(): EnemySoldier { return new BeastPirateSoldier(); }
}

export class WorldNavigation {
    private factory: EncounterFactory;
    constructor(factory: EncounterFactory) { this.factory = factory; }
    startEncounter(): void {
        const ship = this.factory.createShip();
        const enemy = this.factory.createSoldier();
        console.log("\n--- ¡ALERTA DE ENEMIGO EN EL NUEVO MUNDO! ---");
        ship.sail();
        enemy.attack();
    }
}
