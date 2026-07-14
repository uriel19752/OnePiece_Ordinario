export interface CombatStrategy {
    executeAttack(): void;
}

export interface Observer {
    notify(newsTitle: string): void;
}
