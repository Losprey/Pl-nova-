# Domáci Rytmus - Jedálniček

Obnovená statická verzia obrazovky jedálnička podľa dodaného screenshotu.

## Spustenie

Otvor `index.html` v prehliadači.

Appka nemá build krok ani závislosti. Interakcie fungujú priamo v prehliadači:

- prepínanie aktuálneho a budúceho týždňa,
- prepínanie jedálnička pre deti a dospelých,
- pridávanie, úprava a odstránenie jedál,
- automatické uloženie zmien do `localStorage`,
- nákupný zoznam generovaný z jedál,
- nákup rozdelený do kategórií,
- ručné položky a odškrtávanie nákupu,
- kroky podľa týždňa s prioritou, termínom a odškrtávaním,
- automatické dátumy pre aktuálny a budúci týždeň,
- domovský dashboard so súhrnom jedál, krokov a nákupu,
- ľudskejší dashboard s odporúčaným najbližším krokom,
- vizuálny prehľad domácnosti s malou ilustráciou a priebehom týždňa,
- zjednodušený dashboard s jasným poradím toho, čo riešiť ako prvé,
- ľudský prázdny stav s možnosťou obnoviť ukážkový týždeň,
- týždenný kompas pripravenosti, ktorý spojí jedlá, nákup, zásoby a kroky,
- karta `Dnes doma` s najbližším praktickým krokom,
- denný check-in nálady domácnosti bez tlaku na výkon,
- denný rytmus pre ráno, deň a večer,
- voliteľná poznámka dňa pre rodinný kontext,
- profily domácnosti pre pokojný, rušný alebo úsporný režim,
- členovia domácnosti a domáci kód pripravený na budúce rodinné prepojenie,
- rodinné odovzdanie na dashboarde s rozdelením krokov medzi členov,
- priradenie domácich krokov konkrétnemu členovi alebo spoločnej zodpovednosti,
- mesačný rozpočet nákupu s odhadom podľa týždenného zoznamu,
- obľúbené jedlá označené hviezdičkou,
- knižnica obľúbených jedál s rýchlym vložením do plánu,
- rýchle návrhy jedál podľa typu týždňa a režimu varenia,
- špajza domácich zásob uložená lokálne,
- návrhy `Varíme z domu` podľa toho, čo už je v špajzi,
- smart tipy podľa toho, čo v pláne alebo nákupe chýba,
- víkendový plánovač ďalšieho týždňa s typom týždňa, režimom varenia a rušnými dňami,
- nedeľný checklist prípravy týždňa,
- kontrola domácich zásob pred veľkým týždenným nákupom,
- nákupný režim s priebehom a skrytím vybavených položiek,
- označenie nákupných položiek, ktoré už sú doma,
- jednoduchý režim jedálnička bez akčných ikon,
- personalizácia veľkosti rozhrania od menšej po väčšiu,
- hustota zobrazenia pre vzdušný, bežný alebo veľmi kompaktný režim,
- grafické štýly appky s odlišnou atmosférou,
- čisté, jemné alebo ilustrovanejšie pozadie,
- vybavenie celej nákupnej kategórie naraz,
- návrhy ďalšieho kroku pri domácich krokoch,
- rýchle návrhy krokov bez premýšľania,
- kroky rozdelené na teraz, tento týždeň, keď bude čas a hotové,
- jemné potvrdenia po odškrtnutí nákupu alebo kroku,
- nastavenia s témou, exportom/importom a resetom dát,
- obnovenie pôvodného ukážkového plánu,
- spodná navigácia s aktívnou záložkou.
- voliteľné Google prihlásenie cez Firebase,
- realtime prepojenie jednej domácnosti cez Firestore,
- domáci kód na pripojenie druhého člena domácnosti.

## Google login a realtime domácnosť

Appka funguje aj bez Firebase, vtedy používa iba lokálne dáta v prehliadači. Ak chceš zapnúť Google login a zdieľanie domácnosti:

1. Vytvor Firebase projekt.
2. Zapni Authentication -> Sign-in method -> Google.
3. Zapni Firestore Database.
4. V nastaveniach Firebase web appky skopíruj config do `firebase-config.js`.
5. V Authentication -> Settings -> Authorized domains pridaj doménu, kde bude appka bežať.

Použitý je Firebase Web SDK: Google login cez `GoogleAuthProvider` a realtime zmeny cez Firestore `onSnapshot`.

Odporúčané Firestore pravidlá pre prvý test:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /households/{householdId} {
      allow read, write: if request.auth != null;
    }

    match /familyCodes/{code} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Tieto pravidlá sú vhodné iba na vývoj. Produkčne treba doplniť členstvo domácnosti, aby používateľ mohol čítať a zapisovať iba domácnosti, do ktorých patrí.
