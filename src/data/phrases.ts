import { B1_CHAPTER_PHRASES } from "./b1_phrases";
import { B2_CHAPTER_PHRASES } from "./b2_phrases";

export interface PhraseEntry {
  german: string;
  english: string;
  pronunciation_hint?: string;
  theme?: string;
}

export const DEFAULT_PHRASES: Record<"A1" | "A2" | "B1" | "B2", PhraseEntry[]> = {
  A1: [
  {
    "german": "Guten Morgen!",
    "english": "Good morning."
  },
  {
    "german": "Guten Tag!",
    "english": "Good day. (Greeting during the day)"
  },
  {
    "german": "A: Grüß Gott! / CH: Grüezi!",
    "english": "(Austrian and Swiss alternatives with the same meaning)"
  },
  {
    "german": "Hallo!",
    "english": "Hi."
  },
  {
    "german": "A: Servus! / CH: Salü! Hoi!",
    "english": "(Austrian and Swiss alternatives with the same meaning)"
  },
  {
    "german": "Guten Abend!",
    "english": "Good evening."
  },
  {
    "german": "Gute Nacht!",
    "english": "Good night."
  },
  {
    "german": "Auf Wiedersehen!",
    "english": "Goodbye./See you later."
  },
  {
    "german": "A: Servus! / CH: Adieu!",
    "english": "(Austrian and Swiss alternatives with the same meaning)"
  },
  {
    "german": "Tschüss! / (Tschüs!)",
    "english": "Bye."
  },
  {
    "german": "Bitte.",
    "english": "You are welcome."
  },
  {
    "german": "Danke.",
    "english": "Thank you."
  },
  {
    "german": "Guten Appetit!",
    "english": "Enjoy your meal."
  },
  {
    "german": "In Österreich sagt man Hallo!",
    "english": "In Austria, people say Hallo."
  },
  {
    "german": "Wer sind Sie? / Wer bist du?",
    "english": "Who are you?"
  },
  {
    "german": "Wie heißen Sie? / Wie heißt du?",
    "english": "What's your name? lit.: What are you called?"
  },
  {
    "german": "Ich heiße (Mario Martinez).",
    "english": "My name is (Mario Martinez). lit.: I am called (Mario Martinez)."
  },
  {
    "german": "Mein Name ist (Mario Martinez).",
    "english": "My name is (Mario Martinez)."
  },
  {
    "german": "Woher kommen Sie? / Woher kommst du?",
    "english": "Where do you come from?"
  },
  {
    "german": "Ich komme aus (Spanien).",
    "english": "I come from (Spain)."
  },
  {
    "german": "Wo wohnen Sie? / Wo wohnst du?",
    "english": "Where do you live?"
  },
  {
    "german": "Ich wohne in (Madrid).",
    "english": "I live in (Madrid)."
  },
  {
    "german": "Welche Sprachen sprechen Sie? / Welche Sprachen sprichst du?",
    "english": "Which languages do you speak?"
  },
  {
    "german": "Ich spreche (Spanisch).",
    "english": "I speak (Spanisch)."
  },
  {
    "german": "Peter spricht ein bisschen (Französisch).",
    "english": "Peter speaks some (French)."
  },
  {
    "german": "Ich lerne jetzt (Deutsch).",
    "english": "I'm learning German now."
  },
  {
    "german": "Dänemark, Deutschland, Frankreich, Griechenland, Großbritannien, Italien",
    "english": "Denmark, Germany, France, Greece, Great Britain, Italy"
  },
  {
    "german": "Marokko, die Niederlande, Österreich, Polen, Portugal, Russland, Schweden, die Schweiz",
    "english": "Morocco, The Netherlands, Austria, Poland, Portugal, Russia, Sweden, Switzerland"
  },
  {
    "german": "Spanien, Tschechien, die Türkei, Ungarn",
    "english": "Spain, Czech Republic, Turkey, Hungary"
  },
  {
    "german": "Arabisch, Dänisch, Deutsch, Englisch, Französisch, Griechisch, Italienisch",
    "english": "Arabic, Danish, German, English, French, Greek, Italian"
  },
  {
    "german": "Niederländisch, Polnisch, Portugiesisch, Russisch, Schwedisch, Spanisch, Tschechisch, Türkisch, Ungarisch",
    "english": "Dutch, Polish, Portuguese, Russian, Swedish, Spanish, Czech, Turkish, Hungarian"
  },
  {
    "german": "Was machen Sie gern? / Was machst du gern?",
    "english": "What do you like doing?"
  },
  {
    "german": "Ich spiele gern (Fußball/Tennis/Musik/Computerspiele).",
    "english": "I like playing (football/tennis/music/computer games)."
  },
  {
    "german": "Hörst du gern Musik?",
    "english": "Do you like listening to music?"
  },
  {
    "german": "Er kocht gern.",
    "english": "He likes cooking."
  },
  {
    "german": "Sie macht gern Gymnastik.",
    "english": "She likes working out."
  },
  {
    "german": "Wir tanzen gern.",
    "english": "We like dancing."
  },
  {
    "german": "Ihr schwimmt gern.",
    "english": "You (informal plural, 'you guys') like swimming."
  },
  {
    "german": "Sie fotografieren gern.",
    "english": "They like taking pictures./You (formal) like taking pictures."
  },
  {
    "german": "Fotografieren Sie auch gern?",
    "english": "Do you also like taking pictures?"
  },
  {
    "german": "Ich koche gern. – Ich auch.",
    "english": "I like cooking. – Me, too."
  },
  {
    "german": "Ich lerne jetzt Griechisch. – Interessant!",
    "english": "I am learning Greek now. – Interesting."
  },
  {
    "german": "Marie spricht ein bisschen Russisch. – Toll! Super!",
    "english": "Marie speaks some Russian. – Great. Fantastic."
  },
  {
    "german": "Lars tanzt gern. – Wirklich?",
    "english": "Lars likes dancing. – Really?"
  },
  {
    "german": "Was sind Sie von Beruf?",
    "english": "What is your profession?"
  },
  {
    "german": "Was machen Sie beruflich?",
    "english": "What do you do (for a living)?"
  },
  {
    "german": "Ich bin Lehrer/Lehrerin.",
    "english": "I am a teacher/(female) teacher."
  },
  {
    "german": "Ich unterrichte Kinder.",
    "english": "I teach children."
  },
  {
    "german": "Ich arbeite als Manager.",
    "english": "I work as a manager."
  },
  {
    "german": "Ich präsentiere viele Projekte.",
    "english": "I present many projects."
  },
  {
    "german": "Ich bin beruflich oft in (Polen).",
    "english": "I am often in (Poland) for work."
  },
  {
    "german": "Die Kellnerin bedient Gäste.",
    "english": "The waitress serves customers."
  },
  {
    "german": "Der Künstler malt Bilder.",
    "english": "The artist paints pictures."
  },
  {
    "german": "Der Arzt untersucht Patienten.",
    "english": "The doctor examines patients."
  },
  {
    "german": "Die Assistentin schreibt viele E-Mails.",
    "english": "The (female) assistant writes many emails."
  },
  {
    "german": "Der Informatiker entwickelt Computerspiele.",
    "english": "The IT-specialist develops computer games."
  },
  {
    "german": "Die Ingenieurin konstruiert Solarautos.",
    "english": "The (female) engineer builds solar cars."
  },
  {
    "german": "Knut ist Student.",
    "english": "Knut is a student."
  },
  {
    "german": "Sein Studium ist auf Deutsch.",
    "english": "His courses are in German."
  },
  {
    "german": "Er liest viele Bücher auf Englisch.",
    "english": "He reads many books in English."
  },
  {
    "german": "Manager haben viele Besprechungen.",
    "english": "Managers have a lot of meetings."
  },
  {
    "german": "Die Telefonnummer von Martina ist (1234567).",
    "english": "The telephone number of Martina is (1234567)."
  },
  {
    "german": "Mein Auto hat das Kennzeichen (L–ZB 6168).",
    "english": "My car has the plate number (L–ZB 6168)."
  },
  {
    "german": "Deutschland ist 357 375 km2 groß.",
    "english": "Germany is 83 879 km2."
  },
  {
    "german": "Österreich hat 8,7 Millionen Einwohner.",
    "english": "Austria has 8,7 million inhabitants."
  },
  {
    "german": "In der Hauptstadt Wien wohnen 1,8 Millionen Menschen.",
    "english": "1,8 million people live in Vienna, the capital."
  },
  {
    "german": "375 Millionen Menschen sprechen Englisch als Muttersprache.",
    "english": "375 million people speak English as their mother tongue."
  },
  {
    "german": "Deutsch liegt auf Platz 10.",
    "english": "German has the 10th place."
  },
  {
    "german": "der Drucker, der Stuhl, der Tisch, der Kalender, der Stift, der Regenschirm",
    "english": "the printer, the chair, the table, the calendar, the pen, the umbrella"
  },
  {
    "german": "die Tasche, die Tasse, die Brille, die Uhr, die Zeitung, die Kaffeemaschine",
    "english": "the bag, the cup, the glasses, the clock/hour, the newspaper, the coffee machine"
  },
  {
    "german": "das Auto, das Handy, das Lehrbuch, das Bild, das Medikament, das Telefon",
    "english": "the car, the mobile phone, the textbook, the picture, the drug/medication, the telephone"
  },
  {
    "german": "Ich bin ledig/verheiratet/geschieden.",
    "english": "I am single/married/divorced."
  },
  {
    "german": "Peter hat (zwei/keine) Kinder.",
    "english": "Peter has (two/no) children."
  },
  {
    "german": "Ich wohne/lebe allein.",
    "english": "I live alone."
  },
  {
    "german": "Susanne wohnt mit Edwin zusammen.",
    "english": "Susanne lives with Edwin."
  },
  {
    "german": "Das ist mein Mann/meine Frau, mein Bruder/meine Schwester, mein Sohn/meine Tochter, mein Onkel/meine Tante.",
    "english": "This is my husband/my wife, my brother/my sister, my son/my daughter, my uncle/my aunt."
  },
  {
    "german": "Was möchtest du / möchten Sie trinken?",
    "english": "What would you like to drink?"
  },
  {
    "german": "Ich möchte bitte (einen Orangensaft).",
    "english": "I would like (an orange juice)."
  },
  {
    "german": "Ich brauche jetzt (einen Kaffee).",
    "english": "I need (a coffee) now."
  },
  {
    "german": "Ich trinke (einen Tee).",
    "english": "I'll drink (a tea)."
  },
  {
    "german": "Ich nehme (ein Wasser).",
    "english": "I'll take (water)."
  },
  {
    "german": "Wie viel kostet (ein Stück Käsekuchen)?",
    "english": "How much is (a piece of cheese cake)?"
  },
  {
    "german": "Möchtest du wirklich (keinen Schokoladenkuchen)?",
    "english": "Are you sure you don't want (chocolate cake)?"
  },
  {
    "german": "Doch, ich nehme (ein Stück).",
    "english": "Yes, I'll take (one piece)."
  },
  {
    "german": "Wir möchten gern zahlen/bezahlen.",
    "english": "We would like to pay."
  },
  {
    "german": "Zusammen oder getrennt?",
    "english": "Together or separately?"
  },
  {
    "german": "Das macht (zusammen 8,60 Euro).",
    "english": "It will be (8,60 Euros altogether)."
  },
  {
    "german": "beruflich in (Frankfurt) sein",
    "english": "to be in (Frankfurt) for work"
  },
  {
    "german": "eine Konferenz besuchen",
    "english": "to attend a conference"
  },
  {
    "german": "über Arbeit und Familie reden",
    "english": "to talk about work and family"
  },
  {
    "german": "ins Museum/Theater/Kino/Restaurant gehen",
    "english": "to go to the museum/theatre/cinema/restaurant"
  },
  {
    "german": "Informationen über (Frankfurt) lesen",
    "english": "to read information on (Frankfurt)"
  },
  {
    "german": "Geld abheben",
    "english": "to withdraw money"
  },
  {
    "german": "Medikamente/Fahrkarten kaufen",
    "english": "to buy travel tickets"
  },
  {
    "german": "ein Hotelzimmer suchen",
    "english": "to look for a hotel room"
  },
  {
    "german": "im Hotel übernachten",
    "english": "to sleep at a hotel"
  },
  {
    "german": "Ich möchte bitte ein Einzel-/Doppelzimmer für (eine Nacht/zwei Nächte).",
    "english": "I'd like to have a single/double room for (one night/two nights)."
  },
  {
    "german": "Ich habe eine/keine Reservierung.",
    "english": "I (don’t) have a reservation."
  },
  {
    "german": "Was kostet das Zimmer (pro Nacht)?",
    "english": "What does a room cost (per night)?"
  },
  {
    "german": "Ist der Preis mit Frühstück?",
    "english": "Does the price include breakfast? lit: Is the price with breakfast?"
  },
  {
    "german": "Gibt es WLAN?",
    "english": "Do you have Wi-fi?"
  },
  {
    "german": "Ich nehme das Zimmer.",
    "english": "I’ll take the room."
  },
  {
    "german": "Ich zahle bar/mit Kreditkarte.",
    "english": "I’ll pay cash/by card."
  },
  {
    "german": "Wir brauchen noch Ihre persönlichen Angaben.",
    "english": "We need your contact details."
  },
  {
    "german": "der Kaffee (mit/ohne Milch und Zucker)",
    "english": "coffee (with/without milk and sugar)"
  },
  {
    "german": "der Tee, das Wasser, der Saft",
    "english": "tea, water, juice"
  },
  {
    "german": "die Limonade, die Cola, das Bier",
    "english": "lemonade, Coke, beer"
  },
  {
    "german": "die Suppe, das Brötchen mit Käse",
    "english": "soup, cheese sandwich"
  },
  {
    "german": "das Schnitzel, die Currywurst, der Salat",
    "english": "schnitzel, curry sausage, salad"
  },
  {
    "german": "der Schokoladenkuchen",
    "english": "chocolate cake"
  },
  {
    "german": "Hallo Petra. – Hallo Andreas, so eine Überraschung!",
    "english": "Hi Petra. – Hi Andreas. What a surprise!"
  },
  {
    "german": "Das war doch früher dein Lieblingsmaler. – Ja, das stimmt!",
    "english": "He used to be your favourite painter. – That's true."
  },
  {
    "german": "Dann essen wir jetzt ein Schnitzel. – Prima Idee! Das machen wir!",
    "english": "Let's have a schnitzel then. – Good idea. Let's do that."
  },
  {
    "german": "Warst du schon mal in München? – Ja, da war ich schon. / – Nein, da war ich noch nicht.",
    "english": "Have you ever been to Munich? – Yes, I have been there (already). / – No, I have not been there yet."
  },
  {
    "german": "Ist es schön in München? – Keine Ahnung.",
    "english": "Is it nice in Munich? – No idea."
  },
  {
    "german": "Frankfurt ist (1 200) Jahre alt.",
    "english": "Frankfurt is (1 200) years old."
  },
  {
    "german": "Die Stadt liegt (in der Mitte von Deutschland).",
    "english": "The city is located (in the middle of Germany)."
  },
  {
    "german": "In (Frankfurt) leben etwa (700 000) Menschen.",
    "english": "Around (700 000) people live in (Frankfurt)."
  },
  {
    "german": "In (Frankfurt) gibt es (viele Museen, Banken ...).",
    "english": "In (Frankfurt) there are (many museums, banks …)."
  },
  {
    "german": "Die Stadt hat (einen großen Flughafen).",
    "english": "The city has (a big airport)."
  },
  {
    "german": "Sehr geehrte Damen und Herren, ...",
    "english": "Dear Sir or Madam (formal form of greeting)"
  },
  {
    "german": "Mit freundlichen Grüßen",
    "english": "Best regards (formal way of saying goodbye)"
  },
  {
    "german": "Lieber (Klaus),/Liebe (Clara), ...",
    "english": "Dear (Klaus),/Dear (Clara) (informal form of greeting)"
  },
  {
    "german": "Schöne/Liebe Grüße",
    "english": "Warm greetings/Lots of love (informal letter ending)"
  },
  {
    "german": "Bis bald",
    "english": "See you soon/Talk to you soon."
  },
  {
    "german": "Wie spät ist es? Es ist (15.00 Uhr).",
    "english": "What time is it? It's (3 PM)."
  },
  {
    "german": "Es ist (Viertel vor zehn), (Viertel nach zwölf ).",
    "english": "It is (quarter to ten), (quarter past twelve)."
  },
  {
    "german": "Wann beginnt (der Unterricht)? Um (18.30 Uhr).",
    "english": "When does (the lesson) begin? At (6.30 PM)."
  },
  {
    "german": "Wie lange dauert (das Konzert)? (3) Stunden.",
    "english": "How long is (the concert)? (3) hours."
  },
  {
    "german": "Wann ist (die Besprechung) zu Ende? (Sie) ist um (16.30 Uhr) zu Ende.",
    "english": "When does (the meeting) end? (It) ends at (4.30)."
  },
  {
    "german": "Was machst du am (Montag) um (11.00 Uhr)?",
    "english": "What are you doing on (Monday) at (11)?"
  },
  {
    "german": "Am (Montag) präsentiere ich von (11.00 Uhr) bis (12.00 Uhr) mein Projekt.",
    "english": "On (Monday) I’m presenting my project from (11) to (12)."
  },
  {
    "german": "Wann hast du am (Freitag) Zeit? Am (Freitag) kann ich leider nicht.",
    "english": "When do you have time on (Friday)? I can't make it on (Friday) unfortunately."
  },
  {
    "german": "Vielleicht können wir am (Mittwoch) ins Museum gehen.",
    "english": "Perhaps we can go to the museum on (Wednesday)."
  },
  {
    "german": "Ein Jahr dauert: 12 Monate, 52 Wochen, 365 Tage, 8 760 Stunden, 525 600 Minuten und 31 536 000 Sekunden.",
    "english": "A year has: 12 months, 52 weeks, 365 days, 8 760 hours, 525 600 minutes and 31 536 000 seconds."
  },
  {
    "german": "Martina steht meistens um (7.00 Uhr) auf.",
    "english": "Martina gets up at (7 AM) most of the time."
  },
  {
    "german": "Um (7.30 Uhr) frühstückt sie.",
    "english": "She has breakfast at (7.30)."
  },
  {
    "german": "Danach macht sie Gymnastik.",
    "english": "Then she does her workout."
  },
  {
    "german": "Um (8.00 Uhr) fährt Martina ins Büro.",
    "english": "Martina drives off at (8) to the office."
  },
  {
    "german": "Von (8.30 Uhr) bis (12.00 Uhr) arbeitet sie. Sie analysiert Daten. Sie schreibt viele E-Mails und Berichte.",
    "english": "She works from (8.30) to (12). She analyses data. She writes many emails and reports."
  },
  {
    "german": "Sie hat jeden Tag eine Besprechung. Sie ruft manchmal Kollegen an.",
    "english": "She has a meeting every day. Sometimes she phones colleagues."
  },
  {
    "german": "(Um 12.00 Uhr) macht sie Mittagspause. (Um 17.00 Uhr) fährt Martina in die Stadt. Dort kauft sie ein.",
    "english": "She has her lunch break (at 12). She goes/drives to the city (at 5 PM). She does her shopping there."
  },
  {
    "german": "(Um 9.00 Uhr) geht Jonas in die Universität. Er besucht Vorlesungen und seminare. Er macht auch ein Praktikum.",
    "english": "Jonas leaves for the university (at 9). He attends lectures and seminars. He is also doing an internship."
  },
  {
    "german": "Abends sitzt er in der Bibliothek. Danach geht Jonas aus. Um (24.00 Uhr) geht er ins Bett.",
    "english": "In the evening, he is at the library. Then he goes out. He goes to bed at (12 PM)."
  },
  {
    "german": "Die Österreicher treiben viel Sport. Sie hören Radio. Abends sehen sie fern.",
    "english": "Austrians do a lot of sports. They listen to the radio. They watch TV in the evening."
  },
  {
    "german": "die Arbeitstage: der Montag, der Dienstag, der Mittwoch, der Donnerstag, der Freitag",
    "english": "workdays: Monday, Tuesday, Wednesday, Thursday, Friday"
  },
  {
    "german": "das Wochenende: der Samstag (Sonnabend), der Sonntag",
    "english": "the weekend: Saturday, Sunday"
  },
  {
    "german": "Ich habe jeden Tag eine Besprechung.",
    "english": "I have a meeting every day."
  },
  {
    "german": "die Tageszeiten: der Morgen, der Vormittag, der Mittag, der Nachmittag, der Abend, die Nacht",
    "english": "times of the day: the morning, before noon, noon, the afternoon, the evening, at night"
  },
  {
    "german": "morgens, vormittags, mittags, nachmittags, abends, nachts",
    "english": "in the morning, in the forenoon, at noon, in the afternoon, in the evening, in the night"
  },
  {
    "german": "Guten Tag. Hier ist (Otto Gruber).",
    "english": "Hello, this is (Otto Gruber)."
  },
  {
    "german": "Ich möchte bitte mit (Frau Lustig) sprechen.",
    "english": "I'd like to speak to (Mrs. Lustig) please."
  },
  {
    "german": "Ist es dringend?",
    "english": "Is it urgent?"
  },
  {
    "german": "Ich möchte (eine Projektidee) vorstellen.",
    "english": "I'd like to present to you the idea of a project."
  },
  {
    "german": "Hat (Frau Lustig) morgen Zeit?",
    "english": "Does (Mrs. Lustig) have time tomorrow?"
  },
  {
    "german": "Sie können gerne am (Montag) wieder anrufen.",
    "english": "You can call back on (Monday) if you wish."
  },
  {
    "german": "Welche Telefonnummer hat (Frau Esser)?",
    "english": "What is the telephone number of (Mrs. Esser)?"
  },
  {
    "german": "Auf Wiederhören.",
    "english": "Goodbye. (On the telephone)"
  },
  {
    "german": "Viele (Deutsche) essen mittags (in der Kantine). Am liebsten essen sie (Currywurst).",
    "english": "Many (Germans) have lunch (at the canteen). They like to eat (curry sausage) the most."
  },
  {
    "german": "In (Österreich) isst man gern (Wiener Schnitzel).",
    "english": "(Austrians) like (Wiener schnitzel). lit.: In Austria, one likes eating Wiener schnitzel."
  },
  {
    "german": "Mittags essen (die Schweizer) gern einfache, schnelle Gerichte.",
    "english": "(Swiss) like to have simple, fast food for lunch."
  },
  {
    "german": "Abends isst man in (Deutschland) traditionell (Brot mit Käse).",
    "english": "Traditionally, (Germans) eat (bread with cheese) for dinner."
  },
  {
    "german": "Zum Frühstück trinkt man (in der Schweiz) (Milchkaffee).",
    "english": "(Swiss) drink (coffee with milk) for breakfast."
  },
  {
    "german": "Die (Österreicher) mögen (Kaffee und Tee).",
    "english": "(Austrians) like (coffee and tea)."
  },
  {
    "german": "Die (Deutschen) trinken im Durchschnitt (110 Liter Bier).",
    "english": "(Germans) drink (110 liters of beer) on average."
  },
  {
    "german": "In (Deutschland) kann man (verschiedene Sorten Mineralwasser) kaufen.",
    "english": "(In Germany), you can buy (different types of mineral water)."
  },
  {
    "german": "(Die Schweiz) ist für (Schokolade) bekannt.",
    "english": "(Switzerland) is known for (its chocolate)."
  },
  {
    "german": "Was mögen Sie?/Was trinken und essen Sie gern?",
    "english": "What do you like?/What do you like to eat and drink?"
  },
  {
    "german": "Ich mag (Kaffee), trinke gern (Saft), esse am liebsten (Schokolade).",
    "english": "I like (coffee), I like drinking (juices). My favourite food is (chocolate)."
  },
  {
    "german": "Obst: die Ananas, die Birne, die Banane",
    "english": "fruits: pineapple, pear, banana"
  },
  {
    "german": "Gemüse: die Gurke, die Zwiebel, das Kraut",
    "english": "vegetables: cucumber, onion, cabbage"
  },
  {
    "german": "Getreideprodukte: der Reis, die Nudeln (Pl.), das Brot",
    "english": "grain products: rice, pasta (pl.), bread"
  },
  {
    "german": "Milchprodukte: die Milch, der Quark, der Käse",
    "english": "milk products: milk, cottage cheese, cheese"
  },
  {
    "german": "Fisch: der Lachs",
    "english": "fish: salmon"
  },
  {
    "german": "Wurst: die Leberwurst, der Schinken",
    "english": "sausage: liver sausage, ham"
  },
  {
    "german": "Fleisch: das Rindfleisch, das Hühnerfleisch",
    "english": "meat: beef, chicken"
  },
  {
    "german": "Fette: die Butter, die Sahne, das Öl",
    "english": "fats: butter, cream, oil"
  },
  {
    "german": "Backwaren: der Kuchen, die Torte",
    "english": "bakery products: cake, tart"
  },
  {
    "german": "Süßwaren: die Schokolade, die Gummibärchen (Pl.)",
    "english": "sweets: chocolate, Gummy bears (pl.)"
  },
  {
    "german": "das Messer, die Gabel, der Löffel, der Teller, die Tasse, der Topf, die Pfanne",
    "english": "knife, fork, spoon, plate, cup, pot, pan"
  },
  {
    "german": "Ich brauche (ein Messer). – Tut mir leid, ich habe (kein Messer).",
    "english": "I need (a knife). – I'm sorry but I don’t have (a knife)."
  },
  {
    "german": "Ich hätte gern (ein Wiener Schnitzel).",
    "english": "I'd like to have (a Wiener schnitzel)."
  },
  {
    "german": "Ich möchte bitte (die Hühnersuppe).",
    "english": "I'd like to have (the chicken soup)."
  },
  {
    "german": "Ich nehme (als Vorspeise) (den Salat).",
    "english": "I'll take (the salad) (as a starter)."
  },
  {
    "german": "Ich esse (als Hauptgericht) (Steak mit Kartoffeln).",
    "english": "I'll have (a steak with potatoes) (as the main dish)."
  },
  {
    "german": "Ich trinke (ein Glas Weißwein).",
    "english": "I would like to drink (a glass of white wine)."
  },
  {
    "german": "Guten Appetit! – Danke, gleichfalls.",
    "english": "Enjoy your meal. – Thanks, you too."
  },
  {
    "german": "Prost!/Zum Wohl!",
    "english": "Cheers!"
  },
  {
    "german": "Ich möchte bitte zahlen/bezahlen.",
    "english": "I'd like to pay."
  },
  {
    "german": "Die Rechnung bitte.",
    "english": "The bill, please."
  },
  {
    "german": "Wie schmeckt (das Schnitzel)? – (Das Schnitzel) schmeckt sehr gut/ausgezeichnet. – (Es) schmeckt nicht gut.",
    "english": "How do you like (the schnitzel)? – (The schnitzel) is very good/excellent. – (It) is not good."
  },
  {
    "german": "Wie war das Essen? – Danke, gut.",
    "english": "How was the food? – Good, thank you."
  },
  {
    "german": "Ich möchte gern einen Tisch (für vier Personen) reservieren.",
    "english": "I'd like to reserve a table (for four people)."
  },
  {
    "german": "Das Restaurant heißt (Schnitzelparadies).",
    "english": "The name of the restaurant is (Schnitzelparadies)."
  },
  {
    "german": "Es ist (dienstags bis sonntags von 12.00 bis 23.00 Uhr) geöffnet.",
    "english": "It is open (from 12AM to 11PM from Tuesday to Sunday)."
  },
  {
    "german": "Man kann dort (leckere Schnitzel) essen.",
    "english": "You can eat (delicious schnitzel) there."
  },
  {
    "german": "Auf der Speisekarte stehen (Gerichte mit Schnitzel).",
    "english": "You can find (schnitzel dishes) on the menu."
  },
  {
    "german": "(Mozartkugeln) sind (in Österreich) sehr beliebt.",
    "english": "(Mozartkugel) is very popular (in Austria)."
  },
  {
    "german": "(Mozartkugeln) gibt es seit (1890).",
    "english": "(Mozartkugel) has existed since (1890)."
  },
  {
    "german": "Der Erfinder war (Paul Fürst).",
    "english": "The inventor was (Paul Fürst)."
  },
  {
    "german": "Die Spezialität hat den Namen von (Wolfgang Amadeus Mozart).",
    "english": "The specialty was named after (Wolfgang Amadeus Mozart)."
  },
  {
    "german": "Die Firma (Fürst) produziert (die Mozartkugeln).",
    "english": "The company (Fürst) produces (Mozartkugels)."
  },
  {
    "german": "Man kann (originale Mozartkugeln) nur in (Salzburg) kaufen.",
    "english": "You can buy (Original Mozartkugels) in (Salzburg) only."
  },
  {
    "german": "Martina ist um (7.00 Uhr) aufgestanden. Um (7.30 Uhr) hat sie gefrühstückt. Danach hat sie Gymnastik gemacht.",
    "english": "Martina got up at (7). She had breakfast at (7.30). She did her workout after that."
  },
  {
    "german": "Um (8.00 Uhr) ist Martina ins Büro gefahren.",
    "english": "She left for the office at (8)."
  },
  {
    "german": "Dort hat sie gearbeitet, Daten analysiert, viele E-Mails und Berichte geschrieben, Kollegen angerufen.",
    "english": "She was working there: she analysed data, wrote many emails and reports, called colleagues on the phone."
  },
  {
    "german": "Sie hatte eine Besprechung. Die Besprechung hat um (11.00 Uhr) angefangen und eine Stunde gedauert.",
    "english": "She had a meeting. The meeting started at (11) and lasted an hour."
  },
  {
    "german": "Danach hat sie eingekauft.",
    "english": "Then she did her shopping."
  },
  {
    "german": "Jonas ist in die Universität gegangen. Er hat Vorlesungen und Seminare besucht. Abends hat er für die Prüfung gelernt.",
    "english": "Jonas went to the university. He attended lectures and seminars. He studied for his exam in the evening."
  },
  {
    "german": "Danach ist er ausgegangen.",
    "english": "Then he went out."
  },
  {
    "german": "Paul hat Kaffee gekocht, einen Krimi gelesen, nicht viel geschlafen, zwei Projekte präsentiert, eine Currywurst gegessen.",
    "english": "Paul made coffee, read a crime story, did not sleep much, presented two projects, ate a curry sausage."
  },
  {
    "german": "Ich habe ein Bild gemalt, mit Kollegen gesprochen, viel Kaffee getrunken, Musik gehört, auf Englisch telefoniert, abends ferngesehen, einen Film gesehen.",
    "english": "I painted a picture, talked to colleagues, drank plenty of coffee, listened to music, made a phone call in English, watched TV in the evening, saw a film."
  },
  {
    "german": "Ich habe in (Jena) (Medienwissenschaften) studiert.",
    "english": "I studied (media science) in (Jena)."
  },
  {
    "german": "Ich bin (Koch) und habe meine Ausbildung in (Berlin) gemacht.",
    "english": "I am (a cook) and did my apprenticeship in (Berlin)."
  },
  {
    "german": "Mein Studium/Meine Ausbildung war schwierig/interessant/sehr praktisch/sehr theoretisch.",
    "english": "My degree course/My apprenticeship was difficult/interesting/very practical/very theoretical."
  },
  {
    "german": "Wir waren (60) Studenten im Studienjahr/(15) Lehrlinge im Lehrjahr.",
    "english": "We were (60) students in a year/(15) apprentices in a year."
  },
  {
    "german": "Der Anfang war (nicht so) schwer.",
    "english": "The beginning was (not so) difficult."
  },
  {
    "german": "Ich habe viele/nicht so viele Bücher gelesen.",
    "english": "I read a lot of books./I didn't read very many books."
  },
  {
    "german": "Wir hatten viele/nicht so viele/nur wenige Vorlesungen/Seminare/praktische Projekte.",
    "english": "We had many/not so many/only a few lectures/seminars/hands-on projects."
  },
  {
    "german": "Ich habe ein Praktikum bei (BMW) gemacht.",
    "english": "I did an internship at (BMW)."
  },
  {
    "german": "Ich war oft/nicht so oft in der Bibliothek.",
    "english": "I was often/not so often at the library."
  },
  {
    "german": "Wir haben oft/nicht so oft/nie mit Lehrern/Dozenten/Professoren diskutiert.",
    "english": "We often/not so often/never talked to the teachers/lecturers/professors."
  },
  {
    "german": "Ich habe viel/nicht so viel gelernt. Ich hatte gute/nicht so gute Noten.",
    "english": "I learned a lot./I didn't learn a lot. I had good/not so good marks."
  },
  {
    "german": "Ich habe (keine/2 000 Euro) Studiengebühren bezahlt.",
    "english": "I paid (no/2 000 euros) in tuition fees."
  },
  {
    "german": "Es gibt staatliche und private Universitäten.",
    "english": "There are state and private universities."
  },
  {
    "german": "Einige Universitäten haben eine lange tradition.",
    "english": "Some universities have had a long tradition."
  },
  {
    "german": "Insgesamt gibt es 18 000 Studiengänge.",
    "english": "There are 18 000 degree courses in total."
  },
  {
    "german": "Die Universitäten bieten internationale Abschlüsse an.",
    "english": "The universities offer international diplomas."
  },
  {
    "german": "ein studium beginnen und abschließen",
    "english": "begin one's studies, finish one's studies"
  },
  {
    "german": "ein neues Studienfach suchen",
    "english": "to look for a new subject (of study)"
  },
  {
    "german": "in der Bibliothek Bücher ausleihen",
    "english": "to borrow books at the library"
  },
  {
    "german": "in der Mensa essen",
    "english": "to eat at the canteen"
  },
  {
    "german": "in der Verwaltung etwas bezahlen",
    "english": "to pay something at the administration office"
  },
  {
    "german": "im Studentenwohnheim wohnen",
    "english": "to live at the dorm"
  },
  {
    "german": "im Sekretariat Informationen bekommen",
    "english": "to receive information at the administration/registrar's office"
  },
  {
    "german": "im Sprachenzentrum Deutsch lernen",
    "english": "to learn German at the language centre"
  },
  {
    "german": "der Zug, die U-Bahn, die S-Bahn, die Straßenbahn",
    "english": "train, metro/subway, local train, tram"
  },
  {
    "german": "das Auto, das Taxi, der Bus",
    "english": "car, taxi, bus"
  },
  {
    "german": "das Fahrrad, das Motorrad",
    "english": "bicycle, motorcycle"
  },
  {
    "german": "das Schiff, das Boot, die Fähre",
    "english": "ship, boat, ferry"
  },
  {
    "german": "das Flugzeug",
    "english": "airplane"
  },
  {
    "german": "Womit fährst du/fahren Sie zur Arbeit?",
    "english": "How do you get to work?"
  },
  {
    "german": "Ich fahre mit (dem Auto/dem Zug/der Bahn).",
    "english": "I take (the car/the train)."
  },
  {
    "german": "Was machst du/machen Sie im Zug?",
    "english": "What do you do on the train?"
  },
  {
    "german": "Ich lese (im Zug) Zeitung oder höre Musik.",
    "english": "I read the newspaper (in the train) or I listen to music."
  },
  {
    "german": "Das beliebteste/wichtigste Verkehrsmittel ist (das Auto).",
    "english": "The most popular/most important means of transportation is (the car)."
  },
  {
    "german": "Viele Menschen nehmen (den Bus).",
    "english": "Many people take (the bus)."
  },
  {
    "german": "Bei Urlaubsreisen liegt (das Flugzeug) auf Platz (eins).",
    "english": "For holiday trips (the airplane) occupies the (first) place."
  },
  {
    "german": "Viele Menschen fahren mit (dem Auto) in den Urlaub.",
    "english": "Many people take (the car) to go on vacation."
  },
  {
    "german": "16 Prozent der Deutschen nutzen öffentliche Verkehrsmittel.",
    "english": "16 % of the Germans use public transportation."
  },
  {
    "german": "In den Großstädten/Auf den Autobahnen gibt es (nicht so) viele Staus.",
    "english": "In the big cities/On the highways, there are (not so) many traffic jams."
  },
  {
    "german": "(Die Züge) haben oft Verspätung/sind immer/meistens pünktlich.",
    "english": "(The trains) are often delayed/always on time/almost always on time."
  },
  {
    "german": "Ich brauche Informationen über die Abfahrt und Ankunft von (Zügen).",
    "english": "I need information about the departure and arrival of (trains)."
  },
  {
    "german": "Der Zug kommt am Gleis (drei) an.",
    "english": "The train arrives at platform (three)."
  },
  {
    "german": "(Die Züge) sind voll/leer/sauber/schmutzig.",
    "english": "(The trains) are full/empty/clean/dirty."
  },
  {
    "german": "Die Fahrkarten für (die S-Bahn) sind (nicht so) teuer.",
    "english": "The tickets for (the commuter train) are (not very) expensive."
  },
  {
    "german": "(Der Bus) fährt nicht weiter. Alle Fahrgäste müssen aussteigen.",
    "english": "(The bus) does not go further. All passengers must leave (the vehicle)."
  },
  {
    "german": "Auf dem Flughafen starten und landen viele Flugzeuge.",
    "english": "Many airplanes take off and land at the airport."
  },
  {
    "german": "Passagiere nach (London) gehen bitte zu Flugsteig/Gate (B 15).",
    "english": "Passengers to (London) please go to gate (B 15)."
  },
  {
    "german": "Auf der Autobahn (A 8) sind Personen auf der Fahrbahn. Bitte fahren Sie langsam!",
    "english": "There are people on one lane of the highway (A 8). Please drive slowly."
  },
  {
    "german": "Ich finde Autofahren/Fahrradfahren/Fliegen toll.",
    "english": "I like driving a car/cycling/flying."
  },
  {
    "german": "der Januar, der Februar, der März",
    "english": "January, February, March"
  },
  {
    "german": "der April, der Mai, der Juni",
    "english": "April, May, June"
  },
  {
    "german": "der Juli, der August, der September",
    "english": "July, August, September"
  },
  {
    "german": "der Oktober, der November, der Dezember",
    "english": "October, November, December"
  },
  {
    "german": "der winter, der Frühling, der Sommer, der Herbst",
    "english": "winter, spring, summer, autumn/fall"
  },
  {
    "german": "Es ist kalt/warm/heiß.",
    "english": "It’s cold/warm/hot."
  },
  {
    "german": "Die Sonne scheint.",
    "english": "The sun is shining."
  },
  {
    "german": "Es regnet (nie/oft).",
    "english": "It (never/often) rains."
  },
  {
    "german": "Es ist windig.",
    "english": "It's windy."
  },
  {
    "german": "Es schneit.",
    "english": "It's snowing."
  },
  {
    "german": "Morgens ist es neblig.",
    "english": "It's foggy in the morning."
  },
  {
    "german": "Die Temperaturen liegen bei (20 Grad).",
    "english": "The temperature is (20 degrees Celsius)."
  },
  {
    "german": "Die Tage/Nächte sind lang/kurz.",
    "english": "The days/nights are long/short."
  },
  {
    "german": "Ich mag den Schnee/die Sonne/den Regen/den Wind (nicht).",
    "english": "I (don't) like snow/sun/rain/wind."
  },
  {
    "german": "Wann fährst du in den Urlaub?",
    "english": "When are you going on vacation?"
  },
  {
    "german": "Wohin willst du/wollen Sie fahren?",
    "english": "Where do you want to travel?"
  },
  {
    "german": "Wir fahren nach Österreich/in die Schweiz.",
    "english": "We will go to Austria/Switzerland."
  },
  {
    "german": "Warst du/Waren Sie schon mal in Bayern? – Ja, es war herrlich!/Nein, leider noch nicht.",
    "english": "Have you ever been to Bavaria? – Yes, it was fantastic!/Unfortunately not (yet)."
  },
  {
    "german": "Wie lange willst du/wollen Sie bleiben?",
    "english": "How long do you want to stay?"
  },
  {
    "german": "Was machst du/machen Sie im Urlaub?",
    "english": "What do you do during your vacation?"
  },
  {
    "german": "Im Urlaub fahre ich Ski/treibe ich viel Sport/gehe ich oft schwimmen/gehe ich abends aus.",
    "english": "I go skiing/do a lot of sports/go to swim often/go out in the evenings when I'm on vacation."
  },
  {
    "german": "In (Achenkirch) gibt es (ein Wellnesshotel). – Das klingt gut!",
    "english": "In (Achenkirch) there is a (wellness hotel). – That sounds great."
  },
  {
    "german": "der Reisepass, der Führerschein",
    "english": "passport, driver's license"
  },
  {
    "german": "der Koffer, der Rucksack",
    "english": "suitcase, backpack"
  },
  {
    "german": "das Geld, die Kreditkarte",
    "english": "money, credit card"
  },
  {
    "german": "das Ohropax, das Kopfkissen",
    "english": "earplug, pillow"
  },
  {
    "german": "die Sportkleidung, die Sonnencreme",
    "english": "sportswear, sun cream"
  },
  {
    "german": "der Fotoapparat, der Terminkalender",
    "english": "camera, agenda"
  },
  {
    "german": "den Pass einpacken",
    "english": "to pack the passport"
  },
  {
    "german": "(keine) Sonnencreme brauchen",
    "english": "to (not) need sun cream"
  },
  {
    "german": "nicht ohne sein Kopfkissen in den Urlaub fahren",
    "english": "to not leave on vacation without one's pillow"
  },
  {
    "german": "das Handy (nicht) mitnehmen",
    "english": "to (not) take the cell phone with you"
  },
  {
    "german": "der Anzug, der Pullover, der Rock",
    "english": "suit, sweater, skirt"
  },
  {
    "german": "der Mantel, der Schal",
    "english": "coat, scarf"
  },
  {
    "german": "die Hose, die Bluse, die Jacke, die Mütze",
    "english": "trousers, blouse, jacket, cap"
  },
  {
    "german": "das Hemd, das Kleid, das T-Shirt",
    "english": "shirt, dress, T-shirt"
  },
  {
    "german": "Ich trage gern T-Shirts und Jeans.",
    "english": "I like wearing T-shirts and jeans."
  },
  {
    "german": "Meine Lieblingsfarbe ist Blau.",
    "english": "My favorite colour is blue."
  },
  {
    "german": "Ich finde diesen schwarzen Anzug sehr schick.",
    "english": "I find this black suit very elegant."
  },
  {
    "german": "Deine grünen Schuhe sehen toll aus!",
    "english": "Your green shoes look great!"
  },
  {
    "german": "Sie mag gelbe Pullover.",
    "english": "She likes yellow sweaters."
  },
  {
    "german": "Er kombiniert verschiedene Farben.",
    "english": "He combines different colours."
  },
  {
    "german": "Ich suche/brauche einen schwarzen Anzug.",
    "english": "I am looking for/I need a black suit."
  },
  {
    "german": "Ich hätte gern diesen bunten Schal.",
    "english": "I would like this multicolour scarf."
  },
  {
    "german": "Ich habe Größe 40.",
    "english": "I am size 40."
  },
  {
    "german": "Kann ich dieses Hemd einmal anprobieren?",
    "english": "Can I try this shirt on?"
  },
  {
    "german": "Die Bluse ist zu groß/zu klein.",
    "english": "The blouse is too large/small."
  },
  {
    "german": "Haben Sie die Bluse auch in einer anderen Größe / eine Nummer größer/kleiner?",
    "english": "Do you have the blouse in another size / a size larger/smaller?"
  },
  {
    "german": "Kann ich das Kleid umtauschen?",
    "english": "Can I exchange the dress?"
  },
  {
    "german": "Was kostet die Hose?",
    "english": "What do the trousers cost?"
  },
  {
    "german": "Gut, ich nehme die Hose.",
    "english": "Okay, I take the trousers."
  },
  {
    "german": "die Kleidung, die Sportartikel (Pl.), die Reisen (Pl.)",
    "english": "clothing, sporting goods, trips"
  },
  {
    "german": "die Möbel (Pl.), das Geschirr, das Spielzeug",
    "english": "furniture, crockery, toys"
  },
  {
    "german": "die Eintrittskarten (Pl.), die Filme (Pl.)",
    "english": "entry cards, films"
  },
  {
    "german": "Ich kaufe/bestelle im Internet oft/gern Bücher.",
    "english": "I often/like to buy/order books on the Internet."
  },
  {
    "german": "Lebensmittel kaufe ich lieber im Geschäft.",
    "english": "I prefer to buy food in the shops."
  },
  {
    "german": "E-Books kann man schnell herunterladen.",
    "english": "You can download e-books fast."
  },
  {
    "german": "Albert bucht seine Reisen online.",
    "english": "Albert books his trips online."
  },
  {
    "german": "Auf Platz 1 liegt Kleidung.",
    "english": "Clothing occupies the first place."
  },
  {
    "german": "66 Prozent kaufen/bestellen ihre Kleidung online.",
    "english": "66 % buy/order their clothes online."
  },
  {
    "german": "Danach kommen Möbel mit 51 Prozent.",
    "english": "They are followed by furniture with 51 %."
  },
  {
    "german": "Bücher belegen Platz 3.",
    "english": "Books occupy the third place."
  },
  {
    "german": "Auf dem letzten Platz liegen Lebensmittel.",
    "english": "Food occupies the last place."
  },
  {
    "german": "Ich finde das Ergebnis (nicht) überraschend.",
    "english": "I find the results (not) surprising."
  },
  {
    "german": "Dokumente ins Deutsche übersetzen",
    "english": "to translate documents into German"
  },
  {
    "german": "Dokumente scannen und ausdrucken",
    "english": "to scan and print documents"
  },
  {
    "german": "E-Mails beantworten und weiterleiten",
    "english": "to answer and forward e-mails"
  },
  {
    "german": "ein Telefongespräch führen",
    "english": "to make a telephone call"
  },
  {
    "german": "mit Mitarbeitern sprechen",
    "english": "to talk to colleagues"
  },
  {
    "german": "die Technik kontrollieren",
    "english": "to check the technical devices"
  },
  {
    "german": "Gäste abholen",
    "english": "to pick up guests"
  },
  {
    "german": "bei einer Besprechung Protokoll schreiben",
    "english": "to record the minutes at a meeting"
  },
  {
    "german": "Experimente durchführen",
    "english": "to conduct experiments"
  },
  {
    "german": "ein Referat / einen Vortrag halten",
    "english": "to give a presentation/talk"
  },
  {
    "german": "Ich habe ein Problem mit (meiner Waschmaschine).",
    "english": "I have a problem with (my washing machine)."
  },
  {
    "german": "Wir haben keine Internetverbindung.",
    "english": "We have no Internet connection."
  },
  {
    "german": "Manchmal gibt es Probleme mit dem Kopierer.",
    "english": "We sometimes have problems with the copy machine."
  },
  {
    "german": "Die Technik funktioniert nicht.",
    "english": "The technology is not working."
  },
  {
    "german": "Der Drucker ist kaputt.",
    "english": "The printer is not working."
  },
  {
    "german": "Alles geht schief.",
    "english": "Everything goes wrong."
  },
  {
    "german": "Wir sind nicht zufrieden.",
    "english": "We are not happy/satisfied."
  },
  {
    "german": "Kannst du das Problem (irgendwie) lösen?",
    "english": "Can you solve this problem (somehow)?"
  },
  {
    "german": "Wir brauchen eine schnelle Reparatur.",
    "english": "We need a quick repair."
  },
  {
    "german": "Ich möchte gerne einen Termin vereinbaren.",
    "english": "I would like to make an appointment."
  },
  {
    "german": "Wann haben Sie Zeit?",
    "english": "When do you have time?"
  },
  {
    "german": "Wann kann der Monteur vorbeikommen?",
    "english": "When can the repairman come?"
  },
  {
    "german": "In dieser Woche geht es nicht mehr.",
    "english": "It's not possible this week anymore."
  },
  {
    "german": "(Der Monteur) kann erst am elften Mai kommen.",
    "english": "(The repairman) can come on May 11 the earliest."
  },
  {
    "german": "Am elften Mai bin ich nicht da.",
    "english": "I'm not here on May 11."
  },
  {
    "german": "Geht es vielleicht auch am zwölften Mai?",
    "english": "Is it perhaps possible (for him to come) on May 12?"
  },
  {
    "german": "Ich erwarte (den Monteur) am fünften April.",
    "english": "I expect (the repairman) to come on April 5."
  },
  {
    "german": "Leider müssen wir den Termin verschieben/absagen.",
    "english": "Unfortunately, we must postpone/cancel the appointment."
  },
  {
    "german": "Leider kann ich zu dem Termin (mit Dr. Klein) nicht pünktlich kommen.",
    "english": "Unfortunately, I'll not be able to come to the appointment (with Dr. Klein) on time."
  },
  {
    "german": "Ich komme ca. 30 Minuten später.",
    "english": "I'll come about 30 minutes later."
  },
  {
    "german": "Was kann ich für Sie tun?",
    "english": "What can I do for you?"
  },
  {
    "german": "Kann ich bitte (Frau Müller) sprechen?",
    "english": "Can I talk (to Mrs. Müller), please?"
  },
  {
    "german": "Können Sie mich bitte mit (Frau Müller) verbinden?",
    "english": "Can you put me through (to Mrs. Müller), please?"
  },
  {
    "german": "Bitte rufen Sie mich morgen an.",
    "english": "Please call me tomorrow."
  },
  {
    "german": "Bitte informieren Sie mich über die Preise.",
    "english": "Please let me know the prices."
  },
  {
    "german": "In Deutschland finden 98 Prozent der Mitarbeiter eine positive Arbeitsatmosphäre wichtig.",
    "english": "In Germany 98 % of the employees find a positive working environment important."
  },
  {
    "german": "93 von 100 Mitarbeitern finden einen fairen Chef wichtig.",
    "english": "93 out of 100 employees find it important to have a fair supervisor."
  },
  {
    "german": "Auf Platz 3 liegt ein gutes Gehalt.",
    "english": "Place 3 is occupied by a good salary."
  },
  {
    "german": "Danach kommt mit 81 Prozent eine gute Work-Life-Balance.",
    "english": "It's followed by a good work-life balance with 81 %."
  },
  {
    "german": "Sehr geehrte Frau (Sommer), / Sehr geehrter Herr (Winter),",
    "english": "Dear Mrs. (Sommer), / Dear Mr. (Winter), (a very formal way of addressing someone)"
  },
  {
    "german": "Sehr geehrte Damen und Herren,",
    "english": "Dear Sir or Madam,"
  },
  {
    "german": "Liebe Frau (Sommer), / Lieber Herr (Winter),",
    "english": "Dear Mrs. (Sommer), / Dear Mr. (Winter),"
  },
  {
    "german": "Liebe (Claudia), / Lieber (Rudi),",
    "english": "Dear (Claudia), / Dear (Rudi),"
  },
  {
    "german": "Hallo (Peter),",
    "english": "Hi (Peter),"
  },
  {
    "german": "Mit freundlichen Grüßen / Mit besten Grüßen",
    "english": "Best regards / Kind regards,"
  },
  {
    "german": "Herzliche Grüße / Liebe Grüße / Viele Grüße",
    "english": "Best wishes / Cheers/Hugs,"
  },
  {
    "german": "auf der Couch sitzen und fernsehen",
    "english": "to sit on the couch and watch TV"
  },
  {
    "german": "im Internet surfen",
    "english": "to surf the Internet"
  },
  {
    "german": "in sozialen Netzwerken kommunizieren",
    "english": "to communicate on social media"
  },
  {
    "german": "mit Freunden chatten",
    "english": "to chat with friends"
  },
  {
    "german": "etwas mit der Familie unternehmen",
    "english": "to undertake something with the family"
  },
  {
    "german": "über wichtige Dinge reden",
    "english": "to talk about important things"
  },
  {
    "german": "nichts tun/faulenzen",
    "english": "to do nothing/to be lazy"
  },
  {
    "german": "regelmäßig Sport treiben / für Sport keine Zeit haben / keinen Sport machen",
    "english": "to do sports on a regular basis / to not have time for sports / to not do sports"
  },
  {
    "german": "im Garten arbeiten",
    "english": "to work in the garden"
  },
  {
    "german": "spazieren gehen / wandern / joggen",
    "english": "to go for a walk / to go hiking / to jog"
  },
  {
    "german": "Rad/Ski fahren",
    "english": "to ride a bicycle / to go skiing"
  },
  {
    "german": "Am beliebtesten ist (das Radfahren).",
    "english": "The most popular (activity) is (riding a bicycle)."
  },
  {
    "german": "(Tanzen) ist in (Spanien) sehr/weniger beliebt.",
    "english": "(Dancing) is very/less popular in (Spain)."
  },
  {
    "german": "Ich glaube, die meisten (Italiener sehen oft fern).",
    "english": "I think most (Italians often watch TV)."
  },
  {
    "german": "Meiner Meinung nach ist es in (Polen) genauso wie in (Deutschland).",
    "english": "In my opinion, the situation is exactly the same as in (Germany)."
  },
  {
    "german": "Hallo (Claudia), wie geht’s?",
    "english": "Hi (Claudia), how are you doing?"
  },
  {
    "german": "Studierst du noch?",
    "english": "Are you still studying?"
  },
  {
    "german": "Was machst du jetzt beruflich? / Wie läuft es beruflich?",
    "english": "What do you do (professionally) at the moment? / How is it going in your job?"
  },
  {
    "german": "Arbeitest du noch bei (Siemens)?",
    "english": "Are you still working at (Siemens)?"
  },
  {
    "german": "Was hast du in der letzten Zeit so gemacht?",
    "english": "What have you done lately?"
  },
  {
    "german": "Spielst du noch (Tennis)? / (Tanzt) du noch regelmäßig?",
    "english": "Are you still playing (tennis)? / Are you still (dancing) regularly?"
  },
  {
    "german": "Was machst du in deiner Freizeit? / Hast du überhaupt noch Freizeit?",
    "english": "What do you do in your free-time? / Do you have free-time at all?"
  },
  {
    "german": "(Tanzen) ist nichts für mich. / (Tanzen) macht Spaß. Du musst es einfach mal machen.",
    "english": "(Dancing) is not my thing. / (Dancing) is fun. You just have to do it."
  },
  {
    "german": "der Kopf, die Haare (Pl.), der Hals",
    "english": "head, hair, neck"
  },
  {
    "german": "das Ohr, das Auge, die Nase",
    "english": "ear, eye, nose"
  },
  {
    "german": "der Mund, die Zähne (Pl.)",
    "english": "mouth, teeth"
  },
  {
    "german": "die Hand, der Arm, der Finger",
    "english": "hand, arm, finger"
  },
  {
    "german": "der Bauch, der Rücken",
    "english": "stomach/belly, back"
  },
  {
    "german": "das Bein, das Knie",
    "english": "leg, knee"
  },
  {
    "german": "der Fuß, die Zehe",
    "english": "foot, toe"
  },
  {
    "german": "Probleme mit dem Arm haben. / (Der Arm) tut weh. / nicht mehr (Tennis spielen) können.",
    "english": "to have problems with one's arm. / (The arm) is aching. / Not to be able (to play tennis) anymore."
  },
  {
    "german": "einen Termin beim Arzt vereinbaren",
    "english": "to make an appointment with the doctor"
  },
  {
    "german": "eine gesetzliche Krankenversicherung haben / bei (der AOK) versichert sein",
    "english": "to have a public health insurance plan / to have a general health insurance plan"
  },
  {
    "german": "seine Versichertenkarte mitbringen",
    "english": "to take along one's insurance card"
  },
  {
    "german": "eine Erkältung (Husten, Schnupfen und Fieber) haben / Kopfschmerzen haben",
    "english": "to have a cold (cough, sniffles/cold and fever) / to have a headache"
  },
  {
    "german": "ein Rezept vom Arzt bekommen / die Medikamente aus der Apotheke holen",
    "english": "to get a prescription from the doctor / to pick up the drugs from the pharmacy"
  },
  {
    "german": "Der Arzt sagt, Ralf soll viel schlafen.",
    "english": "The doctor says Ralph should sleep a lot."
  },
  {
    "german": "In (Deutschland) gibt es (ca. 40 Millionen) Privathaushalte.",
    "english": "There are (approx. 40 million) private households in (Germany)."
  },
  {
    "german": "Rund (43 Prozent) der Bürger besitzen Wohneigentum. / Viele Menschen haben ein eigenes Haus/eine eigene Wohnung.",
    "english": "About (43 %) of all citizens has their own home. / Many people have their own house/flat."
  },
  {
    "german": "Etwa (57 Prozent) wohnen zur Miete / sind Mieter.",
    "english": "About (57 %) rent a house or a flat / are tenants."
  },
  {
    "german": "Die teuerste Stadt ist (München). / In (München) zahlt/bezahlt man hohe Mieten. / Hier kostet ein Quadratmeter (15,44 Euro) Miete.",
    "english": "The most expensive city is (Munich). / The rents are high in (Munich). / The rent for one square meter is (15,44 euros)."
  },
  {
    "german": "Die meisten Haushalte bestehen aus zwei Personen. / Viele junge Leute wohnen in Wohngemeinschaften.",
    "english": "Most households consist of two people. / Many young people share flats."
  },
  {
    "german": "Das Haus ist in (Berlin) / auf dem Land.",
    "english": "The house is in (Berlin) / on the countryside."
  },
  {
    "german": "Die Wohnung liegt in der Stadtmitte/im Stadtzentrum, im Osten/Westen/Süden/Norden von (Berlin) / am Stadtrand.",
    "english": "The flat is located in the city center/downtown in the east/west/south/north of (Berlin) / at the outskirts of the city."
  },
  {
    "german": "Die Wohnung hat ein Wohnzimmer, ein Schlafzimmer, ein Arbeitszimmer, ein Kinderzimmer, eine Küche, ein Bad/zwei Bäder, hohe Fenster, einen Balkon, eine Terrasse, einen Garten, eine Garage, eine gute Aussicht.",
    "english": "The flat has a living room, one bedroom, a study, a children's room, a kitchen, a bath/two baths high windows, a balcony, a terrace, a garden, a garage, a nice view."
  },
  {
    "german": "In unserer Gegend gibt es viele Parkplätze, gute Einkaufsmöglichkeiten, gute Möglichkeiten zum Ausgehen.",
    "english": "In our area/neighborhood there are many parking spaces, good shopping facilities, good clubbing facilities."
  },
  {
    "german": "Ein Vorteil ist (die Ruhe). / Ein Nachteil ist (der Lärm). / (Viele Autos) stören mich nicht.",
    "english": "One of the advantages is (the quiet). / One of the disadvantages is (the noise). / (Many cars) don't disturb me."
  },
  {
    "german": "in eine Wohnung einziehen / in eine andere Stadt umziehen",
    "english": "to move into a flat / to move to another city"
  },
  {
    "german": "der Flur: die Garderobe, der schuhschrank",
    "english": "entrance hall: wardrobe, shoe closet"
  },
  {
    "german": "das Wohnzimmer: die Couch, das Sofa, der Sessel, das Bücherregal, der Teppich",
    "english": "living-room: couch, armchair, bookshelf, carpet"
  },
  {
    "german": "das Schlafzimmer: das Bett, der Kleiderschrank",
    "english": "bedroom: bed, closet"
  },
  {
    "german": "die Küche: der Küchenschrank, der Kühlschrank, der Esstisch, der Stuhl",
    "english": "kitchen: kitchen cupboard, fridge, dining table, chair"
  },
  {
    "german": "das Bad: die Dusche, das Waschbecken, der Spiegel, die Toilette, die Badewanne",
    "english": "bath: shower, washbasin, mirror, toilet, bathtub"
  },
  {
    "german": "Kannst du mir helfen? (informal)",
    "english": "Can you help me?"
  },
  {
    "german": "Ich muss noch Geschirr spülen, Wäsche waschen und bügeln, sauber machen, das Zimmer aufräumen, das Bad putzen, Staub saugen.",
    "english": "I have to wash the dishes, do the laundry and iron it, to clean up, to tidy the rooms, to clean the bath, to vacuum."
  },
  {
    "german": "Man darf keine Haustiere mitbringen / keine Partys feiern.",
    "english": "You are not allowed to take along any pets / to throw parties."
  },
  {
    "german": "Nehmen Sie am Bahnhof am besten den Bus Richtung (Grünwald). / Steigen Sie an der fünften Haltestelle aus.",
    "english": "The best thing to do is to take the bus in the railway station direction (Grünwald). / Get off at the fifth stop."
  },
  {
    "german": "Gehen Sie dann geradeaus / nach links / nach rechts / bis zur Inselstraße / bis zur ersten Ampel / bis zur zweiten Querstraße.",
    "english": "Go straight / to the left / to the right / to Insel Street / to the first traffic light / to the second crossroad."
  },
  {
    "german": "Dann kommt eine Kreuzung / eine Ampel / ein Kreisverkehr. / An der Kreuzung gehen Sie (nach links).",
    "english": "There you will see an intersection / a traffic light / a roundabout. / Take (the left) at the intersection."
  },
  {
    "german": "Der Fernsehturm ist mit 368 Metern das höchste Bauwerk in Deutschland. / Er ist ein Wahrzeichen von Berlin.",
    "english": "The Fernsehturm with its 368 meters is the highest building in Germany. / It is a symbol for Berlin."
  },
  {
    "german": "Im Fernsehturm gibt es eine Aussichtsplattform und ein Restaurant. / Die Plattform bietet einen fantastischen Ausblick.",
    "english": "In the Fernsehturm, there is a sight-seeing platform and a restaurant. / The platform offers a fantastic view."
  },
  {
    "german": "Jährlich kommen rund eine Million Besucher aus aller Welt.",
    "english": "About one million visitors come from all over the world."
  },
  {
    "german": "Die East-Side-Gallery ist ein Stück Berliner Mauer. / Sie liegt an der Spree. / Die Galerie zeigt über 100 originale Kunstwerke.",
    "english": "The East-Side-Gallery is a piece of the Berlin Wall. / It is located at the river Spree. / The gallery shows more than 100 original works of art."
  },
  {
    "german": "Viele Künstler haben die Mauer bemalt. / Jeder kann die Kunstwerke kostenlos sehen.",
    "english": "Many artists painted on the Wall. / Anyone can see the works of art for free."
  },
  {
    "german": "Das Deutsche Technikmuseum präsentiert technische Entwicklungen aus vielen Bereichen. / Es verfügt über historische Verkehrsmittel. / Man kann einige Objekte anfassen.",
    "english": "The German Museum of Technology presents technical developments in many areas. / It has historic vehicles. / One can touch the objects."
  },
  {
    "german": "Im Bundeskanzleramt arbeitet die Bundeskanzlerin / der Bundeskanzler. / Im Reichstagsgebäude sitzt das Parlament.",
    "english": "The (female) chancellor/chancellor is working at the Chancellor's Office. / The Reichstag is the seat of the Parliament."
  },
  {
    "german": "Ich habe eine Frage / einige Fragen. / Wann hat/ist das Museum geöffnet? / Wann beginnt die Veranstaltung?",
    "english": "I have a question/several questions. / When is the museum open? / When does the event begin?"
  },
  {
    "german": "Haben Sie noch Karten für das Konzert? / Was kostet eine Eintrittskarte? / Wo kann ich die Karten kaufen?",
    "english": "Do you have tickets for the concert? / What does an entry card cost? / Where can I buy tickets?"
  },
  {
    "german": "Gibt es eine Führung im Museum? / Wie komme ich zum Museum?",
    "english": "Is there a guided tour at the museum? / How do I get to the museum?"
  },
  {
    "german": "Gibt es in der Nähe der Philharmonie ein Restaurant? / Kann man in der Gegend etwas essen? / Danke für die Auskunft.",
    "english": "Is there a restaurant near the Philharmonie? / Can you eat something in the neighborhood? / Thank you for the information."
  },
  {
    "german": "Herzlichen Glückwunsch (zum Geburtstag)! / Ich gratuliere dir/euch! / Alles Gute für euch!",
    "english": "Many happy returns of the day. / Congratulations. / All the best to you."
  },
  {
    "german": "Gut gemacht! / Gute Besserung! / Viel Glück im neuen Jahr! / Gesundes Neues Jahr!",
    "english": "Well done! / Get well soon. / All the best for the new year. / A healthy new year."
  },
  {
    "german": "Ich habe am (12. Januar) Geburtstag. / Wir möchten dich gerne zu einer kleinen Feier / Party einladen.",
    "english": "My birthday is on (January 12). / We'd like to invite you to a small celebration / party."
  },
  {
    "german": "Am (12. Januar) werde ich wieder ein Jahr älter. / Das möchte ich gerne feiern.",
    "english": "On (January 12), I'll be another year older. / I'd like to celebrate this."
  },
  {
    "german": "Kommst du zu meiner Party am (12. Januar)? / Ich freue mich auf dich/euch.",
    "english": "Will you come to my party on (January 12)? / I'm looking forward to seeing you."
  },
  {
    "german": "Vielen Dank für die Einladung. / Ich komme gerne.",
    "english": "Many thanks for the invitation. / I'm happy to come."
  },
  {
    "german": "Hast du einen besonderen Wunsch? / Soll ich etwas mitbringen?",
    "english": "Do you want anything special? / Shall I bring something along?"
  },
  {
    "german": "Leider kann ich zu deiner Geburtstagsparty nicht kommen. / Es tut mir leid, aber ich muss an diesem Abend arbeiten.",
    "english": "Unfortunately, I can't come to your birthday party. / I'm sorry but I have to work on that evening."
  },
  {
    "german": "Die Grüne Woche findet seit 1926 in Berlin statt. / Sie ist eine bedeutende Veranstaltung für die Lebensmittelindustrie.",
    "english": "The Green Week (Grüne Woche) has taken place in Berlin since 1926. / It is a significant event for the food industry."
  },
  {
    "german": "Es nehmen 100 000 Menschen teil. / Die Hersteller laden zum Essen ein. / Besucher können die Produkte kaufen.",
    "english": "100 000 people attend it. / The manifacturers offer things to eat. / Visitors can buy the products."
  },
  {
    "german": "Ein Markenzeichen sind die vielen Bioprodukte.",
    "english": "The trademark (of the event) is the large quantity of organic products."
  },
  {
    "german": "Heute streiken die Piloten der Lufthansa. / Der chinesische Ministerpräsident besucht Deutschland.",
    "english": "Today, the pilots of Lufthansa are on strike. / The Chinese prime minister is visiting Germany."
  },
  {
    "german": "Es finden Gespräche im Bundeskanzleramt statt. / Ein Thema ist die wirtschaftliche Zusammenarbeit.",
    "english": "Conversations/Negotiations are taking place at the Chancellor's Office. / One of the topics is economic cooperation."
  },
  {
    "german": "Hören Sie.",
    "english": "Listen."
  },
  {
    "german": "Wiederholen Sie.",
    "english": "Repeat."
  },
  {
    "german": "Lesen Sie.",
    "english": "Read."
  },
  {
    "german": "Sprechen Sie.",
    "english": "Speak."
  },
  {
    "german": "Schreiben Sie.",
    "english": "Write."
  },
  {
    "german": "Berichten Sie.",
    "english": "Report./Tell about it."
  },
  {
    "german": "Fragen Sie Kursteilnehmer.",
    "english": "Ask other participants."
  },
  {
    "german": "Spielen Sie Dialoge.",
    "english": "Play dialogues."
  },
  {
    "german": "Partnerarbeit / Arbeiten Sie zu zweit.",
    "english": "Work with a partner."
  },
  {
    "german": "Gruppenarbeit / Klassenspaziergang",
    "english": "Group work / Walking round the classroom."
  },
  {
    "german": "Suchen Sie nach Informationen.",
    "english": "Search for information."
  },
  {
    "german": "Ordnen Sie zu.",
    "english": "Pair up."
  },
  {
    "german": "Ergänzen Sie.",
    "english": "Complete."
  },
  {
    "german": "Markieren Sie. / Unterstreichen Sie.",
    "english": "Mark./Highlight. / Underline."
  },
  {
    "german": "Buchstabieren Sie.",
    "english": "Spell."
  },
  {
    "german": "Formulieren Sie Fragen. / Bilden Sie Sätze.",
    "english": "Make questions. / Make sentences."
  },
  {
    "german": "Achten Sie auf die Verben. / Formen Sie die Sätze um.",
    "english": "Pay attention to the verbs. / Transform the sentences."
  },
  {
    "german": "Tauschen Sie die Rollen.",
    "english": "Swap roles."
  },
  {
    "german": "Kreuzen Sie an. / Notieren Sie.",
    "english": "Tick. / Take notes."
  },
  {
    "german": "Interview",
    "english": "interview"
  },
  {
    "german": "Wie heißt (das Wort) auf Deutsch?",
    "english": "What does (word) mean in German?"
  },
  {
    "german": "Wie spricht man (das Wort) aus?",
    "english": "How do you pronounce (word)?"
  },
  {
    "german": "Wie schreibt man (das Wort)?",
    "english": "How do you spell (word)?"
  },
  {
    "german": "Das verstehe ich leider nicht.",
    "english": "I'm sorry but I don't understand."
  }
],
  A2: [
      {
        "german": "Wie heißen Sie?/Wie ist Ihr Name?",
        "english": "What is your name?"
      },
      {
        "german": "Ich heiße/Mein Name ist (Ira Pangalos).",
        "english": "My name is (Ira Pangalos)."
      },
      {
        "german": "Woher kommen Sie?",
        "english": "Where do you come from?"
      },
      {
        "german": "Ich komme aus (Griechenland).",
        "english": "I come from (Greece)."
      },
      {
        "german": "Wo wohnen Sie?",
        "english": "Where do you live?"
      },
      {
        "german": "Ich wohne in (München).",
        "english": "I live in (Munich)."
      },
      {
        "german": "Welche Sprachen sprechen Sie?",
        "english": "Which languages do you speak?"
      },
      {
        "german": "Ich spreche (Griechisch, Deutsch und Englisch).",
        "english": "I speak (Greek, German and English)."
      },
      {
        "german": "Was ist Ihre Muttersprache?",
        "english": "What is your native language?"
      },
      {
        "german": "Meine Muttersprache ist (Griechisch).",
        "english": "My native language is (Griechisch)."
      },
      {
        "german": "Was sind Sie von Beruf?/Was machen Sie beruflich?",
        "english": "What do you do professionally?"
      },
      {
        "german": "Ich arbeite als (Ingenieurin bei Siemens).",
        "english": "I work as (an engineer at Siemens)."
      },
      {
        "german": "Lebensmittel einkaufen",
        "english": "buy food"
      },
      {
        "german": "gern kochen",
        "english": "like cooking"
      },
      {
        "german": "mit Freunden essen",
        "english": "eat with friends"
      },
      {
        "german": "Kaffee trinken",
        "english": "drink coffee"
      },
      {
        "german": "Wäsche waschen und bügeln",
        "english": "do the laundry and iron"
      },
      {
        "german": "Staub saugen",
        "english": "hoover"
      },
      {
        "german": "die Wohnung aufräumen",
        "english": "tidy up the flat"
      },
      {
        "german": "Geschirr spülen",
        "english": "do the dishes"
      },
      {
        "german": "sauber machen",
        "english": "do the cleaning"
      },
      {
        "german": "lange schlafen",
        "english": "sleep for a long time"
      },
      {
        "german": "oft faulenzen",
        "english": "laze around often"
      },
      {
        "german": "am Abend fernsehen",
        "english": "watch TV in the evening"
      },
      {
        "german": "in der Bibliothek lernen",
        "english": "study in the library"
      },
      {
        "german": "Experimente durchführen",
        "english": "conduct experiments"
      },
      {
        "german": "Untersuchungsergebnisse präsentieren",
        "english": "present research results"
      },
      {
        "german": "Vorlesungen und Seminare besuchen",
        "english": "attend lectures and seminars"
      },
      {
        "german": "mit (der Semesterarbeit) beginnen",
        "english": "start with (the term paper)"
      },
      {
        "german": "eine Prüfung haben",
        "english": "take an exam"
      },
      {
        "german": "gute/schlechte Noten bekommen",
        "english": "receive good/bad marks"
      },
      {
        "german": "einen Master in (International Business) machen",
        "english": "do a Master's in (International Business)"
      },
      {
        "german": "Patienten untersuchen",
        "english": "examine patients"
      },
      {
        "german": "Patientengespräche dokumentieren",
        "english": "document discussions with patients"
      },
      {
        "german": "Schüler unterrichten",
        "english": "teach pupils"
      },
      {
        "german": "Gäste bedienen",
        "english": "serve guests"
      },
      {
        "german": "Artikel/Protokolle schreiben",
        "english": "write articles/the minutes"
      },
      {
        "german": "Rechnungen kontrollieren",
        "english": "check invoices"
      },
      {
        "german": "Softwareprogramme entwickeln",
        "english": "develop software programs"
      },
      {
        "german": "technische Produkte konstruieren",
        "english": "construct technical products"
      },
      {
        "german": "Autos verkaufen",
        "english": "sell cars"
      },
      {
        "german": "Kunden beraten",
        "english": "advise clients"
      },
      {
        "german": "mit Kollegen sprechen",
        "english": "talk with colleagues"
      },
      {
        "german": "Kollegen informieren",
        "english": "inform colleagues"
      },
      {
        "german": "E-Mails lesen und beantworten",
        "english": "read and answer e-mails"
      },
      {
        "german": "Telefongespräche führen",
        "english": "conduct telephone conversations"
      },
      {
        "german": "Termine vereinbaren und absagen",
        "english": "fix and cancel appointments"
      },
      {
        "german": "Dokumente ausdrucken",
        "english": "print out documents"
      },
      {
        "german": "an einer Besprechung teilnehmen",
        "english": "attend a meeting"
      },
      {
        "german": "ein Projekt präsentieren",
        "english": "present a project"
      },
      {
        "german": "den Kopierer reparieren",
        "english": "fix the copy machine"
      },
      {
        "german": "Sport treiben",
        "english": "do sports"
      },
      {
        "german": "Fußball spielen",
        "english": "play football"
      },
      {
        "german": "eine Mannschaft trainieren",
        "english": "train a team"
      },
      {
        "german": "mit Freunden reden",
        "english": "meet friends"
      },
      {
        "german": "Sprachen lernen",
        "english": "learn languages"
      },
      {
        "german": "mit Freunden telefonieren",
        "english": "talk with friends over the phone"
      },
      {
        "german": "Zeitung lesen",
        "english": "read the newspaper"
      },
      {
        "german": "Auto/Fahrrad fahren",
        "english": "ride a car/bicycle"
      },
      {
        "german": "Musik hören",
        "english": "listen to music"
      },
      {
        "german": "Partys feiern",
        "english": "party, have parties"
      },
      {
        "german": "tanzen",
        "english": "dance"
      },
      {
        "german": "in der Kneipe sitzen",
        "english": "sit in a pub"
      },
      {
        "german": "etwas für die Gesundheit tun",
        "english": "do something for your health"
      },
      {
        "german": "etwas Schönes machen",
        "english": "do something nice"
      },
      {
        "german": "etwas mit Freunden unternehmen",
        "english": "do something with friends"
      },
      {
        "german": "wie ein Märchenschloss aussehen",
        "english": "look like a castle in a fairy tale"
      },
      {
        "german": "aus dem 19. Jahrhundert stammen",
        "english": "originate in the 19th century"
      },
      {
        "german": "als das schönste Schloss in Bayern gelten",
        "english": "be known as the most beautiful castle in Bavaria"
      },
      {
        "german": "ein Wahrzeichen der Stadt sein",
        "english": "be a symbol of the city"
      },
      {
        "german": "ein Magnet für Touristen aus aller Welt sein",
        "english": "be a magnet for tourists from all over the world"
      },
      {
        "german": "berühmt für (die wunderschönen Gärten) sein",
        "english": "be famous for (the beautiful gardens)"
      },
      {
        "german": "zu den größten mittelalterlichen Burgen in Europa zählen",
        "english": "count amongst the biggest fortresses from the Middle Ages in Europe"
      },
      {
        "german": "den Titel (Bester Zoo Europas) gewinnen",
        "english": "win the title (Best Zoo in Europe)"
      },
      {
        "german": "eine wunderschöne Altstadt haben",
        "english": "have a beautiful historical centre"
      },
      {
        "german": "südlich/westlich/nördlich/östlich von (München) liegen",
        "english": "be located south/west/north/east from (Munich)"
      },
      {
        "german": "im Süden/Westen/Osten/Norden von (Deutschland) liegen",
        "english": "be located in the South/West/East/North of (Germany)"
      },
      {
        "german": "Möglichkeiten zur Übernachtung bieten",
        "english": "offer overnight accommodations"
      },
      {
        "german": "Die durchschnittliche Jahrestemperatur beträgt (minus 4,2 Grad).",
        "english": "The average yearly temperature is (-4,2 ˚C)."
      },
      {
        "german": "Der Bau (des Doms) hat (632 Jahre) gedauert.",
        "english": "The building of (the cathedral) took (632 years)."
      },
      {
        "german": "einen Ausflug machen/buchen",
        "english": "go on/book an excursion"
      },
      {
        "german": "(Berge/Museen/Städte) interessant/langweilig/toll/beeindruckend/sehenswert finden",
        "english": "find (mountains/museums/cities) interesting/boring/nice/impressive/worth seeing"
      },
      {
        "german": "Der Ausflug (nach Salzburg) gefällt mir am besten.",
        "english": "I like the trip (to Salzburg) most."
      },
      {
        "german": "ein berühmtes Ausflugsziel sein/vorstellen",
        "english": "be/represent a famous tourist destination"
      },
      {
        "german": "(3 Millionen) Besucher im Jahr haben",
        "english": "have (3 million) visitors a year"
      },
      {
        "german": "vor allem bei (jungen Menschen) sehr beliebt sein",
        "english": "be popular mainly with (young people)"
      },
      {
        "german": "eine Stadt auf eine interessante Art kennenlernen",
        "english": "get to know a city in an interesting way"
      },
      {
        "german": "eine fantastische Aussicht bieten",
        "english": "offer a fantastic view"
      },
      {
        "german": "etwas Besonderes kaufen können",
        "english": "be able to buy something special"
      },
      {
        "german": "(Tatorte/ein Denkmal) besichtigen/sehen können",
        "english": "be able to visit/see (crime scenes/a monument)"
      },
      {
        "german": "mit (der Seilbahn/einer Dampflokomotive) fahren",
        "english": "travel by (cable way/steam locomotive)"
      },
      {
        "german": "(das Technikmuseum) besuchen",
        "english": "visit (the Museum of Technology)"
      },
      {
        "german": "warme Kleidung tragen müssen",
        "english": "need to wear warm clothes"
      },
      {
        "german": "Ich war schon mehrmals dort.",
        "english": "I have been there more than once."
      },
      {
        "german": "Das musst du unbedingt sehen!",
        "english": "You must see it by all means!"
      },
      {
        "german": "Ich hätte gern ein paar Informationen über (den Zoo Leipzig).",
        "english": "I would like to have some information about (the Leipzig Zoo)."
      },
      {
        "german": "Bin ich da bei Ihnen richtig?",
        "english": "Am I talking to the right person?"
      },
      {
        "german": "Ich brauche bitte eine Auskunft zu (Öffnungszeiten und Preisen).",
        "english": "I would like to know (the opening times and the prices)."
      },
      {
        "german": "Wann hat (das Museum) geöffnet?",
        "english": "When is (the museum) open?"
      },
      {
        "german": "Hat (das Museum) jeden Tag geöffnet?",
        "english": "Is (the museum) open every day?"
      },
      {
        "german": "Wie viel kostet eine Eintrittskarte (für Erwachsene/für Kinder)?",
        "english": "How much does an entrance ticket cost (for adults/children)?"
      },
      {
        "german": "Was gibt es im Moment für besondere Attraktionen (im Zoo)?",
        "english": "What kind of special attractions are there (at the zoo)?"
      },
      {
        "german": "Gibt es eine Sonderausstellung?",
        "english": "Is there a special exhibition?"
      },
      {
        "german": "Gibt es auch ein Restaurant?",
        "english": "Is there also a restaurant?"
      },
      {
        "german": "Wie lange dauert der Ausflug/die Führung?",
        "english": "How long does the trip/guided tour take?"
      },
      {
        "german": "Was kann man erleben/sehen?",
        "english": "What can you experience/see?"
      },
      {
        "german": "Gibt es Parkplätze?",
        "english": "Are there parking spaces?"
      },
      {
        "german": "Darf man Hunde mitnehmen?",
        "english": "Is taking a dog with you allowed?"
      },
      {
        "german": "Das klingt sehr gut. Vielen Dank für die Informationen.",
        "english": "This sounds perfect. Many thanks for the information."
      },
      {
        "german": "Tiere faszinierend finden",
        "english": "find animals fascinating"
      },
      {
        "german": "ein Haustier/ein Lieblingstier haben",
        "english": "have a pet/favourite animal"
      },
      {
        "german": "vor Tieren Angst haben",
        "english": "be scared of animals"
      },
      {
        "german": "die Ameise, der Affe, der Bär, der Fisch, der Hund, der Löwe, die Maus, die Mücke, das Pferd, die Schlange, die Spinne, der Wal",
        "english": "ant, monkey, bear, fish, dog, lion, mouse, mosquito, horse, snake, spider, whale"
      },
      {
        "german": "Tipps zur gesunden Ernährung geben",
        "english": "give tips for a healthy diet"
      },
      {
        "german": "ein Lieblingsgericht haben",
        "english": "have a favourite dish"
      },
      {
        "german": "am liebsten (Nudeln) essen",
        "english": "like (pasta) the most"
      },
      {
        "german": "Vegetarier sein",
        "english": "be vegetarian"
      },
      {
        "german": "täglich (Fleisch/Obst und Gemüse) essen",
        "english": "eat (meat/fruit and vegetables) every day"
      },
      {
        "german": "Süßigkeiten mögen",
        "english": "like sweets"
      },
      {
        "german": "nach eigenen Angaben gut kochen können",
        "english": "cook well according to one's own opinion"
      },
      {
        "german": "(die eigenen Kochkünste) loben",
        "english": "praise (one's own cooking)"
      },
      {
        "german": "Essen/Mahlzeiten selbst/frisch kochen",
        "english": "cook food/meals oneself/fresh"
      },
      {
        "german": "Fertiggerichte kaufen/essen",
        "english": "buy/eat ready-made meals"
      },
      {
        "german": "Lebensmittel im Supermarkt/auf dem Markt/beim Biobauern kaufen",
        "english": "buy food at the supermarket/at the market/from an organic farmer"
      },
      {
        "german": "eine große Rolle (beim Einkaufen) spielen",
        "english": "play an important role (in shopping)"
      },
      {
        "german": "auf die Qualität/die Herkunft/den Preis der Lebensmittel achten",
        "english": "pay attention to the quality/origin/price of the food"
      },
      {
        "german": "im Internet nach (Produktinformationen) suchen",
        "english": "look for (product information) on the Internet"
      },
      {
        "german": "Preise vergleichen",
        "english": "compare prices"
      },
      {
        "german": "neben dem Essen fernsehen",
        "english": "watch TV while eating"
      },
      {
        "german": "zu wenig Zeit für gesunde Ernährung haben",
        "english": "have not enough time to eat healthy"
      },
      {
        "german": "Obst: der Apfel, die Erdbeere, die Birne",
        "english": "Fruit: apple, strawberry, pear"
      },
      {
        "german": "Gemüse: die Tomate, die Gurke, der Kohl",
        "english": "Vegetables: tomato, cucumber, cabbage"
      },
      {
        "german": "Fleisch: das Rindfleisch, das Schweinefleisch",
        "english": "Meat: beef, pork"
      },
      {
        "german": "Fisch: der Hering, der Lachs",
        "english": "Fish: herring, salmon"
      },
      {
        "german": "Milchprodukte: der Joghurt, die Sahne",
        "english": "Dairy products: yoghurt, cream"
      },
      {
        "german": "Getreideprodukte: die Nudeln, das Brot",
        "english": "Cereal products: pasta, bread"
      },
      {
        "german": "Backwaren: der Kuchen, der Keks",
        "english": "Bakery products: cake, biscuit"
      },
      {
        "german": "einen Michelin-Stern bekommen",
        "english": "receive a Michelin star"
      },
      {
        "german": "ein Geheimtipp sein",
        "english": "be an insider's tip"
      },
      {
        "german": "zu den großen Köchen gehören",
        "english": "count amongst the well-known chefs"
      },
      {
        "german": "den Eltern beim Kochen zusehen",
        "english": "watch the parents when they are cooking"
      },
      {
        "german": "die/mit der Ausbildung beginnen",
        "english": "start one's training"
      },
      {
        "german": "das Studium abbrechen",
        "english": "drop out of university"
      },
      {
        "german": "eine Idee realisieren",
        "english": "realise a dream"
      },
      {
        "german": "ein Restaurant eröffnen",
        "english": "open a restaurant"
      },
      {
        "german": "gern/oft nach Rezept kochen",
        "english": "like to/often cook from a recipe"
      },
      {
        "german": "(Salat) waschen",
        "english": "wash (lettuce)"
      },
      {
        "german": "(Zwiebeln) schneiden",
        "english": "cut (onions)"
      },
      {
        "german": "(Brot) backen",
        "english": "bake (bread)"
      },
      {
        "german": "(Fleisch) anbraten/braten",
        "english": "cook (fish)"
      },
      {
        "german": "(Kartoffeln) kochen",
        "english": "boil (potato)"
      },
      {
        "german": "(das Gericht) würzen",
        "english": "spice (the dish)"
      },
      {
        "german": "Was darf es sein?",
        "english": "What would you like?"
      },
      {
        "german": "Ich möchte bitte/hätte gern/brauche (2 Kilo Rindfleisch).",
        "english": "I'd like to have (2 kilos of beef)."
      },
      {
        "german": "Möchten Sie noch etwas?/Kommt noch was dazu?",
        "english": "Would you like anything else?"
      },
      {
        "german": "Ich nehme/möchte noch (Käse mit frischen Kräutern).",
        "english": "I would also take/like (cheese with fresh herbs)."
      },
      {
        "german": "Wie viel darf es denn sein? (100 Gramm, ein halbes Kilo, ein Kilo).",
        "english": "How much would you like of it? (100 grams, half a kilo, one kilo)."
      },
      {
        "german": "Wir haben heute (Schinken) im Angebot. Möchten Sie mal probieren?",
        "english": "We have (ham) on offer today. Would you like to try?"
      },
      {
        "german": "Ja, gerne. (Der Schinken) schmeckt gut./Nein, danke.",
        "english": "Yes, please. (The ham) tastes good./No, thank you."
      },
      {
        "german": "(Diese Tomaten) sehen gut aus. Wie viel kosten (die Tomaten)?",
        "english": "(These tomatoes) look nice. How much do (the tomatoes) cost?"
      },
      {
        "german": "(2,50 Euro).",
        "english": "(2,50 euros)."
      },
      {
        "german": "Ist das alles?",
        "english": "Is that it?"
      },
      {
        "german": "Ja, das ist alles.",
        "english": "Yes, that's it."
      },
      {
        "german": "Das macht (27,90 Euro)./Dann bekomme ich (27,90 Euro).",
        "english": "That's (27,90 euros)./(27,90 Euro), please."
      },
      {
        "german": "Haben Sie reserviert?",
        "english": "Did you make a reservation?"
      },
      {
        "german": "Ich habe einen Tisch für zwei Personen reserviert, auf den Namen (Lange).",
        "english": "I have a table for two persons for (Lange)."
      },
      {
        "german": "Ich möchte lieber (am Fenster) sitzen.",
        "english": "We would prefer to sit (at the window)."
      },
      {
        "german": "Was möchten Sie essen/trinken?/Haben Sie schon gewählt?",
        "english": "What would you like to eat/drink?/Have you decided yet?"
      },
      {
        "german": "Ich hätte gern/Ich möchte/Ich nehme (das Schnitzel mit Kartoffelsalat).",
        "english": "I would like to have/I would like/I will take (the schnitzel with potato salad)."
      },
      {
        "german": "Ich trinke (ein Mineralwasser).",
        "english": "I will take a (mineral water)."
      },
      {
        "german": "Haben Sie meine Bestellung vergessen?",
        "english": "Have you forgotten about my order?"
      },
      {
        "german": "Guten Appetit!/Prost!/Zum Wohl!",
        "english": "Enjoy your meal!/Cheers!/Cheers!"
      },
      {
        "german": "Kann ich bitte noch (etwas Salz) haben?",
        "english": "Can I have (some more salt) please?"
      },
      {
        "german": "Hat es Ihnen geschmeckt?/Waren Sie mit dem Essen zufrieden?",
        "english": "How did you like your food? Are you satisfied with the food?"
      },
      {
        "german": "Das Essen war hervorragend/köstlich/sehr gut.",
        "english": "The food was excellent/delicious/very good."
      },
      {
        "german": "Wir möchten dann zahlen/bezahlen./Wir hätten gern die Rechnung.",
        "english": "We would like to pay then./Can we have the bill?"
      },
      {
        "german": "Zahlen Sie zusammen oder getrennt?",
        "english": "Would you like to pay together or separately?"
      },
      {
        "german": "E-Mails öffnen/checken/lesen/beantworten/löschen/weiterleiten/ausdrucken",
        "english": "open/check/read/answer/delete/forward/print out e-mails"
      },
      {
        "german": "eine dringende Anfrage beantworten",
        "english": "answer an urgent inquiry"
      },
      {
        "german": "etwas kopieren/am Kopierer stehen",
        "english": "copy something/stand next to the copy machine"
      },
      {
        "german": "Excel-Tabellen erstellen",
        "english": "create Excel tables"
      },
      {
        "german": "etwas kalkulieren",
        "english": "calculate something"
      },
      {
        "german": "Termine vereinbaren/verschieben/absagen",
        "english": "make/postpone/cancel appointments"
      },
      {
        "german": "(Dienst-)Reisen organisieren/buchen/machen",
        "english": "organise/book/do (business) trips"
      },
      {
        "german": "an Besprechungen/Sitzungen teilnehmen",
        "english": "attend meetings"
      },
      {
        "german": "in (unproduktiven) Meetings sitzen",
        "english": "sit in (unproductive) meetings"
      },
      {
        "german": "Protokolle/Berichte/Rechnungen schreiben",
        "english": "write the minutes/reports/invoices"
      },
      {
        "german": "Dokumente/Berichte lesen/übersetzen",
        "english": "read/translate documents/reports"
      },
      {
        "german": "Kunden empfangen/beraten",
        "english": "receive/advise clients"
      },
      {
        "german": "Geburtstage mit Kollegen feiern",
        "english": "celebrate birthdays with colleagues"
      },
      {
        "german": "in der Kantine/am Schreibtisch essen",
        "english": "eat in the canteen/at your desk"
      },
      {
        "german": "an einem Geschäftsessen teilnehmen",
        "english": "attend a lunch/dinner meeting"
      },
      {
        "german": "mit Kollegen über andere Personen oder über Privates reden",
        "english": "talk with colleagues about other people or about private things"
      },
      {
        "german": "Nachrichten in Online-Netzwerken lesen",
        "english": "read the news on online portals"
      },
      {
        "german": "nebenbei aufs Handy schauen",
        "english": "look at your mobile phone casually"
      },
      {
        "german": "im Internet surfen",
        "english": "surf the Internet"
      },
      {
        "german": "online einkaufen",
        "english": "shop online"
      },
      {
        "german": "Pause/Überstunden machen",
        "english": "have a break/do extra hours"
      },
      {
        "german": "Gästen einen Kaffee anbieten",
        "english": "offer a coffee to the guests"
      },
      {
        "german": "der Praktikantin das Haus zeigen",
        "english": "show the house to the trainee"
      },
      {
        "german": "dem Informatiker die Fehlerliste schicken",
        "english": "send the bug list to the IT specialist"
      },
      {
        "german": "der neuen Mitarbeiterin den Kopierer erklären",
        "english": "explain to the new colleague how the copy machine works"
      },
      {
        "german": "Ich möchte einen Termin vereinbaren.",
        "english": "I'd like to make an appointment."
      },
      {
        "german": "Wann haben Sie Zeit?",
        "english": "When do you have time?"
      },
      {
        "german": "Haben Sie (am Mittwoch um 15.00 Uhr) Zeit?",
        "english": "Do you have time (on Wednesday at 3 P.M.)?"
      },
      {
        "german": "Passt es Ihnen (am Mittwoch)?",
        "english": "Does (Wednesday) suit you?"
      },
      {
        "german": "Geht es vielleicht etwas eher/später? Zum Beispiel (am Donnerstag)?",
        "english": "Would it be possible to meet earlier/later? On (Thursday) for example?"
      },
      {
        "german": "Das ist auch möglich.",
        "english": "That's also possible."
      },
      {
        "german": "(Am Donnerstag) passt es mir.",
        "english": "(Thursday) suits me alright."
      },
      {
        "german": "Tut mir leid, das ist leider nicht möglich.",
        "english": "I'm sorry but that's not possible."
      },
      {
        "german": "Wir haben (am Mittwoch um 15.00 Uhr) einen Termin. Können wir den Termin verschieben?",
        "english": "We have an appointment (on Wednesday at 3 P.M.). Can we postpone the appointment?"
      },
      {
        "german": "Vielen Dank für Ihr Verständnis.",
        "english": "Many thanks for your understanding."
      },
      {
        "german": "Was kann ich für Sie tun?",
        "english": "What can I do for you?"
      },
      {
        "german": "Kann ich bitte (Frau Stein) sprechen?",
        "english": "Can I please talk to (Mrs. Stein)?"
      },
      {
        "german": "Ich möchte bitte (Herrn Grün) sprechen.",
        "english": "I would like to talk to (Mr. Grün) please."
      },
      {
        "german": "(Frau Stein/Herr Grün) is nicht im Büro. Kann ich ihr/ihm etwas ausrichten?",
        "english": "(Mrs. Stein/Mr. Grün) is not in the office. Can I take a message?"
      },
      {
        "german": "Bitte richten Sie ihr/ihm aus, dass (die Dokumente noch nicht angekommen sind.) Sie/Er soll mich bitte zurückrufen.",
        "english": "Please tell her/him that (the documents haven't arrived yet.) She/He should call me back."
      },
      {
        "german": "Unter welcher Telefonnummer kann (Frau Stein) Sie erreichen?",
        "english": "At which number can (Mrs. Stein) reach you?"
      },
      {
        "german": "Sie erreicht mich unter der Nummer (12 34 56).",
        "english": "She can reach me at (12 34 56)."
      },
      {
        "german": "Können Sie mich mit (Frau Lorenz) verbinden?",
        "english": "Can you put me through to (Mrs. Lorenz)?"
      },
      {
        "german": "Einen Moment, ich verbinde Sie.",
        "english": "One moment please, I'll put you through."
      },
      {
        "german": "Worum geht es?",
        "english": "What is it about?"
      },
      {
        "german": "Es geht um (eine Reparatur).",
        "english": "It's about (repair work)."
      },
      {
        "german": "Wo liegt das Problem?",
        "english": "What's the problem?"
      },
      {
        "german": "Unser (3D-Drucker) ist kaputt.",
        "english": "Our (3D printer) is not working."
      },
      {
        "german": "Wie kann ich Ihnen helfen?",
        "english": "How can I help you?"
      },
      {
        "german": "Wir brauchen (einen Monteur).",
        "english": "We need (a repairman)."
      },
      {
        "german": "Ich informiere Sie so schnell wie möglich über die genaue Uhrzeit.",
        "english": "I'll let you know the time as soon as possible."
      },
      {
        "german": "Vielen Dank für Ihre Hilfe.",
        "english": "Many thanks for your help."
      },
      {
        "german": "Gern geschehen.",
        "english": "You're welcome."
      },
      {
        "german": "Auf Wiederhören.",
        "english": "Goodbye."
      },
      {
        "german": "jemanden grüßen",
        "english": "greet somebody"
      },
      {
        "german": "jemandem die Hand geben",
        "english": "shake hands with somebody"
      },
      {
        "german": "du/Sie sagen",
        "english": "say du/Sie be on an informal/formal basis"
      },
      {
        "german": "Hierarchien beachten",
        "english": "observe hierarchy"
      },
      {
        "german": "zu Terminen pünktlich kommen",
        "english": "be on time for appointments"
      },
      {
        "german": "beim Smalltalk nicht über private Probleme, Krankheit, Politik und Religion reden",
        "english": "not to talk about private problems, illness, politics and religion during small-talk"
      },
      {
        "german": "schnell mit dem geschäftlichen Teil des Gesprächs beginnen",
        "english": "get to talking about business fast"
      },
      {
        "german": "erst zuhören, dann reden",
        "english": "first listen, then speak"
      },
      {
        "german": "um 7.30 Uhr aufstehen",
        "english": "get up at 7.30"
      },
      {
        "german": "sich waschen",
        "english": "wash oneself"
      },
      {
        "german": "sich duschen",
        "english": "take a shower"
      },
      {
        "german": "sich anziehen",
        "english": "get dressed"
      },
      {
        "german": "frühstücken",
        "english": "have breakfast"
      },
      {
        "german": "zur Uni/zur Arbeit/ins Büro fahren",
        "english": "go to the university/to work/to the office"
      },
      {
        "german": "sich (mit Freunden/Kollegen/dem Chef) unterhalten",
        "english": "chat (with friends/colleagues/the manager)"
      },
      {
        "german": "sich (mit Freunden/Kollegen/dem Chef) treffen",
        "english": "meet (with friends/colleagues/the manager)"
      },
      {
        "german": "sich (auf eine Präsentation/eine Besprechung/eine Prüfung) vorbereiten",
        "english": "prepare (for a presentation/a meeting/an exam)"
      },
      {
        "german": "sich (mit einem Thema) beschäftigen",
        "english": "work (on a topic), study (a topic)"
      },
      {
        "german": "einen Vortrag halten",
        "english": "give a presentation"
      },
      {
        "german": "sich (über die Technik) ärgern",
        "english": "be/get annoyed (about technology)"
      },
      {
        "german": "sich (mit dem Freund) streiten",
        "english": "fight (with a friend)"
      },
      {
        "german": "sich (in Anna) verlieben",
        "english": "fall in love (with Anna)"
      },
      {
        "german": "sich (für einen Kurs) einschreiben",
        "english": "enrol (in a course)"
      },
      {
        "german": "sich (zum Kurs) anmelden",
        "english": "register (for a course)"
      },
      {
        "german": "sich (für die französische Sprache) interessieren",
        "english": "be interested (in the French language)"
      },
      {
        "german": "sich (auf den Unterricht) freuen",
        "english": "look forward to (having a class)"
      },
      {
        "german": "sich (nach der Arbeit) entspannen",
        "english": "relax (after work)"
      },
      {
        "german": "Es passiert immer das Gleiche.",
        "english": "It's the same all the time."
      },
      {
        "german": "ein Alleskönner/Ansprechpartner sein",
        "english": "be an all-rounder/a contact person"
      },
      {
        "german": "Termine koordinieren",
        "english": "coordinate appointments"
      },
      {
        "german": "Telefongespräche führen",
        "english": "conduct telephone conversations"
      },
      {
        "german": "die Abrechnung machen",
        "english": "make the billing"
      },
      {
        "german": "Waren prüfen/sortieren/präsentieren",
        "english": "check/sort/present products"
      },
      {
        "german": "Bestellungen aufgeben",
        "english": "place orders"
      },
      {
        "german": "eine Liste erstellen",
        "english": "compose a list"
      },
      {
        "german": "Autos reparieren",
        "english": "repair cars"
      },
      {
        "german": "sich regelmäßig weiterbilden",
        "english": "attend workshops on a regular basis"
      },
      {
        "german": "gute Sprachkenntnisse/Karrierechancen haben",
        "english": "have good language skills/career opportunities"
      },
      {
        "german": "sich mit Gesetzen und Normen beschäftigen",
        "english": "be concerned/work with law and norms"
      },
      {
        "german": "Aufgaben im Management übernehmen",
        "english": "execute management tasks"
      },
      {
        "german": "Maschinen und Anlagen überwachen",
        "english": "supervise machines and systems"
      },
      {
        "german": "Produkte entwickeln",
        "english": "develop products"
      },
      {
        "german": "kranke Menschen behandeln",
        "english": "treat ill people"
      },
      {
        "german": "ältere Menschen unterstützen/betreuen",
        "english": "support/look after elderly people"
      },
      {
        "german": "Senioren beim Anziehen helfen",
        "english": "help seniors to get dressed"
      },
      {
        "german": "sich an die Schulzeit erinnern",
        "english": "remember one's school time"
      },
      {
        "german": "(gern) in die Schule gehen",
        "english": "like going to school"
      },
      {
        "german": "einen Lieblingslehrer/eine Lieblingslehrerin/ein Lieblingsfach haben",
        "english": "have a favourite teacher/favourite (female) teacher/favourite subject"
      },
      {
        "german": "Hausaufgaben machen",
        "english": "do homework"
      },
      {
        "german": "einen Test schreiben",
        "english": "write a test"
      },
      {
        "german": "eine (gute/schlechte) Note bekommen",
        "english": "get (good/bad) marks"
      },
      {
        "german": "sich (auf den Sport/die Schule/das Lernen) konzentrieren",
        "english": "concentrate (on sports/school/studying)"
      },
      {
        "german": "die Kinderkrippe/den Kindergarten/die Grundschule/die Hauptschule/die Realschule/das Gymnasium besuchen",
        "english": "go to the crèche/kindergarten/primary school/secondary school (where you also learn a profession)/highschool"
      },
      {
        "german": "für eine Prüfung lernen",
        "english": "study for an exam"
      },
      {
        "german": "die Prüfung bestehen",
        "english": "pass the exam"
      },
      {
        "german": "die Schule (mit dem Abitur) abschließen",
        "english": "finish school (with an A level)"
      },
      {
        "german": "das Abitur/einen Abschluss machen",
        "english": "pass the A level/get a degree"
      },
      {
        "german": "Schul-/Studiengebühren verlangen",
        "english": "charge tuition fees"
      },
      {
        "german": "die allgemeine Hochschulreife besitzen",
        "english": "have the A level"
      },
      {
        "german": "ein Studium aufnehmen",
        "english": "take up studies"
      },
      {
        "german": "an einer Universität/Hochschule studieren",
        "english": "study at a university/technical university"
      },
      {
        "german": "Studiengänge anbieten",
        "english": "offer study programmes"
      },
      {
        "german": "sich an einer Universität/für ein Studienfach einschreiben",
        "english": "enrol at a university/in a field of study"
      },
      {
        "german": "Vorlesungen und Seminare haben",
        "english": "have lectures and seminars"
      },
      {
        "german": "Das Studienjahr ist in Semester unterteilt.",
        "english": "The study year is divided into semesters."
      },
      {
        "german": "ein Praktikum machen/absolvieren",
        "english": "make/complete an internship"
      },
      {
        "german": "sich um einen Praktikumsplatz/eine Stelle bewerben",
        "english": "apply for an internship/a position"
      },
      {
        "german": "eine Bewerbung/einen Lebenslauf schreiben",
        "english": "write an application/a CV"
      },
      {
        "german": "sich gut/glücklich/am glücklichsten fühlen",
        "english": "feel happy/happier/the happiest"
      },
      {
        "german": "zufrieden/glücklich sein",
        "english": "be pleased/happy"
      },
      {
        "german": "Studien zeigen, dass …",
        "english": "Studies have shown that …"
      },
      {
        "german": "nach Meinung der Wissenschaftler",
        "english": "according to scientists"
      },
      {
        "german": "großen Einfluss auf das Glück haben",
        "english": "have a major influence on happiness"
      },
      {
        "german": "zu den Glücksfaktoren zählen",
        "english": "count amongst the criteria for happiness"
      },
      {
        "german": "eine Rolle spielen",
        "english": "play a role"
      },
      {
        "german": "Geld verdienen",
        "english": "earn money"
      },
      {
        "german": "einen festen Partner, eine liebevolle Familie haben",
        "english": "have a stable partner, a loving family"
      },
      {
        "german": "eine amüsante/sinnvolle Tätigkeit ausüben",
        "english": "carry out a meaningful activity"
      },
      {
        "german": "ehrenamtliche Aufgaben übernehmen",
        "english": "take on honorary tasks"
      },
      {
        "german": "materiell abgesichert sein",
        "english": "be safe financially"
      },
      {
        "german": "eine Voraussetzung für Zufriedenheit sein",
        "english": "be a prerequisite for happiness"
      },
      {
        "german": "Geld macht nicht glücklich.",
        "english": "Money does not make you happy."
      },
      {
        "german": "ein wahres Paradies (für Gourmets) sein",
        "english": "be a real paradise (for gourmets)"
      },
      {
        "german": "(im Herzen von Berlin) liegen",
        "english": "be located (in the heart of Berlin)"
      },
      {
        "german": "sich (im Zentrum von Berlin) befinden",
        "english": "be located (in the centre of Berlin)"
      },
      {
        "german": "ein Kaufhaus/ein Unternehmen gründen",
        "english": "found a department store/a company"
      },
      {
        "german": "auf eine lange Geschichte zurückblicken",
        "english": "have a rich history"
      },
      {
        "german": "verschiedene Eigentümer haben",
        "english": "have various owners"
      },
      {
        "german": "Die Baukosten betragen (4,5 Millionen).",
        "english": "Building costs amount to (4,5 million)."
      },
      {
        "german": "zur (Karstadt-Gruppe) gehören",
        "english": "belong to the (Karstadt Group)"
      },
      {
        "german": "viele Umbauten/Zerstörungen erleben",
        "english": "have been rebuilt and destroyed several times"
      },
      {
        "german": "zu den größten Kaufhäusern Europas zählen",
        "english": "count amongst the biggest department stores in Europe"
      },
      {
        "german": "Waren auf fünf Etagen (an)bieten",
        "english": "display products on five floors"
      },
      {
        "german": "das Angebot erweitern",
        "english": "expand the choice"
      },
      {
        "german": "eine ausgezeichnete (Musik-)Abteilung haben",
        "english": "have an excellent (music) department"
      },
      {
        "german": "aus einem großen Angebot auswählen können",
        "english": "be able to choose from a large selection"
      },
      {
        "german": "Bekleidung: die Hose, der Pullover",
        "english": "Clothing: pants, sweater"
      },
      {
        "german": "Delikatessen: der Schinken, der Kaviar",
        "english": "Delicacies: ham, caviar"
      },
      {
        "german": "Elektrogeräte: die Waschmaschine",
        "english": "Electric devices: washing machine"
      },
      {
        "german": "Haushaltswaren: der Kochtopf, das Geschirr",
        "english": "Household devices: cooking pot, crockery"
      },
      {
        "german": "Kosmetik: der Lippenstift, die Creme",
        "english": "Cosmetics: lipstick, cream"
      },
      {
        "german": "Lederwaren: die Tasche",
        "english": "Leather products: bag"
      },
      {
        "german": "Möbel: der Schreibtisch",
        "english": "Furniture: desk"
      },
      {
        "german": "Schmuck: die Ohrringe",
        "english": "Jewellery: earrings"
      },
      {
        "german": "Spielwaren: der Teddy",
        "english": "Toys: teddy bear"
      },
      {
        "german": "Sport und Freizeit: die Sportschuhe",
        "english": "Sports and free time: sports shoes"
      },
      {
        "german": "zusammenleben",
        "english": "live together"
      },
      {
        "german": "jemanden heiraten",
        "english": "marry somebody"
      },
      {
        "german": "jemandem einen Heiratsantrag machen",
        "english": "propose to somebody"
      },
      {
        "german": "ein alter Brauch sein",
        "english": "be an old tradition"
      },
      {
        "german": "zusammen feiern",
        "english": "celebrate together"
      },
      {
        "german": "das Standesamt, die Trauung, die Trauzeugen, die Braut, der Bräutigam",
        "english": "registry office, wedding ceremony, witnesses to a marriage, bride, groom"
      },
      {
        "german": "aus Liebe/aus finanziellen Gründen heiraten",
        "english": "get married for love/financial reasons"
      },
      {
        "german": "bei der Hochzeitsfeier die Hochzeitstorte anschneiden",
        "english": "cut the wedding cake at the wedding party"
      },
      {
        "german": "Das Heiratsalter steigt.",
        "english": "The age where people get married is increasing."
      },
      {
        "german": "jemanden zur Hochzeit einladen",
        "english": "invite someone to the wedding"
      },
      {
        "german": "(dem Brautpaar) etwas schenken",
        "english": "give a present (to the bridal couple)"
      },
      {
        "german": "(dem Brautpaar) zur Hochzeit gratulieren",
        "english": "congratulate (the bridal couple)"
      },
      {
        "german": "Viele Ehen halten nicht.",
        "english": "Many marriages don't last."
      },
      {
        "german": "Die Scheidungsquote liegt bei 45 %.",
        "english": "The divorce rate is about 45 %."
      },
      {
        "german": "Die Quote sinkt.",
        "english": "The rate is decreasing."
      },
      {
        "german": "sich von jemandem scheiden lassen",
        "english": "get a divorce from somebody"
      },
      {
        "german": "Familienstand: ledig, verlobt, verheiratet, zusammenwohnend, geschieden",
        "english": "Family situation: single, engaged, married, living together (in a partnership), divorced"
      },
      {
        "german": "Verwandte: Schwägerin/Schwager, Schwiegermutter/Schwiegervater, Nichte/Neffe, Cousine/Cousin, Enkelin/Enkel",
        "english": "Relatives: sister-in-law/brother-in-law, mother-in-law/father-in-law, niece/nephew, (female) cousin/(male) cousin, granddaughter/grandson"
      },
      {
        "german": "Ich hätte gern/Ich suche (ein Paar Sportschuhe).",
        "english": "I would like to have/I'm looking for (sports shoes)."
      },
      {
        "german": "Welche Größe haben Sie?",
        "english": "What is your size?"
      },
      {
        "german": "Ich habe Größe (43).",
        "english": "I have size (43)."
      },
      {
        "german": "In welcher Farbe?/Welche Farbe möchten Sie?",
        "english": "Which colour?/Which colour would you like?"
      },
      {
        "german": "(Weiß) finde ich gut.",
        "english": "(White) would be nice. (lit: I find (white) okay.)"
      },
      {
        "german": "Kann ich (die Schuhe) einmal anprobieren?",
        "english": "Can I try (the shoes) on?"
      },
      {
        "german": "Ja, gerne.",
        "english": "Sure."
      },
      {
        "german": "(Die Schuhe) passen mir nicht richtig. Sie sind zu groß/zu klein.",
        "english": "(These shoes) don't really fit. They are too big/small."
      },
      {
        "german": "Haben Sie (die Schuhe) noch in einer anderen Größe?",
        "english": "Do you have (these shoes) in another size?"
      },
      {
        "german": "Hier sind (die Schuhe) eine Nummer größer/kleiner.",
        "english": "(These shoes) here are one size bigger/smaller."
      },
      {
        "german": "Wie viel kosten (die Schuhe)?",
        "english": "What do (the shoes) cost?"
      },
      {
        "german": "Gebenden Sie auch einen Rabatt?",
        "english": "Can I get a discount?"
      },
      {
        "german": "Tut mir leid. Auf diesen Artikel gibt es keinen Rabatt.",
        "english": "I'm sorry. There is no discount for this item."
      },
      {
        "german": "Ich überlege mir das noch einmal.",
        "english": "I'll think about it."
      },
      {
        "german": "eine Fremdsprache/die Sprachen der Nachbarländer (fließend) sprechen",
        "english": "speak a foreign language/the languages of the neighbouring countries (fluently)"
      },
      {
        "german": "etwas beim Sprachenlernen wichtig finden",
        "english": "find something important when learning a language"
      },
      {
        "german": "eine Sprache aus Spaß/aus Interesse/aus beruflichen Gründen lernen",
        "english": "learn a language for fun/out of interest/for professional reasons"
      },
      {
        "german": "einen Vortrag (auf Deutsch) halten",
        "english": "give a lecture (in German)"
      },
      {
        "german": "ein vertrauliches Dokument (ins Englische) übersetzen",
        "english": "translate a confidential document (into English)"
      },
      {
        "german": "als Übersetzer arbeiten",
        "english": "work as a translator"
      },
      {
        "german": "einen Auftrag übernehmen",
        "english": "accept an assignment"
      },
      {
        "german": "drei Amtssprachen sprechen müssen",
        "english": "must speak three official languages"
      },
      {
        "german": "sich (auf Deutsch) unterhalten",
        "english": "have a conversation (in German)"
      },
      {
        "german": "eine Sprache/alles wieder vergessen",
        "english": "forget a language/everything again"
      },
      {
        "german": "ein Sprachgenie sein",
        "english": "be a linguistic genius, have a special gift for languages"
      },
      {
        "german": "mit guten Sprachkenntnissen die Chancen auf dem Arbeitsmarkt verbessern",
        "english": "improve one's chances in the job market thanks to good language skills"
      },
      {
        "german": "besser kommunizieren können",
        "english": "be able to better communicate"
      },
      {
        "german": "sich in der Freizeit mit Sprachen beschäftigen",
        "english": "learn languages in one's free time"
      },
      {
        "german": "Filme in der Originalsprache sehen",
        "english": "watch films in the original language"
      },
      {
        "german": "mit Freunden (auf Russisch) chatten",
        "english": "chat with friends (in Russian)"
      },
      {
        "german": "Nachrichten verstehen/in der Zielsprache hören",
        "english": "understand the news/listen to the news in the target language"
      },
      {
        "german": "(keine) Angst vor Fehlern haben",
        "english": "be (un)afraid of making mistakes"
      },
      {
        "german": "den persönlichen Lernstil finden",
        "english": "find your personal learning style"
      },
      {
        "german": "sich (nicht) über lange Wörter ärgern",
        "english": "(not) get annoyed by long words"
      },
      {
        "german": "das Internet nutzen",
        "english": "use the Internet"
      },
      {
        "german": "nach Informationen (auf Deutsch) suchen",
        "english": "look for information (in German)"
      },
      {
        "german": "Texte über interessante Themen lesen",
        "english": "read texts about interesting topics"
      },
      {
        "german": "sich Wörter besser merken",
        "english": "memorise words more easily"
      },
      {
        "german": "im Wald Pilze suchen",
        "english": "look for mushrooms in the woods"
      },
      {
        "german": "auf der Wiese Blumen pflücken/Picknick machen",
        "english": "pick flowers on the meadow/have a picnic"
      },
      {
        "german": "im Park spazieren gehen",
        "english": "go for a walk in the park"
      },
      {
        "german": "im Gebirge klettern/auf einen Berg steigen",
        "english": "climb in the mountains/climb on a mountain"
      },
      {
        "german": "auf einem See rudern/Fische angeln",
        "english": "paddle in a sea/go fishing"
      },
      {
        "german": "im Meer schwimmen/tauchen",
        "english": "swim/dive in the sea"
      },
      {
        "german": "auf dem Meer segeln",
        "english": "sail on the sea"
      },
      {
        "german": "auf einem Fluss Kajak fahren",
        "english": "kayak on a river"
      },
      {
        "german": "am Strand liegen/sich sonnen",
        "english": "lie on the beach/in the sun"
      },
      {
        "german": "auf Wanderwegen wandern",
        "english": "hike on trails"
      },
      {
        "german": "den Urlaub planen",
        "english": "make plans for the vacation"
      },
      {
        "german": "sich auf eine Reise vorbereiten",
        "english": "prepare for a trip"
      },
      {
        "german": "eine App herunterladen",
        "english": "download an app"
      },
      {
        "german": "eine Liste erstellen",
        "english": "make a list"
      },
      {
        "german": "andere Leute nach ihren Erfahrungen fragen",
        "english": "ask other people about their experience"
      },
      {
        "german": "einen Abenteuerurlaub/einen Ausflug machen",
        "english": "go on an adventure holiday/an excursion"
      },
      {
        "german": "im Sommer (nach Kanada) fliegen",
        "english": "fly (to Canada) in the summer"
      },
      {
        "german": "am liebsten (in ein warmes Land) fahren",
        "english": "travel preferably (to a warm country)"
      },
      {
        "german": "Abenteuer erleben",
        "english": "experience adventure"
      },
      {
        "german": "(Bären) beobachten",
        "english": "observe (bears)"
      },
      {
        "german": "das land (mit dem Auto) entdecken",
        "english": "discover the country (by car)"
      },
      {
        "german": "die Insel (mit dem Fahrrad) erkunden",
        "english": "explore the island (by bike)"
      },
      {
        "german": "sich im Urlaub erholen",
        "english": "recover during the vacation"
      },
      {
        "german": "Wärme/gute Hotels/leckeres Essen mögen",
        "english": "like warm weather/good hotels/good food"
      },
      {
        "german": "am Pool liegen",
        "english": "lie at the swimming pool"
      },
      {
        "german": "etwas langweilig finden",
        "english": "find something boring"
      },
      {
        "german": "nichts tun",
        "english": "do nothing"
      },
      {
        "german": "Städte besichtigen",
        "english": "visit cities"
      },
      {
        "german": "sich über das Urlaubsland informieren",
        "english": "get information about the destination country"
      },
      {
        "german": "in Deutschland/zu Hause bleiben",
        "english": "stay in Germany/at home"
      },
      {
        "german": "viel/wenig Gepäck mitnehmen",
        "english": "take a lot/little luggage"
      },
      {
        "german": "jemandem aus dem Urlaub ein Geschenk mitbringen",
        "english": "bring somebody back a gift from vacation"
      },
      {
        "german": "das beliebteste Verkehrsmittel für Urlaubsreisen sein/bleiben",
        "english": "be/remain the most popular means of transport for holiday trips"
      },
      {
        "german": "das Flugzeug benutzen",
        "english": "use the plane"
      },
      {
        "german": "einen Linienflug buchen",
        "english": "book a (scheduled) flight"
      },
      {
        "german": "mit der Fähre (nach Schweden) fahren",
        "english": "take the ferry (to Sweden)"
      },
      {
        "german": "mit dem Bus/dem Schiff reisen",
        "english": "take the bus/boat"
      },
      {
        "german": "ein Auto mieten",
        "english": "rent a car"
      },
      {
        "german": "das Auto stehen lassen",
        "english": "leave the car (somewhere)"
      },
      {
        "german": "stundenlang im Stau stehen",
        "english": "spend hours in traffic jams"
      },
      {
        "german": "Verspätung haben",
        "english": "be delayed"
      },
      {
        "german": "das Gepäck nicht unbeaufsichtigt lassen",
        "english": "leave the luggage unattended"
      },
      {
        "german": "zu einem Gate/Flugsteig gehen",
        "english": "go to a gate"
      },
      {
        "german": "sich am Ausgang befinden",
        "english": "be located at the exit"
      },
      {
        "german": "von Gleis 4 abfahren",
        "english": "leave from platform 4"
      },
      {
        "german": "Ersatzbusse stehen zur Weiterfahrt bereit.",
        "english": "Replacement busses are available for further travel."
      },
      {
        "german": "Nachrichtensendungen im Fernsehen sehen",
        "english": "watch news programmes on TV"
      },
      {
        "german": "sich über aktuelle Politik informieren",
        "english": "get the latest political news"
      },
      {
        "german": "E-Mails checken",
        "english": "check one's e-mail"
      },
      {
        "german": "eine SMS senden",
        "english": "send an SMS"
      },
      {
        "german": "Informationen mit Freunden ausauschen",
        "english": "exchange information with friends"
      },
      {
        "german": "Musik im Radio hören",
        "english": "listen to music on the radio"
      },
      {
        "german": "ins Kino gehen",
        "english": "go to the cinema"
      },
      {
        "german": "Filme im Internet herunterladen",
        "english": "download films on the Internet"
      },
      {
        "german": "Fachzeitschriften lesen",
        "english": "read technical journals"
      },
      {
        "german": "Spiele auf dem Smartphone spielen",
        "english": "play games on the smartphone"
      },
      {
        "german": "gern/am liebsten Spielfilme, Dokumentarfilme, Serien, Shows, Reportagen, politische Magazine sehen",
        "english": "like to watch/watch preferably fiction, documentaries, series, shows, reports, political journals"
      },
      {
        "german": "sich für eine Sendung entscheiden",
        "english": "choose a programme"
      },
      {
        "german": "sehr beliebt sein",
        "english": "be very popular"
      },
      {
        "german": "wenige/viele/die meisten Zuschauer haben",
        "english": "have only a few/many/the most viewers"
      },
      {
        "german": "auf dem Spitzenplatz liegen",
        "english": "be on top of the list"
      },
      {
        "german": "auf Platz zwei folgen",
        "english": "follow on place two"
      },
      {
        "german": "Platz drei belegen",
        "english": "to come third place"
      },
      {
        "german": "ein/kein neuer Trend sein",
        "english": "(not) be a new trend"
      },
      {
        "german": "(keine) Überraschungen bieten",
        "english": "offer (no) surprises"
      },
      {
        "german": "Das Interesse an Sendungen steigt/sinkt.",
        "english": "The interest in programs is increasing/decreasing."
      },
      {
        "german": "der Bundestag; die Bundestagswahl",
        "english": "German parliament; parliamentary election"
      },
      {
        "german": "die Bundeskanzlerin/der Bundeskanzler",
        "english": "female Chancellor/male Chancellor"
      },
      {
        "german": "die Bundespräsidentin/der Bundespräsident",
        "english": "female president/male president of the Federal Republic"
      },
      {
        "german": "die Ministerin/der Minister",
        "english": "female minister/male minister"
      },
      {
        "german": "die/der Abgeordnete",
        "english": "female/male deputy"
      },
      {
        "german": "die Regierung",
        "english": "government"
      },
      {
        "german": "die Partei",
        "english": "(political) party"
      },
      {
        "german": "repräsentative Aufgaben übernehmen",
        "english": "take on representative tasks"
      },
      {
        "german": "die Bundesregierung vertreten",
        "english": "represent the federal government"
      },
      {
        "german": "Richtlinien der Politik bestimmen",
        "english": "determine the political guidelines"
      },
      {
        "german": "die Regierungsgeschäfte führen",
        "english": "manage government affairs"
      },
      {
        "german": "einen Kandidaten, eine Partei wählen",
        "english": "elect a candidate, a party"
      },
      {
        "german": "über Gesetze entscheiden",
        "english": "decide on legislation"
      },
      {
        "german": "das Grundgesetz (die Verfassung) ändern",
        "english": "modify the Constitution"
      },
      {
        "german": "über finanzielle Mittel bestimmen",
        "english": "decide about financial resources"
      },
      {
        "german": "den Einsatz der Bundeswehr kontrollieren",
        "english": "control the deployment of the Federal Armed Forces"
      },
      {
        "german": "mehrere Tätigkeiten gleichzeitig durchführen",
        "english": "do several activities at the same time"
      },
      {
        "german": "Dinge zur gleichen Zeit machen/tun",
        "english": "do several things at the same time"
      },
      {
        "german": "beim Fernsehen bügeln",
        "english": "iron while watching TV"
      },
      {
        "german": "beim Telefonieren mitschreiben",
        "english": "take notes while being on the phone"
      },
      {
        "german": "nur die Hälfte verstehen",
        "english": "understand only half of it"
      },
      {
        "german": "sich auf eine Sache konzentrieren",
        "english": "concentrate on one thing only"
      },
      {
        "german": "Eine Tätigkeit läuft automatisch ab.",
        "english": "An activity is carried out automatically."
      },
      {
        "german": "Die Leistungsfähigkeit sinkt.",
        "english": "The efficiency is decreasing."
      },
      {
        "german": "Die Fehlerquote steigt.",
        "english": "The error ratio is increasing."
      },
      {
        "german": "zu einem Ergebnis kommen",
        "english": "come to a result"
      },
      {
        "german": "sich für (Neuigkeiten aus dem Inland, aus dem Ausland, aus der Wirtschaft, aus Kunst und Kultur) interessieren",
        "english": "be interested in (national news, international news, economic news, news about art and culture)"
      },
      {
        "german": "neue Wohnungen fertigstellen/bauen",
        "english": "finish/build new flats"
      },
      {
        "german": "Maßnahmen treffen",
        "english": "take measures"
      },
      {
        "german": "an einer Besprechung teilnehmen",
        "english": "attend a meeting"
      },
      {
        "german": "Ergebnisse erwarten",
        "english": "expect results"
      },
      {
        "german": "unterschiedliche Folgen haben",
        "english": "have various consequences"
      },
      {
        "german": "mit (der finanziellen Situation) zufrieden sein",
        "english": "be happy (about one's financial situation)"
      },
      {
        "german": "Geld (auf der Bank) sparen",
        "english": "save money (at the bank)"
      },
      {
        "german": "Geld (für Reisen) ausgeben",
        "english": "spend money (on travelling)"
      },
      {
        "german": "Gewinn bringen",
        "english": "bring return on investment"
      },
      {
        "german": "Kunstwerke anbieten",
        "english": "offer works of art"
      },
      {
        "german": "einen Käufer finden",
        "english": "find a buyer"
      },
      {
        "german": "Kunst als Geldanlage sehen",
        "english": "see art as an investment"
      },
      {
        "german": "auf der Liste der gefährlichsten Tiere stehen",
        "english": "be on the list of the most dangerous animals"
      },
      {
        "german": "vor einer Gefahr warnen",
        "english": "warn against a danger"
      },
      {
        "german": "an einer Krankheit/durch Mückenstiche sterben",
        "english": "die from an illness/mosquito bites"
      },
      {
        "german": "tödliche Krankheiten übertragen",
        "english": "transmit deadly illnesses"
      },
      {
        "german": "ideale Lebensbedingungen (für Mücken) bieten",
        "english": "offer ideal living conditions (for mosquitos)"
      },
      {
        "german": "Gespräche finden statt.",
        "english": "Discussions take place."
      },
      {
        "german": "im Mittelpunkt stehen",
        "english": "be in focus, take centre stage"
      },
      {
        "german": "die Zusammenarbeit vertiefen und verbessern",
        "english": "consolidate and improve collaboration"
      },
      {
        "german": "zum Weltkulturerbe gehören",
        "english": "belong to the World Heritage"
      },
      {
        "german": "Bauwerke in die Liste des Weltkulturerbes aufnehmen",
        "english": "include buildings into the World Heritage List"
      },
      {
        "german": "großen Einfluss (auf die Architektur) haben",
        "english": "have a major influence (on architecture)"
      },
      {
        "german": "die Kriminalstatistik präsentieren",
        "english": "present the crime statistics"
      },
      {
        "german": "die gefährlichste Stadt in Deutschland sein",
        "english": "be the most dangerous city in Germany"
      },
      {
        "german": "ein Fußballspiel verlieren/gewinnen",
        "english": "lose/win a football game"
      },
      {
        "german": "Die Sonne scheint. Es ist wolkig. Es regnet.",
        "english": "The sun is shining. It's cloudy. It's raining."
      },
      {
        "german": "ein Spiel erfinden",
        "english": "invent a game/toy"
      },
      {
        "german": "von einer Firma stammen",
        "english": "come from a company"
      },
      {
        "german": "ein Medikament entwickeln",
        "english": "develop medication"
      },
      {
        "german": "Nebenwirkungen haben",
        "english": "have side effects"
      },
      {
        "german": "ein Getränk herstellen",
        "english": "produce a drink"
      },
      {
        "german": "Wirkungen untersuchen",
        "english": "examine effects"
      },
      {
        "german": "Experimente weiterführen",
        "english": "continue with experimenting"
      },
      {
        "german": "Resultate präsentieren",
        "english": "present results"
      },
      {
        "german": "70 Millionen Spiele verkaufen",
        "english": "sell 70 million games/toys"
      },
      {
        "german": "Leben retten",
        "english": "save lives"
      },
      {
        "german": "den Zahlungsverkehr revolutionieren",
        "english": "revolutionise payment transactions"
      },
      {
        "german": "eine Erfindung wichtig/nützlich finden",
        "english": "find an invention important/useful"
      },
      {
        "german": "eine wichtige Rolle im Alltag spielen",
        "english": "play an important role in everyday life"
      },
      {
        "german": "Die Vorschrift gilt bis heute.",
        "english": "The rule still applies."
      },
      {
        "german": "ein technisches Gerät nutzen/benutzen",
        "english": "use a technical device"
      },
      {
        "german": "die Bedienungsanleitung lesen",
        "english": "read the user's manual"
      },
      {
        "german": "ein Gerät anschalten",
        "english": "switch the device on"
      },
      {
        "german": "Geräte/eine Maschine bedienen",
        "english": "operate devices/a machine"
      },
      {
        "german": "ein Gerät mit dem Smartphone steuern",
        "english": "control a device by smartphone"
      },
      {
        "german": "ein Gerät an Wasser und Strom anschließen",
        "english": "connect a device to water and electricity"
      },
      {
        "german": "eine Tür öffnen/schließen",
        "english": "open/close a door"
      },
      {
        "german": "einen Knopf drehen",
        "english": "turn a button"
      },
      {
        "german": "ein Programm einstellen",
        "english": "set a program"
      },
      {
        "german": "etwas auf dem Display sehen",
        "english": "see something on the display"
      },
      {
        "german": "eine Taste drücken",
        "english": "press a key/button"
      },
      {
        "german": "ein Gerät reparieren lassen/reklamieren/umtauschen",
        "english": "have a device repaired/complain about/exchange"
      },
      {
        "german": "Garantie haben",
        "english": "have a warranty"
      },
      {
        "german": "den Kassenzettel mithaben/zeigen",
        "english": "have/show the receipt"
      },
      {
        "german": "sein Geld zurückbekommen",
        "english": "get one's money back"
      },
      {
        "german": "mit etwas einverstanden sein",
        "english": "agree with something"
      },
      {
        "german": "etwas vorschlagen",
        "english": "suggest something"
      },
      {
        "german": "beim Kauf auf (den Preis/das Design) achten",
        "english": "watch (the price/the design) when buying something"
      },
      {
        "german": "den Akku wechseln",
        "english": "change the battery"
      },
      {
        "german": "eine kürzere/längere Laufzeit haben",
        "english": "have a shorter/longer life span"
      },
      {
        "german": "eine Auftragsnummer durchgeben",
        "english": "give the tracking number"
      },
      {
        "german": "Kühlschrank, Herd, Geschirrspülmaschine, Kaffeemaschine, Mikrowelle, Bügeleisen, Waschmaschine",
        "english": "fridge, stove, dishwasher, coffee machine, microwave, iron, washing machine"
      },
      {
        "german": "Ich möchte bitte (Frau Klein) sprechen.",
        "english": "I would like to talk to (Mrs. Klein), please."
      },
      {
        "german": "Könnte ich bitte (Frau Klein) sprechen?",
        "english": "Could I talk to (Mrs. Klein), please?"
      },
      {
        "german": "Können/Könnten Sie mich mit (Frau Schwarz) verbinden?",
        "english": "Can/Could you put me through to (Mrs. Schwarz)?"
      },
      {
        "german": "Es geht um (ein neues Projekt).",
        "english": "It is about (a new project)."
      },
      {
        "german": "Hätten Sie (am Mittwoch um 11.00 Uhr) Zeit?",
        "english": "Would you have time (on Wednesday at 11)?"
      },
      {
        "german": "Ich möchte einen Termin vereinbaren.",
        "english": "I would like to make an appointment."
      },
      {
        "german": "Wann hätten Sie Zeit?",
        "english": "When would you have time?"
      },
      {
        "german": "Passt es Ihnen (am Mittwoch)?",
        "english": "Does (Wednesday) suit you?"
      },
      {
        "german": "Bitte richten Sie (Frau Klein) aus, dass ich angerufen habe.",
        "english": "Please tell (Mrs. Klein) that I have called."
      },
      {
        "german": "Könnten Sie (Frau Klein) sagen, dass sie mich zurückrufen soll?",
        "english": "Could you tell (Mrs. Klein) that she should call me back?"
      },
      {
        "german": "Vielen Dank für (Ihre Hilfe).",
        "english": "Many thanks for (your help)."
      },
      {
        "german": "Auf Wiederhören.",
        "english": "Goodbye. (on the telephone)"
      },
      {
        "german": "eine kleine/mittelständige Firma sein",
        "english": "be a small/middle-sized company"
      },
      {
        "german": "ein großes Unternehmen sein",
        "english": "be a large company"
      },
      {
        "german": "Fabriken/Zweigstellen in (Berlin) haben",
        "english": "have factories/branch offices in (Berlin)"
      },
      {
        "german": "eine Firma gründen/wurde gegründet",
        "english": "found a company/a company was founded"
      },
      {
        "german": "etwas produzieren/kaufen/verkaufen/transportieren",
        "english": "produce/purchase/sell/transport something"
      },
      {
        "german": "Kunden beraten",
        "english": "advise clients"
      },
      {
        "german": "beste Qualität bieten/haben",
        "english": "offer/have the best quality"
      },
      {
        "german": "motiviert und gut qualifiziert sein",
        "english": "be motivated and have the right qualifications"
      },
      {
        "german": "das Unternehmen weiter vergrößern",
        "english": "continue expanding the company"
      },
      {
        "german": "neue Kunden/neue Mitarbeiter suchen",
        "english": "look for new clients/new co-workers"
      },
      {
        "german": "Die Brüder Dassler: sich für viele Sportarten interessieren",
        "english": "The Dassler Brothers: be interested in many types of sports"
      },
      {
        "german": "aus dem Interesse ein Geschäft machen",
        "english": "transform an interest into a business"
      },
      {
        "german": "Schufe nähen/kleben/herstellen",
        "english": "sew/glue/produce shoes"
      },
      {
        "german": "in ein Unternehmen einsteigen",
        "english": "enter a company"
      },
      {
        "german": "an der Weiterentwicklung (der Schuhe) arbeiten",
        "english": "work on improving (the shoes)"
      },
      {
        "german": "zur Armee müssen",
        "english": "must go to the Army"
      },
      {
        "german": "Konflikte entstehen",
        "english": "conflicts arise"
      },
      {
        "german": "der Firma einen Namen geben",
        "english": "give the company a name"
      },
      {
        "german": "zur Konkurrenten werden",
        "english": "become competitors"
      },
      {
        "german": "ein Duell gewinnen",
        "english": "win a duel"
      },
      {
        "german": "Es kommt zu (Streit/Intrigen).",
        "english": "It comes to (fights/intrigues)."
      },
      {
        "german": "zum endgültigen Bruch führen",
        "english": "lead to a final break"
      },
      {
        "german": "(überhaupt keinen) Sport treiben",
        "english": "do no sports at all/do sports"
      },
      {
        "german": "Mitglied in einem Sportverein sein",
        "english": "be a member of a sports club"
      },
      {
        "german": "Sportsendungen (im Fernsehen) sehen",
        "english": "watch sports programmes (on TV)"
      },
      {
        "german": "Yoga (aus Spaß) machen",
        "english": "do yoga (for fun)"
      },
      {
        "german": "an Wettkämpfen/an einem Marathonlauf teilnehmen",
        "english": "attend competitions/a marathon run"
      },
      {
        "german": "sich auf einen Wettkampf vorbereiten",
        "english": "prepare for a competition"
      },
      {
        "german": "ans/ins Ziel kommen",
        "english": "reach the finish line"
      },
      {
        "german": "Sportveranstaltungen besuchen",
        "english": "visit sporting events"
      },
      {
        "german": "zu Fußballspielen gehen",
        "english": "go to football games"
      },
      {
        "german": "fünf Stunden in der Woche trainieren",
        "english": "train five hours a week"
      },
      {
        "german": "sich eine Stunde Zeit nehmen",
        "english": "give oneself an hour"
      },
      {
        "german": "zum Training/ins Fitnessstudio gehen",
        "english": "go to the training/fitness centre"
      },
      {
        "german": "etwas für die Fitness tun",
        "english": "do something for one's fitness"
      },
      {
        "german": "sich (viel/zu wenig) bewegen",
        "english": "do (a lot/too little) exercise"
      },
      {
        "german": "Skispringen, Rudern, Schwimmen, Boxen, Handball, Turnen, Radfahren",
        "english": "ski jumping, paddling, swimming, boxing, handball, gymnastics, cycling"
      },
      {
        "german": "krank werden/sein",
        "english": "become/be ill"
      },
      {
        "german": "zu einem Hausarzt/Allgemeinmediziner gehen",
        "english": "go to the GP"
      },
      {
        "german": "Patienten untersuchen und behandeln",
        "english": "examine and treat patients"
      },
      {
        "german": "Medikamente/eine Physiotherapie verschreiben",
        "english": "prescribe medicine/physiotherapy"
      },
      {
        "german": "Medikamente aus der Apotheke holen",
        "english": "get medicine from the pharmacy"
      },
      {
        "german": "den Patienten zu einem Facharzt überweisen",
        "english": "transfer patients to a specialist"
      },
      {
        "german": "auf einen Termin beim Facharzt warten",
        "english": "wait for an appointment at the specialist"
      },
      {
        "german": "das deutsche Gesundheitssystem",
        "english": "the German health system"
      },
      {
        "german": "die Behandlungskosten übernehmen/bezahlen",
        "english": "bear/pay the medical costs"
      },
      {
        "german": "bei einer (gesetzlichen/privaten) Krankenkasse versichert sein/krankenversichert sein",
        "english": "be insured by a (public/private) health insurance company"
      },
      {
        "german": "bei schweren Krankheiten/für eine Operation ins Krankenhaus kommen",
        "english": "get into the hospital for serious illnesses/a surgery"
      },
      {
        "german": "sich körperlich fit fühlen",
        "english": "feel oneself to be fit"
      },
      {
        "german": "gut für den Körper sein",
        "english": "be good for the body"
      },
      {
        "german": "sich beim Lernen besser konzentrieren können",
        "english": "be able to concentrate better when learning"
      },
      {
        "german": "die Konzentration verbessern",
        "english": "improve concentration"
      },
      {
        "german": "Stress abbauen",
        "english": "decrease stress"
      },
      {
        "german": "das Immunsystem stärken",
        "english": "strengthen the immune system"
      },
      {
        "german": "den Körper fit halten",
        "english": "keep the body fit"
      },
      {
        "german": "die Folgen des Jetlags reduzieren",
        "english": "reduce the effects of jetlag"
      },
      {
        "german": "gesund sein/bleiben",
        "english": "be/stay healthy"
      },
      {
        "german": "Sport gibt Energie.",
        "english": "Sports gives energy."
      },
      {
        "german": "den ganzen Tag in Vorlesungen/im Büro sitzen",
        "english": "sit in lectures/in an office the whole day"
      },
      {
        "german": "Der Arbeitsdruck wächst.",
        "english": "Work pressure is increasing."
      },
      {
        "german": "Es gibt (keine) Grenzen zwischen Arbeit und Freizeit.",
        "english": "There is (no) separation between work and free time."
      },
      {
        "german": "sich als Antisportler bezeichnen",
        "english": "consider oneself as an anti-sportsman"
      },
      {
        "german": "eine Ausrede haben",
        "english": "have an excuse"
      },
      {
        "german": "den eigenen Gesundheitszustand als gut beschreiben",
        "english": "describe one's physical conditions as good"
      },
      {
        "german": "„Sport ist die beste Medizin.“",
        "english": "„Sports is the best medication.“"
      },
      {
        "german": "einen Ratgeber kaufen",
        "english": "buy a self-help book"
      },
      {
        "german": "ein erfolgreiches/glückliches Leben versprechen",
        "english": "promise a successful/happy life"
      },
      {
        "german": "positives Denken lernen",
        "english": "learn positive thinking"
      },
      {
        "german": "täglich 60 000 Gedanken haben",
        "english": "have 60 000 thoughts a day"
      },
      {
        "german": "sich zu sehr auf Fehler konzentrieren",
        "english": "concentrate too much on mistakes"
      },
      {
        "german": "Angst haben, etwas falsch zu machen",
        "english": "be afraid to make a mistake"
      },
      {
        "german": "zu lange über Probleme nachdenken",
        "english": "think about problems for too long"
      },
      {
        "german": "Probleme lösen",
        "english": "solve problems"
      },
      {
        "german": "zu sich selbst und zu anderen freundlich sein",
        "english": "be friendly to oneself and to the others"
      },
      {
        "german": "Gefühle zeigen/verstehen",
        "english": "show/understand feelings"
      },
      {
        "german": "sich (über Misserfolge) ärgern, der Ärger",
        "english": "be angry (about failures), anger"
      },
      {
        "german": "sich (über Blumen) freuen, die Freude",
        "english": "be happy (about flowers), happiness"
      },
      {
        "german": "zufrieden sein, die Zufriedenheit",
        "english": "be satisfied (with a result), satisfaction"
      },
      {
        "german": "wütend sein, die Wut",
        "english": "be mad (at other car drivers), rage"
      },
      {
        "german": "traurig sein, die Trauer",
        "english": "be sad (about a bad mark), sadness"
      },
      {
        "german": "überrascht sein, die Überraschung",
        "english": "be surprised, surprise"
      },
      {
        "german": "Angst vor Misserfolgen haben",
        "english": "be scared of failure"
      },
      {
        "german": "„Jeder ist seines Glückes Schmied.“",
        "english": "„Every man is the architect of his own fortune.“"
      },
      {
        "german": "in einem Hotel übernachten",
        "english": "stay at a hotel overnight"
      },
      {
        "german": "ein Museum besuchen",
        "english": "visit a museum"
      },
      {
        "german": "in die Oper/ins Theater/in ein Konzert gehen",
        "english": "go to the opera/to the theatre/to a concert"
      },
      {
        "german": "Sehenswürdigkeiten/historische Gebäude besichtigen/bewundern",
        "english": "visit/admire monuments/historical buildings"
      },
      {
        "german": "einkaufen gehen",
        "english": "go shopping"
      },
      {
        "german": "Andenken für Freunde/die Familie kaufen",
        "english": "buy souvenirs for friends/family"
      },
      {
        "german": "durch die Innenstadt/Altstadt laufen",
        "english": "walk through the city centre/historical centre"
      },
      {
        "german": "an einer Stadtrundfahrt teilnehmen",
        "english": "take part in a city tour"
      },
      {
        "german": "in einer Markthalle zu Mittag essen",
        "english": "have lunch at a market hall"
      },
      {
        "german": "Fotos machen/betrachten/löschen",
        "english": "take/look at/delete photographs"
      },
      {
        "german": "Fotos auswählen/posten",
        "english": "choose/post photographs"
      },
      {
        "german": "Objekte im Museum fotografieren",
        "english": "take photographs of objects at a museum"
      },
      {
        "german": "Fotos per Smartphone an Freunde verschicken",
        "english": "send photos to friends via smartphone"
      },
      {
        "german": "mehr Spaß haben",
        "english": "have more fun"
      },
      {
        "german": "Aktivitäten intensiver erleben",
        "english": "experience activities more intensely"
      },
      {
        "german": "Der positive Effekt hält eine Woche an.",
        "english": "The positive effect lasts a week."
      },
      {
        "german": "Wir könnten/Ich würde gern (eine Stadtrundfahrt machen).",
        "english": "We could/I would like to (do a city tour)."
      },
      {
        "german": "Wie wäre es, wenn wir (ins Museum gehen)?",
        "english": "What about (going to the museum)?"
      },
      {
        "german": "Die Wohnung ist (in der Inselstraße).",
        "english": "The flat is (in Insel Street)."
      },
      {
        "german": "Das Haus wurde (1980) gebaut.",
        "english": "The house was built (in 1980)."
      },
      {
        "german": "Die Wohnung ist (40) Jahre alt/neu renoviert.",
        "english": "The flat is (40) years old/recently renovated."
      },
      {
        "german": "Die Wohnung ist (60) Quadratmeter groß und hat (zwei) Zimmer.",
        "english": "The flat is (60) square meters and has (2) rooms."
      },
      {
        "german": "Die Wohnung liegt (in der zweiten Etage).",
        "english": "The flat is (on the second floor)."
      },
      {
        "german": "Die Kaltmiete beträgt (400 Euro).",
        "english": "The rent is (400 euros)."
      },
      {
        "german": "Außerdem muss man noch Nebenkosten zahlen.",
        "english": "On top of that, you have to pay additional costs."
      },
      {
        "german": "Die Wohnung kostet insgesamt (530 Euro) im Monat.",
        "english": "The flat costs (530 euros) a month."
      },
      {
        "german": "Die Wohnung hat einen Balkon und eine Garage.",
        "english": "The flat has a balcony and a garage."
      },
      {
        "german": "Es gibt keine Angaben zum Baujahr/zu den Nebenkosten.",
        "english": "There is no information about the year of construction/additional costs."
      },
      {
        "german": "Die Wohnung liegt im Zentrum/in einer ruhigen Gegend/in der Nähe der Universität.",
        "english": "The flat is located at the city centre/in a quiet neighbourhood/near the university."
      },
      {
        "german": "Es gibt gute Einkaufsmöglichkeiten/viele Grünflächen/einen Park/einen Kindergarten.",
        "english": "There are shopping facilities/many green areas/a park/a kindergarten."
      },
      {
        "german": "in einer Wohngemeinschaft/WG wohnen",
        "english": "share a flat with others"
      },
      {
        "german": "Mitbewohner gesucht!",
        "english": "Housemate wanted!"
      },
      {
        "german": "(210 000) Einwohner haben",
        "english": "have (210 000) inhabitants"
      },
      {
        "german": "in der (Mitte von Deutschland) liegen",
        "english": "be located in (the centre of Germany)"
      },
      {
        "german": "auf eine lange Geschichte zurückblicken",
        "english": "have a long history"
      },
      {
        "german": "das Stadtrecht erhalten",
        "english": "receive town privileges"
      },
      {
        "german": "Der Name (Graz) leitet sich von (gradec) ab.",
        "english": "The name (of Graz) derives from (gradec)."
      },
      {
        "german": "wichtig für die Entwicklung der Stadt sein",
        "english": "be important for the development of the city"
      },
      {
        "german": "Die Universität wurde (1379) gegründet.",
        "english": "The university was founded (in 1379)."
      },
      {
        "german": "zu den ältesten Universitäten Europas zählen",
        "english": "count amongst the oldest universities in Europe"
      },
      {
        "german": "aus dem (13.) Jahrhundert stammen",
        "english": "originate in the (13th) century"
      },
      {
        "german": "ein bedeutendes Bildungszentrum sein",
        "english": "be an important educational centre"
      },
      {
        "german": "sich innerhalb der Stadtmauer/des Zentrums befinden",
        "english": "be located within the city wall/in the centre"
      },
      {
        "german": "besonders sehenswert/ein bedeutendes Bauwerk sein",
        "english": "be a building worth seeing/be an important building"
      },
      {
        "german": "ein mittelalterliches Bild zeigen",
        "english": "look like in the middle ages"
      },
      {
        "german": "die Geschichte der Stadt entdecken",
        "english": "discover the history of the city"
      },
      {
        "german": "zu den Sehenswürdigkeiten gehören",
        "english": "be one of the monuments"
      },
      {
        "german": "ein Wahrzeichen der Stadt sein",
        "english": "be a symbol of the city"
      },
      {
        "german": "perfekt in die Stadtstruktur passen",
        "english": "perfectly fit into the city structure"
      },
      {
        "german": "zu einer Kunstmetropole werden",
        "english": "become a hub for art"
      },
      {
        "german": "als Standort der chemischen Industrie gelten",
        "english": "be known as a location of the chemical industry"
      },
      {
        "german": "das Zimmer aufräumen/sauber machen",
        "english": "tidy up/clean the room"
      },
      {
        "german": "die Wände streichen",
        "english": "paint the walls"
      },
      {
        "german": "die Glühbirne wechseln",
        "english": "change the light bulb"
      },
      {
        "german": "den Herd anschließen",
        "english": "connect the stove"
      },
      {
        "german": "Blumen pflanzen, den Rasen mähen",
        "english": "plant flowers, cut the grass"
      },
      {
        "german": "ein Bücherregal bauen",
        "english": "build a bookshelf"
      },
      {
        "german": "Fenster putzen, Wäsche bügeln",
        "english": "clean the windows, iron clothes"
      },
      {
        "german": "das Waschbecken reparieren lassen",
        "english": "have the wash basin repaired"
      },
      {
        "german": "den Nachbarn etwas leihen",
        "english": "lend something to the neighbours"
      },
      {
        "german": "die Nachbarn einladen",
        "english": "invite the neighbours"
      },
      {
        "german": "Kinder betreuen",
        "english": "look after children"
      },
      {
        "german": "Die Hilfsbereitschaft steigt.",
        "english": "The willingness to help is increasing."
      },
      {
        "german": "im Wohnzimmer stehen – etwas ins Wohnzimmer stellen",
        "english": "stand in the living-room – place something into the living-room"
      },
      {
        "german": "auf dem Schreibtisch liegen – etwas auf den Schreibtisch legen",
        "english": "lie on the desk – lay/put something on the desk"
      },
      {
        "german": "auf dem Stuhl sitzen – sich auf den Stuhl setzen",
        "english": "sit on a chair – sit down on a chair"
      },
      {
        "german": "im Schrank hängen – etwas in den Schrank hängen",
        "english": "hang in the closet – hang something up in the closet"
      },
      {
        "german": "in eine neue Wohnung umziehen/einziehen",
        "english": "move into a new flat"
      },
      {
        "german": "das wichtigste Familienfest in Deutschland sein",
        "english": "be the most important family celebration in Germany"
      },
      {
        "german": "(den Weihnachtsbaum) mit dem Fest verbinden",
        "english": "associate (the Christmas tree) with the celebration"
      },
      {
        "german": "Geschenke am Heiligen Abend überreichen/unter den Weihnachtsbaum legen",
        "english": "give presents on Christmas Eve/lay presents under the Christmas tree"
      },
      {
        "german": "zu den ältesten Weihnachtsmärkten zählen",
        "english": "count amongst the oldest Christmas markets"
      },
      {
        "german": "eine lange Tradition haben",
        "english": "have a long tradition"
      },
      {
        "german": "in historischen Dokumenten erwähnt werden",
        "english": "be mentioned in historical documents"
      },
      {
        "german": "sich im gesamten deutschen Sprachraum ausbreiten",
        "english": "spread to the entire German-speaking area"
      },
      {
        "german": "ein fester Bestandteil der Weihnachtszeit sein",
        "english": "be an integral part of the Christmas period"
      },
      {
        "german": "Verkaufsstände für Spielzeug und andere Kleinigkeiten errichten",
        "english": "build up stands for toys and other small things"
      },
      {
        "german": "besondere Waren anbieten",
        "english": "offer particular products"
      },
      {
        "german": "ein wichtiger Wirtschaftsfaktor für die Region sein",
        "english": "be an important economic factor for the region"
      },
      {
        "german": "von den Weihnachtsmärkten profitieren",
        "english": "benefit from the Christmas markets"
      },
      {
        "german": "Geld für Weihnachtsgeschenke ausgeben",
        "english": "spend money on Christmas presents"
      },
      {
        "german": "die Liste der beliebtesten Geschenke anführen",
        "english": "head the list of the most popular presents"
      },
      {
        "german": "Hardrock und Heavy Metal hören",
        "english": "listen to hard rock and heavy metal"
      },
      {
        "german": "das größte Heavy-Metal-Festival der Welt sein",
        "english": "be the biggest heavy metal festival in the world"
      },
      {
        "german": "auf eine Idee kommen",
        "english": "have an idea, hit on an idea"
      },
      {
        "german": "ein Instrument spielen",
        "english": "play an instrument"
      },
      {
        "german": "ein Festival (privat) organisieren",
        "english": "organise a (private) festival"
      },
      {
        "german": "ein Konzert geben",
        "english": "give a concert"
      },
      {
        "german": "eine Wiese für das Festival vermieten",
        "english": "rent a meadow for the festival"
      },
      {
        "german": "erste finanzielle Erfolge feiern",
        "english": "celebrate the first financial success"
      },
      {
        "german": "Toiletten und Duschen stehen bereit.",
        "english": "Toilets and showers are available."
      },
      {
        "german": "über acht Bühnen verfügen",
        "english": "have eight stages"
      },
      {
        "german": "sich über das Wachstum des Festivals freuen",
        "english": "be happy about the growth of the festival"
      },
      {
        "german": "als Helfer beim Festival arbeiten",
        "english": "work as a helper at the festival"
      },
      {
        "german": "mit dem Verkauf von Bier Geld verdienen",
        "english": "earn money by selling beer"
      },
      {
        "german": "Gewinne erzielen",
        "english": "have return on investment"
      },
      {
        "german": "Bustouren werden organisiert.",
        "english": "Bus tours are organised."
      },
      {
        "german": "Die Zahl der Zuschauer steigt langsam an.",
        "english": "The number of the visitors is slowly growing."
      },
      {
        "german": "Die Eintrittskarten sind ausverkauft.",
        "english": "The entry cards are sold."
      },
      {
        "german": "Die Ausgaben sind höher als die Einnahmen.",
        "english": "The costs are higher than the incomes."
      },
      {
        "german": "Die Besucherzahlen nehmen zu.",
        "english": "The number of visitors is increasing."
      },
      {
        "german": "ein wichtiges/besonderes/großes Fest sein",
        "english": "be an important/special/big festival"
      },
      {
        "german": "jedes Jahr (seit 1810) (im August) stattfinden",
        "english": "take place every year (in August, since 1810)"
      },
      {
        "german": "auf ein Fest stolz sein",
        "english": "be proud of a festival"
      },
      {
        "german": "die Hauptattraktion auf/das Besondere an einem Fest sein",
        "english": "be the main attraction/the special thing at a festival"
      },
      {
        "german": "eine Tracht (ein Dirndl oder eine Lederhose) tragen",
        "english": "wear traditional costume (dirndl dresses and leather pants)"
      },
      {
        "german": "sich mit Freunden amüsieren",
        "english": "have a good time with friends"
      },
      {
        "german": "für Kinder/Familien (nicht) geeignet sein",
        "english": "be (un)suitable for children/families"
      },
      {
        "german": "Schiffe/Tanzgruppen sehen können",
        "english": "be able to see ships/dance groups"
      },
      {
        "german": "eine Fahrt mit dem Schiff/mit dem Riesenrad machen",
        "english": "make a tour by boat/with the Ferris wheel"
      },
      {
        "german": "Kreuzfahrtschiffe/Segelschiffe besichtigen",
        "english": "visit cruise ships/sailing boats"
      },
      {
        "german": "etwas (nicht so) interessant finden",
        "english": "find something (not so) interesting"
      },
      {
        "german": "Neujahr, Karneval, Ostern, Weihnachten, Namenstag, erster Schultag",
        "english": "New Year, Carnival, Easter, Christmas, Saint's day, first day at school"
      },
      {
        "german": "Kultur mit allen Sinnen erleben",
        "english": "experience culture through all senses"
      },
      {
        "german": "aus dem neuesten Buch lesen",
        "english": "read from one's newest book"
      },
      {
        "german": "viele Besucher anziehen",
        "english": "attract many visitors"
      },
      {
        "german": "sich im Saal bewegen",
        "english": "move around in the room"
      },
      {
        "german": "mit dem Publikum spielen",
        "english": "play with the public"
      },
      {
        "german": "spannende Aufführungen zeigen",
        "english": "show exciting shows"
      },
      {
        "german": "goldene Zeiten wieder aufleben lassen",
        "english": "revive the golden age"
      },
      {
        "german": "eine Veranstaltung über Architektur anbieten",
        "english": "offer an event about architecture"
      },
      {
        "german": "ein Stück erarbeiten",
        "english": "write a (theater) play"
      },
      {
        "german": "Premiere haben",
        "english": "debut, perform in public for the first time"
      }
    ],
  B1: [
    ...B1_CHAPTER_PHRASES,
    {
      german: "Es wäre nett, wenn wir uns morgen Abend treffen könnten.",
      english: "It would be nice if we could meet tomorrow evening.",
      pronunciation_hint: "es VAIR-eh net, ven veer oons MOR-gen AH-bent TREF-fen KERN-ten."
    },
    {
      german: "Obwohl das Wetter schlecht war, haben wir eine Wanderung gemacht.",
      english: "Although the weather was bad, we went for a hike.",
      pronunciation_hint: "ohb-VOHL dahs VET-ter shlecht vahr, HAH-ben veer EYE-neh VAHN-deh-roong geh-MACHT."
    },
    {
      german: "Ich interessiere mich für ein Praktikum in Ihrer Firma.",
      english: "I am interested in an internship at your company.",
      pronunciation_hint: "ich in-teh-reh-SEER-eh mich feer ein PRAK-tee-koom in EE-rer FEER-mah."
    },
    {
      german: "Man sollte regelmäßig Sport treiben, um gesund zu bleiben.",
      english: "One should do sports regularly to stay healthy.",
      pronunciation_hint: "mahn ZOHL-teh RAY-gel-may-sich shport TRY-ben, oom geh-ZOONT tsoo BLY-ben."
    },
    {
      german: "Ich bin der Meinung, dass Umweltschutz eine große Rolle spielt.",
      english: "I am of the opinion that environmental protection plays a big role.",
      pronunciation_hint: "ich bin dare MY-noong, dahs OOM-velt-shutz EYE-neh GROHS-seh ROH-leh shpeelt."
    }
  ],
  B2: [
    ...B2_CHAPTER_PHRASES,
    {
      german: "Unter Berücksichtigung aller Aspekte müssen wir die Entscheidung überdenken.",
      english: "Considering all aspects, we must reconsider the decision.",
      pronunciation_hint: "OON-ter beh-RUEK-sich-tee-goong AHL-ler ahs-PEK-teh MEUS-sen veer dee ent-SHY-doong ue-ber-DEN-ken."
    },
    {
      german: "Je mehr Fremdsprachen man lernt, desto flexibler wird das Gehirn.",
      english: "The more foreign languages one learns, the more flexible the brain becomes.",
      pronunciation_hint: "yay mayr FREMT-shprah-chen mahn lairnt, des-toh flex-EE-bler veert dahs geh-HIRN."
    },
    {
      german: "Es ist unumgänglich, dass wir uns intensiv auf die DTZ-Prüfung vorbereiten.",
      english: "It is indispensable that we prepare ourselves intensively for the DTZ exam.",
      pronunciation_hint: "es ist OON-oom-geng-lich, dahs veer oons in-ten-SEEF owf dee dtz-PREU-foong fohr-beh-rye-ten."
    },
    {
      german: "Aus meiner Sicht lässt sich diese Herausforderung durch Teamarbeit bewältigen.",
      english: "From my point of view, this challenge can be overcome through teamwork.",
      pronunciation_hint: "ows MY-ner zicht lest zich DEE-zeh her-OWS-for-deh-roong doorch TEAM-ahr-byte beh-VEL-tee-gen."
    },
    {
      german: "Die Digitalisierung bietet zwar viele Vorteile, birgt aber auch erhebliche Risiken.",
      english: "While digitization offers many advantages, it also carries significant risks.",
      pronunciation_hint: "dee dee-gee-tah-lee-ZEE-roong BEE-tet tsvahr FEE-leh FOR-tye-leh, beerkt AH-ber owch er-HEP-liche REE-zee-ken."
    }
  ]
};

