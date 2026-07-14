import { Observer, CombatStrategy } from "./interfaces.ts";
import { HakiPunchAttack } from "./strategies.ts";

export class Pirate implements Observer {
    public name: string = "Sin nombre";
    public role: string = "Tripulante";
    public bounty: number = 0;
    public devilFruit?: string;
    public hakiType?: string;

    private combatStrategy: CombatStrategy;

    constructor() {
        this.combatStrategy = new HakiPunchAttack();
    }

    public performAttack(): void {
        console.log(`${this.name} se prepara para entrar en acción:`);
        this.combatStrategy.executeAttack();
    }

    public setCombatStrategy(combatStrategy: CombatStrategy): void {
        this.combatStrategy = combatStrategy;
        console.log(`${this.name} ha cambiado su estrategia de combate.`);
    }

    public notify(newsTitle: string): void {
        console.log(`Notificación para ${this.name}: Nueva actualización del mar - "${newsTitle}".`);
    }

    public showInfo(): void {
        console.log(
            `${this.name} - ${this.role} - Recompensa: ${this.bounty.toLocaleString()} - Fruta: ${this.devilFruit ?? "Ninguna"} - Haki: ${this.hakiType ?? "Ninguno"}`
        );
    }
}

export interface PirateBuilder {
    reset(): PirateBuilder;
    setName(name: string): PirateBuilder;
    setRole(role: string): PirateBuilder;
    setBounty(bounty: number): PirateBuilder;
    setDevilFruit(devilFruit: string): PirateBuilder;
    setHaki(haki: string): PirateBuilder;
    build(): Pirate;
}

export class PirateRecruiterBuilder implements PirateBuilder {
    private pirate: Pirate;

    constructor() {
        this.pirate = new Pirate();
    }

    reset(): PirateRecruiterBuilder {
        this.pirate = new Pirate();
        return this;
    }

    setName(name: string): PirateRecruiterBuilder {
        this.pirate.name = name;
        return this;
    }

    setRole(role: string): PirateRecruiterBuilder {
        this.pirate.role = role;
        return this;
    }

    setBounty(bounty: number): PirateRecruiterBuilder {
        this.pirate.bounty = bounty;
        return this;
    }

    setDevilFruit(devilFruit: string): PirateRecruiterBuilder {
        this.pirate.devilFruit = devilFruit;
        return this;
    }

    setHaki(haki: string): PirateRecruiterBuilder {
        this.pirate.hakiType = haki;
        return this;
    }

    build(): Pirate {
        const nuevoPirata = this.pirate;
        this.reset();
        return nuevoPirata;
    }
}
