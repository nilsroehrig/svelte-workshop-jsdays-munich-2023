# Kapitel 4

## Initiale Liste abholen

1. Entferne Erzeugung des Estimation-Stores aus `main.js`
2. Erstelle neue Funktion `getEstimations() => fetch(/api/estimations)`
   - Wenn `response.ok === false` logge error und returne Estimation-Store mit `[]` als Startwert
   - Sonst, sonst versuche Response in JSON zu parsen
     - Falls erfolgreich, returne Estimation-Store mit `json` als Startwert
     - Sonst, logge error und returne mit `[]` als Startwert
3. Erstelle `{#await getPromises()}`-Block mit `<article aria-busy="true" />` als Content
   - Erstelle `{:then estimations}`-Block mit `<svelte:component ... {estimations}>` als Content

## Schätzung erstellen

1. Ergänze `submitEstimation` in `CreateEstimation.svelte`
   - Poste Schätzung via fetch
   - Body ist estimation
   - Content-Type ist `application/json`
   - Rudimentäres Fehlerhandling mit lokaler Variable `error`
2. Verknüpfe `error` mit `EstimationForm` via `bind:error`
3. Erweitere `EstimationForm` um Prop `error = null`
   - Gebe `error` aus, falls vorhanden
   - Setze `error = null`, wenn neu Abgeschickt wird

## Schätzung löschen

1. Ergänze `deleteEstimation` in `ListEstimations`
   - `fetch` mit `DELETE`-Methode gegen JSON-Server
   - `alert` falls Response nicht ok
   - `estimations.delete` andernfalls
2. Nutze `estimation.id` als Key für `{#each}`-Block
3. Wende `transition:scale|local` auf Karten an

## Icons für die Buttons in der Schätzungsliste

1. Erzeuge neue Komponente `lib/components/Button.svelte`
2. Deklariere Prop `variant = default`
3. Setze variablen `outline` und `unstyled` reaktiv abhängig von `variant`
4. Binde Klassen `.outline` und `.unstyled` abhängig von der jeweiligen Variable
5. Füge `.unstyled`-Klasse im `<style>`-Block hinzu
6. Leite `on:click`-Event des Buttons weiter
7. Streue `$$restProps` um HTML-Attribute weiterzuleiten
8. Füge `<slot>` für Button-Inhalt hinzu
9. In `ListEstimations.svelte`, erstelle `<Button variant=unstyled>` für Löschen und Bearbeiten im `<header>`
10. Verknüpfe Event-Listener wie im Footer
11. Footer auskommentieren (wird später noch gebraucht)
12. Erstelle neue Komponente `lib/components/icons/Trash.svelte`
    - Kopiere Trash-Icon von HeroIcons
    - Props: `title`, `width`, `height`
13. Erstelle neue Komponente `lib/components/icons/Pencil.svelte`
    - Kopiere Pencil-Icon von HeroIcons
    - Props: `title`, `width`, `height`
14. Nutze Icons anstelle von Text für `Buttons` in `ListEstimations`

## Stories zur Schätzung hinzufügen

1. Erstelle neue Datei `src/lib/pages/AddStories.svelte`
2. Überschrift `Stories Hinzufügen`
3. Ergänze Routenliste in `router.js` um `"add_stories" => AddStories"`
4. In `CreateEstimation`, leite nach Erzeugung auf `add_stories` weiter
5. In `AddStories` füge Prop `estimation` hinzu
6. Erzeuge Card mit `estimation.name` als Titel
   - Footer mit Buttons für Abbrechen (`goto(start_page)`) & Weiter
7. Erzeuge Accordion mit zwei Einträgen
   - `Beschreibung lesen` => `estimation.description`
   - `Neue Story erstellen` (`open = true`) => Formular zur Story-Eingabe
     - Text-Eingabe mit
       - `placeholder="Story-Text..."`
       - `maxlenght=60`
       - `name=story`
       - `required`
     - Button "Hinzufügen"
     - Einzeilig
