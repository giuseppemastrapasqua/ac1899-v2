import type { StandingRow } from "./home-standings";

export const womenStandings: StandingRow[] = [
  [1,"Roma",21,7,7,0,0,27,12], [2,"Inter",16,6,5,1,0,13,0],
  [3,"Fiorentina",13,7,4,1,2,12,7], [4,"Como 1907",11,6,3,2,1,13,11],
  [5,"Juventus",9,6,3,0,3,12,14], [6,"Como Women",8,6,2,2,2,4,5],
  [7,"AC Milan",7,7,2,1,4,11,16], [8,"Ternana Women",7,6,2,1,3,5,11],
  [9,"Napoli Women",6,7,1,3,3,10,11], [10,"Parma",5,7,1,2,4,8,13],
  [11,"Lazio",3,7,0,3,4,2,9], [12,"Sassuolo",2,6,0,2,4,5,13],
];

export const womenSquad = [
  { role: "Portiere", players: [
    [22,"Lavinia Tornaghi","Italia"], [24,"Sally Ann Rainey","Stati Uniti"], [1,"Sandra Estévez Ogalla","Spagna"],
  ] },
  { role: "Difensora", players: [
    [20,"Angelica Soffia","Italia"], [33,"Elisa Bonanomi","Italia"], [2,"Emma Koivisto","Finlandia"],
    [23,"Julie Piga","Italia"], [25,"Kay-Lee de Sanders","Suriname"], [26,"Leda Gemmi","Italia"],
    [21,"Milicia Keijzer","Paesi Bassi"], [6,"Nadine Sorelli","Italia"], [47,"Nerea Nevado","Spagna"],
  ] },
  { role: "Centrocampista", players: [
    [32,"Abigail Crosby Brighton","Stati Uniti"], [11,"Christy Grimshaw","Scozia"], [38,"Elena Vitale","Italia"],
    [8,"Giorgia Arrigoni","Italia"], [12,"Marta Mascarello","Italia"], [15,"Sara Stokić","Serbia"],
  ] },
  { role: "Attaccante", players: [
    [19,"Doménica Arboleda","Ecuador"], [80,"Ewelina Kamczyk","Polonia"], [17,"Mawa Sesay","Norvegia"],
    [18,"Monica Renzotti","Italia"], [35,"Paola Taddei","Italia"], [14,"Soo-Jeong Park","Corea del Sud"],
    [9,"Sara Kanutte Fornes","Norvegia"], [7,"Thea Kyvåg","Norvegia"],
  ] },
] as const;

type WomenPlayerStats = [age: number | null, appearances: number, starts: number, minutes: number, goals: number, assists: number | null];

// FBref, the first six rounds of Serie A Women 2026/27.
export const womenPlayerStats: Partial<Record<number, WomenPlayerStats>> = {
  1: [24,6,6,511,0,0], 24: [null,1,0,26,0,0],
  20: [26,6,6,533,1,0], 2: [32,5,3,298,0,0], 21: [23,3,3,249,0,null],
  6: [21,6,5,436,0,0], 47: [25,6,6,529,0,0],
  11: [31,6,6,540,3,0], 12: [28,4,4,320,0,1], 15: [21,5,5,431,2,0],
  17: [21,6,3,323,0,1], 18: [21,5,3,304,1,1], 14: [22,5,4,287,0,2],
  9: [24,6,3,266,0,null], 7: [22,6,3,300,1,0],
};

export const womenResults = [
  ["14 nov", "Napoli Women", "Trasferta", "3–3"],
  ["7 nov", "Inter", "Casa", "0–3"],
  ["1 nov", "Como Women", "Trasferta", "0–1"],
  ["24 ott", "Ternana Women", "Casa", "3–0"],
  ["18 ott", "Roma", "Trasferta", "2–4"],
  ["4 ott", "Juventus", "Casa", "2–1"],
  ["26 set", "Como 1907", "Trasferta", "1–4"],
] as const;
