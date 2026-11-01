---
title: Nutzungsbedingungen
description: Nutzungsbedingungen von Sonic – Annahme der Bedingungen, detaillierter Dienstumfang, Kontoregeln, Freigabe von Verhaltensdaten, Qualitäts- und Hörproben-Kennzeichnung, Haftungsbeschränkung, anwendbares Recht und Streitbeilegung.
---

**Datum des Inkrafttretens: 1. November 2026｜Version: 1.3**

Diese Bedingungen regeln das Verhältnis zwischen Ihnen und dem Betreiber der von Ihnen genutzten Instanz hinsichtlich der Nutzung des Sonic-Dienstes (nachfolgend „der Dienst“). Mit dem Abschluss der Anmeldung oder der Nutzung des Dienstes auf andere Weise erklären Sie, diese Bedingungen vollständig gelesen zu haben und ihnen zuzustimmen; wer nicht zustimmt, nutze den Dienst nicht.

Diese Bedingungen sind Standardbedingungen, vollständig öffentlich für Ihre Durchsicht veröffentlicht; frühere Fassungen werden mit dem Open-Source-Repository archiviert. Ihre elektronische Zustimmung hat dieselbe Wirkung wie ein schriftliches Dokument mit Unterschrift. Rechte, die nach anwendbarem Recht durch Standardbedingungen nicht ausgeschlossen oder beschränkt werden dürfen, bleiben von diesen Bedingungen unberührt. Die rechtsverbindliche Fassung der rechtlichen Dokumente dieser Website ist die vereinfacht chinesische Version; die englische, japanische und deutsche Fassung sind Referenzübersetzungen. Im Zweifel über die Auslegung gilt die rechtsverbindliche Fassung.

![Vertragslebenszyklus der Sonic-Nutzungsbedingungen: elektronische Zustimmung (Anmeldung gleich Zustimmung) → Erfüllung (Kontosicherheit, Ihre Inhalte, Haftungsbeschränkung) → Änderung (Ankündigung wesentlicher Änderungen vor Inkrafttreten) → Beendigung (Nutzungsende, Ein-Klick-Löschung des Profils), auf anwendbarem Recht und Datenschutz-Untergrenze ruhend](/images/sonic/tos-contract.svg)

*Abbildung: Der Lebenszyklus des Vertrags vom Zustandekommen bis zur Beendigung. Die elektronische Zustimmung hat dieselbe Wirkung wie die Schriftform; der Dienstumfang steht in Abschnitt 2, Konten in Abschnitt 3, Ihre Inhalte und Verhaltensdaten in Abschnitt 5, die Haftungsbeschränkung in Abschnitt 10, Änderungen in Abschnitt 12, anwendbares Recht und Streitbeilegung in Abschnitt 11.*

## 1. Begriffsbestimmungen

1. Der Dienst: sämtliche Funktionen, die auf einer Sonic-Instanz laufen, einschließlich Webplayer, Edge-Gateway, lokaler Protokoll-Engine, offener API und zugehöriger Komponenten; zu Oberflächenlayout und Funktionspositionen siehe die [Oberflächen- und Funktionsübersicht](/de/interface/).
2. Betreiber: die Person oder das Team, das die von Ihnen genutzte Instanz bereitstellt und betreibt. Bei den gehosteten Instanzen (`sonic.epocanvas.tech`, `sonic.epocanvas.com`) ist dies das Betreiberteam; bei selbst gehosteten Instanzen deren Bereitsteller.
3. Sie (Nutzer): natürliche Personen oder Organisationen, die sich anmelden oder den Dienst auf andere Weise nutzen.
4. Zustandekommen des Vertrags: Mit der Anmeldung bei einer Instanz kommt der Vertrag mit dem Betreiber dieser Instanz zustande. Diese Bedingungen sind eine allgemeine Vorlage: Für die gehostete Instanz gelten sie unmittelbar; selbst gehostende Betreiber können sie nach Anpassung als Bedingungen ihrer Website verwenden und müssen ihren Nutzern die Informationen nach dem an ihrem Ort anwendbaren Recht zukommen lassen.
5. Datenebene: der Linux-Knoten, der für Ihre Instanz Protokollparsen und Empfehlungsberechnung erbringt; sein Ausfall berührt nicht den Degradierungsdienst nach Abschnitt 4, Nummer 2.

