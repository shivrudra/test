import { products } from './products.js';

const data = products;



// Function to generate dropdown menus
function generateDropdowns() {
    const dropdownContainer = document.querySelector('.dropdown-container');


    for (const category in data) {
        const dropdownDiv = document.createElement('div');
        dropdownDiv.className = 'dropdown';

        const button = document.createElement('button');
        button.className = 'dropbtn';
        button.textContent = category;

        const dropdownContent = document.createElement('div');
        dropdownContent.className = 'dropdown-content';

        // Set a maximum height and make the content scrollable
        dropdownContent.style.maxHeight = '425px'; // Adjust the height as needed
        dropdownContent.style.overflowY = 'auto';

        for (const product of data[category]) {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = product.name;
            link.addEventListener('click', () => {
                dropdownContent.style.display = 'none';
                showProductDetails(product);
            });
            dropdownContent.appendChild(link);
        }

        dropdownDiv.appendChild(button);
        dropdownDiv.appendChild(dropdownContent);
        dropdownContainer.appendChild(dropdownDiv);
    }

    
}

// Function to display product information
function showProductDetails(product) {
    const resultBox = document.getElementById('resultBox');

    if (product.variantsOf) {
        resultBox.innerHTML = `<br>`;
        for (const variant of product.variantsOf) {
            resultBox.innerHTML += `<strong>${variant.name}</strong><br>Weight: ${variant.weight}<br>DP: ${variant.dp}<br>MRP: ${variant.mrp}<br><br>`;
            resultBox.style.maxHeight = '300px'; // Adjust the height as needed
            resultBox.style.overflowY = 'auto';
        }
    } else {
        resultBox.innerHTML = `<strong>${product.name}</strong><br>Weight: ${product.weight}<br>DP: ${product.dp}<br>MRP: ${product.mrp}`;
    }
}

// Function to handle the search
function handleSearch(searchTerm) {
    if(searchTerm === "") return;
    const matchingProducts = findMatchingProducts(searchTerm);
    displaySearchResults(matchingProducts);
}

// Function to find matching products based on the search term
function findMatchingProducts(searchTerm) {
    searchTerm = searchTerm.toLowerCase(); // Convert to lowercase for case-insensitive search
    let matchingProducts = [];

    for (const category in data) {
        matchingProducts = matchingProducts.concat(
            data[category].filter(product =>
                product.name.toLowerCase().includes(searchTerm)
            )
        );
    }

    return matchingProducts;
}

// Function to display search results
function displaySearchResults(results) {
    const resultBox = document.getElementById('resultBox');
    resultBox.innerHTML = '';
    

    if (results.length === 0) {
        resultBox.textContent = 'No matching products found.';
    } else {
        results.forEach(product => {
            const link = document.createElement('p');
            link.style.cursor = 'pointer'
            link.href = '#';
            link.textContent = product.name;
            link.onclick = () => showProductDetails(product);
            resultBox.appendChild(link);
        });
        
    }
}

// Generate the dropdown menus when the page loads
generateDropdowns();

// Add an event listener to the search input
const searchInput = document.getElementById('search-input');
const submit = document.getElementById('submit')


submit.addEventListener("click", function (e) {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    handleSearch(searchTerm);
    searchInput.value = ""
});