export function getPhraseTheme(german: string, english: string): string {
  const g = german.toLowerCase();
  const e = english.toLowerCase();

  // 1. People & Relationships 👥
  if (
    g.includes("hallo") || g.includes("tschüss") || g.includes("auf wiedersehen") || 
    g.includes("guten morgen") || g.includes("guten tag") || g.includes("guten abend") || g.includes("gute nacht") ||
    g.includes("grüß gott") || g.includes("grüezi") || g.includes("servus") || g.includes("salü") || g.includes("hoi") ||
    g.includes("heiße") || g.includes("heißt") || g.includes("name") || g.includes("wer bist") || g.includes("wer sind") ||
    g.includes("wie geht") || g.includes("freut mich") || g.includes("eltern") || g.includes("kind") || g.includes("vater") ||
    g.includes("mutter") || g.includes("sohn") || g.includes("tochter") || g.includes("bruder") || g.includes("schwester") ||
    g.includes("oma") || g.includes("opa") || g.includes("frau") || g.includes("mann") || g.includes("freund") ||
    g.includes("familie") || g.includes("geburtstag") || g.includes("glückwunsch") || g.includes("gratulieren") ||
    g.includes("hochzeit") || g.includes("partner") || g.includes("nachbar") || g.includes("kollege") ||
    g.includes("baby") || g.includes("verwandt") || g.includes("heiraten") || g.includes("liebe") || g.includes("kuss") ||
    g.includes("einladen") || g.includes("kuscheln") || g.includes("besuch") || g.includes("treffen") || g.includes("mensch") ||
    e.includes("hello") || e.includes("bye") || e.includes("goodbye") || e.includes("good morning") || e.includes("good day") ||
    e.includes("good evening") || e.includes("good night") || e.includes("called") || e.includes("name") ||
    e.includes("who are you") || e.includes("how are you") || e.includes("pleased to meet") || e.includes("parents") ||
    e.includes("child") || e.includes("father") || e.includes("mother") || e.includes("son") || e.includes("daughter") ||
    e.includes("brother") || e.includes("sister") || e.includes("grandma") || e.includes("grandpa") || e.includes("friend") ||
    e.includes("family") || e.includes("birthday") || e.includes("congratulations") || e.includes("marry") ||
    e.includes("husband") || e.includes("wife") || e.includes("meet") || e.includes("visit") || e.includes("people")
  ) {
    return "People & Relationships 👥";
  }

  // 2. Work & Education 💼
  if (
    g.includes("beruf") || g.includes("arbeit") || g.includes("lehrer") || g.includes("unterricht") ||
    g.includes("schule") || g.includes("klasse") || g.includes("schüler") || g.includes("kurs") ||
    g.includes("lernen") || g.includes("studium") || g.includes("studieren") || g.includes("universität") ||
    g.includes("prüfung") || g.includes("test") || g.includes("diplom") || g.includes("zeugnis") ||
    g.includes("chef") || g.includes("firma") || g.includes("büro") || g.includes("job") ||
    g.includes("bewerbung") || g.includes("praktikum") || g.includes("ausbildung") || g.includes("karriere") ||
    g.includes("vertrag") || g.includes("kollegen") || g.includes("gehalt") || g.includes("kündigen") ||
    g.includes("lebenslauf") || g.includes("unterrichten") || g.includes("englisch") || g.includes("französisch") ||
    g.includes("deutsch") || g.includes("spanisch") || g.includes("sprache") || g.includes("spreche") ||
    g.includes("spricht") || g.includes("dänisch") || g.includes("griechisch") || g.includes("italienisch") ||
    g.includes("polnisch") || g.includes("portugiesisch") || g.includes("russisch") || g.includes("schwedisch") ||
    g.includes("türkisch") || g.includes("ungarisch") || g.includes("arabisch") ||
    e.includes("profession") || e.includes("career") || e.includes("job") || e.includes("teacher") ||
    e.includes("teach") || e.includes("class") || e.includes("lesson") || e.includes("school") ||
    e.includes("student") || e.includes("course") || e.includes("learn") || e.includes("study") ||
    e.includes("university") || e.includes("exam") || e.includes("test") || e.includes("diploma") ||
    e.includes("certificate") || e.includes("boss") || e.includes("company") || e.includes("office") ||
    e.includes("apply") || e.includes("internship") || e.includes("contract") || e.includes("salary") ||
    e.includes("resume") || e.includes("german") || e.includes("language") || e.includes("speak")
  ) {
    return "Work & Education 💼";
  }

  // 3. Food & Dining 🍽️
  if (
    g.includes("appetit") || g.includes("essen") || g.includes("trinken") || g.includes("restaurant") ||
    g.includes("kaffee") || g.includes("tee") || g.includes("brot") || g.includes("obst") ||
    g.includes("gemüse") || g.includes("kuchen") || g.includes("frühstück") || g.includes("mittagessen") ||
    g.includes("abendessen") || g.includes("wasser") || g.includes("bier") || g.includes("wein") ||
    g.includes("milch") || g.includes("suppe") || g.includes("kochen") || g.includes("speisekarte") ||
    g.includes("frühstückt") || g.includes("fleisch") || g.includes("käse") || g.includes("butter") ||
    g.includes("durst") || g.includes("hunger") || g.includes("salat") || g.includes("salz") ||
    g.includes("zitrone") || g.includes("zwiebel") || g.includes("reis") || g.includes("steak") ||
    g.includes("zucker") || g.includes("vorspeise") || g.includes("backen") || g.includes("trinkt") ||
    g.includes("isst") ||
    e.includes("appetit") || e.includes("eat") || e.includes("drink") || e.includes("restaurant") ||
    e.includes("coffee") || e.includes("tea") || e.includes("bread") || e.includes("fruit") ||
    e.includes("vegetable") || e.includes("cake") || e.includes("breakfast") || e.includes("lunch") ||
    e.includes("dinner") || e.includes("water") || e.includes("beer") || e.includes("wine") ||
    e.includes("milk") || e.includes("soup") || e.includes("cook") || e.includes("menu") ||
    e.includes("meat") || e.includes("cheese") || e.includes("butter") || e.includes("thirsty") ||
    e.includes("hungry") || e.includes("salad") || e.includes("salt") || e.includes("lemon") ||
    e.includes("onion") || e.includes("rice") || e.includes("steak") || e.includes("sugar") ||
    e.includes("appetizer") || e.includes("bake") || e.includes("meal")
  ) {
    return "Food & Dining 🍽️";
  }

  // 4. Travel & Transport 🚗
  if (
    g.includes("zug") || g.includes("bahn") || g.includes("u-bahn") || g.includes("s-bahn") ||
    g.includes("bahnhof") || g.includes("flughafen") || g.includes("bus") || g.includes("auto") ||
    g.includes("ticket") || g.includes("fahrkarte") || g.includes("fahrrad") || g.includes("fahren") ||
    g.includes("reisen") || g.includes("reise") || g.includes("urlaub") || g.includes("hotel") ||
    g.includes("gepäck") || g.includes("koffer") || g.includes("flug") || g.includes("weg") ||
    g.includes("straße") || g.includes("abfahrt") || g.includes("ankunft") || g.includes("links") ||
    g.includes("rechts") || g.includes("geradeaus") || g.includes("karte") || g.includes("stadtplan") ||
    g.includes("ausflug") || g.includes("taxi") || g.includes("passagier") || g.includes("umleitung") ||
    g.includes("panne") || g.includes("stau") || g.includes("tanken") || g.includes("tankstelle") ||
    g.includes("abholen") ||
    e.includes("train") || e.includes("rail") || e.includes("subway") || e.includes("station") ||
    e.includes("airport") || e.includes("bus") || e.includes("car") || e.includes("ticket") ||
    e.includes("bicycle") || e.includes("drive") || e.includes("travel") || e.includes("trip") ||
    e.includes("journey") || e.includes("vacation") || e.includes("hotel") || e.includes("luggage") ||
    e.includes("suitcase") || e.includes("flight") || e.includes("way") || e.includes("street") ||
    e.includes("departure") || e.includes("arrival") || e.includes("left") || e.includes("right") ||
    e.includes("straight") || e.includes("map") || e.includes("passenger") || e.includes("detour") ||
    e.includes("breakdown") || e.includes("traffic") || e.includes("refuel") || e.includes("gas station")
  ) {
    return "Travel & Transport 🚗";
  }

  // 5. Health & Medical 🏥
  if (
    g.includes("arzt") || g.includes("ärztin") || g.includes("krank") || g.includes("schmerz") ||
    g.includes("apotheke") || g.includes("medikament") || g.includes("fieber") || g.includes("husten") ||
    g.includes("schnupfen") || g.includes("verletzung") || g.includes("krankenhaus") || g.includes("gesund") ||
    g.includes("zahnarzt") || g.includes("kopfschmerzen") || g.includes("rezept") || g.includes("versicherung") ||
    g.includes("unfall") || g.includes("ohr") || g.includes("salbe") || g.includes("verband") ||
    g.includes("stirn") || g.includes("praxis") || g.includes("tablette") || g.includes("pille") ||
    g.includes("pflegen") || g.includes("wunde") ||
    e.includes("doctor") || e.includes("sick") || e.includes("pain") || e.includes("pharmacy") ||
    e.includes("medicine") || e.includes("fever") || e.includes("cough") || e.includes("cold") ||
    e.includes("injury") || e.includes("hospital") || e.includes("healthy") || e.includes("dentist") ||
    e.includes("headache") || e.includes("prescription") || e.includes("insurance") || e.includes("accident") ||
    e.includes("ointment") || e.includes("bandage") || e.includes("tablet") || e.includes("pill") ||
    e.includes("care") || e.includes("wound")
  ) {
    return "Health & Medical 🏥";
  }

  // 6. Home & Living 🏠
  if (
    g.includes("haus") || g.includes("wohnung") || g.includes("zimmer") || g.includes("küche") ||
    g.includes("bad") || g.includes("miete") || g.includes("vermieten") || g.includes("möbel") ||
    g.includes("schlüssel") || g.includes("tür") || g.includes("fenster") || g.includes("bett") ||
    g.includes("tisch") || g.includes("stuhl") || g.includes("wohnzimmer") || g.includes("schlafen") ||
    g.includes("balkon") || g.includes("garten") || g.includes("keller") || g.includes("badewanne") ||
    g.includes("dusche") || g.includes("wohnen") || g.includes("sofa") || g.includes("schrank") ||
    g.includes("sauber") || g.includes("reinigen") || g.includes("staub") ||
    e.includes("house") || e.includes("apartment") || e.includes("flat") || e.includes("room") ||
    e.includes("kitchen") || e.includes("bath") || e.includes("rent") || e.includes("landlord") ||
    e.includes("furniture") || e.includes("key") || e.includes("door") || e.includes("window") ||
    e.includes("bed") || e.includes("table") || e.includes("chair") || e.includes("living room") ||
    e.includes("sleep") || e.includes("balcony") || e.includes("garden") || e.includes("cellar") ||
    e.includes("sofa") || e.includes("cupboard") || e.includes("clean") || e.includes("dust")
  ) {
    return "Home & Living 🏠";
  }

  // 7. Money & Shopping 💳
  if (
    g.includes("kaufen") || g.includes("einkaufen") || g.includes("bezahlen") || g.includes("geld") ||
    g.includes("preis") || g.includes("kosten") || g.includes("billig") || g.includes("teuer") ||
    g.includes("euro") || g.includes("cent") || g.includes("bar") || g.includes("kreditkarte") ||
    g.includes("bank") || g.includes("konto") || g.includes("geschäft") || g.includes("laden") ||
    g.includes("rabatt") || g.includes("einkauf") || g.includes("supermarkt") || g.includes("prospekt") ||
    g.includes("tasche") || g.includes("tüte") || g.includes("wertvoll") || g.includes("überweisen") ||
    e.includes("buy") || e.includes("shop") || e.includes("pay") || e.includes("money") ||
    e.includes("price") || e.includes("cost") || e.includes("cheap") || e.includes("expensive") ||
    e.includes("cash") || e.includes("credit card") || e.includes("bank") || e.includes("account") ||
    e.includes("store") || e.includes("discount") || e.includes("supermarket") || e.includes("bag") ||
    e.includes("valuable") || e.includes("transfer")
  ) {
    return "Money & Shopping 💳";
  }

  // 8. Tech & Communication 💻
  if (
    g.includes("computer") || g.includes("handy") || g.includes("telefon") || g.includes("e-mail") ||
    g.includes("internet") || g.includes("website") || g.includes("passwort") || g.includes("anrufen") ||
    g.includes("nachricht") || g.includes("sms") || g.includes("chat") || g.includes("fernseher") ||
    g.includes("drucker") || g.includes("online") || g.includes("app") || g.includes("software") ||
    g.includes("tastatur") || g.includes("verbindung") || g.includes("daten") ||
    e.includes("computer") || e.includes("phone") || e.includes("mobile") || e.includes("telephone") ||
    e.includes("email") || e.includes("internet") || e.includes("website") || e.includes("password") ||
    e.includes("call") || e.includes("message") || e.includes("sms") || e.includes("chat") ||
    e.includes("tv") || e.includes("television") || e.includes("printer") || e.includes("online") ||
    e.includes("app") || e.includes("software") || e.includes("keyboard") || e.includes("connection") ||
    e.includes("data")
  ) {
    return "Tech & Communication 💻";
  }

  // 9. Leisure & Hobbies 🎭
  if (
    g.includes("spielen") || g.includes("fußball") || g.includes("tennis") || g.includes("musik") ||
    g.includes("sport") || g.includes("schwimmen") || g.includes("tanzen") || g.includes("fotografieren") ||
    g.includes("foto") || g.includes("hobby") || g.includes("freizeit") || g.includes("kino") ||
    g.includes("film") || g.includes("buch") || g.includes("lesen") || g.includes("wandern") ||
    g.includes("spazieren") || g.includes("party") || g.includes("feiern") || g.includes("konzert") ||
    g.includes("theater") || g.includes("museum") || g.includes("zeitung") || g.includes("zoo") ||
    g.includes("sammeln") || g.includes("malen") || g.includes("zeichnen") || g.includes("fest") ||
    g.includes("spiel") || g.includes("attraktion") || g.includes("tracht") || g.includes("amüsieren") ||
    g.includes("aufführung") || g.includes("veranstaltung") ||
    e.includes("play") || e.includes("football") || e.includes("soccer") || e.includes("tennis") ||
    e.includes("music") || e.includes("sport") || e.includes("swim") || e.includes("dance") ||
    e.includes("photograph") || e.includes("camera") || e.includes("hobby") || e.includes("leisure") ||
    e.includes("cinema") || e.includes("movie") || e.includes("book") || e.includes("read") ||
    e.includes("hike") || e.includes("walk") || e.includes("party") || e.includes("celebrate") ||
    e.includes("concert") || e.includes("theater") || e.includes("museum") || e.includes("newspaper") ||
    e.includes("zoo") || e.includes("collect") || e.includes("paint") || e.includes("draw") ||
    e.includes("festival") || e.includes("game") || e.includes("attraction") || e.includes("costume") ||
    e.includes("show") || e.includes("event")
  ) {
    return "Leisure & Hobbies 🎭";
  }

  // 10. Nature & Environment 🌳
  if (
    g.includes("wetter") || g.includes("sonne") || g.includes("regen") || g.includes("schnee") ||
    g.includes("wind") || g.includes("kalt") || g.includes("warm") || g.includes("heiß") ||
    g.includes("baum") || g.includes("blume") || g.includes("wald") || g.includes("tier") ||
    g.includes("hund") || g.includes("katze") || g.includes("vogel") || g.includes("natur") ||
    g.includes("umwelt") || g.includes("grad") || g.includes("pflanze") ||
    e.includes("weather") || e.includes("sun") || e.includes("rain") || e.includes("snow") ||
    e.includes("wind") || e.includes("cold") || e.includes("warm") || e.includes("hot") ||
    e.includes("tree") || e.includes("flower") || e.includes("forest") || e.includes("animal") ||
    e.includes("dog") || e.includes("cat") || e.includes("bird") || e.includes("nature") ||
    e.includes("environment") || e.includes("degrees") || e.includes("plant")
  ) {
    return "Nature & Environment 🌳";
  }

  // 11. Society & Law ⚖️
  if (
    g.includes("pass") || g.includes("ausweis") || g.includes("dokument") || g.includes("amt") ||
    g.includes("behörde") || g.includes("polizei") || g.includes("gesetz") || g.includes("recht") ||
    g.includes("formular") || g.includes("unterschrift") || g.includes("anwalt") || g.includes("gericht") ||
    g.includes("bürger") || g.includes("zoll") ||
    e.includes("passport") || e.includes("id card") || e.includes("document") || e.includes("office") ||
    e.includes("authority") || e.includes("police") || e.includes("law") || e.includes("right") ||
    e.includes("form") || e.includes("signature") || e.includes("lawyer") || e.includes("court") ||
    e.includes("citizen") || e.includes("customs")
  ) {
    return "Society & Law ⚖️";
  }

  // 12. Verbs & Actions ⚡
  if (
    g.includes("machen") || g.includes("tun") || g.includes("gehen") || g.includes("kommen") ||
    g.includes("laufen") || g.includes("bringen") || g.includes("nehmen") || g.includes("geben") ||
    g.includes("helfen") || g.includes("danken") || g.includes("sehen") || g.includes("zeigen") ||
    g.includes("suchen") || g.includes("finden") || g.includes("wissen") || g.includes("denken") ||
    e.includes("do") || e.includes("make") || e.includes("go") || e.includes("come") ||
    e.includes("run") || e.includes("bring") || e.includes("take") || e.includes("give") ||
    e.includes("help") || e.includes("thank") || e.includes("see") || e.includes("show") ||
    e.includes("search") || e.includes("find") || e.includes("know") || e.includes("think")
  ) {
    return "Verbs & Actions ⚡";
  }

  // 13. General & Abstract 💬 - Fallback
  return "General & Abstract 💬";
}