## 2. Beschreibung und Umfang des Dienstes

Der Dienst ist ein Werkzeug zum Suchen, Aggregieren und Abspielen; er speichert und hostet keinerlei Musikdateien. Audioinhalte werden von den offiziellen CDNs und den offenen Schnittstellen der Upstream-Anbieter bezogen, Lyrics aus nativer Parsung und öffentlichen Lyrics-Datenbanken. Umfang und Datenort der einzelnen Funktionen:

| Funktionskategorie | Enthaltene Funktionen | Speicherort der Daten | Anmeldung erforderlich |
| --- | --- | --- | --- |
| Kernfunktionen (anonym nutzbar) | Multi-Source-Aggregationssuche, wortweise Lyrics, Wiedergabe in Qualitätsstufen, Hörproben-Kennzeichnung, Charts, MVs | Browser lokal (Wiedergabezustand) | Nein |
| Kontofunktionen | Cloud-Synchronisation von Favoriten und Playlists, personalisierte Empfehlungen und Auto DJ, Verwaltung von Verhaltensereignissen | Server nur pseudonymisierte Verhaltensereignisse; Favoritenpräferenzen im Browser | Ja |
| Funktionen für persönliche Daten | Downloadliste, Import und Verwaltung lokaler Musik | Browser IndexedDB | Nein |
| Offene API | Zugriff von Drittanbieter-Clients über signierte API-Schlüssel | Server: Sitzungen und Sperrlisten | Ja |

Der Dienst baut auf dem Open-Source-Projekt auf und führt es fort: Der Quellcode ist öffentlich und audierbar, und Sie können durch eigene Bereitstellung dieselben Fähigkeiten erlangen. Die Software selbst wird „wie besehen“ bereitgestellt; ihre Lizenzbedingungen stimmen mit den Haftungsregelungen dieser Bedingungen überein (siehe Abschnitt 10).

## 3. Erwerb und Sicherheit des Kontos

1. Anmeldeverfahren: Der Dienst meldet mit dem Epomail-Konto über OAuth 2.0 (PKCE) an und hat kein eigenes Registrierungssystem; für die Kontovereinbarung zwischen Ihnen und Epomail gelten die Bedingungen dieses Dienstes. Wird das Epomail-Konto gesperrt oder gelöscht, endet auch Ihre Anmeldung am Dienst.
2. Berechtigung: Sie müssen mindestens 16 Jahre alt sein; sieht das Recht an Ihrem Wohnort für Dienstleistungen der Informationsgesellschaft ein niedrigeres Einwilligungsalter vor (mindestens 13 Jahre), gilt diese Regelung, wobei für Kinder weiterhin die Zustimmung der Sorgeberechtigten erforderlich ist. Maßgeblich für das Alter sind die Angaben des Epomail-Kontos, mit dem Sie sich anmelden; der Dienst hat keine eigene Altersverifikation.
3. Ein Konto pro Person: Sie dürfen Ihr Konto nicht verleihen, vermieten, verkaufen oder mit anderen gemeinsam nutzen; für Streitigkeiten und Datenvermischung aus gemeinsam genutzten Konten übernimmt der Betreiber keine Zuordnung oder Wiederherstellung.
4. Obhut über Zugangsdaten: Sie tragen die Obhutspflicht für Ihre Epomail-Zugangsdaten, API-Schlüssel und die Sitzungssicherheit. Handlungen über Ihre Zugangsdaten gelten als von Ihnen vorgenommen. Das Sitzungs-Cookie enthält den signierten Schlüssel; melden Sie sich auf gemeinsam genutzten Geräten nicht an, ohne sich abzumelden; wenn Zugangsdaten abhandenkommen, melden Sie sich sofort ab und beantragen die Sperrung.
5. Sitzungsmechanismus: Nach erfolgreicher Anmeldung wird ein Sitzungs-Cookie mit `HttpOnly; Secure; SameSite=Lax` ausgestellt (gültig für höchstens 30 Tage); API-Schlüssel werden nicht in URLs, Abfrageparameter oder localStorage geschrieben. Sie können sich jederzeit abmelden; die Abmeldung sperrt sofort die aktuelle Sitzung und die zugehörige Schlüsselkennung (jti).
6. Schlüsselausstellung: API-Schlüssel verwenden das versionierte HMAC-SHA256-Signaturformat; Ausstellungsdauer 30 Tage, Validierungsgrenze 90 Tage; Schlüssel ohne Signatur oder gesperrte Schlüssel werden ausnahmslos abgelehnt. Für eine Neuausstellung müssen Sie Ihren aktuellen gültigen Schlüssel vorlegen. Der API-Schlüssel ist ein Berechtigungsnachweis für Ihre persönliche Nutzung und darf nicht an Dritte weitergegeben oder in öffentlich veröffentlichte Clients eingebettet werden.
7. Anmeldungsschutz: Der OAuth-Rückruf wird vierfach geprüft (state, PKCE, Autorisierungscode, Wiederholung); für den Authentifizierungsendpunkt gilt eine Begrenzung von 30 pro Minute und IP.

