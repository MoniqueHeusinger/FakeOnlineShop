"use strict";

// ====================================
//  variables
// ====================================

// -- Output Gallery --
const outputProductGallery = document.body.querySelector("#productSection");
// -- Buttons --
const allFilterButtons = document.body.querySelectorAll("main section article button");
const buttonAllProducts = document.body.querySelector("#allProductsButton");
const buttonFilterWomen = document.body.querySelector("#filterWomenButton");
const buttonFilterMen = document.body.querySelector("#filterMenButton");
const buttonFilterJewelery = document.body.querySelector("#filterJeweleryButton");
const buttonFilterElectronics = document.body.querySelector("#filterElectronicsButton");
// -- Select-Tags Sort By Price --
const selectSortPrice = document.body.querySelector("#sortByPrice");
const selectSortPriceLoToHi = document.body.querySelector("#sortLoToHi");
const selectSortPriceHiToLo = document.body.querySelector("#sortHiToLo");

let allProductsArr = [];

// ====================================
//  Empty Gallery before new fetch
// ====================================

const requestFetch = () => {
    outputProductGallery.innerHTML = "";
};

// ====================================
//  Landing Page - fetch all products
// ====================================

const showAllProducts = () => {
    fetch("https://fakestoreapi.com/products")
    .then(response => {
        // console.log(response);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Leider gab es einen Fehler!");
        }
        
    })
    .then(data => {
        // console.log(data);

        data.forEach((product) => {
            renderElements(product);
        })

        // Kopie aller Produkte in ein neues Array
        allProductsArr.push(data); 
        // console.log(allProductsArr);

        sortProductsByPrice(data);

    })
    .catch(error => console.log(error));
}
showAllProducts();


// ===============================
//  Filter/Button: All products
// ===============================
buttonAllProducts.addEventListener("click", () => {
    // Empty Gallery before new fetch
    requestFetch();

    showAllProducts();
    // Remove CSS-class "btn__active" from every button
    for (let button of allFilterButtons) {
        button.classList.remove("btn__active");
    }
    // Then add CSS-class "btn__active" to current button clicked
    buttonAllProducts.classList.add("btn__active");

})

// ==============================
//  Sortierung - Low to High
// ==============================

const sortProductsByPrice = (itemsSorted) => {
    selectSortPrice.addEventListener("change", () => {
        const selectedIndexValue = selectSortPrice.value;
        outputProductGallery.innerHTML = "";
        
        if(selectedIndexValue === "priceLowToHigh"){
            itemsSorted.sort((prodA, prodB) => prodA.price - prodB.price);
        } else {
            itemsSorted.reverse();
        }
        
        itemsSorted.forEach((elem) => {
            renderElements(elem)
        })
    })
}



// ===========================
// Filter Category: Women
// ===========================

buttonFilterWomen.addEventListener("click", () => {
    // Empty Gallery before new fetch
    requestFetch();

    fetch("https://fakestoreapi.com/products/category/women's%20clothing")
        .then(response => {
            // console.log(response);
            return response.json();
        })    
        .then(items => {
            // console.log(items);
            items.forEach((product) => {
                renderElements(product);
            })
            
            // Remove CSS-class "btn__active" from every button
            for (let button of allFilterButtons) {
                button.classList.remove("btn__active");
            }
            // Then add CSS-class "btn__active" to current button clicked
            buttonFilterWomen.classList.add("btn__active");
            
            sortProductsByPrice(items);
        })
    });



// ===========================
// Filter Category: Men
// ===========================

buttonFilterMen.addEventListener("click", () => {
    // Empty Gallery before new fetch
    requestFetch();

    fetch("https://fakestoreapi.com/products/category/men's%20clothing")
        .then(response => {
            // console.log(response);
            return response.json();
        })    
        .then(items => {
            // console.log(items);
            items.forEach((product) => {
                renderElements(product);
            })
            
            // Remove CSS-class "btn__active" from every button
            for (let button of allFilterButtons) {
                button.classList.remove("btn__active");
            }
            // Then add CSS-class "btn__active" to current button clicked
            buttonFilterMen.classList.add("btn__active");

            sortProductsByPrice(items);
        })
    });



// ===========================
// Filter Category: Jewelery
// ===========================

buttonFilterJewelery.addEventListener("click", () => {
    // Empty Gallery before new fetch
    requestFetch();

    fetch("https://fakestoreapi.com/products/category/jewelery")
        .then(response => {
            // console.log(response);
            return response.json();
        })    
        .then(items => {
            // console.log(items);
            items.forEach((product) => {
                renderElements(product);
            })

            // Remove CSS-class "btn__active" from every button
            for (let button of allFilterButtons) {
                button.classList.remove("btn__active");
            }
            // Then add CSS-class "btn__active" to current button clicked
            buttonFilterJewelery.classList.add("btn__active");

            sortProductsByPrice(items);
        })
    });



// ================================
// Filter Category: Electronics
// ================================

buttonFilterElectronics.addEventListener("click", () => {
    // Empty Gallery before new fetch
    requestFetch();

    fetch("https://fakestoreapi.com/products/category/electronics")
        .then(response => {
            // console.log(response);
            return response.json();
        })    
        .then(items => {
            // console.log(items);
            items.forEach((product) => {
                renderElements(product);
            })

            // Remove CSS-class "btn__active" from every button
            for (let button of allFilterButtons) {
                button.classList.remove("btn__active");
            }
            // Then add CSS-class "btn__active" to current button clicked
            buttonFilterElectronics.classList.add("btn__active");

            sortProductsByPrice(items);
        })
    });



// ==================================================
//     Wiederkehrende Funktion - füllt die Gallery
// ==================================================
const renderElements = (dataFetch) => {
    const card = document.createElement("article");
    const containerImageProdName = document.createElement("div");
    const productImage = document.createElement("img");
    const productName = document.createElement("h2");
    const containerPriceCart = document.createElement("div");
    const priceTag = document.createElement("p");
    const buttonAddToCart = document.createElement("button");

    card.classList.add("product__card");
    priceTag.classList.add("price");
    buttonAddToCart.classList.add("btn", "btn__filled", "uppercase");
    productImage.setAttribute("src", dataFetch.image);
    productImage.setAttribute("alt", "Bild von")
    productName.textContent = dataFetch.title;
    priceTag.textContent = `$ ${dataFetch.price.toFixed(2)}`;
    buttonAddToCart.textContent = "add to cart"

    outputProductGallery.appendChild(card);
    card.append(containerImageProdName, containerPriceCart)
    containerImageProdName.append(productImage, productName);
    containerPriceCart.append(priceTag, buttonAddToCart);
};