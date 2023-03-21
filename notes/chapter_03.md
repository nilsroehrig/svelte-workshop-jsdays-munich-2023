# Kapitel 3

## Router

1. Erstelle neue Datei `lib/stores/router`
2. Erzeuge Map mit View-Name => Component
3. Erzeuge Funktion `getComponent(route) => routes.get(route) ?? start_page`
4. Erzeuge Factory-Funktion für Router-Store
5. Initialisiere inneres Writable
6. Nutze `getComponent` für Startwert-Ergänzung um `component`
7. Erzeuge Custom Store-Objekt als Rückgabewert:
   - `subscribe` aus Writable
   - `goto(route, params) => set({route, params, component})`
8. Füge einen neu erstellten Router zur initialen Kontext-Map hinzu
9. Deklariere Prop `router = getContext("router")` in `App.svelte`
10. Ersetze `{#if}`-Block durch `<svelte:component this={$router.component} {...allPropsOfAllComponents} {...allEventHandlersOfAllComponents}>`
11. Ersetze Nutzung von `currentView = ...` durch `router.goto(...)`

## Custom Store für Schätzungen

1. Erstelle neue Datei `lib/stores/estimations`
2. Erzeuge Factory-Funktion für Estimation-Stores
3. Initialisiere inneres Writable
4. Erzeuge Custom Store-Objekt als Rückgabe-Wert
   - `subscribe` aus Writable
   - `add`
     - Guard gegen doppelte IDs
   - `update`
   - `delete`
5. Füge einen neu erstellten Estimation-Store zur initialen Kontext-Map hinzu
6. Abonniere den Estimation-Store in `ListEstimations` als Prop `estimations = getContext("estimations")`
   - Iteriere über Store-Value
   - Verwende Store-Methoden anstelle von Events wo sinnvoll
   - Entferne `{estimations}`-Prop von `<svelte:component>`
7. Setze Router als Prop `router = getContext("router")`
   - Ersetze `estimation:edit` mit `estimation.id` durch `router.goto("edit_estimation", { estimation })`
8. Abonniere den Estimation-Store `CreateEstimation` als Prop `estimations = getContext("estimations")`
   - Verwende Store-Methoden anstelle von Event
9. Setze Router als Prop `router = getContext("router")`
   - Navigiere nach der Erstellung via Router zur Startseite
10. Abonniere den Store auf in `EditEstimation` als Prop `estimations = getContext("estimations")`
    - Verwende Store-Methoden anstelle von Events
    - Entferne `{estimation}`-Prop von `<svelte:component>`
11. Setze Router als Prop `router = getContext("router")`
    - Navigiere nach demn Update via Router zur Startseite
12. Entfernte alle Event-Listener von `<svelte:component>` in `App.svelte`
    - Entferne nun ungenutzten Code