## 4. Bereitstellung und Änderung des Dienstes

1. Verfügbarkeit: Der Betreiber bemüht sich redlich um die Verfügbarkeit, sagt aber weder eine bestimmte Verfügbarkeitsquote, Pufferzeiten noch Wiederherstellungsfristen zu und stellt keine Service-Level-Agreement (SLA) bereit.
2. Degradierungsmechanismus: Schlägt der Datenebenenknoten 3 Mal hintereinander fehl oder überschreitet ein einzelner Aufruf das Budget von 4,5 Sekunden, öffnet die Edge-Schicht den Circuit Breaker und wechselt automatisch in den Degradierungsmodus (direkte Verbindung zu den öffentlichen Lyrics- und Suchschnittstellen); nach 30 Sekunden Abklingzeit wird per Probing wiederhergestellt. Während der Degradierung zeigt die Oberfläche den Hinweis „Edge-Degradierungsmodus“ an; einzelne Funktionen (etwa vollständige Quellparsung, Empfehlungsaktualisierung) können nicht verfügbar sein. Dies ist ein Notfallverhalten der Systemkonstruktion und keine Vertragsverletzung.
3. Qualität und Hörproben-Kennzeichnung: Das Qualitätsabzeichen des Players (z. B. SQ Lossless, HQ High Quality) gibt die tatsächliche Stufe des aktuellen Audiostreams wahrheitsgemäß wieder; die offiziellen 30-Sekunden-Hörproben sind ausdrücklich als solche gekennzeichnet und werden nicht als vollständige Titel ausgegeben. Ändern sich die vorgelagerten Quellstufen, ändert sich die tatsächlich verfügbare Qualität entsprechend; dies stellt keine Vertragsverletzung dar.
4. Funktionsänderungen: Das Open-Source-Projekt entwickelt sich fort; Funktionen können hinzukommen, angepasst oder entfernt werden; wesentliche Änderungen, die die Löschbarkeit von Daten betreffen, werden vorab angekündigt.
5. Wartung und Unterbrechungen: Der Betreiber kann Teile oder die Gesamtheit des Dienstes für Upgrades, Reparaturen oder Missbrauchsmaßnahmen aussetzen; Nichtverfügbarkeit infolge von Störungen bei Cloudflare, den vorgelagerten Musikschnittstellen oder CDNs ist keine Vertragsverletzung des Betreibers.
6. Experimentelle Funktionen: Als experimentell gekennzeichnete oder in der Testphase befindliche Funktionen werden wie besehen bereitgestellt, können instabil sein und jederzeit angepasst oder abgeschaltet werden.

