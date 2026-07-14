import { ThousandSunny, MarineEncounterFactory, BeastEncounterFactory, WorldNavigation, EncounterFactory } from "./factions.ts";
import { PirateRecruiterBuilder } from "./pirate.ts";
import { HakiPunchAttack, DevilFruitAttack, SwordStyleAttack } from "./strategies.ts";
import { NewsCooJournal } from "./newsCoo.ts";

function main(): void {
    const sunny = ThousandSunny.getInstance();
    const builder = new PirateRecruiterBuilder();
    const newsCoo = new NewsCooJournal("Economía del Nuevo Mundo");

    // Instanciamos las estrategias disponibles globales
    const hakiBasico = new HakiPunchAttack();
    const gomuGomu = new DevilFruitAttack();
    const santoryu = new SwordStyleAttack();

    // Precargamos a Luffy por defecto para que el barco no inicie vacío
    const luffyInicial = builder
        .setName("Monkey D. Luffy")
        .setRole("Capitán")
        .setDevilFruit("Gomu Gomu no Mi")
        .setBounty(3000000000)
        .setHaki("Haki del Conquistador")
        .build();
    sunny.addPirate(luffyInicial);
    newsCoo.subscribe(luffyInicial); // Lo suscribimos al periódico

    let salir = false;

    while (!salir) {
        console.log("\n=============================================");
        console.log("       NIVEL DEL MAR: EL NUEVO MUNDO        ");
        console.log("=============================================");
        console.log("1. Ver el estado del Thousand Sunny (Singleton)");
        console.log("2. Reclutar un nuevo Pirata (Builder + Observer)");
        console.log("3. Cambiar estrategia de combate (Strategy)");
        console.log("4. Ordenar ataque de la tripulación (Strategy)");
        console.log("5. Publicar boletín de noticias global (Observer)");
        console.log("6. Navegar y buscar combate enemigo (Abstract Factory)");
        console.log("7. Salir del programa");
        console.log("=============================================");

        const opcion = prompt("Selecciona una opción (1-7):");

        switch (opcion) {
            case "1":
                sunny.showCrew();
                break;

            case "2": {
                console.log("\n--- FORMULARIO DE RECLUTAMIENTO ---");
                const name = prompt("Nombre del pirata:") ?? "Desconocido";
                const role = prompt("Rol en el barco (ej. Cocinero, Médico):") ?? "Tripulante";
                const bountyStr = prompt("Recompensa en berries (número):") ?? "0";
                const bounty = parseInt(bountyStr) || 0;
                const devilFruit = prompt("Fruta del Diablo (dejar vacío si no tiene):") || undefined;
                const haki = prompt("Tipo de Haki (dejar vacío si no tiene):") || undefined;

                builder.setName(name).setRole(role).setBounty(bounty);
                if (devilFruit) builder.setDevilFruit(devilFruit);
                if (haki) builder.setHaki(haki);

                const nuevoPirata = builder.build();
                sunny.addPirate(nuevoPirata);
                newsCoo.subscribe(nuevoPirata);
                break;
            }

            case "3": {
                const crew = sunny.getCrew();
                if (crew.length === 0) {
                    console.log("No hay tripulantes para modificar.");
                    break;
                }

                console.log("\n--- SELECCIONA UN PIRATA ---");
                crew.forEach((pirate, index) => {
                    console.log(`${index + 1}. ${pirate.name}`);
                });

                const indexStr = prompt("Número del pirata:") ?? "";
                const index = parseInt(indexStr) - 1;

                if (index >= 0 && index < crew.length) {
                    console.log("\n--- ESTRATEGIAS DISPONIBLES ---");
                    console.log("1. Golpes Físicos con Haki básico");
                    console.log("2. Habilidades de Fruta del Diablo");
                    console.log("3. Estilo de Espadachín (Santoryu)");

                    const estOpcion = prompt("Selecciona el estilo de pelea:");
                    const seleccionado = crew[index];

                    if (estOpcion === "1") seleccionado.setCombatStrategy(hakiBasico);
                    else if (estOpcion === "2") seleccionado.setCombatStrategy(gomuGomu);
                    else if (estOpcion === "3") seleccionado.setCombatStrategy(santoryu);
                    else console.log("Estilo no válido.");
                } else {
                    console.log("Selección inválida.");
                }
                break;
            }

            case "4": {
                console.log("\n--- ¡ORDEN DE COMBATE EN EL BARCO! ---");
                const crew = sunny.getCrew();
                if (crew.length === 0) {
                    console.log("No hay nadie a bordo para pelear.");
                } else {
                    crew.forEach(pirate => pirate.performAttack());
                }
                break;
            }

            case "5": {
                console.log("\n--- EMISIÓN DE ALERTA MUNDIAL ---");
                const titular = prompt("Escribe el titular de la noticia:") ?? "Sin novedades en el mar.";
                newsCoo.uploadNews(titular);
                break;
            }

            case "6": {
                console.log("\n--- SELECCIÓN DE RUTA DE NAVEGACIÓN ---");
                console.log("1. Ruta controlada por el Gobierno Mundial");
                console.log("2. Territorio hostil de Yonkos");

                const ruta = prompt("Elige tu ruta (1 o 2):");
                let encounterFactory: EncounterFactory;

                if (ruta === "1") {
                    encounterFactory = new MarineEncounterFactory();
                } else {
                    encounterFactory = new BeastEncounterFactory();
                }

                const navigation = new WorldNavigation(encounterFactory);
                navigation.startEncounter();
                break;
            }

            case "7":
                console.log("\nSaliendo de la simulación del Nuevo Mundo. ¡Buena suerte, pirata!");
                salir = true;
                break;

            default:
                console.log("Opción inválida. Intenta con un número del 1 al 7.");
                break;
        }
    }
}

main();
