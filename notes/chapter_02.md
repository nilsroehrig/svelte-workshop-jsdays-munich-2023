# Kapitel 2

1. Erstelle neues Verzeichnis `src/lib/pages`

## Schätzungserstellung extrahieren

1. Extrahiere Inhalt der Erstellungsverzweigung aus `App.svelte` 
   - *Svelte: Extract Component* nach `lib/pages/CreateEstimation.svelte`
2. Lösche ungenutzte CSS-Regeln
3. Lösche ungenutzte JS-Funktionen
4. Erzeuge Event-Dispatcher
5. Dispatche Event mit `detail.estimation = estimation` in `submitEstimation
6. Entferne ungenutzte JS-Variablen und -Funktionen
7. Erstelle Funktion `createDefaultEstimation`
8. Ersetze Inline-Definitionen durch `createDefaultEstimation`
9. In `App.svelte`, erstelle neue Funktion `addEstimation(event)`
   - Weise `estimations` eine Konkatenation von sich selber mit `event.detail.estimation` zu
   - Setze `currentView = "start_page"`
10. Verknüpfe `estimation:create`-Event mit `addEstimation`

## Schätzungsliste extrahieren

1. Extrahiere Inhalt der Default-Verzweigung aus `App.svelte`
   - *Svelte: Extract Component* nach `lib/pages/ListEstimations.svelte`
2. Lösche ungenutzte CSS-Regeln
3. Lösche ungenutzte JS-Variablen und -Funktionen
4. Deklariere `estimations` als Prop
5. Erstelle Event-Dispatcher
6. Ändere `deleteEstimation` in `deleteEstimation(id) => dispatch("estimation:delete", { id })`
7. Ändere den Namen der Lauf-Variable im `{#each}`-Block in `estimation`
8. Rufe `deleteEstimation` mit `id`-Property der Laufvariable auf
9. Ändere `editEstimation` in `editEstimation(id) => dispatch("estimation:edit", { id })`
10. Rufe `editEstimation` mit `id`-Property der Laufvariable auf
11. Entferne ungenutztes JS
12. In `App.svelte`, 
    - verändere
      - `deleteEstimation` dahingehend, dass `detail.id` verwendet wird
      - `editEstimation` dahingehend, dass `detail.id` verwendet wird
    - verknüpfe
      - `delete:estimation`-Event mit `deleteEstimation`
      - `edit:estimation`-Event mit `editEstimation`