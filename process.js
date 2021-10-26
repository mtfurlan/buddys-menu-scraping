#!/usr/bin/env nodejs
'use strict';

const fs = require('fs');

const dataDir = './data/';


let locations = [];
let products = {};

let lookupProductID = (data, productID) => {
    return data.products.find((product) => {
        return product.id == productID;
    });
}

let processLocations = (data) => {
    locations.push(data.vendor.name);
}

let processProducts = (data) => {
    let locationName = data.vendor.name;
    data.categories.forEach((category) => {
        let categoryName = category.name;
        if(categoryName == "Burgers & Sandwiches") {
            categoryName = "Sandwiches & Burgers";
        }
        if(categoryName == "Pizza") {
            categoryName = "Original Detroit-Style Pizza";
        }
        if(categoryName == "Pasta ") {
            categoryName = "Classic Pastas";
        }
        if(categoryName == "Sides & Add Ons" || categoryName == "Extras") {
            categoryName = "Sides and Add Ons";
        }
        if(categoryName == "Salads") {
            categoryName = "Fresh Salads";
        }
        if(categoryName == "Homestyle Soup" || categoryName == "Soups") {
            categoryName = "Homestyle Soups";
        }
        if(categoryName == "Desserts & Snacks") {
            categoryName = "Sweets & Treats";
        }
        category.products.forEach((productCode) => {
            if(!products[categoryName]) {
                products[categoryName] = {};
            }
            let productName = lookupProductID(data, productCode).name;
            //they have bad duplicate products
            productName = productName.trim();
            productName = productName.replace(/Oven-/, 'Oven ');
            productName = productName.replace(/Mozarella/, 'Mozzarella');
            productName = productName.replace(/^Steak Hoagie$/, 'Grilled Steak Hoagie'); //TODO: verify
            if(!products[categoryName][productName]) {
                products[categoryName][productName] = {sells: [], missing: locations};
            }
            products[categoryName][productName].sells.push(locationName);
            products[categoryName][productName].missing = products[categoryName][productName].missing.filter(loc => loc != locationName);
        })


    })
}

let files = fs.readdirSync(dataDir)
files.forEach(file => {
    let rawdata = fs.readFileSync("./data/" + file);
    let data = JSON.parse(rawdata);
    processLocations(data);
});
files.forEach(file => {
    let rawdata = fs.readFileSync("./data/" + file);
    let data = JSON.parse(rawdata);
    processProducts(data);
});

//*
console.log('<html><head><title>buddy stuff</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></head><body>');
for(const catName in products) {
    let category = products[catName];
    console.log(`<h2>${catName}</h2>`);
    console.log('<table class="table table-striped"><tr>');
    console.log('<th scope="col">product</th>');
    locations.forEach((loc) => {
        console.log(`<th scope="col">${loc}</th>`);
    });
    console.log("</tr>");
    for(const productName in category) {
        console.log(`<tr><th scope="row">${productName}</th>`);
        locations.forEach((loc) => {
            let prodLocStatus = "???";
            let tdClass="";
            if(category[productName].sells.includes(loc)) {
                prodLocStatus = "yes";
                tdClass="table-success";
            }
            if(category[productName].missing.includes(loc)) {
                prodLocStatus = "no";
                tdClass="table-danger";
            }

            console.log(`<td class="${tdClass}">${prodLocStatus}</td>`);
        });
        console.log("</tr>")

    }
    console.log("</table>");
} // category
console.log('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>');
console.log("</body>");
/*/
console.log(JSON.stringify(products));
//*/




//for(const category in products) {
//    for(const product in products[category]) {
//        if(products[category][product].sells.length < 3) {
//            console.log(`${category}: ${product}`);
//            console.log(products[category][product].sells)
//        }
//    }
//}
