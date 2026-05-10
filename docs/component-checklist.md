# DoMe UI Komponenten-Checkliste

Nutze diese Checkliste, bevor eine Komponente in `src/index.ts` exportiert wird.

## API

- Name, Purpose und Props sind klar.
- Props haben sinnvolle Defaults.
- Die Komponente akzeptiert `className` und reicht relevante HTML-Attribute weiter.
- Öffentliche Typen werden exportiert.

## A11y

- Tastaturbedienung funktioniert.
- Fokuszustände sind sichtbar.
- ARIA-Attribute werden nur eingesetzt, wenn semantisches HTML nicht reicht.
- Fehlerzustände sind mit `aria-invalid` und `aria-describedby` verbunden.

## Qualität

- Storybook-Story mit Hauptzuständen ist vorhanden.
- Mindestens ein Test prüft relevantes Verhalten.
- Styles verwenden Tokens aus `styles.css`, keine Magic Values im TSX.
