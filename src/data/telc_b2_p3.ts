import { convertRawB2Vocabulary, VocabularyEntry } from "./telc_helper";

const RAW_P3: [string, string, string, string, string][] = [
  // === Familie & Beziehungen 👥 ===
  ["die Kompromissbereitschaft", "willingness to compromise", "Eine gute Partnerschaft erfordert von beiden Seiten Kompromissbereitschaft.", "A good partnership requires a willingness to compromise from both sides.", "Familie & Beziehungen 👥"],
  ["die Meinungsverschiedenheit", "disagreement / difference of opinion", "Kleine Meinungsverschiedenheiten lassen sich durch sachliche Gespräche klären.", "Minor disagreements can be resolved through objective discussions.", "Familie & Beziehungen 👥"],
  ["die Beziehungsdynamik", "relationship dynamics", "Therapeuten analysieren die komplexe Beziehungsdynamik in Familien.", "Therapists analyze the complex relationship dynamics in families.", "Familie & Beziehungen 👥"],
  ["die Empathie", "empathy", "Empathie ist eine wesentliche Eigenschaft für das friedliche Zusammenleben.", "Empathy is an essential trait for peaceful coexistence.", "Familie & Beziehungen 👥"],
  ["der Generationswechsel", "generational shift / succession", "Der anstehende Generationswechsel im Familienunternehmen bringt frischen Wind.", "The upcoming generational shift in the family business brings fresh momentum.", "Familie & Beziehungen 👥"],
  ["die Toleranz", "tolerance", "Gegenseitiger Respekt und Toleranz bilden das Fundament der Gesellschaft.", "Mutual respect and tolerance form the foundation of society.", "Familie & Beziehungen 👥"],
  ["das Verhaltensmuster", "behavioral pattern", "Verhaltensmuster aus der Kindheit prägen oft das spätere Erwachsenenleben.", "Behavioral patterns from childhood often shape later adult life.", "Familie & Beziehungen 👥"],
  ["das Zusammengehörigkeitsgefühl", "sense of togetherness / solidarity", "Das gemeinsame Projekt stärkte das Zusammengehörigkeitsgefühl im Team.", "The joint project strengthened the sense of togetherness in the team.", "Familie & Beziehungen 👥"],
  ["sich versöhnen", "to reconcile / make up", "Nach dem heftigen Streit haben sich die zwei Freunde wieder versöhnt.", "After the heated argument, the two friends made up with each other.", "Familie & Beziehungen 👥"],
  ["sich einfühlen in", "to empathize with", "Es fiel ihm leicht, sich in die Lage des Anderen einzufühlen.", "It was easy for him to empathize with the other person's situation.", "Familie & Beziehungen 👥"],

  // === Reisen & Verkehr 🚗 ===
  ["die Verkehrswende", "mobility transition", "Die städtische Verkehrswende setzt verstärkt auf Ausbau des Nahverkehrs.", "The urban mobility transition relies heavily on expanding local public transport.", "Reisen & Verkehr 🚗"],
  ["der Ferntourismus", "long-distance tourism", "Der Ferntourismus muss den CO2-Fußabdruck nachhaltiger gestalten.", "Long-distance tourism must make its carbon footprint more sustainable.", "Reisen & Verkehr 🚗"],
  ["die Infrastruktur", "infrastructure", "Modernisierung der Infrastruktur ist entscheidend für den Wirtschaftsstandort.", "Modernization of infrastructure is decisive for the business location.", "Reisen & Verkehr 🚗"],
  ["die Globalisierung", "globalization", "Durch die Globalisierung rücken Märkte und Kulturen enger zusammen.", "Through globalization, markets and cultures move closer together.", "Reisen & Verkehr 🚗"],
  ["der Kulturschock", "culture shock", "Anfangs erlebte er bei seiner Auslandsreise einen kleinen Kulturschock.", "Initially, he experienced a small culture shock during his trip abroad.", "Reisen & Verkehr 🚗"],
  ["der Fremdenverkehr", "tourism / tourist industry", "Der Fremdenverkehr ist die wichtigste Einnahmequelle der Küstenregion.", "Tourism is the coastal region's most important source of income.", "Reisen & Verkehr 🚗"],
  ["erkunden", "to explore / discover", "Reisende lieben es, historische Altstädte zu Fuß zu erkunden.", "Travelers love to explore historic old towns on foot.", "Reisen & Verkehr 🚗"],
  ["bewältigen", "to manage / master travel challenges", "Sie konnte die lange Reisestrecke ohne größere Komplikationen bewältigen.", "She was able to master the long travel route without major complications.", "Reisen & Verkehr 🚗"],
  ["sich anpassen", "to adapt to a new environment", "Man sollte sich den kulturellen Geflogenheiten des Gastlandes anpassen.", "One should adapt to the cultural customs of the host country.", "Reisen & Verkehr 🚗"],

  // === Wohnen & Haushalt 🏠 ===
  ["der Wohnungsmangel", "housing shortage", "In Großstädten führt der akute Wohnungsmangel zu steigenden Mieten.", "In major cities, the acute housing shortage leads to rising rents.", "Wohnen & Haushalt 🏠"],
  ["die Mietpreisbremse", "rent brake / rent control", "Die Regierung diskutiert über die Wirksamkeit der Mietpreisbremse.", "The government discusses the effectiveness of the rent brake.", "Wohnen & Haushalt 🏠"],
  ["das Ballungsgebiet", "metropolitan area / conurbation", "In dicht besiedelten Ballungsgebieten entstehen moderne Wohnquartiere.", "Modern residential quarters are built in densely populated metropolitan areas.", "Wohnen & Haushalt 🏠"],
  ["die Lebensqualität", "quality of life", "Grünflächen und gute Anbindungen erhöhen die städtische Lebensqualität.", "Green spaces and good connections increase urban quality of life.", "Wohnen & Haushalt 🏠"],
  ["die Eigentumsquote", "homeownership rate", "Die Eigentumsquote ist in Deutschland im europäischen Vergleich eher gering.", "The homeownership rate in Germany is rather low by European standards.", "Wohnen & Haushalt 🏠"],
  ["die Sanierung", "renovation / energy refurbishment", "Durch energetische Sanierung sinken die Heizkosten im Altbau spürbar.", "Through energy refurbishment, heating costs in old buildings drop noticeably.", "Wohnen & Haushalt 🏠"],
  ["erschließen", "to develop / make accessible", "Die Stadt möchte neues Bauland für junge Familien erschließen.", "The city wants to develop new building land for young families.", "Wohnen & Haushalt 🏠"],
  ["umbauen", "to convert / remodel", "Die alte Fabrikhalle wurde in moderne Loft-Wohnungen umgebaut.", "The old factory hall was converted into modern loft apartments.", "Wohnen & Haushalt 🏠"],

  // === Essen & Trinken 🍽️ ===
  ["die Nahrungsergänzung", "dietary supplement", "Nahrungsergänzungen sollten eine ausgewogene Ernährung nicht ersetzen.", "Dietary supplements should not replace a balanced diet.", "Essen & Trinken 🍽️"],
  ["die Massentierhaltung", "factory farming", "Verbraucher fordern ein Ende der Massentierhaltung in der Landwirtschaft.", "Consumers demand an end to factory farming in agriculture.", "Essen & Trinken 🍽️"],
  ["die Lebensmittelsicherheit", "food safety", "Behörden kontrollieren regelmäßig die Lebensmittelsicherheit in Betrieben.", "Authorities regularly inspect food safety in businesses.", "Essen & Trinken 🍽️"],
  ["die Feinschmecker-Küche", "gourmet cuisine", "Das Restaurant ist bekannt für seine ausgezeichnete Feinschmecker-Küche.", "The restaurant is known for its excellent gourmet cuisine.", "Essen & Trinken 🍽️"],
  ["genießen", "to savor / relish", "Am Wochenende genießen wir die feine Mahlzeit in aller Ruhe.", "On the weekend we savor the fine meal in peace and quiet.", "Essen & Trinken 🍽️"],
  ["degustieren", "to sample / taste wine or food", "Die Sommelière degustierte erlesene Weine aus der Region.", "The sommelier sampled exquisite wines from the region.", "Essen & Trinken 🍽️"],

  // === Einkaufen & Verbraucherschutz 🛒 ===
  ["die Widerrufsfrist", "cancellation period", "Beim Online-Kauf gilt eine gesetzliche Widerrufsfrist von 14 Tagen.", "When buying online, a statutory 14-day cancellation period applies.", "Einkaufen & Verbraucherschutz 🛒"],
  ["die Gewährleistung", "statutory warranty", "Händler geben zwei Jahre Gewährleistung auf elektronische Geräte.", "Dealers give a two-year statutory warranty on electronic devices.", "Einkaufen & Verbraucherschutz 🛒"],
  ["der Verbraucherschutz", "consumer protection", "Der Verbraucherschutz warnt vor irreführenden Werbeversprechen.", "Consumer protection warns against misleading advertising claims.", "Einkaufen & Verbraucherschutz 🛒"],
  ["die Preissteigerung", "price increase", "Aufgrund gestiegener Rohstoffkosten gab es eine Preissteigerung.", "Due to increased raw material costs, there was a price increase.", "Einkaufen & Verbraucherschutz 🛒"],
  ["reklamieren", "to lodge a complaint / claim warranty", "Kunden können beschädigte Ware problemlos beim Service reklamieren.", "Customers can easily lodge a complaint about damaged goods at customer service.", "Einkaufen & Verbraucherschutz 🛒"],
  ["erstatten", "to refund / reimburse", "Die Firma erstattet den vollen Kaufpreis bei fristgerechter Rücksendung.", "The company refunds the full purchase price upon timely return.", "Einkaufen & Verbraucherschutz 🛒"]
];

export const TELC_B2_P3: VocabularyEntry[] = convertRawB2Vocabulary(RAW_P3);
