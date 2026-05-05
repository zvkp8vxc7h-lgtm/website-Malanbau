# Web3Forms Key — Erforderliche Aktion des Kunden

## Was ist das?

Die Kontaktformulare auf alanbau.de sind strukturell vollständig und geprüft. Sie versenden
E-Mails, sobald der Web3Forms-Zugriffsschlüssel eingetragen ist. Dies ist eine einmalige
Einrichtungsaufgabe.

## Schritte für den Kunden

1. Gehen Sie zu https://web3forms.com
2. Registrieren Sie sich oder melden Sie sich an mit der E-Mail-Adresse, die Formularanfragen
   empfangen soll (empfohlen: info@alanprojekt.de)
3. Erstellen Sie einen neuen Zugriffsschlüssel (Access Key) für die Domain alanbau.de
4. Kopieren Sie den Zugriffsschlüssel (Format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
5. Senden Sie den Schlüssel an Ihren Entwickler

## Was der Entwickler tut (ein Commit)

Ersetzen Sie `DEIN_WEB3FORMS_KEY_HIER` in diesen drei Dateien:
- index.html (nach DEIN_WEB3FORMS_KEY_HIER suchen, ca. Zeile 574)
- karriere.html (ca. Zeile 306)
- ueber-uns.html (ca. Zeile 444)

Nach dem Ersetzen prüfen:
```bash
grep -r "DEIN_WEB3FORMS_KEY_HIER" . --include="*.html"
# Muss 0 Ergebnisse liefern
```

Dann eine Formularabsendung vollständig testen:
1. index.html im Browser öffnen
2. Vorname, E-Mail, Nachricht mit Testdaten ausfüllen
3. Absenden klicken
4. Prüfen, ob die grüne Erfolgsmeldung erscheint
5. Im Web3Forms-Posteingang die Testnachricht prüfen

## Hinweis zur Sichtbarkeit des Schlüssels

Der Web3Forms-Schlüssel ist im HTML-Quellcode eingebettet und daher öffentlich einsehbar.
Dies ist so vorgesehen — Web3Forms-Schlüssel sind für diesen Anwendungsfall konzipiert
und beinhalten serverseitiges Rate-Limiting und Bot-Schutz. Das Honeypot-Feld (botcheck)
bietet zusätzlichen Spam-Schutz. Es gibt kein Sicherheitsproblem durch die Sichtbarkeit
des Schlüssels.

## Formulare im Überblick

| Seite | Formular-Zweck | Erfolgs-E-Mail-Betreff |
|-------|---------------|------------------------|
| index.html | Projektanfrage (Startseite) | Neue Projektanfrage — ALANBAU |
| karriere.html | Bewerbungsformular | Neue Bewerbung — ALANBAU |
| ueber-uns.html | Projektanfrage (Über uns-Seite) | Neue Projektanfrage — ALANBAU |