8. Füge Fokus-Action hinzu `node => node.focus()`
9. Erstelle Variable `inputRef`
10. Verbinde `<input>` mit Action und Ref
11. Erstelle Variable `stories = []`
12. Sende POST an `/api/stories` Beim Form-Submit
    - Lese Daten mit FormData statt Data-Binding
    - Erstelle Story-Objekt `{id: randomUUID, text: inputValue, estimationId: estimation.id}`
    - `alert` bei response not ok, sonst concat stories & story
    - `form.reset()` nicht vergessen
13. Gebe Stories in einem `{#each}`-Block unterhalb des Accordions aus (story.id als Key)
14. Erstelle Funktion`deleteStory(id)` mit fetch analog zu oben
15. Verknüpfe Stories `on:click=deleteStory`
16. Wende `transition:scale|local` auf Stories an

## Stories schätzen

1. Erstelle neue Datei `src/lib/pages/EstimateStories.svelte`
2. Überschrift `Stories Schätzen`
3. Ergänze Routenliste in `router.js` um `estimate_stories => EstimateStories`
4. In `AddStories`, leite nach Erstellung auf `EstimateStories` weiter
5. In `EstimateStories`, füge neue Props hinzu
   - `router = getContext(router)`
   - `estimation`
   - `stories`
6. Setze neue Variable `stacks = [undefined, "XS", ..., "XXL"]`
7. Erstelle Card mit `estimation.name` als Titel
8. Erstelle Button `Schätzung abschließen` als Footer mit `goto(start_page)`
9. Erstelle neues `div.stacks`-Element als Body
10. Iteriere darin über Stacks
11. Pro Stack
    - Lege lokale Konstante mit Stack-Filter auf `story.size === stack` an
    - Lege Card mit `stack ?? Ungeschätzt` als Titel an
    - Füge `div.stories` als body hinzu
12. Innerhalb `div.stories`, iteriere über gefilterte Stories (mit `story.id` als Key)
13. Pro Story,
    - Lege `article` mit `story.text` als Content an
    - Füge `draggable`-Attribut hinzu
    - Füge `on:dragstart=event=>event.dataTransfer.setData(ct, story.id)` hinzu
14. Auf Stack-Article, füge Listener hinzu
    - `on:dragenter/dragover => stack ? e.preventDefault() : undefined`
    - `on:drop` => {dataTransfer} => doDrop(stack, dataTransfer)
15. Erzeuge `doDrop(size, dataTransfer)`-Funktion
    - `id = dataTransfer.getData(ct)`
    - `story = stories.find(id)`
    - `fetch` mit `PUT` gegen JSON Server
    - `body => {...story, size}`
    - alert wenn response nicht ok
    - sonst `stories = stories.map(oldID == newID ? {...old, size} : old)

## Schätzungen anzeigen

1. Füge neues Icon `lib/components/icons/List.svelte` mit HeroIcons-List-Icon hinzu (analog zu vorher)
2. Füge neuen Button zum Header in `ListEstimations` mit neuem Icon und `goto(show_stories)` hinzu
3. Lege neue Datei `lib/pages/ShowStories.svelte` an
4. Füge `show_stories => ShowStories` der Routenliste hinzu
5. In `ShowStories`, füge Prop `estimation` hinzu
6. Erstelle Funktion `getStories` die Stories fetch per `estimation.id`
   - Funktion liefert fullfilled Promise mit Daten bei Erfolg
   - Funktion liefert rejected Promise mit Fehler bei Misserfolg
7. Füge Card mit `estimation.name` als Titel und `estimation.description` im Body hinzu
8. Füge Table mit Spalten für Story-Text und -Größe hinzu
   - `thead` mit passenden `th`
   - `tbody`
9.  Füge `{#await getStories}{:then stories}{:catch error}{/await}` in `tbody` hinzu
   - Während Loading: `th>td[colspan=2][aria-busy=true]`
   - Bei Fehler: `th>td[colspan=2]>{error}`
   - Bei Erfolg: `{#each stories}tr>td+td{/each}
     - Falls leer: `th>td[colspan=2]>{Keine Stories}`