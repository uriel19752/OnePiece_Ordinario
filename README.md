# Proyecto Examen Ordinario: Evolución y Consolidación de Patrones de Diseño

### **Datos del Alumno**
* **Nombre:** Uriel Axel Calyeca Pérez
* **Materia:** Patrones Orientados a Objetos
* **Proyecto:** One Piece Universe (Evolución Final)

---

## Descripción del Proyecto
Este proyecto representa la entrega final para el examen ordinario. Extiende y evoluciona la solución desarrollada en los parciales anteriores basada en el universo de *One Piece*, utilizando **TypeScript** y el motor de ejecución **Deno**. 

El sistema mantiene una continuidad directa con el dominio anterior (gestión de la tripulación y navegación), pero migra su enfoque hacia el comportamiento dinámico. Ahora los personajes cuentan con la capacidad de modificar sus estilos de combate en tiempo real y reaccionar de forma automatizada ante eventos del entorno mediante una interfaz interactiva por consola (CLI).

---

## Nuevos Patrones Implementados (Examen Ordinario)

Para cumplir estrictamente con los requisitos de la rúbrica de no repetir arquitecturas previas, se incorporaron **dos nuevos patrones de diseño de comportamiento**:

### 1. Strategy (NUEVO)
* **Ubicación:** `strategies.ts` e interfaz en `interfaces.ts`.
* **Propósito:** Definir una familia de algoritmos, encapsular cada uno y hacerlos intercambiables para permitir que el algoritmo varíe independientemente de los clientes que lo utilizan.
* **Aplicación:** Resuelve los modos de combate individuales. Al aislar las técnicas (Haki básico, fruta del diablo o estilo de tres espadas) en clases independientes, la entidad `Pirate` altera dinámicamente su algoritmo de ataque (`performAttack`) en pleno tiempo de ejecución invocando al método `setCombatStrategy()`.

### 2. Observer (NUEVO)
* **Ubicación:** `newsCoo.ts` e interfaz de escucha en `interfaces.ts`.
* **Propósito:** Definir una dependencia uno-a-muchos entre objetos para que cuando un objeto cambie de estado, todos sus dependientes sean notificados y actualizados automáticamente.
* **Aplicación:** Modela la red de mensajería internacional del periódico del mar vía aves mensajeras (*News Coo*). Los personajes se añaden o eliminan voluntariamente del distribuidor central (`NewsCooJournal`). Cuando el diario emite un boletín de emergencia desde la consola, todos los piratas suscritos interceptan la señal y ejecutan respuestas autónomas sin acoplar sus dependencias nativas.

---

## Patrones Conservados (Continuidad del Proyecto)

Se retuvieron las implementaciones de los parciales anteriores para consolidar una arquitectura robusta:

* **3. Singleton (`ThousandSunny` en `factions.ts`):** Garantiza una única instancia del barco principal para centralizar de manera global el registro de tripulantes y el cálculo acumulado del valor de sus recompensas.
* **4. Builder (`PirateRecruiterBuilder` en `pirate.ts`):** Separa la construcción paso a paso de los perfiles complejos de los piratas mediante asignación paramétrica secuencial de habilidades.
* **5. Abstract Factory (`EncounterFactory` en `factions.ts`):** Genera de forma compatible la combinación exacta de buques y soldados rivales (Marina o Piratas de las Bestias) dependiendo de la zona marítima de navegación.

---

## Estructura Modular

El código fuente se encuentra distribuido de forma limpia y organizada en los siguientes archivos:
1. **`interfaces.ts`**: Contratos abstractos bases para los patrones `CombatStrategy` y `Observer`.
2. **`strategies.ts`**: Encapsulación de las estrategias de ataque concretas.
3. **`newsCoo.ts`**: Lógica del publicador informativo centralizado.
4. **`pirate.ts`**: Entidad del personaje y lógica del patrón estructural *Builder*.
5. **`factions.ts`**: Persistencia del barco central (*Singleton*) y factorías de encuentros hostiles (*Abstract Factory*).
6. **`main.ts`**: Orquestador principal que despliega el menú interactivo CLI.

---

## Instrucciones de Ejecución

Debido a que el menú del sistema requiere interactuar activamente con las entradas del teclado en tiempo real, ejecute la aplicación otorgando los permisos globales correspondientes en la consola de **Deno**:

```bash
deno run --allow-all main.ts
