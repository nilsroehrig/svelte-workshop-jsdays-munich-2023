# Kapitel 1

## Layout

1. Füge `<header>` hinzu
   - `nav>ul>li>strong>{Svestimator}`
   - `ul>li(>button.outline>{Startseite})+li(>button.outline>{Neu})`
2. Ersetze `<h1>` durch `p>{Liste von Schätzungen}`
3. Ersetze `margin:auto` durch `margin: 3rem auto`

## Seitenwechsel

1. Füge Variable `currentView = "start_page"`
2. Füge Verzweigung auf `currentView` hinzu
   - `currentView === "create_estimation"` => `p>{Schätzung erstellen}`
   - `:else` => Aktueller Inhalt
3. Verknüpfe Nav-Items mit Klick-Handlern
   - **Startseite**: `on:click => currentView = "start_page"`
   - **Neu**: `on:click => currentView = "create_estimation"`

## Schätzung erstellen

1. Füge Formular zum Erstellen einer Schätzung hinzu
   - Fieldset mit 
     1. Required Text-Input **Bezeichnung**
     2. Required Text-Area **Beschreibung**
   - Fieldset `class=buttons` mit
     1. Reset-Button **Zurücksetzen**
     2. Submit-Button **Speichern**
2. Füge CSS-Regel `.buttons` hinzu
   - Zwei Spalten
   - 1rem Abstand
3. Füge Variable `estimation = { name: "", description: "" }` hinzu
4. Binde Eingabefelder an `estimation`
   - **Bezeichnung** => `name`
   - **Beschreibung** => `description`
5. Erstelle Funktion `resetEstimation => estimation = { name: "", description: "" }`
6. Verknüpfe **Reset**-Button mit `resetEstimation`
7. Erstelle Variable `estimations = []`
8. Erstelle Funktion `submitEstimation`
   - `estimations = estimations.concat(estimation)`
   - `resetEstimation()`
   - `currentView = "start_page"`
9.  Verknüpfe Formular-Submit mit `submitEstimation`
10. Erstelle Funktion `gotoStartPage` und ersetze Direkt-Zuweisungen

## Schätzungen auflisten

1. Ersetze Aktuellen Inhalt des `start_page`-Zweigs mit `{#each}`-Block
2. Iteriere über `estimations` mit Laufvariable `est` im `start_page`-Zweig
3. Falls die Liste leer ist, zeige `p>{Bislang wurde nichts geschätzt.}`
4. Erstelle passende Elemente je Iteration:
   - `article>header(>strong>{est.name})+p>{est.description}`
5. Erweitere `main`-Regele im Style-Block um `width: 100%`