## 5. Ihre Inhalte und Verhaltensdaten

1. Favoriten und Präferenzen: Ihre angelegten Favoriten, Playlists und Player-Einstellungen liegen im lokalen Speicher Ihres Browsers; das Löschen der Browserdaten oder die Funktion „Alle lokalen Daten löschen“ entfernt sie. Der Betreiber haftet nicht für deren Verlust; wichtige Playlists sollten Sie selbst notieren.
2. Lokale Musik und Downloads: Ihre importierten lokalen Musikdateien und heruntergeladenen Titel liegen in IndexedDB Ihres Browsers; diese Inhalte gehören Ihnen, und der Server des Betreibers speichert keine Kopien. Heruntergeladene und lokal importierte Dateien dienen ausschließlich Ihrem persönlichen Hören; Sie dürfen sie nicht weiterverbreiten, öffentlich zugänglich machen oder kommerziell nutzen.
3. Freigabe von Verhaltensereignissen: Um die Empfehlungsfunktion bereitzustellen, zeichnet der Dienst Verhaltensereignisse auf, wenn Sie Titel abspielen, vollständig abspielen, überspringen, favorisieren oder ablehnen (Signalkategorien und Gewichte sind im Quellcode offengelegt). Bei ausgeschalteter Personalisierung oder im rein lokalen bzw. privaten Modus entstehen keine neuen Ereignisaufzeichnungen; während der Freigabe gilt sie nur im für die Empfehlungsfunktion notwendigen Umfang, und mit der Ein-Klick-Löschung des Profils, die alle Aufzeichnungen vernichtet, endet sie.
4. Inhaltshaftung: Sie sind verantwortlich für Inhalte, die Sie selbst übermitteln (etwa eigene Playlistenamen oder API-Aufrufverhalten); Streitigkeiten und rechtliche Folgen aus solchen Inhalten tragen Sie.
5. Musikinhalte: Die Rechte an Aufnahmen, Lyrics, Covern und anderen Inhalten liegen bei den jeweiligen Rechteinhabern. Der Dienst gewährt keinerlei Weiterlizenzierung von Musikinhalten; die Verantwortung dafür, dass Sie an Ihrem Ort rechtmäßig hören, tragen Sie selbst.

## 6. Dienste Dritter

1. Vorgelagerte Musikquellen: Suchergebnisse, Abspieladressen und Lyrics werden von den offiziellen offenen Schnittstellen von NetEase, QQ, Kugou, Kuwo usw. sowie den öffentlichen Lyrics-Datenbanken AMLL und LRCLIB bezogen; Schnittstellen von Dritten können sich ändern, gedrosselt werden oder ihren Dienst einstellen; der Betreiber garantiert die Upstream-Verfügbarkeit nicht.
2. Edge-Proxy: Audiostreams werden standardmäßig über den Edge-Proxy bezogen; das vorgelagerte CDN erhält Ihre IP-Adresse nicht. Nutzen Sie selbst den Direktverbindungsmodus `?mode=redirect`, baut Ihr Browser die Verbindung direkt zum offiziellen CDN auf, und Ihre IP ist für dieses CDN sichtbar.
3. Identitätsprüfung: Epomail ist der Identitätsanbieter des Dienstes; seine Datenverarbeitung ist im [Verzeichnis der Weitergabe an Dritte und der internationalen Übermittlungen](/de/sub-processors/) beschrieben.
4. Bedingungen Dritter: Bei der Nutzung der vorgenannten Dienste unterliegen Sie zugleich deren Geschäftsbedingungen.

## 7. Akzeptable Nutzung

