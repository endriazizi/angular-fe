var faker = require('faker');

var database = {
  prodotti: []
};

for (var i = 1; i <= 300; i++) {
  database.prodotti.push({
    id: i,
    nome: faker.commerce.productName(),
    descrizione: faker.lorem.sentences(),
    prezzo: faker.commerce.price(),
    imageUrl: "https://source.unsplash.com/1600x900/?product",
    quantita: faker.random.number()
  });
}

console.log(JSON.stringify(database));
