# HyperPong
## Projektname
Hyperpong
## Autoren
Florian Neuß, Jan-Philipp Sautmann
## Erstelldatum
Projektzeitraum: 08.10.2021-29.11.2021
## Versionsnummer
1.0 Es ist die erste Version, in der alle Grundfeatures inplementiert sind.
## Referenzen an 3rd Party Komponenten
Soundeffekte von "Brand Name Audio" auf Youtube. Online unter https://www.youtube.com/channel/UCA8luKdJ7MAFj4-LB3gFjXQ - "Copyright Free"

Einzelne verwendete Videos:

"8-Bit Retro Video Game Sound Effects 1" Online unter https://www.youtube.com/watch?v=nzjtkaLCn60&list=PLBtCJCy4TzZTkjWuiIm7RidconrtD_ylj

"8-Bit Retro Video Game Sound Effects 2" Online unter https://www.youtube.com/watch?v=8jxQAyt8ll4&list=PLBtCJCy4TzZTkjWuiIm7RidconrtD_ylj&index=2

"8-Bit Retro Video Game Sound Effects 5" Online unter https://www.youtube.com/watch?v=7UZQ7NvLNgA&list=PLBtCJCy4TzZTkjWuiIm7RidconrtD_ylj&index=3

CodeSchnipsel / Denkanstöße zur Weiterverarbeitung:

"GameLoop" https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe Copyright https://spicyyoghurt.com/terms

"Anti-Scroll-Logic" https://stackoverflow.com/a/8916697 https://creativecommons.org/licenses/by-sa/4.0/ (komplett übernommen)

"Konstruktor-Schreibweise" https://stackoverflow.com/a/41486946 https://creativecommons.org/licenses/by-sa/3.0/

## Known Bugs
Bei der Auwahl der Rackets steuert der Spieler mit den Pfeiltasten den linken Curser und der mit "W" und "S" den Rechten. Das ist nicht direkt ein Bug, aber unschön.

Im Spiel fliegt der Ball manchmal von der Seite durch die Rackets. Das liegt daran, dass der "HIT" an der nach innen gerichteten Seite des Rackets geschieht. Von der oberen und der unteren Seite kann der Ball durch den Racket fliegen. Das ist gewollt, so aber nicht schön.

In den Einstellungen entspricht die Farbe des Kreuzes die des Rechten Spielers, nachdem der startbidschirm einmal aufgerufen wurde

Die "W" und "S" Taste löst im Menü einen Ton aus und hat in den Einstellungen auch Funktion. Die Bewegungen werden nicht vom Curser wieder gegeben. Eigentlich soll das Menü nur mit den Pfeiltasten steuerbar sein.
## Browserkompabilität
Offiziell unterstützt werden Chrome, Firefox, Edge und Safari in den folgenden Versionen oder neuer.
Gestestet wurde 

Chrome in der Version 96.0.4664.45

Firefox in der Version 94.0.2

Edge in der Version 96.0.1054.34

Safari in der Version

Der Internet Explorer funktioniert nicht.
Ältere Versionen der kompatiblen Browser können auch funtkionieren, das wurde aber nicht getestet und ist damit nicht offiziell. 

## Eigene Lizenzdatei:
https://creativecommons.org/licenses/by-sa/3.0/legalcode
Grund: Wir haben Code von Stack Overflow verwendet. Dieser benutzt diese Lizenz. Teil der Lizenz ist, dass man den Code nur benutzen darf, wenn man die selber Lizenz verwendet.

## Aufteilung der Aufgaben:
Sautmann: 

Idee für Spiel, der Modifikatoren und Fähigkeiten
Programmierung der Modifikatoren, Fähigkeiten, des "Hit" des Balls mit dem Racket und einzelne Teile des Menüs

Neuß: 

Programmierung des "Grundgerüsts", der Spielphysik und des Menüs

Gemeinsam:

Design des Grafikstils, Testen, gegenseitige Hilfe bei Problemen
