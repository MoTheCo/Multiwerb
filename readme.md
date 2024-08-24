# Multiwerb: Aus Eins Mach Viele

## Übersicht

**Multiwerb** ist ein Webanwendungstool zur Generierung mehrerer Bewerbungen basierend auf einer hochgeladenen Word-Dokumentvorlage. Benutzer können Informationen für verschiedene Unternehmen eingeben, die dann in personalisierte Dokumente eingefügt werden.

## Funktionen

- **Datei-Upload**: Laden Sie eine Word-Dokumentvorlage hoch.
- **Mehrere Firmen**: Fügen Sie beliebig viele Firmeninformationen hinzu.
- **Navigation**: Blättern Sie durch die eingegebenen Firmendaten.
- **Dokumentgenerierung**: Erstellen Sie für jede Firma ein angepasstes Word-Dokument.

## Installation

1. **Voraussetzungen**: Stellen Sie sicher, dass Node.js und npm installiert sind.
2. **Abhängigkeiten**: Installieren Sie die benötigten Pakete:
   ```bash
   npm install pizzip docxtemplater file-saver he
   ```

## Nutzung

1. Öffnen Sie die `index.html` Datei in einem Browser.
2. Laden Sie Ihre Word-Dokumentvorlage hoch.
3. Geben Sie die Informationen für die erste Firma ein.
4. Klicken Sie auf „Neue Firma hinzufügen“, um weitere Firmen hinzuzufügen.
5. Navigieren Sie mit den „Zurück“ und „Vor“-Buttons durch die Firmenformulare.
6. Klicken Sie auf „Bewerbung/en Generieren“, um die Dokumente zu erstellen und herunterzuladen.

## Ordnerstruktur

- **index.html**: Haupt-HTML-Datei.
- **styles.css**: CSS-Datei für benutzerdefinierte Stile.
- **renderer.js**: Haupt-JavaScript-Datei, welche die Logik zur Formularverwaltung und Dokumentgenerierung enthält.

## Technologie-Stack

- **HTML/CSS**: Struktur und Styling der Webanwendung.
- **JavaScript**: Handhabung der Dateiverarbeitung und Dokumentgenerierung.
- **Bootstrap**: Für responsives Design.
- **PizZip, Docxtemplater, file-saver**: Für das Einfügen von Daten in Word-Dokumente und das Speichern der Ergebnisse.

## Lizenz

Dieses Projekt steht unter der GNU General Public License v3.0 Lizenz. Weitere Informationen finden Sie in der `LICENSE`-Datei.

## Kontakt

Für Fragen oder Anregungen wenden Sie sich bitte an Mich 

