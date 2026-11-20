type SquadRow = [
  number: number, player: string, nation: string, age: number | null,
  apps: number | null, starts: number | null, minutes: number | null,
  passesSerieA: number | null, goals: number | null, assists: number | null,
  contract: string | null, wageMillions: number | null,
];

export const milanSquad: { role: string; players: SquadRow[] }[] = [
  { role: "Portieri", players: [
    [96,"Lorenzo Torriani","Italia",21,2,1,148,0,0,0,"2030",0.56],
    [16,"Mike Maignan","Francia",31,14,14,1197,395,0,0,"30/06/2031",6.55],
    [1,"Pietro Terracciano","Italia",36,null,null,null,0,null,null,"2027 · opzione riportata",1.48],
  ] },
  { role: "Difensori", players: [
    [33,"Davide Bartesaghi","Italia",20,10,6,539,112,0,1,"2030",1.11],
    [23,"Fikayo Tomori","Inghilterra",28,5,4,263,60,0,1,"2028",4.59],
    [42,"Filippo Terracciano","Italia",23,6,2,188,32,0,0,"30/06/2028",1.48],
    [5,"Koni De Winter","Belgio",24,15,14,1330,717,0,0,"2030",3.15],
    [34,"Mario Gila","Spagna",26,11,9,875,582,1,0,"2031",6.55],
    [46,"Matteo Gabbia","Italia",27,3,1,37,15,0,0,"2029",3.7],
    [2,"Pervis Estupiñán","Ecuador",28,10,7,446,252,0,0,"2030",4.63],
    [13,"Sankhoun Diawara","Francia",20,7,4,346,139,0,0,"2031",1.85],
    [31,"Strahinja Pavlović","Serbia",25,13,13,1161,745,0,1,"2028",3.15],
    [35,"Valeri Ivanov Vladimirov","Bulgaria",18,null,null,null,0,null,null,null,null],
  ] },
  { role: "Centrocampisti", players: [
    [12,"Adrien Rabiot","Francia",31,13,9,879,413,5,5,"2028",6.48],
    [70,"Alphadjo Cissè","Italia",20,12,9,659,156,8,0,"2030",0.93],
    [30,"Ardon Jashari","Svizzera",24,13,7,622,291,0,0,"2030",4.63],
    [28,"Christian Comotto","Italia",18,3,0,18,3,0,0,"30/06/2031 + opzione",0.56],
    [11,"Christian Pulisic","Stati Uniti",28,11,6,670,278,4,1,"2027",5.24],
    [22,"Diego Moreira","Belgio",22,10,6,640,225,4,3,"2031",5.55],
    [14,"Luka Modrić","Croazia",41,13,8,802,714,0,2,"2027",6.48],
    [20,"Omari Hutchinson","Inghilterra",23,11,6,478,95,1,1,"2027",3.33],
    [8,"Ruben Loftus-Cheek","Inghilterra",30,9,5,376,99,0,0,"2027",5.24],
    [56,"Alexis Saelemaekers","Belgio",27,5,2,218,117,0,1,"2031",4.59],
    [80,"Yunus Musah","Stati Uniti",23,14,11,983,446,0,0,"2028",2.62],
  ] },
  { role: "Attaccanti", players: [
    [73,"Francesco Camarda","Italia",18,6,1,124,12,0,0,"2031",1.48],
    [9,"Gonçalo Ramos","Portogallo",25,14,13,1190,228,3,2,"2031",9.25],
    [21,"Samuel Chukwueze","Nigeria",27,8,7,614,251,0,2,"30/06/2028",5.24],
  ] },
];
