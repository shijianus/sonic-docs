---
title: Leitfaden für Mobilgeräte
description: Leitfaden zur mobilen Nutzung von Sonic – Smartphone-Layout, Tabnavigation, Player-Drawer und mobile Besonderheiten.
---

**Überarbeitet am: 2. November 2026｜Version: 1.8**

Diese Seite erklärt Layout und Nutzung von Sonic im mobilen Browser. Mobile und Desktop verwenden dieselbe Instanz und dasselbe Kontosystem und bieten denselben Funktionsumfang. Das Layout wechselt abhängig von der Bildschirmbreite automatisch; eine App muss nicht installiert werden. Die beschriebenen Funktionen beruhen auf dem öffentlichen RC-Zweig `rc/sonic-20261031@a75f5cb` (2026-11-01 UTC) von `shijianus/sonic`, geprüft am 2026-11-02. Der alte `main@ce443c8` (2026-10-27 UTC) unterscheidet sich davon; keiner der beiden Codestände belegt die tatsächlich produktiv eingesetzte Version.

## 1. Layout und Navigation

Auf Mobilgeräten ersetzt eine Tabnavigation am unteren Rand die Seitenleiste des Desktops: Startseite, Suche, Zuletzt wiedergegeben und Einstellungen. Die aktuelle Wiedergabe bleibt in einer Mini-Wiedergabeleiste am unteren Rand sichtbar; ein Klick öffnet den mobilen Player-Drawer (`PlayerDrawerMobile`).

## 2. Player-Drawer

Der mobile Player-Drawer bietet denselben Funktionsumfang wie die Desktopversion: wortweise Lyrics mit Originaltext, Übersetzung und Umschrift, ein Qualitätsmenü, Wiedergabemodus und Download. Der Hintergrund übernimmt einen Farbverlauf aus der Hauptfarbe des Covers; die Wiedergabeposition und der Lyrics-Sprung lassen sich durch Ziehen bedienen.

## 3. Startseite und Radar

Die mobile Startseite entspricht der Desktopversion: Karussell-Empfehlungen, intelligente Empfehlungen und das Musikradar (nach einer Suche mit Treffern aus Ihren Präferenzen) sowie empfohlene Playlists. Empfehlungsgründe und Tags der Präferenzsignale bleiben auch mobil transparent und werden untereinander angeordnet.

## 4. Speicher- und Synchronisationsgrenzen

Der lokale Speicher des mobilen Browsers ist vom Desktopbrowser getrennt. Für lokale Audioinhalte wurde kein Uploadpfad gefunden; eingebettete Cover können jedoch mit Favoritenereignissen in den entfernten gemeinsamen Titelkatalog gelangen und in websiteweiter Suche oder öffentlichen Vorschlägen erscheinen. Metadaten, Feedback und Empfehlungskontext können ebenfalls übermittelt werden. Radar versucht teilweise entfernte Synchronisierung; bei ausgeschalteter Personalisierung kann die Präferenz-Nutzlast weiterhin gesendet werden, obwohl der Server ihre Speicherung anhand des Abschaltkennzeichens ablehnen kann. Die entfernte Engine-Route ist in der geprüften RC nicht bestätigt; dies ist keine allgemeine oder dauerhafte Cloud-Sicherung. Auch der Anmeldestatus wird je Browsersitzung unabhängig gehalten. Normale Browsersynchronisierung überträgt localStorage und IndexedDB nicht notwendigerweise.

## 5. Hinweise zur Nutzung

1. Wenn Sie die Website zum Startbildschirm hinzufügen, erhalten Sie ein Startverhalten, das einer App nahekommt;
2. Die Hintergrundwiedergabe hängt von den Medienregeln des mobilen Browsers ab: Beim Wechsel in eine andere App kann das System die Wiedergabe pausieren; nach der Rückkehr lässt sie sich fortsetzen;
3. Energiesparmodus und Datensparmodus können Hintergrundaudio einschränken. Das ist ein Verhalten des Browsers und keine Einschränkung dieses Dienstes;
4. Im privaten Modus können Favoriten und Downloads nach Ende der privaten Sitzung verloren gehen; das hängt vom Browser ab. Inkognito verhindert keine Anfragen oder Ereignisübermittlung. Personalisierung und Auto DJ sind derzeit standardmäßig aktiv, ohne dass dies eine Einwilligung belegt; Abschalten beendet nicht alle Datenpfade.