Bei der Nutzung des Dienstes beachten Sie sämtliche Bestimmungen der [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/), einschließlich des Verbots, Schnittstellenressourcen zu missbrauchen, Systeme anzugreifen, rechtswidrige Inhalte zu verbreiten oder die Nutzung durch andere zu stören. Bei Verstößen kann der Betreiber nach dem dort vorgesehenen Verfahren verfahren, bis hin zum Ende der Nutzungsberechtigung, und Beweise nach den gesetzlichen Vorgaben aufbewahren, um Untersuchungen befugter Stellen zu unterstützen.

## 8. Aufbewahrung von Daten, Entfernung und Beendigung der Nutzung

1. Beendigung durch Sie: Sie können die Nutzung des Dienstes jederzeit einstellen; Verhaltensaufzeichnungen löschen Sie mit der Ein-Klick-Löschung des Profils, Sitzungen durch Abmeldung. Die Löschung des Epomail-Kontos selbst richtet sich nach den Regeln von Epomail.
2. Verhaltensaufzeichnungen: Verhaltensereignisse liegen im SQLite-Speicher der Datenebene und werden 90 Tage nach Aufzeichnung automatisch vernichtet (durch den Bereitsteller konfigurierbar, Untergrenze 7 Tage); auf Ihren Löschungs- oder Leerungswunsch hin sofort. Es gibt kein automatisches Langzeit-Kommerzprofil.
3. Beendigung durch den Betreiber: Verstoßen Sie gegen die [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/), kann der Betreiber Ihre Nutzungsberechtigung nach dieser Richtlinie aussetzen oder beenden.
4. Gesetzliche Aufbewahrung: Soweit Gesetze oder Gerichtsverfahren dies erfordern, kann der Betreiber die Löschung im notwendigen Umfang aufschieben und nach dem förmlichen Verfahren verfahren.

## 9. Benachrichtigung über Maßnahmen und Rechtsbehelf

Bevor der Betreiber Ihre Nutzungsberechtigung nach dem Kapitel „Akzeptable Nutzung“ oder dem vorigen Abschnitt aussetzt oder beendet, benachrichtigt er Sie, außer bei dringenden Lagen (etwa einem laufenden Angriff), und gibt Ihnen Gelegenheit zur Stellungnahme oder Nachbesserung. Halten Sie die Maßnahme für fehlerhaft, können Sie nach dem Beschwerdeverfahren der [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/) Beschwerde einlegen; der Betreiber prüft innerhalb einer angemessenen Frist nach und antwortet.

Benachrichtigungen nach diesen Bedingungen erfolgen elektronisch; das Epomail-Konto, mit dem Sie sich anmelden, ist die Zustelladresse für elektronische Mitteilungen, und Sie müssen sicherstellen, dass dieses Konto ordnungsgemäß empfängt.

## 10. Haftungsausschluss und Haftungsbeschränkung

1. Bereitstellung wie besehen: Der Dienst (einschließlich seiner Software) wird „wie besehen“ und „wie verfügbar“ bereitgestellt, ohne jede ausdrückliche oder stillschweigende Garantie, einschließlich der Garantien der Marktgängigkeit, der Eignung für einen bestimmten Zweck und der Nichtverletzung; dies deckt sich mit dem Haftungsumfang der für die Software geltenden MIT-Lizenz.
2. Wirkungsgrenze: Regelungen der vorstehenden Art sowie sonstige Klauseln, die die Haftung des Betreibers mindern oder aufheben, Ihre Pflichten erhöhen oder Ihre Rechte beschränken, sind insoweit unwirksam, als sie nach den Umständen evident unbillig sind oder anwendbares Recht sie nicht zulässt.
3. Haftungsbeschränkung: Im größtmöglichen gesetzlichen Umfang ist die Gesamthaftung des Betreibers Ihnen gegenüber auf den höheren Betrag aus den Entgelten begrenzt, die Sie in den vergangenen 12 Monaten tatsächlich an den Betreiber gezahlt haben (bei kostenlosen Diensten in der Regel null), und 100 USD. Der Betreiber haftet nicht für mittelbare Schäden, Datenverlust, entgangenen Gewinn oder Rufschäden.
4. Gesetzliche Haftung bleibt unberührt: Haftung, die nach anwendbarem Recht nicht durch Vereinbarung ausgeschlossen oder beschränkt werden darf (einschließlich der Haftung des Betreibers für Verletzungen seiner Datenschutzpflichten), wird durch die vorstehende Haftungsobergrenze weder ausgeschlossen noch beschränkt.
5. Höhere Gewalt: Für Dienstunterbrechungen und Datenverluste infolge Naturkatastrophen, staatlicher Maßnahmen, Ausfällen des Backbone-Netzwerks, groß angelegter Netzwerkangriffe oder Stilllegungen vorgelagerter Schnittstellen oder CDNs haftet der Betreiber nicht, soweit er redliche Bemühungen angestellt hat.

