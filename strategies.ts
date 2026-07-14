import { CombatStrategy } from "./interfaces.ts";

export class HakiPunchAttack implements CombatStrategy {
    public executeAttack(): void {
        console.log("-> [ATAQUE] ¡Puñetazo imbuido en Haki de Armamento endurecido!");
    }
}

export class DevilFruitAttack implements CombatStrategy {
    public executeAttack(): void {
        console.log("-> [ATAQUE] ¡Gomu Gomu no Jet Pistol! Golpe de goma ultra veloz.");
    }
}

export class SwordStyleAttack implements CombatStrategy {
    public executeAttack(): void {
        console.log("-> [ATAQUE] ¡Santoryu: Renga Hiri! Tres espadas cortando en combos.");
    }
}
