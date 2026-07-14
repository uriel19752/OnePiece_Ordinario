import { Observer } from "./interfaces.ts";

export class NewsCooJournal {
    private subscribers: Observer[] = [];
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public subscribe(observer: Observer): void {
        this.subscribers.push(observer);
        console.log(`[News Coo]: Un pirata se ha suscrito a las alertas de ${this.name}.`);
    }

    public unsubscribe(observer: Observer): void {
        const index = this.subscribers.indexOf(observer);
        if (index !== -1) {
            this.subscribers.splice(index, 1);
            console.log(`[News Coo]: Un pirata se ha dado de baja de las alertas de ${this.name}.`);
        }
    }

    public uploadNews(newsTitle: string): void {
        console.log(`\n=== DIARIO ${this.name} PUBLICÓ: "${newsTitle}" ===`);
        this.subscribers.forEach(subscriber => subscriber.notify(newsTitle));
    }
}