## 11. Anwendbares Recht, Streitbeilegung und Datenschutzaufsicht

1. Für Auslegung, Wirksamkeit und Erfüllung dieser Bedingungen gilt das Recht am Ort des Betreibers: bei der gehosteten Instanz das Recht Taiwans; bei selbst gehosteten Instanzen das Recht am Ort des Bereitstellers.
2. Streitigkeiten aus diesen Bedingungen sind zunächst einvernehmlich beizulegen; gelingt dies nicht, ist für Streitigkeiten aus der gehosteten Instanz das Bezirksgericht Taipeh in Taiwan im ersten Rechtszug zuständig. Sind Sie Verbraucher und sieht das Recht an Ihrem Wohnort eine abweichende zwingende Zuständigkeit oder Verbraucherschutzvorschriften vor, gilt diese Regelung.
3. Beim Datenschutz gilt keine Minderung nach den beiden vorstehenden Nummern: Der Dienst legt die DSGVO als Mindeststandard des Datenschutzes für alle Nutzer zugrunde (siehe den [Überblick](/de/overview/), Abschnitt 4); Nutzer in der Europäischen Union und im Europäischen Wirtschaftsraum genießen hinsichtlich ihrer personenbezogenen Daten sämtliche in der [Datenschutzerklärung](/de/privacy-policy/) aufgeführten Rechte und Rechtsbehelfe.

## 12. Änderung der Bedingungen

Diese Bedingungen können mit der Weiterentwicklung des Dienstes überarbeitet werden. Wesentliche Änderungen werden vorab durch eine Ankündigung auf der Website mitgeteilt; das Inkrafttretensdatum und die Versionsnummer am Anfang dieser Seite werden aktualisiert. Wer nach Inkrafttreten einer Änderung den Dienst weiter nutzt, gilt als mit den überarbeiteten Bedingungen einverstanden; wer nicht einverstanden ist, soll die Nutzung einstellen und seine Daten löschen oder exportieren. Frühere Fassungen wesentlicher Überarbeitungen werden mit den Versionsaufzeichnungen des Open-Source-Repositorys archiviert; überarbeitete Bedingungen werden vor ihrem Inkrafttreten in der beschriebenen Weise öffentlich zur Durchsicht bereitgestellt.

## 13. Kontaktwege

- Gehostete Instanz: `admin@epocanvas.com`; für Datenschutz und Datenschutzangelegenheiten `privacy@epocanvas.com`
- Open-Source-Projekt: Issues im GitHub-Repository (`github.com/shijianus/sonic`)
- Selbst gehostete Websites: wenden Sie sich an den dort veröffentlichten Betreiber

---

*Diese Bedingungen bilden zusammen mit der [Datenschutzerklärung](/de/privacy-policy/) und der [Richtlinie zur akzeptablen Nutzung](/de/acceptable-use/) die vollständige Vereinbarung zwischen Ihnen und dem Betreiber; die Geltungsreihenfolge der Dokumente steht im [Überblick](/de/overview/). Dieses Dokument ist eine allgemeine Vorlage der Open-Source-Community und stellt keine Rechtsberatung dar; Betreiber sollten vor dem regulären Betrieb anwaltlich beraten lassen und die Vorlage an ihre tatsächliche Tätigkeit anpassen.*