export const getLocalStorageKey = (level: "A1" | "A2" | "B1" | "B2") => `german_custom_phrases_${level}`;

export function loadPhrasesForLevel(level: "A1" | "A2" | "B1" | "B2"): PhraseEntry[] {
  let basePhrases: PhraseEntry[] = [];
  try {
    const saved = localStorage.getItem(getLocalStorageKey(level));
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const validated = parsed.filter(item => typeof item.german === "string" && typeof item.english === "string");
        if (validated.length > 0) {
          basePhrases = validated;
        }
      }
    }
  } catch (error) {
    console.error("Error loading phrases from localStorage:", error);
  }
  
  if (basePhrases.length === 0) {
    basePhrases = DEFAULT_PHRASES[level];
  }

  // Map theme dynamically to all phrases
  return basePhrases.map(phrase => ({
    ...phrase,
    theme: phrase.theme || getPhraseTheme(phrase.german, phrase.english)
  }));
}

export function loadPhrasesForLevels(levels: ("A1" | "A2" | "B1" | "B2")[]): PhraseEntry[] {
  if (!levels || levels.length === 0) {
    return loadPhrasesForLevel("A1");
  }
  if (levels.length === 1) {
    return loadPhrasesForLevel(levels[0]);
  }
  const combined: PhraseEntry[] = [];
  levels.forEach(lvl => {
    const list = loadPhrasesForLevel(lvl);
    combined.push(...list);
  });
  return combined;
}

export function savePhrasesForLevel(level: "A1" | "A2" | "B1" | "B2", phrases: PhraseEntry[]): void {
  try {
    localStorage.setItem(getLocalStorageKey(level), JSON.stringify(phrases));
  } catch (error) {
    console.error("Error saving phrases to localStorage:", error);
  }
}

export function resetPhrasesForLevel(level: "A1" | "A2" | "B1" | "B2"): void {
  try {
    localStorage.removeItem(getLocalStorageKey(level));
  } catch (error) {
    console.error("Error resetting phrases in localStorage:", error);
  }
}
