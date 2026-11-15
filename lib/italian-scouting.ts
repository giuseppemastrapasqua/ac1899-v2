const figcU17 = "Qualificazioni U17 del novembre 2026, FIGC";
const figcU18 = "Raduno Italia U18 pre-Mondiale 2026, FIGC";

type Scout = [name: string, club: string, evidence: string, watch: string, source: string];

export const scoutingGroups: { role: string; players: Scout[] }[] = [
  { role: "Portieri", players: [
    ["Umberto Costante","Inter","Titolare e imbattuto nel 4–0 sull’Armenia.","Scelte in uscita contro squadre che attaccano la profondità.",figcU17],
    ["Filippo Rondelli","Atalanta","Tra i due portieri dell’Italia U17 nelle qualificazioni europee.","Gestione dei cross e distribuzione sotto pressione.",figcU17],
    ["Lorenzo Costoli","Genoa","Convocato nello stage pre-Mondiale.","Continuità nelle uscite e qualità del primo passaggio.",figcU18],
    ["Carlo Galliera","Inter","Convocato nello stage pre-Mondiale.","Posizionamento e reattività sui tiri ravvicinati.",figcU18],
    ["Christian Lupo","Lecce","Convocato nello stage pre-Mondiale.","Comunicazione con la linea e lettura delle palle alte.",figcU18],
  ] },
  { role: "Difensori", players: [
    ["Karim Diop","Sampdoria · Serie B","Classe 2009, esordio tra i professionisti contro l’Ascoli.","Minuti in prima squadra e duelli contro attaccanti senior.","Sampdoria e Club Doria 46"],
    ["Matteo Trapletti","AlbinoLeffe · Serie C","Classe 2009, debutto in Serie C e primo contratto da professionista.","Continuità nelle rotazioni e lettura delle transizioni.","AlbinoLeffe"],
    ["Alessandro Ghiotto","Juventus","Capitano nella vittoria U17 contro l’Armenia.","Guida della linea e difesa dell’area.",figcU17],
    ["Diego Lucarelli","Inter","Titolare nel 4–0 sull’Armenia.","Tempi dell’anticipo e uscita palla al piede.",figcU17],
    ["Sebastian Mattei","Roma","Titolare nella linea difensiva contro l’Armenia.","Copertura della fascia e qualità del cross.",figcU17],
  ] },
  { role: "Centrocampisti", players: [
    ["Riccardo Cassano","Como","Classe 2009, invitato alla prima parte del raduno della Nazionale maggiore.","Passaggio dal vivaio ai primi minuti in Serie A.","FIGC, raduno Nazionale A"],
    ["Gianluca Tommaso Okon-Engstler","Club Brugge · Belgio","Classe 2009, convocato nello stage Italia U18.","Minutaggio e responsabilità nel percorso tra Belgio e Nazionale.",figcU18],
    ["Thomas Simonelli","AlbinoLeffe · Serie C","Classe 2009, sei presenze e un assist nella Serie C 2025/26.","Continuità in prima squadra e gestione della pressione.","AlbinoLeffe"],
    ["Roberto Scaglione","Parma","In gol nel 6–0 sul Lussemburgo.","Inserimenti in area e contributo quando l’Italia perde palla.",figcU17],
    ["Cristian Sorrentino","Milan","In rete contro il Lussemburgo e titolare contro l’Armenia.","Continuità nel recupero e nella progressione del pallone.",figcU17],
  ] },
  { role: "Attaccanti", players: [
    ["Gabriele Borsa","Milan","Tre gol nelle prime due gare di qualificazione U17.","Movimenti in area e resa contro avversari di livello più alto.",figcU17],
    ["Michele Elena","Lazio","Un gol per gara e un rigore procurato contro il Lussemburgo.","Ricezioni tra le linee e scelta tra tiro e ultimo passaggio.",figcU17],
    ["Pietro Salvai","Juventus","In gol nel primo tempo contro l’Armenia.","Continuità in area e lavoro spalle alla porta.",figcU17],
    ["Fortune Erhunmwun Egharevba","Fiorentina","Autore del terzo gol contro l’Armenia.","Attacchi alla profondità e precisione nella conclusione.",figcU17],
    ["Giuseppe Pipitò","Juventus","Tra i marcatori nel 6–0 al Lussemburgo.","Contributo senza palla e capacità di incidere da subentrato.",figcU17],
  ] },
];
