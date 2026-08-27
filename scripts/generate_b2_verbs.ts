import * as fs from 'fs';
import * as path from 'path';

export interface B2VerbEntryRaw {
  german_word: string;
  english_translation: string;
  forms: string;
  exDe: string;
  exEn: string;
  theme: string;
}

const RAW_B2_VERBS: B2VerbEntryRaw[] = [
  // ==========================================
  // 1. REFLEXIVE VERBEN - ALLGEMEIN
  // ==========================================
  {
    german_word: "sich aneignen",
    english_translation: "to acquire / adopt (knowledge, skills)",
    forms: "eignet sich an, eignete sich an, hat sich angeeignet",
    exDe: "Im Laufe des Studiums hat sie sich fundiertes Fachwissen im Bereich Marketing angeeignet.",
    exEn: "In the course of her studies, she acquired sound specialist knowledge in the field of marketing.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich anstecken",
    english_translation: "to get infected / catch an infection",
    forms: "steckt sich an, steckte sich an, hat sich angesteckt",
    exDe: "Während der Grippewelle hat er sich leider bei einem Kollegen angesteckt.",
    exEn: "During the flu wave, he unfortunately got infected by a colleague.",
    theme: "Gesundheit & Körper 🏥"
  },
  {
    german_word: "sich auskennen",
    english_translation: "to be well-versed / know one's way around",
    forms: "kennt sich aus, kannte sich aus, hat sich ausgekannt",
    exDe: "In arbeitsrechtlichen Fragestellungen kennt sich unsere Justiziarin bestens aus.",
    exEn: "Our legal advisor knows her way around employment law questions extremely well.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich bedanken",
    english_translation: "to express gratitude / thank",
    forms: "bedankt sich, bedankte sich, hat sich bedankt",
    exDe: "Der Geschäftsführer bedankte sich herzlich bei allen Mitarbeitern für ihren unermüdlichen Einsatz.",
    exEn: "The managing director thanked all employees warmly for their tireless commitment.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich bewahrheiten",
    english_translation: "to prove true / come true",
    forms: "bewahrheitet sich, bewahrheitete sich, hat sich bewahrheitet",
    exDe: "Die anfänglichen Befürchtungen hinsichtlich der Kostensteigerung haben sich leider bewahrheitet.",
    exEn: "The initial fears regarding the cost increase have unfortunately proved true.",
    theme: "Allgemein & Abstrakt 💬"
  },
  {
    german_word: "sich bewerben",
    english_translation: "to apply (for a position/job)",
    forms: "bewirbt sich, bewarb sich, hat sich beworben",
    exDe: "Sie hat sich auf die ausgeschriebene Führungsposition im Vertrieb beworben.",
    exEn: "She applied for the advertised management position in sales.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "sich distanzieren",
    english_translation: "to distance oneself",
    forms: "distanziert sich, distanzierte sich, hat sich distanziert",
    exDe: "Der Vorstand distanzierte sich unmissverständlich von den unüberlegten Aussagen des Sprechers.",
    exEn: "The board distanced itself unmistakably from the ill-considered statements of the spokesperson.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich entschließen",
    english_translation: "to decide / make up one's mind",
    forms: "entschließt sich, entschloss sich, hat sich entschlossen",
    exDe: "Nach reiflicher Überlegung entschloss er sich zu einer beruflichen Neuorientierung.",
    exEn: "After mature reflection, he resolved to pursue a career change.",
    theme: "Allgemein & Abstrakt 💬"
  },
  {
    german_word: "sich entschuldigen",
    english_translation: "to apologize / excuse oneself",
    forms: "entschuldigt sich, entschuldigte sich, hat sich entschuldigt",
    exDe: "Der Projektleiter entschuldigte sich aufrichtig für die unvorhergesehene Lieferverzögerung.",
    exEn: "The project manager apologized sincerely for the unforeseen delivery delay.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich entsinnen",
    english_translation: "to recall / remember",
    forms: "entsinnt sich, entsann sich, hat sich entsonnen",
    exDe: "Ich kann mich noch genau des Augenblicks entsinnen, als wir den Vertrag unterzeichneten.",
    exEn: "I can still distinctly recall the moment when we signed the contract.",
    theme: "Allgemein & Abstrakt 💬"
  },
  {
    german_word: "sich befassen",
    english_translation: "to deal with / engage with",
    forms: "befasst sich, befasste sich, hat sich befasst",
    exDe: "Die aktuelle wissenschaftliche Studie befasst sich mit den langfristigen Folgen des Klimawandels.",
    exEn: "The current scientific study deals with the long-term consequences of climate change.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich ergeben",
    english_translation: "to result / emerge / surrender",
    forms: "ergibt sich, ergab sich, hat sich ergeben",
    exDe: "Aus den jüngsten Verhandlungen haben sich neue wirtschaftliche Perspektiven ergeben.",
    exEn: "From the recent negotiations, new economic perspectives have emerged.",
    theme: "Allgemein & Abstrakt 💬"
  },
  {
    german_word: "sich erkundigen",
    english_translation: "to inquire / ask for information",
    forms: "erkundigt sich, erkundigte sich, hat sich erkundigt",
    exDe: "Er erkundigte sich beim Bürgeramt nach den erforderlichen Einreiseformalitäten.",
    exEn: "He inquired at the citizen office about the required entry formalities.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "sich fragen",
    english_translation: "to wonder / ask oneself",
    forms: "fragt sich, fragte sich, hat sich gefragt",
    exDe: "Viele Experten fragen sich, wie sich die Inflation auf den Konsum auswirken wird.",
    exEn: "Many experts wonder how inflation will affect consumer spending.",
    theme: "Allgemein & Abstrakt 💬"
  },
  {
    german_word: "sich gedulden",
    english_translation: "to be patient / wait patiently",
    forms: "geduldet sich, geduldete sich, hat sich geduldet",
    exDe: "Bitte gedulden Sie sich noch einen Moment, die Sachbearbeiterin ruft Sie gleich auf.",
    exEn: "Please be patient for a moment, the clerk will call you shortly.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich konzentrieren",
    english_translation: "to concentrate / focus",
    forms: "konzentriert sich, konzentrierte sich, hat sich konzentriert",
    exDe: "Um die anspruchsvolle B2-Prüfung zu bestehen, muss man sich voll auf die Vorbereitung konzentrieren.",
    exEn: "In order to pass the demanding B2 exam, one must focus fully on preparation.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich Mühe geben",
    english_translation: "to make an effort / try hard",
    forms: "gibt sich Mühe, gab sich Mühe, hat sich Mühe gegeben",
    exDe: "Er gibt sich große Mühe, um seinen schriftlichen Ausdruck in der Fremdsprache zu verfeinern.",
    exEn: "He makes a great effort to refine his written expression in the foreign language.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "sich sträuben gegen",
    english_translation: "to resist / balk at",
    forms: "sträubt sich gegen, sträubte sich gegen, hat sich gegen ... gesträubt",
    exDe: "Die Mitarbeiter sträubten sich zunächst gegen die Einführung der neuen Software.",
    exEn: "The employees initially resisted the introduction of the new software.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich verbitten",
    english_translation: "to refuse to tolerate / object strongly to",
    forms: "verbittet sich, verbat sich, hat sich verbeten",
    exDe: "Der Minister verbat sich derartige persönliche Angriffe während der Plenardebatte.",
    exEn: "The minister strongly objected to such personal attacks during the plenary debate.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich verbrüdern",
    english_translation: "to fraternize / ally closely",
    forms: "verbrüdert sich, verbrüderte sich, hat sich verbrüdert",
    exDe: "In Zeiten der Krise verbrüderten sich die beiden rivalisierenden Gruppen im Parlament.",
    exEn: "In times of crisis, the two rival groups in parliament formed a close alliance.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich vorstellen",
    english_translation: "to imagine / introduce oneself",
    forms: "stellt sich vor, stellte sich vor, hat sich vorgestellt",
    exDe: "Der neue Abteilungsleiter stellte sich dem gesamten Team in einer kurzen Ansprache vor.",
    exEn: "The new department head introduced himself to the entire team in a short speech.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich widersprechen",
    english_translation: "to contradict oneself / clash",
    forms: "widerspricht sich, widersprach sich, hat sich widersprochen",
    exDe: "Die Aussagen der beiden Zeugen widersprachen sich in wesentlichen Punkten.",
    exEn: "The statements of the two witnesses contradicted each other on key points.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "sich zusammensetzen",
    english_translation: "to be composed of / consist of",
    forms: "setzt sich zusammen, setzte sich zusammen, hat sich zusammengesetzt",
    exDe: "Der Prüfungsausschuss setzt sich aus drei erfahrenen Dozenten zusammen.",
    exEn: "The examination committee is composed of three experienced lecturers.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "um sich greifen",
    english_translation: "to spread / gain ground",
    forms: "greift um sich, griff um sich, hat um sich gegriffen",
    exDe: "Die Unzufriedenheit über die steigenden Energiepreise griff in der Bevölkerung rasch um sich.",
    exEn: "Dissatisfaction over rising energy prices spread rapidly among the population.",
    theme: "Gesellschaft & Soziales 👥"
  },

  // ==========================================
  // 2. REFLEXIVE VERBEN - AKKUSATIV-REGIERT
  // ==========================================
  {
    german_word: "sich über jemanden/etwas aufregen",
    english_translation: "to get agitated / upset about someone/something",
    forms: "regt sich auf, regte sich auf, hat sich aufgeregt",
    exDe: "Es lohnt sich nicht, sich über Kleinigkeiten wie Bahnverspätungen aufzuregen.",
    exEn: "It is not worth getting upset about trivial things such as train delays.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich ausruhen",
    english_translation: "to rest / relax",
    forms: "ruht sich aus, ruhte sich aus, hat sich ausgeruht",
    exDe: "Nach der anstrengenden Konferenzwoche ruhte sie sich am Wochenende gründlich aus.",
    exEn: "After the exhausting conference week, she rested thoroughly over the weekend.",
    theme: "Gesundheit & Körper 🏥"
  },
  {
    german_word: "sich beeilen",
    english_translation: "to hurry up",
    forms: "beeilt sich, beeilte sich, hat sich beeilt",
    exDe: "Wir müssen uns beeilen, um den Anschlusszug nach Frankfurt noch rechtzeitig zu erreichen.",
    exEn: "We have to hurry to catch the connecting train to Frankfurt in time.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "sich über jemanden/etwas beschweren",
    english_translation: "to complain about someone/something",
    forms: "beschwert sich über, beschwerte sich über, hat sich über ... beschwert",
    exDe: "Die Kunden beschwerten sich beim Kundendienst über den unzureichenden Service.",
    exEn: "The customers complained to customer support about the substandard service.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "sich von jemandem/etwas distanzieren",
    english_translation: "to distance oneself from someone/something",
    forms: "distanziert sich von, distanzierte sich von, hat sich von ... distanziert",
    exDe: "Die Universität distanzierte sich öffentlich von den fragwürdigen Forschungsergebnissen.",
    exEn: "The university publicly distanced itself from the questionable research findings.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich für etwas/jemanden eignen",
    english_translation: "to be suitable for something/someone",
    forms: "eignet sich für, eignete sich für, hat sich für ... geeignet",
    exDe: "Dieser Lehrgang eignet sich hervorragend für fortgeschrittene Sprachlerner auf B2-Niveau.",
    exEn: "This training course is ideally suitable for advanced language learners at the B2 level.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich erholen",
    english_translation: "to recover / recuperate",
    forms: "erholt sich, erholte sich, hat sich erholt",
    exDe: "Der Patient hat sich nach dem operativen Eingriff erfreulich schnell erholt.",
    exEn: "The patient recovered remarkably quickly after the surgical procedure.",
    theme: "Gesundheit & Körper 🏥"
  },
  {
    german_word: "sich an jemanden/etwas erinnern",
    english_translation: "to remember / recall someone/something",
    forms: "erinnert sich an, erinnerte sich an, hat sich an ... erinnert",
    exDe: "Er erinnert sich noch lebhaft an die intensiven Debatten während seiner Studienzeit.",
    exEn: "He still vividly remembers the intense debates during his university days.",
    theme: "Allgemein & Abstrakt 💬"
  },
  {
    german_word: "sich nach jemandem/etwas erkundigen",
    english_translation: "to inquire about someone/something",
    forms: "erkundigt sich nach, erkundigte sich nach, hat sich nach ... erkundigt",
    exDe: "Die Bewerberin erkundigte sich telefonisch nach dem aktuellen Stand ihrer Bewerbung.",
    exEn: "The applicant inquired by phone about the current status of her application.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "sich auf jemanden/etwas freuen",
    english_translation: "to look forward to someone/something",
    forms: "freut sich auf, freute sich auf, hat sich auf ... gefreut",
    exDe: "Das gesamte Team freut sich auf die bevorstehende Zusammenarbeit mit den neuen Partnern.",
    exEn: "The entire team is looking forward to the upcoming collaboration with the new partners.",
    theme: "Freizeit, Sport & Hobbys ⚽"
  },
  {
    german_word: "sich vor jemandem/etwas fürchten",
    english_translation: "to be afraid of / dread someone/something",
    forms: "fürchtet sich vor, fürchtete sich vor, hat sich vor ... gefürchtet",
    exDe: "Wer gut vorbereitet ist, muss sich nicht vor mündlichen Prüfungen fürchten.",
    exEn: "Whoever is well prepared does not need to dread oral examinations.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich an jemanden/etwas gewöhnen",
    english_translation: "to get accustomed to someone/something",
    forms: "gewöhnt sich an, gewöhnte sich an, hat sich an ... gewöhnt",
    exDe: "Ausländische Fachkräfte gewöhnen sich meist rasch an die deutsche Arbeitskultur.",
    exEn: "Foreign professionals usually get accustomed quickly to German work culture.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "sich für jemanden/etwas interessieren",
    english_translation: "to be interested in someone/something",
    forms: "interessiert sich für, interessierte sich für, hat sich für ... interessiert",
    exDe: "Immer mehr junge Menschen interessieren sich für Berufe im Bereich der erneuerbaren Energien.",
    exEn: "More and more young people are interested in careers in the field of renewable energies.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich um jemanden kümmern",
    english_translation: "to take care of / look after someone",
    forms: "kümmert sich um, kümmerte sich um, hat sich um ... gekümmert",
    exDe: "Pflegekräfte kümmern sich tagtäglich mit großem Verantwortungsbewusstsein um ältere Menschen.",
    exEn: "Caregivers look after elderly people every day with a high sense of responsibility.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich für jemanden/etwas schämen",
    english_translation: "to be ashamed of someone/something",
    forms: "schämt sich für, schämte sich für, hat sich für ... geschämt",
    exDe: "Niemand sollte sich dafür schämen, beim Deutschlernen Fehler zu machen.",
    exEn: "No one should feel ashamed of making mistakes while learning German.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich mit jemandem unterhalten",
    english_translation: "to converse / talk with someone",
    forms: "unterhält sich mit, unterhielt sich mit, hat sich mit ... unterhalten",
    exDe: "Auf dem Fachkongress unterhielt sie sich mit führenden Experten über Digitalisierung.",
    exEn: "At the symposium, she conversed with leading experts about digitalization.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "sich über jemanden/etwas wundern",
    english_translation: "to be surprised / wonder at someone/something",
    forms: "wundert sich über, wunderte sich über, hat sich über ... gewundert",
    exDe: "Die Analysten wunderten sich über den unerwartet starken Anstieg der Quartalsgewinne.",
    exEn: "Analysts were surprised at the unexpectedly strong increase in quarterly profits.",
    theme: "Allgemein & Abstrakt 💬"
  },

  // ==========================================
  // 3. REFLEXIVE VERBEN - DATIV-REGIERT
  // ==========================================
  {
    german_word: "sich etwas anmaßen",
    english_translation: "to presume / arrogate something to oneself",
    forms: "maßt sich an, maßte sich an, hat sich angemaßt",
    exDe: "Niemand sollte sich anmaßen, über die persönlichen Lebensentscheidungen anderer zu urteilen.",
    exEn: "No one should presume to judge the personal life choices of others.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "sich etwas denken",
    english_translation: "to think / imagine / suspect something",
    forms: "denkt sich, dachte sich, hat sich gedacht",
    exDe: "Ich habe mir schon gedacht, dass der Vorschlag auf breite Zustimmung stoßen würde.",
    exEn: "I had already figured that the proposal would meet with broad approval.",
    theme: "Allgemein & Abstrakt 💬"
  },
  {
    german_word: "sich etwas kaufen",
    english_translation: "to buy oneself something",
    forms: "kauft sich, kaufte sich, hat sich gekauft",
    exDe: "Nach bestandener B2-Prüfung kaufte er sich ein neues Notebook als Belohnung.",
    exEn: "After passing the B2 exam, he bought himself a new laptop as a reward.",
    theme: "Wirtschaft & Finanzen 📈"
  },
  {
    german_word: "sich etwas leisten können",
    english_translation: "to be able to afford something",
    forms: "kann sich leisten, konnte sich leisten, hat sich leisten können",
    exDe: "Dank der Gehaltserhöhung kann sie sich nun eine größere Wohnung im Stadtzentrum leisten.",
    exEn: "Thanks to the salary increase, she can now afford a larger apartment in the city center.",
    theme: "Wirtschaft & Finanzen 📈"
  },
  {
    german_word: "sich etwas merken",
    english_translation: "to keep in mind / remember something",
    forms: "merkt sich, merkte sich, hat sich gemerkt",
    exDe: "Wichtige Redewendungen sollte man sich durch regelmäßiges Wiederholen einprägen und merken.",
    exEn: "One should memorize and keep important idioms in mind through regular repetition.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich mit jemandem/etwas Mühe geben",
    english_translation: "to take pains / go to trouble with someone/something",
    forms: "gibt sich Mühe mit, gab sich Mühe mit, hat sich mit ... Mühe gegeben",
    exDe: "Die Lehrerin gab sich große Mühe mit den sprachlich schwächeren Schülern.",
    exEn: "The teacher took great pains with the linguistically weaker pupils.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich um jemanden/etwas Sorgen machen",
    english_translation: "to worry about someone/something",
    forms: "macht sich Sorgen um, machte sich Sorgen um, hat sich um ... Sorgen gemacht",
    exDe: "Die Eltern machten sich verständlicherweise Sorgen um die Zukunft ihrer Kinder.",
    exEn: "The parents were understandably worried about the future of their children.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich etwas vorstellen",
    english_translation: "to imagine / visualize something",
    forms: "stellt sich vor, stellte sich vor, hat sich vorgestellt",
    exDe: "Ich kann mir gut vorstellen, in Zukunft vollständig im Homeoffice zu arbeiten.",
    exEn: "I can easily imagine working entirely from home in the future.",
    theme: "Allgemein & Abstrakt 💬"
  },
  {
    german_word: "sich etwas wünschen",
    english_translation: "to wish for / desire something",
    forms: "wünscht sich, wünschte sich, hat sich gewünscht",
    exDe: "Zum Geburtstag wünschte sie sich eine Reise in die deutschsprachigen Alpen.",
    exEn: "For her birthday, she wished for a trip to the German-speaking Alps.",
    theme: "Alltag & Leben 🏠"
  },

  // ==========================================
  // 4. DATIV-AKKUSATIV KOMBINATIONEN
  // ==========================================
  {
    german_word: "sich waschen",
    english_translation: "to wash oneself",
    forms: "wäscht sich, wusch sich, hat sich gewaschen",
    exDe: "Er wäscht sich vor jeder Mahlzeit gründlich.",
    exEn: "He washes himself thoroughly before every meal.",
    theme: "Gesundheit & Körper 🏥"
  },
  {
    german_word: "sich die Hände waschen",
    english_translation: "to wash one's hands",
    forms: "wäscht sich die Hände, wusch sich die Hände, hat sich die Hände gewaschen",
    exDe: "Vor Betreten des sterilen Labors muss man sich sorgfältig die Hände waschen.",
    exEn: "Before entering the sterile laboratory, one must carefully wash one's hands.",
    theme: "Gesundheit & Körper 🏥"
  },
  {
    german_word: "sich anziehen",
    english_translation: "to get dressed",
    forms: "zieht sich an, zog sich an, hat sich angezogen",
    exDe: "Für das wichtige Vorstellungsgespräch zog er sich formell an.",
    exEn: "For the important job interview, he dressed formally.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "sich einen Mantel anziehen",
    english_translation: "to put on a coat",
    forms: "zieht sich einen Mantel an, zog sich einen Mantel an, hat sich einen Mantel angezogen",
    exDe: "Wegen des eisigen Windes zog sie sich einen warmen Wollmantel an.",
    exEn: "Because of the freezing wind, she put on a warm wool coat.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "sich schminken",
    english_translation: "to put on makeup",
    forms: "schminkt sich, schminkte sich, hat sich geschminkt",
    exDe: "Die Schauspielerin schminkt sich vor jedem Theaterauftritt in der Garderobe.",
    exEn: "The actress puts on makeup in the dressing room before every theater performance.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "sich die Lippen schminken",
    english_translation: "to apply lipstick / makeup to one's lips",
    forms: "schminkt sich die Lippen, schminkte sich die Lippen, hat sich die Lippen geschminkt",
    exDe: "Sie schminkte sich vor dem Spiegel die Lippen in einem dezenten Rotton.",
    exEn: "She put on lipstick in a subtle shade of red in front of the mirror.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "sich abtrocknen",
    english_translation: "to dry oneself off",
    forms: "trocknet sich ab, trocknete sich ab, hat sich abgetrocknet",
    exDe: "Nach dem intensiven Schwimmtraining trocknete er sich am Beckenrand ab.",
    exEn: "After intensive swimming practice, he dried himself off by the pool edge.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "sich das Gesicht abtrocknen",
    english_translation: "to dry one's face",
    forms: "trocknet sich das Gesicht ab, trocknete sich das Gesicht ab, hat sich das Gesicht abgetrocknet",
    exDe: "Nach dem Erfrischen trocknete er sich das Gesicht mit einem weichen Handtuch ab.",
    exEn: "After freshening up, he dried his face with a soft towel.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "sich kämmen",
    english_translation: "to comb one's hair",
    forms: "kämmt sich, kämmte sich, hat sich gekämmt",
    exDe: "Vor dem Fototermin kämmte er sich sorgfältig vor dem Spiegel.",
    exEn: "Before the photoshoot, he combed himself carefully in front of the mirror.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "sich die Haare kämmen",
    english_translation: "to comb one's hair",
    forms: "kämmt sich die Haare, kämmte sich die Haare, hat sich die Haare gekämmt",
    exDe: "Sie kämmte sich die Haare, bevor sie das Hotelzimmer verließ.",
    exEn: "She combed her hair before leaving the hotel room.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "sich verletzen",
    english_translation: "to injure oneself / get hurt",
    forms: "verletzt sich, verletzte sich, hat sich verletzt",
    exDe: "Beim Skifahren auf der anspruchsvollen Piste verletzte er sich unglücklich.",
    exEn: "While skiing on the demanding slope, he unfortunately injured himself.",
    theme: "Gesundheit & Körper 🏥"
  },
  {
    german_word: "sich die Hand verletzen",
    english_translation: "to injure one's hand",
    forms: "verletzt sich die Hand, verletzte sich die Hand, hat sich die Hand verletzt",
    exDe: "Bei handwerklichen Arbeiten hat sich der Mechaniker die Hand leicht verletzt.",
    exEn: "During manual work, the mechanic slightly injured his hand.",
    theme: "Gesundheit & Körper 🏥"
  },

  // ==========================================
  // 5. ECHTE REFLEXIVE VERBEN
  // ==========================================
  {
    german_word: "sich erkälten",
    english_translation: "to catch a cold",
    forms: "erkältet sich, erkältete sich, hat sich erkältet",
    exDe: "Weil er ohne Jacke im Regen spazieren ging, hat er sich schwer erkältet.",
    exEn: "Because he walked in the rain without a jacket, he caught a bad cold.",
    theme: "Gesundheit & Körper 🏥"
  },
  {
    german_word: "sich schämen",
    english_translation: "to feel ashamed",
    forms: "schämt sich, schämte sich, hat sich geschämt",
    exDe: "Er schämte sich für sein unangebrachtes Verhalten während der hitzigen Diskussion.",
    exEn: "He felt ashamed of his inappropriate behavior during the heated discussion.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich für etwas bedanken",
    english_translation: "to express gratitude / thank for something",
    forms: "bedankt sich für, bedankte sich für, hat sich für ... bedankt",
    exDe: "Wir bedanken uns herzlich für die konstruktive und vertrauensvolle Zusammenarbeit.",
    exEn: "We thank you warmly for the constructive and trusting collaboration.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich um etwas bewerben",
    english_translation: "to apply for something",
    forms: "bewirbt sich um, bewarb sich um, hat sich um ... beworben",
    exDe: "Hunderte hochqualifizierte Akademiker bewerben sich jährlich um dieses Stipendium.",
    exEn: "Hundreds of highly qualified academics apply for this scholarship every year.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich über jemanden/etwas bücken",
    english_translation: "to bend down / stoop over someone/something",
    forms: "bückt sich über, bückte sich über, hat sich über ... gebückt",
    exDe: "Der Arzt bückte sich über den verletzten Patienten, um die Wunde zu begutachten.",
    exEn: "The doctor bent over the injured patient to inspect the wound.",
    theme: "Gesundheit & Körper 🏥"
  },
  {
    german_word: "sich über jemanden erkundigen",
    english_translation: "to make inquiries about someone",
    forms: "erkundigt sich über, erkundigte sich über, hat sich über ... erkundigt",
    exDe: "Der Personalchef erkundigte sich beim früheren Arbeitgeber über den Kandidaten.",
    exEn: "The HR manager inquired with the former employer about the candidate.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "sich um jemanden/etwas kümmern",
    english_translation: "to look after / attend to someone/something",
    forms: "kümmert sich um, kümmerte sich um, hat sich um ... gekümmert",
    exDe: "Die Abteilung kümmert sich um die reibungslose Abwicklung aller Kundenanfragen.",
    exEn: "The department attends to the smooth processing of all customer requests.",
    theme: "Arbeit & Beruf 💼"
  },

  // ==========================================
  // 6. UNECHTE REFLEXIVE VERBEN
  // ==========================================
  {
    german_word: "sich anstrengen",
    english_translation: "to exert oneself / make an effort",
    forms: "strengt sich an, strengte sich an, hat sich angestrengt",
    exDe: "Alle Projektmitglieder strengten sich an, um die Deadline pünktlich einzuhalten.",
    exEn: "All project members exerted themselves to meet the deadline on time.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "sich nähern",
    english_translation: "to approach / come closer",
    forms: "nähert sich, näherte sich, hat sich genähert",
    exDe: "Das Flugzeug nähert sich planmäßig dem Zielflughafen in München.",
    exEn: "The airplane is approaching the destination airport in Munich on schedule.",
    theme: "Reisen, Ort & Verkehr ✈️"
  },
  {
    german_word: "sich umdrehen",
    english_translation: "to turn around",
    forms: "dreht sich um, drehte sich um, hat sich umgedreht",
    exDe: "Als sie ihren Namen hörte, drehte sie sich überrascht in der Menge um.",
    exEn: "When she heard her name, she turned around in surprise among the crowd.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "sich umziehen",
    english_translation: "to change clothes",
    forms: "zieht sich um, zog sich um, hat sich umgezogen",
    exDe: "Nach der Arbeit zog er sich um, um direkt zum Fitnesstraining zu fahren.",
    exEn: "After work, he changed clothes to drive straight to fitness training.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "sich unterhalten",
    english_translation: "to converse / entertain oneself",
    forms: "unterhält sich, unterhielt sich, hat sich unterhalten",
    exDe: "Die Gäste unterhielten sich angeregt über die wirtschaftlichen Aussichten.",
    exEn: "The guests conversed animatedly about economic prospects.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "sich verpflichten",
    english_translation: "to commit / bind oneself",
    forms: "verpflichtet sich, verpflichtete sich, hat sich verpflichtet",
    exDe: "Die Vertragspartner verpflichteten sich zur strikten Einhaltung der Geheimhaltungsregeln.",
    exEn: "The contracting parties committed themselves to strict adherence to confidentiality rules.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "sich verteidigen",
    english_translation: "to defend oneself",
    forms: "verteidigt sich, verteidigte sich, hat sich verteidigt",
    exDe: "Der Angeklagte verteidigte sich vor Gericht mit schlüssigen Argumenten.",
    exEn: "The defendant defended himself in court with conclusive arguments.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "sich vorbereiten",
    english_translation: "to prepare oneself",
    forms: "bereitet sich vor, bereitete sich vor, hat sich vorbereitet",
    exDe: "Die Studierenden bereiteten sich intensiv auf die anstehende Sprachprüfung vor.",
    exEn: "The students prepared intensively for the upcoming language exam.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich über jemanden/etwas ärgern",
    english_translation: "to get angry / annoyed about someone/something",
    forms: "ärgert sich über, ärgerte sich über, hat sich über ... geärgert",
    exDe: "Er ärgerte sich maßlos über die fehlerhafte Abrechnung der Verwaltung.",
    exEn: "He was exceedingly annoyed about the administration's faulty bill.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich auf/über jemanden/etwas freuen",
    english_translation: "to look forward to / be delighted about someone/something",
    forms: "freut sich auf/über, freute sich auf/über, hat sich auf/über ... gefreut",
    exDe: "Wir freuen uns über das positive Feedback und auf das nächste Projekttreffen.",
    exEn: "We are delighted about the positive feedback and looking forward to the next project meeting.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich auf jemanden/etwas konzentrieren",
    english_translation: "to concentrate / focus on someone/something",
    forms: "konzentriert sich auf, konzentrierte sich auf, hat sich auf ... konzentriert",
    exDe: "In der B2-Prüfung muss man sich voll auf das Hörverstehen konzentrieren.",
    exEn: "In the B2 exam, one must focus fully on listening comprehension.",
    theme: "Bildung & Wissenschaft 🎓"
  },

  // ==========================================
  // 7. REZIPROKE VERBEN
  // ==========================================
  {
    german_word: "sich anfreunden",
    english_translation: "to become friends / warm to",
    forms: "freundet sich an, freundete sich an, hat sich angefreundet",
    exDe: "Im Sprachkurs haben sich Lernende aus aller Welt schnell miteinander angefreundet.",
    exEn: "In the language course, learners from all over the world quickly became friends with one another.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich gleichen",
    english_translation: "to resemble each other / be identical",
    forms: "gleicht sich, glich sich, hat sich geglichen",
    exDe: "Die beiden Entwürfe gleichen sich in vielen gestalterischen Details.",
    exEn: "The two drafts resemble each other in many design details.",
    theme: "Allgemein & Abstrakt 💬"
  },
  {
    german_word: "sich streiten",
    english_translation: "to quarrel / argue with each other",
    forms: "streitet sich, stritt sich, hat sich gestritten",
    exDe: "Die Parteien stritten sich monatelang über die Verteilung der Haushaltsmittel.",
    exEn: "The parties argued for months over the distribution of budget funds.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich verabreden",
    english_translation: "to arrange a meeting / make a date",
    forms: "verabredet sich, verabredete sich, hat sich verabredet",
    exDe: "Die Kollegen verabredeten sich nach Feierabend zu einem gemeinsamen Abendessen.",
    exEn: "The colleagues arranged to meet for dinner together after work.",
    theme: "Freizeit, Sport & Hobbys ⚽"
  },
  {
    german_word: "sich begrüßen",
    english_translation: "to greet each other",
    forms: "begrüßt sich, begrüßte sich, hat sich begrüßt",
    exDe: "Die Delegierten begrüßten sich mit einem herzlichen Händedruck.",
    exEn: "The delegates greeted each other with a warm handshake.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich hassen",
    english_translation: "to hate each other",
    forms: "hasst sich, hasste sich, hat sich gehasst",
    exDe: "In dem Roman hassen sich die verfeindeten Familien seit Generationen.",
    exEn: "In the novel, the feuding families have hated each other for generations.",
    theme: "Kultur & Kunst 🎨"
  },
  {
    german_word: "sich treffen",
    english_translation: "to meet up with each other",
    forms: "trifft sich, traf sich, hat sich getroffen",
    exDe: "Die Arbeitsgruppe trifft sich jeden Dienstag zur Lagebesprechung.",
    exEn: "The working group meets every Tuesday for a status review.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "sich verabschieden",
    english_translation: "to say goodbye / take leave of each other",
    forms: "verabschiedet sich, verabschiedete sich, hat sich verabschiedet",
    exDe: "Am Ende des Seminars verabschiedeten sich die Teilnehmer herzlich voneinander.",
    exEn: "At the end of the seminar, the participants bade each other a warm farewell.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich einigen",
    english_translation: "to reach an agreement / settle",
    forms: "einigt sich, einigte sich, hat sich geeinigt",
    exDe: "Nach langen Verhandlungen einigten sich die Tarifpartner auf einen Kompromiss.",
    exEn: "After long negotiations, the collective bargaining partners agreed on a compromise.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "sich sehen",
    english_translation: "to see each other / meet",
    forms: "sieht sich, sah sich, hat sich gesehen",
    exDe: "Wir haben uns schon seit der letzten Konferenz nicht mehr persönlich gesehen.",
    exEn: "We haven't seen each other in person since the last conference.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich schreiben",
    english_translation: "to write / message each other",
    forms: "schreibt sich, schrieb sich, hat sich geschrieben",
    exDe: "Obwohl sie in verschiedenen Ländern wohnen, schreiben sie sich regelmäßig Nachrichten.",
    exEn: "Although they live in different countries, they write messages to each other regularly.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "sich umarmen",
    english_translation: "to embrace / hug each other",
    forms: "umarmt sich, umarmte sich, hat sich umarmt",
    exDe: "Nach dem langen Auslandsaufenthalt umarmten sich die Geschwister überglücklich.",
    exEn: "After the long stay abroad, the siblings embraced each other overjoyed.",
    theme: "Gesellschaft & Soziales 👥"
  },

  // ==========================================
  // 8. TRENNBARE VERBEN
  // ==========================================
  {
    german_word: "abnehmen",
    english_translation: "to decrease / lose weight / take off",
    forms: "nimmt ab, nahm ab, hat abgenommen",
    exDe: "Durch gezielte Ernährungsumstellung und Sport hat er fünf Kilo abgenommen.",
    exEn: "Through targeted dietary changes and exercise, he lost five kilos.",
    theme: "Gesundheit & Körper 🏥"
  },
  {
    german_word: "abschreiben",
    english_translation: "to copy / plagiarize / write off",
    forms: "schreibt ab, schrieb ab, hat abgeschrieben",
    exDe: "Wer bei einer Klausur abschreibt, muss mit der Note ungenügend rechnen.",
    exEn: "Anyone who copies during an exam must expect a failing grade.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "anfassen",
    english_translation: "to touch / handle / tackle",
    forms: "fasst an, fasste an, hat angefasst",
    exDe: "Bitte fassen Sie die historischen Kunstwerke im Museum nicht mit bloßen Händen an.",
    exEn: "Please do not touch the historical artworks in the museum with bare hands.",
    theme: "Kultur & Kunst 🎨"
  },
  {
    german_word: "anschalten",
    english_translation: "to switch on / turn on",
    forms: "schaltet an, schaltete an, hat angeschaltet",
    exDe: "Er schaltete das Mikrofon an, um seine Präsentation zu beginnen.",
    exEn: "He switched on the microphone to begin his presentation.",
    theme: "Technologie & Digitales ⚡"
  },
  {
    german_word: "aufstehen",
    english_translation: "to get up / stand up",
    forms: "steht auf, stand auf, ist aufgestanden",
    exDe: "Er steht gewöhnlich früh auf, um vor der Arbeit Deutschvokabeln zu lernen.",
    exEn: "He usually gets up early to learn German vocabulary before work.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "aufbauen",
    english_translation: "to build up / establish / construct",
    forms: "baut auf, baute auf, hat aufgebaut",
    exDe: "Das Start-up baute innerhalb weniger Jahre ein internationales Vertriebsnetz auf.",
    exEn: "Within a few years, the start-up built up an international distribution network.",
    theme: "Wirtschaft & Finanzen 📈"
  },
  {
    german_word: "einkaufen",
    english_translation: "to shop / purchase",
    forms: "kauft ein, kaufte ein, hat eingekauft",
    exDe: "Am Samstag kauft die Familie frische regionale Lebensmittel auf dem Markt ein.",
    exEn: "On Saturday, the family purchases fresh regional groceries at the market.",
    theme: "Essen & Trinken 🍎"
  },
  {
    german_word: "heimkommen",
    english_translation: "to come home",
    forms: "kommt heim, kam heim, ist heimgekommen",
    exDe: "Nach einer langen Dienstreise freute sie sich darauf, endlich wieder heimzukommen.",
    exEn: "After a long business trip, she looked forward to finally coming home again.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "nachgehen",
    english_translation: "to pursue / investigate / follow up on",
    forms: "geht nach, ging nach, ist nachgegangen",
    exDe: "Die Ermittler gingen jedem noch so kleinen Hinweis sorgfältig nach.",
    exEn: "The investigators carefully followed up on every single small clue.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "vorbereiten",
    english_translation: "to prepare / set up",
    forms: "bereitet vor, bereitete vor, hat vorbereitet",
    exDe: "Der Referent bereitete anschauliche Folien für den bevorstehenden Workshop vor.",
    exEn: "The speaker prepared descriptive slides for the upcoming workshop.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "vorzeigen",
    english_translation: "to show / present / produce (documents)",
    forms: "zeigt vor, zeigte vor, hat vorgezeigt",
    exDe: "Bei der Passkontrolle musste jeder Reisende einen gültigen Ausweis vorzeigen.",
    exEn: "At passport control, every traveler had to show a valid ID.",
    theme: "Reisen, Ort & Verkehr ✈️"
  },
  {
    german_word: "vorhalten",
    english_translation: "to hold up / reproach / keep in stock",
    forms: "hält vor, hielt vor, hat vorgehalten",
    exDe: "Man hielt dem Manager vor, Risiken im Voraus nicht ausreichend analysiert zu haben.",
    exEn: "The manager was reproached for not having sufficiently analyzed risks in advance.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "zurückbringen",
    english_translation: "to return / bring back",
    forms: "bringt zurück, brachte zurück, hat zurückgebracht",
    exDe: "Vergessen Sie bitte nicht, die ausgeliehenen Fachbücher rechtzeitig in die Bibliothek zurückzubringen.",
    exEn: "Please do not forget to bring the borrowed textbooks back to the library in time.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich anpassen",
    english_translation: "to adapt / conform / adjust",
    forms: "passt sich an, passte sich an, hat sich angepasst",
    exDe: "Unternehmen müssen sich flexibel an veränderte Marktbedingungen anpassen.",
    exEn: "Companies must flexibly adapt to changing market conditions.",
    theme: "Wirtschaft & Finanzen 📈"
  },
  {
    german_word: "auffordern",
    english_translation: "to prompt / call upon / urge",
    forms: "fordert auf, forderte auf, hat aufgefordert",
    exDe: "Die Behörde forderte den Antragsteller auf, fehlende Dokumente nachzureichen.",
    exEn: "The authority requested the applicant to submit missing documents.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "sich aussprechen",
    english_translation: "to express oneself / speak out / talk it out",
    forms: "spricht sich aus, sprach sich aus, hat sich ausgesprochen",
    exDe: "Die Mehrheit der Abgeordneten sprach sich für das neue Gesetz aus.",
    exEn: "The majority of deputies spoke out in favor of the new law.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "sich auswirken",
    english_translation: "to have an effect / impact upon",
    forms: "wirkt sich aus, wirkte sich aus, hat sich ausgewirkt",
    exDe: "Die Zinserhöhung wird sich spürbar auf den Immobilienmarkt auswirken.",
    exEn: "The interest rate hike will have a noticeable effect on the real estate market.",
    theme: "Wirtschaft & Finanzen 📈"
  },
  {
    german_word: "beitragen",
    english_translation: "to contribute to",
    forms: "trägt bei, trug bei, hat beigetragen",
    exDe: "Jeder Einzelne kann mit nachhaltigem Verhalten zum Umweltschutz beitragen.",
    exEn: "Every single individual can contribute to environmental protection through sustainable behavior.",
    theme: "Natur & Umwelt 🌿"
  },
  {
    german_word: "sich einmischen",
    english_translation: "to interfere / meddle",
    forms: "mischt sich ein, mischte sich ein, hat sich eingemischt",
    exDe: "Es ist unprofessionell, sich ungefragt in Angelegenheiten anderer Abteilungen einzumischen.",
    exEn: "It is unprofessional to interfere unprompted in matters of other departments.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich einsetzen",
    english_translation: "to champion / advocate / stand up for",
    forms: "setzt sich ein, setzte sich ein, hat sich eingesetzt",
    exDe: "Die Gewerkschaft setzt sich vehement für faire Löhne und bessere Arbeitsbedingungen ein.",
    exEn: "The trade union actively advocates for fair wages and better working conditions.",
    theme: "Arbeit & Beruf 💼"
  },

  // ==========================================
  // 9. UNTRENNBARE VERBEN
  // ==========================================
  {
    german_word: "beantworten",
    english_translation: "to answer / reply to",
    forms: "beantwortet, beantwortete, hat beantwortet",
    exDe: "Der Dozent beantwortete alle Fragen der Prüfungskandidaten geduldig und präzise.",
    exEn: "The lecturer answered all questions of the exam candidates patiently and precisely.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "beginnen",
    english_translation: "to begin / commence",
    forms: "beginnt, begann, hat begonnen",
    exDe: "Die feierliche Eröffnung der Messe begann pünktlich um neun Uhr.",
    exEn: "The ceremonial opening of the trade fair commenced promptly at nine o'clock.",
    theme: "Wirtschaft & Finanzen 📈"
  },
  {
    german_word: "sich beruhigen",
    english_translation: "to calm down / settle",
    forms: "beruhigt sich, beruhigte sich, hat sich beruhigt",
    exDe: "Nach der Aufregung um die Flugverspätung beruhigte sich die Lage am Flughafen wieder.",
    exEn: "After the excitement regarding the flight delay, the situation at the airport calmed down again.",
    theme: "Reisen, Ort & Verkehr ✈️"
  },
  {
    german_word: "sich beschäftigen",
    english_translation: "to occupy oneself / engage with",
    forms: "beschäftigt sich, beschäftigte sich, hat sich beschäftigt",
    exDe: "In seiner Masterarbeit beschäftigt er sich intensiv mit Künstlicher Intelligenz.",
    exEn: "In his master's thesis, he deals intensively with Artificial Intelligence.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich beschweren",
    english_translation: "to complain / lodge a grievance",
    forms: "beschwert sich, beschwerte sich, hat sich beschwert",
    exDe: "Der Mieter beschwerte sich beim Vermieter über die defekte Heizung.",
    exEn: "The tenant complained to the landlord about the broken heating system.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "sich beteiligen",
    english_translation: "to participate / take part",
    forms: "beteiligt sich, beteiligte sich, hat sich beteiligt",
    exDe: "Zahlreiche Bürger beteiligten sich aktiv an der Podiumsdiskussion.",
    exEn: "Numerous citizens actively participated in the panel discussion.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "erinnern",
    english_translation: "to remind",
    forms: "erinnert, erinnerte, hat erinnert",
    exDe: "Die Kalender-App erinnert mich zuverlässig an alle anstehenden Geschäftstermine.",
    exEn: "The calendar app reliably reminds me of all upcoming business appointments.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "erkennen",
    english_translation: "to recognize / detect / realize",
    forms: "erkennt, erkannte, hat erkannt",
    exDe: "Der Arzt erkannte die Krankheitssymptome bereits im frühen Stadium.",
    exEn: "The doctor recognized the disease symptoms already at an early stage.",
    theme: "Gesundheit & Körper 🏥"
  },
  {
    german_word: "überreden",
    english_translation: "to persuade / talk into",
    forms: "überredet, überredete, hat überredet",
    exDe: "Er überredete seinen Freund, gemeinsam an dem anspruchsvollen Deutschkurs teilzunehmen.",
    exEn: "He persuaded his friend to participate together in the demanding German course.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "überzeugen",
    english_translation: "to convince / persuade",
    forms: "überzeugt, überzeugte, hat überzeugt",
    exDe: "Mit stichhaltigen Argumenten überzeugte sie die Prüfer von ihrem Konzept.",
    exEn: "With sound arguments, she convinced the examiners of her concept.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "vergessen",
    english_translation: "to forget",
    forms: "vergisst, vergaß, hat vergessen",
    exDe: "Vor lauter Prüfungsstress hatte er völlig vergessen, seine Hausarbeit einzureichen.",
    exEn: "Amid sheer exam stress, he had completely forgotten to submit his term paper.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "verstehen",
    english_translation: "to understand / comprehend",
    forms: "versteht, verstand, hat verstanden",
    exDe: "Nach dieser klaren Erklärung verstand die Gruppe den komplexen Grammatikpunkt sofort.",
    exEn: "After this clear explanation, the group understood the complex grammar point immediately.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "vertiefen",
    english_translation: "to deepen / consolidate (knowledge)",
    forms: "vertieft, vertiefte, hat vertieft",
    exDe: "Durch gezielte Übungen können Lernende ihre Deutschkenntnisse nachhaltig vertiefen.",
    exEn: "Through targeted exercises, learners can sustainably deepen their German proficiency.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "verzichten",
    english_translation: "to forgo / dispense with / waive",
    forms: "verzichtet, verzichtete, hat verzichtet",
    exDe: "Zugunsten der Umwelt verzichten immer mehr Pendler auf das eigene Auto.",
    exEn: "In favor of the environment, more and more commuters are doing without their own car.",
    theme: "Natur & Umwelt 🌿"
  },
  {
    german_word: "zerreißen",
    english_translation: "to tear up / shred / rip apart",
    forms: "zerreißt, zerriss, hat zerrissen",
    exDe: "Aus Wut zerriss er den fehlerhaften Vertragsentwurf in kleine Stücke.",
    exEn: "Out of anger, he tore the faulty contract draft into small pieces.",
    theme: "Allgemein & Abstrakt 💬"
  },
  {
    german_word: "sich beklagen",
    english_translation: "to complain / lament",
    forms: "beklagt sich, beklagte sich, hat sich beklagt",
    exDe: "Die Anwohner beklagten sich über den ständigen Lärm der nahegelegenen Baustelle.",
    exEn: "Residents complained about the constant noise from the nearby construction site.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "ernennen",
    english_translation: "to appoint / name to office",
    forms: "ernennt, ernannte, hat ernannt",
    exDe: "Die Bundespräsidentin ernannte die renommierte Juristin zur Verfassungsrichterin.",
    exEn: "The Federal President appointed the renowned jurist as a constitutional judge.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "übertreffen",
    english_translation: "to surpass / exceed",
    forms: "übertrifft, übertraf, hat übertroffen",
    exDe: "Die diesjährigen Exportergebnisse übertrafen selbst die optimistischsten Prognosen.",
    exEn: "This year's export results surpassed even the most optimistic forecasts.",
    theme: "Wirtschaft & Finanzen 📈"
  },
  {
    german_word: "verabschieden",
    english_translation: "to pass (a law) / adopt / see off",
    forms: "verabschiedet, verabschiedete, hat verabschiedet",
    exDe: "Das Parlament verabschiedete das wegweisende Klimaschutzgesetz mit großer Mehrheit.",
    exEn: "Parliament passed the landmark climate protection law with a large majority.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "verarbeiten",
    english_translation: "to process / digest / handle",
    forms: "verarbeitet, verarbeitete, hat verarbeitet",
    exDe: "Moderne Computerprogramme verarbeiten riesige Datenmengen in Sekundenschnelle.",
    exEn: "Modern computer programs process huge amounts of data in fractions of a second.",
    theme: "Technologie & Digitales ⚡"
  },
  {
    german_word: "sich verlassen",
    english_translation: "to rely / depend on",
    forms: "verlässt sich, verließ sich, hat sich verlassen",
    exDe: "In schwierigen Projektsituationen kann man sich voll auf erfahrene Kollegen verlassen.",
    exEn: "In difficult project situations, one can fully rely on experienced colleagues.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "versorgen",
    english_translation: "to supply / provide / cater for",
    forms: "versorgt, versorgte, hat versorgt",
    exDe: "Die Hilfsorganisation versorgte die Erdbebenopfer mit Nahrungsmitteln und Medikamenten.",
    exEn: "The aid organization supplied the earthquake victims with food and medicine.",
    theme: "Gesellschaft & Soziales 👥"
  },

  // ==========================================
  // 10. DOPPEL-PRÄFIXE & VARIABLE VERBEN
  // ==========================================
  {
    german_word: "umfahren",
    english_translation: "to drive around / bypass OR to knock down with a vehicle",
    forms: "umfährt / fährt um, umfuhr / fuhr um, hat umfahren / hat umgefahren",
    exDe: "Wegen des Staus auf der Autobahn umfuhren wir die Innenstadt über die Landstraße.",
    exEn: "Due to the traffic jam on the highway, we bypassed the downtown area via the country road.",
    theme: "Reisen, Ort & Verkehr ✈️"
  },
  {
    german_word: "umrennen",
    english_translation: "to knock down / bowl over",
    forms: "rennt um, rannte um, hat umgerannt",
    exDe: "In der Eile rannte der Passant versehentlich ein Kind auf dem Bahnsteig um.",
    exEn: "In his rush, the pedestrian accidentally bowled over a child on the train platform.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "vollenden",
    english_translation: "to complete / consummate / finish",
    forms: "vollendet, vollendete, hat vollendet",
    exDe: "Nach jahrelanger Arbeit vollendete der Schriftsteller sein monumentales Meisterwerk.",
    exEn: "After years of work, the writer completed his monumental masterpiece.",
    theme: "Kultur & Kunst 🎨"
  },
  {
    german_word: "vollstrecken",
    english_translation: "to execute / enforce (a judgment)",
    forms: "vollstreckt, vollstreckte, hat vollstreckt",
    exDe: "Das Gericht vollstreckte das Urteil nach Ablauf der Berufungsfrist.",
    exEn: "The court enforced the judgment after the appeal period expired.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "widerspiegeln",
    english_translation: "to reflect / mirror",
    forms: "spiegelt wider, spiegelte wider, hat widergespiegelt",
    exDe: "Die Medienberichte spiegeln die vielfältigen Stimmungen in der Gesellschaft wider.",
    exEn: "Media reports reflect the diverse sentiments in society.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "widersprechen",
    english_translation: "to contradict / object to",
    forms: "widerspricht, widersprach, hat widersprochen",
    exDe: "Der Gutachter widersprach den Schlussfolgerungen der Gegenseite mit Nachdruck.",
    exEn: "The expert contradicted the conclusions of the opposing side emphatically.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "wiederholen",
    english_translation: "to repeat / review",
    forms: "wiederholt, wiederholte, hat wiederholt",
    exDe: "Zur Festigung des B2-Wortschatzes wiederholte sie jeden Abend die neuen Begriffe.",
    exEn: "To consolidate the B2 vocabulary, she reviewed the new terms every evening.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "durchwandern",
    english_translation: "to hike through / traverse on foot",
    forms: "durchwandert / wandert durch, durchwanderte / wanderte durch, hat durchwandert / ist durchgewandert",
    exDe: "Während unseres Urlaubs durchwanderten wir die malerischen Täler des Schwarzwaldes.",
    exEn: "During our vacation, we hiked through the picturesque valleys of the Black Forest.",
    theme: "Natur & Umwelt 🌿"
  },
  {
    german_word: "durchschauen",
    english_translation: "to see through / figure out (a deception)",
    forms: "durchschaut, durchschaute, hat durchschaut",
    exDe: "Die erfahrene Ermittlerin durchschaute die Ausreden des Verdächtigen augenblicklich.",
    exEn: "The experienced investigator saw through the suspect's excuses instantly.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "überschätzen",
    english_translation: "to overestimate",
    forms: "überschätzt, überschätzte, hat überschätzt",
    exDe: "Man sollte die eigenen Fähigkeiten bei schwierigen Aufgaben niemals leichtfertig überschätzen.",
    exEn: "One should never casually overestimate one's own abilities with difficult tasks.",
    theme: "Allgemein & Abstrakt 💬"
  },
  {
    german_word: "überwältigen",
    english_translation: "to overwhelm / overpower",
    forms: "überwältigt, überwältigte, hat überwältigt",
    exDe: "Die große Hilfsbereitschaft der Bevölkerung überwältigte die Organisatoren der Spendenaktion.",
    exEn: "The great helpfulness of the population overwhelmed the organizers of the charity drive.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "überfliegen",
    english_translation: "to skim / fly over",
    forms: "überfliegt, überflog, hat überflogen",
    exDe: "Vor dem Meeting überflog die Managerin den ausführlichen Bericht nur kurz.",
    exEn: "Before the meeting, the manager briefly skimmed the detailed report.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "überhören",
    english_translation: "to fail to hear / deliberately ignore",
    forms: "überhört, überhörte, hat überhört",
    exDe: "Wegen des Straßenlärms hatte sie das Klingeln des Telefons leider überhört.",
    exEn: "Because of the traffic noise, she unfortunately failed to hear the phone ringing.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "übergeben",
    english_translation: "to hand over / surrender / vomit",
    forms: "übergibt, übergab, hat übergeben",
    exDe: "Der bisherige Abteilungsleiter übergab die Amtsgeschäfte an seine Nachfolgerin.",
    exEn: "The previous department head handed over the official duties to his successor.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "untergraben",
    english_translation: "to undermine / subvert",
    forms: "untergräbt, untergrub, hat untergraben",
    exDe: "Falschinformationen im Internet können das Vertrauen in demokratische Institutionen untergraben.",
    exEn: "Misinformation on the internet can undermine trust in democratic institutions.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "unterstellen",
    english_translation: "to allege / insinuate OR to place under shelter",
    forms: "unterstellt / stellt unter, unterstellte / stellte unter, hat unterstellt / hat untergestellt",
    exDe: "Der Redner wies den Vorwurf zurück, böswillige Absichten zu unterstellen.",
    exEn: "The speaker rejected the accusation of insinuating malicious intent.",
    theme: "Staat, Recht & Politik ⚖️"
  },

  // ==========================================
  // 11. VERBEN MIT PRÄPOSITIONEN
  // ==========================================
  // Auf + Akk
  {
    german_word: "achten auf (+ Akk)",
    english_translation: "to pay attention to / watch out for",
    forms: "achtet auf, achtete auf, hat auf ... geachtet",
    exDe: "Beim Verfassen wissenschaftlicher Texte muss man penibel auf korrekte Zitation achten.",
    exEn: "When writing academic texts, one must pay meticulous attention to correct citations.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "angewiesen sein auf (+ Akk)",
    english_translation: "to be dependent on / rely upon",
    forms: "ist angewiesen auf, war angewiesen auf, ist auf ... angewiesen gewesen",
    exDe: "Moderne Unternehmen sind zunehmend auf eine stabile digitale Infrastruktur angewiesen.",
    exEn: "Modern businesses are increasingly dependent on a stable digital infrastructure.",
    theme: "Technologie & Digitales ⚡"
  },
  {
    german_word: "anspielen auf (+ Akk)",
    english_translation: "to hint at / allude to",
    forms: "spielt an auf, spielte an auf, hat auf ... angespielt",
    exDe: "In seiner Rede spielte der Politiker auf frühere Skandale der Opposition an.",
    exEn: "In his speech, the politician alluded to previous scandals of the opposition.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "antworten auf (+ Akk)",
    english_translation: "to reply / respond to",
    forms: "antwortet auf, antwortete auf, hat auf ... geantwortet",
    exDe: "Die Sprecherin antwortete präzise auf die kritischen Fragen der Journalisten.",
    exEn: "The spokesperson answered the journalists' critical questions precisely.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "aufpassen auf (+ Akk)",
    english_translation: "to watch out for / look after",
    forms: "passt auf auf, passte auf auf, hat auf ... aufgepasst",
    exDe: "Während der Reise passte sie sorgfältig auf ihre Wertsachen und Reisedokumente auf.",
    exEn: "During the trip, she carefully watched out for her valuables and travel documents.",
    theme: "Reisen, Ort & Verkehr ✈️"
  },
  {
    german_word: "sich berufen auf (+ Akk)",
    english_translation: "to cite / appeal to / invoke",
    forms: "beruft sich auf, berief sich auf, hat sich auf ... berufen",
    exDe: "Der Anwalt berief sich in seinem Plädoyer auf ein wegweisendes Grundsatzurteil.",
    exEn: "In his closing argument, the lawyer invoked a landmark precedent ruling.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "sich beschränken auf (+ Akk)",
    english_translation: "to limit / restrict oneself to",
    forms: "beschränkt sich auf, beschränkte sich auf, hat sich auf ... beschränkt",
    exDe: "Wegen der knappen Redezeit beschränkte sich der Referent auf die Kernaspekte der Studie.",
    exEn: "Due to limited speaking time, the speaker restricted himself to the core aspects of the study.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich beziehen auf (+ Akk)",
    english_translation: "to refer to / relate to",
    forms: "bezieht sich auf, bezog sich auf, hat sich auf ... bezogen",
    exDe: "Die aktuelle Gesetzesänderung bezieht sich auf den Schutz personenbezogener Daten.",
    exEn: "The current legal amendment refers to the protection of personal data.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "sich gründen auf (+ Akk)",
    english_translation: "to be founded on / based upon",
    forms: "gründet sich auf, gründete sich auf, hat sich auf ... gegründet",
    exDe: "Die langjährige Partnerschaft gründet sich auf gegenseitigem Vertrauen und Respekt.",
    exEn: "The long-standing partnership is founded on mutual trust and respect.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "hinweisen auf (+ Akk)",
    english_translation: "to point out / draw attention to",
    forms: "weist hin auf, wies hin auf, hat auf ... hingewiesen",
    exDe: "Der Gutachter wies ausdrücklich auf mögliche Sicherheitsrisiken des Bauprojekts hin.",
    exEn: "The expert explicitly pointed out potential safety risks of the construction project.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "hoffen auf (+ Akk)",
    english_translation: "to hope for",
    forms: "hofft auf, hoffte auf, hat auf ... gehofft",
    exDe: "Die Tourismusbranche hofft in der kommenden Sommersaison auf steigende Besucherzahlen.",
    exEn: "The tourism industry hopes for rising visitor numbers in the upcoming summer season.",
    theme: "Wirtschaft & Finanzen 📈"
  },
  {
    german_word: "reagieren auf (+ Akk)",
    english_translation: "to react / respond to",
    forms: "reagiert auf, reagierte auf, hat auf ... reagiert",
    exDe: "Die Börsen reagierten prompt und positiv auf die Ankündigung der Zentralbank.",
    exEn: "Financial markets reacted promptly and positively to the central bank's announcement.",
    theme: "Wirtschaft & Finanzen 📈"
  },
  {
    german_word: "sich stützen auf (+ Akk)",
    english_translation: "to rely on / lean upon / base on",
    forms: "stützt sich auf, stützte sich auf, hat sich auf ... gestützt",
    exDe: "Die Argumentation des Autors stützt sich auf umfassende empirische Erhebungen.",
    exEn: "The author's argumentation relies on comprehensive empirical surveys.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich verlassen auf (+ Akk)",
    english_translation: "to rely on / count on",
    forms: "verlässt sich auf, verließ sich auf, hat sich auf ... verlassen",
    exDe: "Unsere Geschäftspartner können sich jederzeit auf die Einhaltung der Lieferfristen verlassen.",
    exEn: "Our business partners can at all times rely on adherence to delivery deadlines.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "verzichten auf (+ Akk)",
    english_translation: "to waive / do without / dispense with",
    forms: "verzichtet auf, verzichtete auf, hat auf ... verzichtet",
    exDe: "Aus Kostengründen verzichtete das Unternehmen vorerst auf teure Werbekampagnen.",
    exEn: "For cost reasons, the company dispensed with expensive advertising campaigns for now.",
    theme: "Wirtschaft & Finanzen 📈"
  },
  {
    german_word: "vorbereiten auf (+ Akk)",
    english_translation: "to prepare for",
    forms: "bereitet vor auf, bereitete vor auf, hat auf ... vorbereitet",
    exDe: "Dieser Intensivkurs bereitet gezielt auf das telc B2-Zertifikat vor.",
    exEn: "This intensive course prepares specifically for the telc B2 certificate.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "warten auf (+ Akk)",
    english_translation: "to wait for",
    forms: "wartet auf, wartete auf, hat auf ... gewartet",
    exDe: "Die Bewerber warten gespannt auf die Rückmeldung der Personalabteilung.",
    exEn: "The applicants are waiting anxiously for feedback from the HR department.",
    theme: "Arbeit & Beruf 💼"
  },

  // Auf + Dat
  {
    german_word: "beharren auf (+ Dat)",
    english_translation: "to insist on / persist in",
    forms: "beharrt auf, beharrte auf, hat auf ... beharrt",
    exDe: "Trotz gegenteiliger Beweise beharrte der Angeklagte auf seiner Unschuld.",
    exEn: "Despite contrary evidence, the defendant persisted in his innocence.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "beruhen auf (+ Dat)",
    english_translation: "to be based on / rest on",
    forms: "beruht auf, beruhte auf, hat auf ... beruht",
    exDe: "Wissenschaftliche Erkenntnisse beruhen auf reproduzierbaren Experimenten.",
    exEn: "Scientific insights rest on reproducible experiments.",
    theme: "Bildung & Wissenschaft 🎓"
  },

  // An + Akk
  {
    german_word: "erinnern an (+ Akk)",
    english_translation: "to remind of",
    forms: "erinnert an, erinnerte an, hat an ... erinnert",
    exDe: "Das historische Rathaus erinnert an die glanzvolle Epoche der Hanse.",
    exEn: "The historic town hall reminds of the glorious era of the Hanseatic League.",
    theme: "Kultur & Kunst 🎨"
  },
  {
    german_word: "sich gewöhnen an (+ Akk)",
    english_translation: "to get used to / accustomed to",
    forms: "gewöhnt sich an, gewöhnte sich an, hat sich an ... gewöhnt",
    exDe: "Nach einigen Wochen hatte sie sich an den neuen Arbeitsrhythmus gewöhnt.",
    exEn: "After a few weeks, she had gotten used to the new work rhythm.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "glauben an (+ Akk)",
    english_translation: "to believe in",
    forms: "glaubt an, glaubte an, hat an ... geglaubt",
    exDe: "Um Großes zu erreichen, muss man fest an die eigenen Fähigkeiten glauben.",
    exEn: "In order to achieve great things, one must believe firmly in one's own abilities.",
    theme: "Allgemein & Abstrakt 💬"
  },
  {
    german_word: "grenzen an (+ Akk)",
    english_translation: "to border on / verge on",
    forms: "grenzt an, grenzte an, hat an ... gegrenzt",
    exDe: "Deutschland grenzt im Süden an Österreich und die Schweiz.",
    exEn: "Germany borders on Austria and Switzerland in the south.",
    theme: "Reisen, Ort & Verkehr ✈️"
  },
  {
    german_word: "sich klammern an (+ Akk)",
    english_translation: "to cling to / hold on to",
    forms: "klammert sich an, klammerte sich an, hat sich an ... geklammert",
    exDe: "In Zeiten des Umbruchs klammern sich viele Menschen an vertraute Gewohnheiten.",
    exEn: "In times of upheaval, many people cling to familiar habits.",
    theme: "Gesellschaft & Soziales 👥"
  },

  // An + Dat
  {
    german_word: "beteiligen an (+ Dat)",
    english_translation: "to give a share in / involve in",
    forms: "beteiligt an, beteiligte an, hat an ... beteiligt",
    exDe: "Das Unternehmen beteiligt seine Belegschaft am jährlichen Unternehmenserfolg.",
    exEn: "The company gives its workforce a share in the annual corporate profit.",
    theme: "Wirtschaft & Finanzen 📈"
  },
  {
    german_word: "teilnehmen an (+ Dat)",
    english_translation: "to participate in / attend",
    forms: "nimmt teil an, nahm teil an, hat an ... teilgenommen",
    exDe: "Über hundert Wissenschaftler nahmen an der internationalen Tagung in Berlin teil.",
    exEn: "Over a hundred scientists participated in the international symposium in Berlin.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "fehlen an (+ Dat)",
    english_translation: "to lack / be lacking in",
    forms: "fehlt an, fehlte an, hat an ... gefehlt",
    exDe: "In vielen ländlichen Regionen fehlt es an qualifizierten Fachärzten.",
    exEn: "In many rural regions, there is a lack of qualified medical specialists.",
    theme: "Gesundheit & Körper 🏥"
  },
  {
    german_word: "mangeln an (+ Dat)",
    english_translation: "to be short of / lack",
    forms: "mangelt an, mangelte an, hat an ... gemangelt",
    exDe: "Dem ambitionierten Vorhaben mangelt es derzeit an ausreichender finanzieller Förderung.",
    exEn: "The ambitious venture currently lacks sufficient financial funding.",
    theme: "Wirtschaft & Finanzen 📈"
  },
  {
    german_word: "schuld sein an (+ Dat)",
    english_translation: "to be to blame for / be at fault for",
    forms: "ist schuld an, war schuld an, ist an ... schuld gewesen",
    exDe: "Ein technischer Defekt war schuld an dem plötzlichen Stromausfall im Rechenzentrum.",
    exEn: "A technical malfunction was to blame for the sudden power outage in the data center.",
    theme: "Technologie & Digitales ⚡"
  },
  {
    german_word: "zweifeln an (+ Dat)",
    english_translation: "to doubt / have doubts about",
    forms: "zweifelt an, zweifelte an, hat an ... gezweifelt",
    exDe: "Die Gutachter zweifelten an der Belastbarkeit der vorgelegten Statistiken.",
    exEn: "The assessors doubted the reliability of the presented statistics.",
    theme: "Bildung & Wissenschaft 🎓"
  },

  // Aus + Dat
  {
    german_word: "folgern aus (+ Dat)",
    english_translation: "to conclude / deduce from",
    forms: "folgert aus, folgerte aus, hat aus ... gefolgert",
    exDe: "Aus den vorliegenden Versuchsergebnissen folgerten die Forscher eine neue Wirkungsweise.",
    exEn: "From the available experimental results, researchers deduced a new mode of action.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "schließen aus (+ Dat)",
    english_translation: "to infer / conclude from",
    forms: "schließt aus, schloss aus, hat aus ... geschlossen",
    exDe: "Aus dem Schweigen der Geschäftsführung schlossen die Mitarbeiter nichts Gutes.",
    exEn: "From management's silence, employees inferred nothing good.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "übersetzen aus (+ Dat)",
    english_translation: "to translate from (a language)",
    forms: "übersetzt aus, übersetzte aus, hat aus ... übersetzt",
    exDe: "Die Übersetzerin übertrug das literarische Werk aus dem Deutschen ins Englische.",
    exEn: "The translator rendered the literary work from German into English.",
    theme: "Medien & Kommunikation 💻"
  },

  // Für + Akk
  {
    german_word: "sich bei jemandem bedanken für (+ Akk)",
    english_translation: "to thank someone for something",
    forms: "bedankt sich bei ... für, bedankte sich bei ... für, hat sich bei ... für ... bedankt",
    exDe: "Die Vorsitzende bedankte sich bei allen Ehrenamtlichen für ihren vorbildlichen Einsatz.",
    exEn: "The chairwoman thanked all volunteers for their exemplary dedication.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "danken für (+ Akk)",
    english_translation: "to thank for",
    forms: "dankt für, dankte für, hat für ... gedankt",
    exDe: "Wir danken Ihnen für Ihre freundliche Aufmerksamkeit und Ihr Interesse.",
    exEn: "We thank you for your kind attention and interest.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "sich interessieren für (+ Akk)",
    english_translation: "to be interested in",
    forms: "interessiert sich für, interessierte sich für, hat sich für ... interessiert",
    exDe: "Sie interessiert sich brennend für zeitgenössische Architektur und Städtebau.",
    exEn: "She is keenly interested in contemporary architecture and urban planning.",
    theme: "Kultur & Kunst 🎨"
  },
  {
    german_word: "sich schämen für (+ Akk)",
    english_translation: "to feel ashamed of",
    forms: "schämt sich für, schämte sich für, hat sich für ... geschämt",
    exDe: "Man muss sich nicht für anfängliche Aussprachefehler in einer Fremdsprache schämen.",
    exEn: "One does not have to be ashamed of initial pronunciation errors in a foreign language.",
    theme: "Gesellschaft & Soziales 👥"
  },

  // In + Akk
  {
    german_word: "ausarten in (+ Akk)",
    english_translation: "to degenerate into / get out of hand in",
    forms: "artet aus in, artete aus in, ist in ... ausgeartet",
    exDe: "Die friedliche Demonstration drohte zwischenzeitlich in gewaltsame Ausschreitungen auszuarten.",
    exEn: "The peaceful demonstration threatened at times to degenerate into violent riots.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "eingreifen in (+ Akk)",
    english_translation: "to intervene in / step into",
    forms: "greift ein in, griff ein in, hat in ... eingegriffen",
    exDe: "Die Regierung sah sich gezwungen, regulierend in den Energiemarkt einzugreifen.",
    exEn: "The government felt compelled to intervene regulatively in the energy market.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "verwickelt sein in (+ Akk)",
    english_translation: "to be involved / implicated in",
    forms: "ist verwickelt in, war verwickelt in, ist in ... verwickelt gewesen",
    exDe: "Der Geschäftsmann war in einen folgenschweren Finanzskandal verwickelt.",
    exEn: "The businessman was implicated in a momentous financial scandal.",
    theme: "Wirtschaft & Finanzen 📈"
  },
  {
    german_word: "sich verlieben in (+ Akk)",
    english_translation: "to fall in love with",
    forms: "verliebt sich in, verliebte sich in, hat sich in ... verliebt",
    exDe: "Während seines Auslandssemesters in Wien verliebte er sich in die österreichische Kultur.",
    exEn: "During his exchange semester in Vienna, he fell in love with Austrian culture.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich vertiefen in (+ Akk)",
    english_translation: "to engross / immerse oneself in",
    forms: "vertieft sich in, vertiefte sich in, hat sich in ... vertieft",
    exDe: "Sie vertiefte sich in die anspruchsvolle Lektüre eines juristischen Fachbuchs.",
    exEn: "She immersed herself in the demanding reading of a legal textbook.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "verwandeln in (+ Akk)",
    english_translation: "to transform / turn into",
    forms: "verwandelt in, verwandelte in, hat in ... verwandelt",
    exDe: "Der Umbau verwandelte die alte Industriehalle in ein modernes Kulturzentrum.",
    exEn: "The renovation transformed the old industrial hall into a modern cultural center.",
    theme: "Kultur & Kunst 🎨"
  },

  // Mit + Dat
  {
    german_word: "anfangen mit (+ Dat)",
    english_translation: "to start with / begin",
    forms: "fängt an mit, fing an mit, hat mit ... angefangen",
    exDe: "Wir sollten unverzüglich mit der Tagesordnung der heutigen Sitzung anfangen.",
    exEn: "We should begin with the agenda of today's meeting without delay.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "beginnen mit (+ Dat)",
    english_translation: "to commence with / start",
    forms: "beginnt mit, begann mit, hat mit ... begonnen",
    exDe: "Der Sprachkurs beginnt planmäßig mit einer Einführung in die B2-Grammatik.",
    exEn: "The language course commences on schedule with an introduction to B2 grammar.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "aufhören mit (+ Dat)",
    english_translation: "to stop / cease doing",
    forms: "hört auf mit, hörte auf mit, hat mit ... aufgehört",
    exDe: "Er hat beschlossen, endgültig mit dem Rauchen aufzuhören.",
    exEn: "He resolved to quit smoking once and for all.",
    theme: "Gesundheit & Körper 🏥"
  },
  {
    german_word: "jemandem drohen mit (+ Dat)",
    english_translation: "to threaten someone with",
    forms: "droht mit, drohte mit, hat mit ... gedroht",
    exDe: "Der Gläubiger drohte dem Schuldner mit rechtlichen Schritten und Mahnverfahren.",
    exEn: "The creditor threatened the debtor with legal action and collection proceedings.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "sich befassen mit (+ Dat)",
    english_translation: "to deal with / occupy oneself with",
    forms: "befasst sich mit, befasste sich mit, hat sich mit ... befasst",
    exDe: "Die Sachverständigenkommission befasst sich eingehend mit der Rentenreform.",
    exEn: "The expert commission is dealing thoroughly with pension reform.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "sich beschäftigen mit (+ Dat)",
    english_translation: "to occupy oneself with / be engaged in",
    forms: "beschäftigt sich mit, beschäftigte sich mit, hat sich mit ... beschäftigt",
    exDe: "In ihrer Freizeit beschäftigt sie sich intensiv mit deutscher Literatur des 20. Jahrhunderts.",
    exEn: "In her free time, she engages intensively with 20th-century German literature.",
    theme: "Kultur & Kunst 🎨"
  },
  {
    german_word: "sich begnügen mit (+ Dat)",
    english_translation: "to content oneself with / settle for",
    forms: "begnügt sich mit, begnügte sich mit, hat sich mit ... begnügt",
    exDe: "Der Sportler begnügte sich nicht mit dem zweiten Platz, sondern strebte nach Gold.",
    exEn: "The athlete did not settle for second place, but aimed for gold.",
    theme: "Freizeit, Sport & Hobbys ⚽"
  },
  {
    german_word: "Mitleid haben mit (+ Dat)",
    english_translation: "to have pity / compassion on",
    forms: "hat Mitleid mit, hatte Mitleid mit, hat mit ... Mitleid gehabt",
    exDe: "Die Helfer hatten tiefes Mitleid mit den Opfern der Naturkatastrophe.",
    exEn: "The helpers felt deep compassion for the victims of the natural disaster.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "prahlen mit (+ Dat)",
    english_translation: "to boast / brag about",
    forms: "prahlt mit, prahlte mit, hat mit ... geprahlt",
    exDe: "Es gilt als unhöflich, in Gesellschaft mit seinen materiellen Besitztümern zu prahlen.",
    exEn: "It is considered impolite to brag about one's material possessions in company.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich schmücken mit (+ Dat)",
    english_translation: "to adorn oneself with / take credit for",
    forms: "schmückt sich mit, schmückte sich mit, hat sich mit ... geschmückt",
    exDe: "Der Projektleiter schmückte sich gern mit den Erfolgen seines gesamten Teams.",
    exEn: "The project manager liked to take credit for the successes of his entire team.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "verbinden mit (+ Dat)",
    english_translation: "to connect / associate with",
    forms: "verbindet mit, verband mit, hat mit ... verbunden",
    exDe: "Mit dieser Stadt verbinde ich unvergessliche Erinnerungen an meine Jugendzeit.",
    exEn: "With this city, I associate unforgettable memories of my youth.",
    theme: "Allgemein & Abstrakt 💬"
  },
  {
    german_word: "vergleichen mit (+ Dat)",
    english_translation: "to compare with",
    forms: "vergleicht mit, verglich mit, hat mit ... verglichen",
    exDe: "Man kann das Bildungssystem in Deutschland schwer mit dem in den USA vergleichen.",
    exEn: "One can hardly compare the education system in Germany with that in the USA.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "versorgen mit (+ Dat)",
    english_translation: "to supply / provide with",
    forms: "versorgt mit, versorgte mit, hat mit ... versorgt",
    exDe: "Die Notunterkunft versorgte alle Betroffenen zuverlässig mit warmen Mahlzeiten und Decken.",
    exEn: "The emergency shelter reliably provided all affected people with warm meals and blankets.",
    theme: "Gesellschaft & Soziales 👥"
  },

  // Nach + Dat
  {
    german_word: "sich erkundigen nach (+ Dat)",
    english_translation: "to inquire after / ask about",
    forms: "erkundigt sich nach, erkundigte sich nach, hat sich nach ... erkundigt",
    exDe: "Er erkundigte sich höflich nach dem Wohlbefinden der kranken Kollegin.",
    exEn: "He inquired politely after the well-being of the sick colleague.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "riechen nach (+ Dat)",
    english_translation: "to smell of / smell like",
    forms: "riecht nach, roch nach, hat nach ... gerochen",
    exDe: "In der Bäckerei roch es herrlich nach frisch gebackenem Brot und Zimt.",
    exEn: "In the bakery, it smelled delightfully of freshly baked bread and cinnamon.",
    theme: "Essen & Trinken 🍎"
  },
  {
    german_word: "schmecken nach (+ Dat)",
    english_translation: "to taste of / taste like",
    forms: "schmeckt nach, schmeckte nach, hat nach ... geschmeckt",
    exDe: "Das traditionelle Gericht schmeckte intensiv nach frischen Kräutern und Knoblauch.",
    exEn: "The traditional dish tasted intensely of fresh herbs and garlic.",
    theme: "Essen & Trinken 🍎"
  },
  {
    german_word: "sich sehnen nach (+ Dat)",
    english_translation: "to yearn / long for",
    forms: "sehnt sich nach, sehnte sich nach, hat sich nach ... gesehnt",
    exDe: "Nach dem langen Winter sehnen sich die Menschen nach Sonne und Wärme.",
    exEn: "After the long winter, people yearn for sunshine and warmth.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "suchen nach (+ Dat)",
    english_translation: "to search / look for",
    forms: "sucht nach, suchte nach, hat nach ... gesucht",
    exDe: "Unternehmen suchen händeringend nach qualifizierten Fachkräften im IT-Sektor.",
    exEn: "Companies are desperately searching for qualified professionals in the IT sector.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "verlangen nach (+ Dat)",
    english_translation: "to demand / crave / call for",
    forms: "verlangt nach, verlangte nach, hat nach ... verlangt",
    exDe: "Die angespannte wirtschaftliche Lage verlangt nach schnellen politischen Lösungen.",
    exEn: "The tense economic situation calls for swift political solutions.",
    theme: "Staat, Recht & Politik ⚖️"
  },

  // Über + Akk
  {
    german_word: "sich ärgern über (+ Akk)",
    english_translation: "to be annoyed / irritated about",
    forms: "ärgert sich über, ärgerte sich über, hat sich über ... geärgert",
    exDe: "Die Fahrgäste ärgerten sich über die unangekündigte Zugausfälle.",
    exEn: "Passengers were annoyed about the unannounced train cancellations.",
    theme: "Reisen, Ort & Verkehr ✈️"
  },
  {
    german_word: "sich aufregen über (+ Akk)",
    english_translation: "to get agitated / upset about",
    forms: "regt sich auf über, regte sich auf über, hat sich über ... aufgeregt",
    exDe: "Es bringt nichts, sich über unveränderbare Umstände wie schlechtes Wetter aufzuregen.",
    exEn: "There is no point in getting upset about unchangeable circumstances like bad weather.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "sich beklagen über (+ Akk)",
    english_translation: "to complain about",
    forms: "beklagt sich über, beklagte sich über, hat sich über ... beklagt",
    exDe: "Die Belegschaft beklagte sich über mangelnde Kommunikation seitens der Führungsetage.",
    exEn: "The staff complained about a lack of communication on the part of executive management.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "sich beschweren über (+ Akk)",
    english_translation: "to lodge a complaint about",
    forms: "beschwert sich über, beschwerte sich über, hat sich über ... beschwert",
    exDe: "Der Hotelgast beschwerte sich über den Lärm der angrenzenden Baustelle.",
    exEn: "The hotel guest lodged a complaint about the noise of the adjacent construction site.",
    theme: "Reisen, Ort & Verkehr ✈️"
  },
  {
    german_word: "diskutieren über (+ Akk)",
    english_translation: "to discuss / debate about",
    forms: "diskutiert über, diskutierte über, hat über ... diskutiert",
    exDe: "Die Experten diskutierten stundenlang über die Vor- und Nachteile der Digitalisierung.",
    exEn: "The experts debated for hours about the pros and cons of digitalization.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "sich lustig machen über (+ Akk)",
    english_translation: "to make fun of / poke fun at",
    forms: "macht sich lustig über, machte sich lustig über, hat sich über ... lustig gemacht",
    exDe: "Es gehört zum guten Ton, sich nicht über die Sprachfehler anderer lustig zu machen.",
    exEn: "It is good manners not to make fun of other people's language mistakes.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "nachdenken über (+ Akk)",
    english_translation: "to reflect upon / ponder",
    forms: "denkt nach über, dachte nach über, hat über ... nachgedacht",
    exDe: "Sie dachte lange über das verlockende Angebot einer Beförderung nach.",
    exEn: "She pondered for a long time over the tempting offer of a promotion.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "staunen über (+ Akk)",
    english_translation: "to marvel at / be astonished by",
    forms: "staunt über, staunte über, hat über ... gestaunt",
    exDe: "Die Touristen staunten über die meisterhafte Architektur des Kölner Doms.",
    exEn: "Tourists marveled at the masterly architecture of Cologne Cathedral.",
    theme: "Kultur & Kunst 🎨"
  },
  {
    german_word: "sich wundern über (+ Akk)",
    english_translation: "to be surprised / wonder at",
    forms: "wundert sich über, wunderte sich über, hat sich über ... gewundert",
    exDe: "Viele Bürger wunderten sich über die plötzliche Schließung des Bürgeramtes.",
    exEn: "Many citizens wondered at the sudden closure of the municipal administrative office.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "verfügen über (+ Akk)",
    english_translation: "to have at one's disposal / command (skills, assets)",
    forms: "verfügt über, verfügte über, hat über ... verfügt",
    exDe: "Die Bewerberin verfügt über verhandlungssichere Deutsch- und Englischkenntnisse.",
    exEn: "The applicant commands business-fluent German and English skills.",
    theme: "Arbeit & Beruf 💼"
  },

  // Um + Akk
  {
    german_word: "sich kümmern um (+ Akk)",
    english_translation: "to take care of / attend to",
    forms: "kümmert sich um, kümmerte sich um, hat sich um ... gekümmert",
    exDe: "Unsere Kundenberater kümmern sich engagiert um all Ihre individuellen Anliegen.",
    exEn: "Our customer advisors attend dedicatedly to all your individual concerns.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "beneiden um (+ Akk)",
    english_translation: "to envy for",
    forms: "beneidet um, beneidete um, hat um ... beneidet",
    exDe: "Viele Kollegen beneideten ihn um seine herausragenden Sprachkenntnisse.",
    exEn: "Many colleagues envied him for his outstanding language skills.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "sich bewerben um (+ Akk)",
    english_translation: "to apply for",
    forms: "bewirbt sich um, bewarb sich um, hat sich um ... beworben",
    exDe: "Sie bewirbt sich um einen renommierten Forschungspreis im Bereich Medizin.",
    exEn: "She is applying for a prestigious research award in the field of medicine.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "bitten um (+ Akk)",
    english_translation: "to ask for / request",
    forms: "bittet um, bat um, hat um ... gebeten",
    exDe: "Der Kunde bat höflich um eine Verlängerung der Zahlungsfrist.",
    exEn: "The customer politely asked for an extension of the payment deadline.",
    theme: "Wirtschaft & Finanzen 📈"
  },
  {
    german_word: "sich handeln um (+ Akk)",
    english_translation: "to be a matter of / be about",
    forms: "handelt sich um, handelte sich um, hat sich um ... gehandelt",
    exDe: "Bei dem vorliegenden Dokument handelt es sich um einen rechtsverbindlichen Vertrag.",
    exEn: "The document at hand is a legally binding contract.",
    theme: "Staat, Recht & Politik ⚖️"
  },

  // Von + Dat
  {
    german_word: "abraten von (+ Dat)",
    english_translation: "to advise against",
    forms: "rät ab von, riet ab von, hat von ... abgeraten",
    exDe: "Der Finanzberater riet dem Investor von dieser riskanten Spekulation ab.",
    exEn: "The financial advisor advised the investor against this risky speculation.",
    theme: "Wirtschaft & Finanzen 📈"
  },
  {
    german_word: "abhängen von (+ Dat)",
    english_translation: "to depend on",
    forms: "hängt ab von, hing ab von, hat von ... abgehangen",
    exDe: "Der Prüfungserfolg hängt maßgeblich von einer konsequenten Vorbereitung ab.",
    exEn: "Exam success depends decisively on consistent preparation.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "befreien von (+ Dat)",
    english_translation: "to exempt from / free from",
    forms: "befreit von, befreite von, hat von ... befreit",
    exDe: "Studierende können unter bestimmten Voraussetzungen von den Studiengebühren befreit werden.",
    exEn: "Under certain conditions, students can be exempted from tuition fees.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich entfernen von (+ Dat)",
    english_translation: "to move away from / distance oneself from",
    forms: "entfernt sich von, entfernte sich von, hat sich von ... entfernt",
    exDe: "Das Schiff entfernte sich allmählich von der heimischen Küste.",
    exEn: "The ship gradually moved away from the domestic coast.",
    theme: "Reisen, Ort & Verkehr ✈️"
  },
  {
    german_word: "überzeugen von (+ Dat)",
    english_translation: "to convince / persuade of",
    forms: "überzeugt von, überzeugte von, hat von ... überzeugt",
    exDe: "Mit stichhaltigen Argumenten überzeugte sie die Jury von der Machbarkeit ihres Projekts.",
    exEn: "With sound arguments, she convinced the jury of the feasibility of her project.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sich verabschieden von (+ Dat)",
    english_translation: "to say goodbye to / take leave of",
    forms: "verabschiedet sich von, verabschiedete sich von, hat sich von ... verabschiedet",
    exDe: "Vor dem Abflug verabschiedete er sich emotional von seinen Angehörigen am Gate.",
    exEn: "Before departure, he took emotional leave of his relatives at the gate.",
    theme: "Reisen, Ort & Verkehr ✈️"
  },

  // Vor + Dat
  {
    german_word: "Achtung haben vor (+ Dat)",
    english_translation: "to have respect for",
    forms: "hat Achtung vor, hatte Achtung vor, hat vor ... Achtung gehabt",
    exDe: "Man sollte stets aufrichtige Achtung vor der Lebensleistung älterer Menschen haben.",
    exEn: "One should always have sincere respect for the lifetime achievements of elderly people.",
    theme: "Gesellschaft & Soziales 👥"
  },
  {
    german_word: "Angst haben vor (+ Dat)",
    english_translation: "to be afraid of / fear",
    forms: "hat Angst vor, hatte Angst vor, hat vor ... Angst gehabt",
    exDe: "Niemand muss Angst vor Fehlern beim Sprechen einer Fremdsprache haben.",
    exEn: "No one needs to be afraid of making mistakes when speaking a foreign language.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "fliehen vor (+ Dat)",
    english_translation: "to flee from / escape",
    forms: "flieht vor, floh vor, ist vor ... geflohen",
    exDe: "Tausende Menschen flohen vor dem bewaffneten Konflikt ins Nachbarland.",
    exEn: "Thousands of people fled from the armed conflict into the neighboring country.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "sich fürchten vor (+ Dat)",
    english_translation: "to dread / fear",
    forms: "fürchtet sich vor, fürchtete sich vor, hat sich vor ... gefürchtet",
    exDe: "Wer sich gründlich vorbereitet, braucht sich vor mündlichen Prüfungen nicht zu fürchten.",
    exEn: "Whoever prepares thoroughly does not need to fear oral exams.",
    theme: "Bildung & Wissenschaft 🎓"
  },

  // Zu + Dat
  {
    german_word: "beglückwünschen zu (+ Dat)",
    english_translation: "to congratulate on",
    forms: "beglückwünscht zu, beglückwünschte zu, hat zu ... beglückwünscht",
    exDe: "Der Rektor beglückwünschte die Absolventen zu ihrem hervorragenden Studienabschluss.",
    exEn: "The rector congratulated the graduates on their outstanding degree.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "gratulieren zu (+ Dat)",
    english_translation: "to congratulate on",
    forms: "gratuliert zu, gratulierte zu, hat zu ... gratuliert",
    exDe: "Wir gratulieren Ihnen herzlich zum erfolgreichen Bestehen der B2-Prüfung!",
    exEn: "We warmly congratulate you on successfully passing the B2 exam!",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "beitragen zu (+ Dat)",
    english_translation: "to contribute to",
    forms: "trägt bei zu, trug bei zu, hat zu ... beigetragen",
    exDe: "Konstruktive Diskussionen tragen wesentlich zur Lösungsfindung im Team bei.",
    exEn: "Constructive discussions contribute significantly to finding solutions within the team.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "einladen zu (+ Dat)",
    english_translation: "to invite to",
    forms: "lädt ein zu, lud ein zu, hat zu ... eingeladen",
    exDe: "Die Firma lud alle Geschäftspartner zum jährlichen Sommerfest ein.",
    exEn: "The company invited all business partners to the annual summer celebration.",
    theme: "Freizeit, Sport & Hobbys ⚽"
  },
  {
    german_word: "sich entschließen zu (+ Dat)",
    english_translation: "to resolve to / decide on",
    forms: "entschließt sich zu, entschloss sich zu, hat sich zu ... entschlossen",
    exDe: "Nach reiflicher Überlegung entschloss er sich zum Antritt einer neuen Stelle.",
    exEn: "After careful consideration, he resolved to take up a new position.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "gehören zu (+ Dat)",
    english_translation: "to belong to / be part of",
    forms: "gehört zu, gehörte zu, hat zu ... gehört",
    exDe: "Pünktlichkeit und Zuverlässigkeit gehören zu den wichtigsten deutschen Berufstugenden.",
    exEn: "Punctuality and reliability belong to the most important German professional virtues.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "passen zu (+ Dat)",
    english_translation: "to match / go well with",
    forms: "passt zu, passte zu, hat zu ... gepasst",
    exDe: "Dieser elegante Anzug passt hervorragend zu dem festlichen Anlass.",
    exEn: "This elegant suit matches the festive occasion exceptionally well.",
    theme: "Alltag & Leben 🏠"
  },
  {
    german_word: "zwingen zu (+ Dat)",
    english_translation: "to force / compel to",
    forms: "zwingt zu, zwang zu, hat zu ... gezwungen",
    exDe: "Die finanzielle Notlage zwang das Unternehmen zu drastischen Sparmaßnahmen.",
    exEn: "The financial plight forced the company into drastic austerity measures.",
    theme: "Wirtschaft & Finanzen 📈"
  },

  // ==========================================
  // 12. MODALVERBEN
  // ==========================================
  {
    german_word: "mögen",
    english_translation: "to like / care for; may",
    forms: "mag, mochte, hat gemocht",
    exDe: "In formellen Texten mag diese Wendung durchaus angemessen sein.",
    exEn: "In formal texts, this turn of phrase may indeed be appropriate.",
    theme: "Medien & Kommunikation 💻"
  },
  {
    german_word: "können",
    english_translation: "can / to be able to",
    forms: "kann, konnte, hat gekonnt",
    exDe: "Mit fortgeschrittenen Sprachkenntnissen kann man komplexe Sachverhalte präzise schildern.",
    exEn: "With advanced language skills, one can describe complex matters precisely.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "dürfen",
    english_translation: "may / to be permitted to",
    forms: "darf, durfte, hat gedurft",
    exDe: "Während der Klausur dürfen keine unerlaubten Hilfsmittel verwendet werden.",
    exEn: "During the written examination, no unauthorized aids may be used.",
    theme: "Staat, Recht & Politik ⚖️"
  },
  {
    german_word: "müssen",
    english_translation: "must / to have to",
    forms: "muss, musste, hat gemusst",
    exDe: "Vor Antritt einer neuen Stelle müssen alle formalen Vertragsbedingungen erfüllt sein.",
    exEn: "Before taking up a new position, all formal contractual terms must be fulfilled.",
    theme: "Arbeit & Beruf 💼"
  },
  {
    german_word: "wollen",
    english_translation: "to want to / intend to",
    forms: "will, wollte, hat gewollt",
    exDe: "Die Studierenden wollen ihre Sprachkenntnisse im kommenden Semester weiter ausbauen.",
    exEn: "The students intend to further expand their language skills in the coming semester.",
    theme: "Bildung & Wissenschaft 🎓"
  },
  {
    german_word: "sollen",
    english_translation: "should / ought to / to be supposed to",
    forms: "soll, sollte, hat gesollt",
    exDe: "Laut Prüfungsordnung sollen alle Teilnehmenden mindestens fünfzehn Minuten vor Beginn eintreffen.",
    exEn: "According to the examination regulations, all participants ought to arrive at least fifteen minutes prior to start.",
    theme: "Bildung & Wissenschaft 🎓"
  }
];

// Deduplicate RAW_B2_VERBS by german_word
const uniqueMap = new Map<string, B2VerbEntryRaw>();
for (const entry of RAW_B2_VERBS) {
  if (!uniqueMap.has(entry.german_word)) {
    uniqueMap.set(entry.german_word, entry);
  }
}

const uniqueList = Array.from(uniqueMap.values());

const outputTS = 'import { VocabularyEntry } from "./telc_helper";\n\n' +
  'export const B2_SPECIAL_VERBS_DATA: VocabularyEntry[] = ' +
  JSON.stringify(
    uniqueList.map((item, idx) => ({
      id: `b2-special-verb-${idx}`,
      german_word: item.german_word,
      word: item.german_word,
      forms: item.forms,
      english_translation: item.english_translation,
      examples: [
        {
          de: item.exDe,
          en: item.exEn
        }
      ],
      type: "Verb",
      level: "B2",
      theme: item.theme
    })),
    null,
    2
  ) + ';\n';

fs.writeFileSync(path.join(process.cwd(), 'src/data/b2_special_verbs.ts'), outputTS, 'utf-8');
console.log(`Successfully written ${uniqueList.length} B2 special verbs to src/data/b2_special_verbs.ts!`);

