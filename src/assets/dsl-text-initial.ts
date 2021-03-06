// prasības
// -id
// -apraksts(>=10)
// -tips: klienta|tehniskās

// vecāka prasība (ja klienta, tad vecāks nevar būt tehnisks)
// obligātais bērns tehniskā kautkur ķēdē (ja klienta)
// obligātais vecāks tehniskajai kautkur uz augšu ir klienta

// var būt konfliktējošas (izpildāma tikai viena no vairākām līmeni)
// klienta nedrīkst konfliktēt ar tehniskajām

// katrai lapai ir progress no 0 lidz 100
// pārējām to rēķina kā videjo no bērnu progressa
// starp konfliktējošām nenulles progress drīkst būt tikai 10

// - atbildīgais
// - 1+ izpildītāji

// izstrādes komandas locekļus

const text = `

Es gribu, lai manā komandā ir 'Jānis'.
Un protams arī komandā ir jābūt 'Pēteris'.
Kā arī komandā ir 'Liene'.

Jauna prasība '1231' 'Jāizveido DSL likumi ar regexiem'.
Parametri prasībai '1231' ir tādi ka 'KONFLIKTU NAV', tā ir 'TEHNISKĀ NAV', un progess ir '50'%.
Komandā prasībai '1231' atbildīgais ir 'Jānis' un piešķirti ir 'Jānis, Liene'.


Jauna prasība '1232' 'Jāizveido DSL ģenerators'.
Parametri prasībai '1232' ir tādi ka 'KONFLIKTU NAV', tā ir 'TEHNISKĀ NAV', un progess ir '10'%.
Komandā prasībai '1232' atbildīgais ir 'Pēteris' un piešķirti ir 'Jānis, Liene'.


  Jauna prasība '1233' 'Jāizveido DSL atpakaļ ģenerātors'.
  Parametri prasībai '1233' ir tādi ka 'KONFLIKTU NAV', tā ir 'TEHNISKĀ', un progess ir '25'%.
  Komandā prasībai '1233' atbildīgais ir 'Jānis' un piešķirti ir 'Jānis, Liene'.
  Prasība '1233' ir zem '1232'.

Jauna prasība '1234' 'Jāizveido DSL vizualizātors'.
Parametri prasībai '1234' ir tādi ka 'KONFLIKTU NAV', tā ir 'TEHNISKĀ NAV', un progess ir '10'%.
Komandā prasībai '1234' atbildīgais ir 'Pēteris' un piešķirti ir 'Jānis, Pēteris'.


  Jauna prasība '1235' 'Jāizveido koka struktūra'.
  Parametri prasībai '1235' ir tādi ka 'KONFLIKTU NAV', tā ir 'TEHNISKĀ NAV', un progess ir '0'%.
  Komandā prasībai '1235' atbildīgais ir 'Jānis' un piešķirti ir 'Jānis, Pēteris'.
  Prasība '1235' ir zem '1234'.

    Jauna prasība '3335' 'Jāpielāgo koka dizains'.
    Parametri prasībai '3335' ir tādi ka 'KONFLIKTU NAV', tā ir 'TEHNISKĀ NAV', un progess ir '50'%.
    Komandā prasībai '3335' atbildīgais ir 'Pēteris' un piešķirti ir 'Pēteris'.
    Prasība '3335' ir zem '1235'.

    Jauna prasība '3336' 'Jāizdomā koka piemērs'.
    Parametri prasībai '3336' ir tādi ka 'KONFLIKTU NAV', tā ir 'TEHNISKĀ NAV', un progess ir '0'%.
    Komandā prasībai '3336' atbildīgais ir 'Pēteris' un piešķirti ir 'Jānis'.
    Prasība '3336' ir zem '1235'.

  Jauna prasība '1235' 'Jāizveido apakšpanelis'.
  Parametri prasībai '1235' ir tādi ka 'KONFLIKTU NAV', tā ir 'TEHNISKĀ', un progess ir '50'%.
  Komandā prasībai '1235' atbildīgais ir 'Jānis' un piešķirti ir 'Jānis, Pēteris'.
  Prasība '1235' ir zem '1234'.

`
export default text
