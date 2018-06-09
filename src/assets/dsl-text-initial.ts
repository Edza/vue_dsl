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
<div>
  <span>Some HTML here</span>
</div>
`
export default text
