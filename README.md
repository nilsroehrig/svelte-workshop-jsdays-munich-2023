# Web-Apps mit Svelte
## Ein praktischer Einstieg

In diesem Repository befindet sich der Code zur Begleitung des Workshops. Die Beispiele sind kapitelweise organisiert und bauen aufeinander auf. Jedes Kapitel ist mit einem eigenen Tag versehen, sodass jederzeit an den Start eines Kapitels zurückgesprungen werden kann.

### Voraussetzungen

Folgende Tools werden vorausgesetzt, um mit diesem Repository arbeiten zu können:
* Node.js 18
* npm 9

### Inbetriebnahme
Um mit dem Repository arbeiten zu können, müssen zunächst die Projektabhängigkeiten installiert werden:
```bash
npm ci
```

Im Anschluss daran kann man die Entwicklunsumgebung nutzen. Dafür wird ein Entwicklungsserver gestartet, der die Dateien laufend übewacht und Änderungen unmittelbar anwendet und im Browser sichtbar macht:
```bash
npm run dev
```

Die Applikation kann auch für das Deployment auf Produktion gebaut werden. Dadurch wird ein `dist`-Verzeichnis im Projektwurzelverzeichnis angelegt, das die gebauten Dateien fertig vorbereitet enthält:

```bash
npm run build
```

Nachdem die Applikation gebaut wurde, kann man eine Vorschau des gebauten Standes im Browser betrachten:
```bash
npm run previeww
```

### Linting und Formatierung

Für das Projekt sind der Linter ESLint, sowie der Formatierer Prettier konfiguriert. Um die Dateien im Repository durch diese Tools verarbeiten zu lassen, kann man folgende Skripte verwenden:
```bash
npm run lint # ESLint
npm run format # Prettier
```

Empfehlenswert ist es jedoch, diese Tools in der eigenen Integrierten Entwicklungsumgebung (z.B. VSCode) einzurichten.