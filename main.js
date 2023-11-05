import { products } from 'products.js';

const data = products;
console.log(data)

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

        for (const product of data[category]) {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = product.name;
            link.onclick = () => showResult(product);
            dropdownContent.appendChild(link);
        }

        dropdownDiv.appendChild(button);
        dropdownDiv.appendChild(dropdownContent);
        dropdownContainer.appendChild(dropdownDiv);
    }
}

// Function to display product information
function showResult(product) {
    const resultBox = document.getElementById('resultBox');

    if (product.variantsOf) {

        resultBox.innerHTML = `<br>`;
        for (const variant of product.variantsOf) {
            resultBox.innerHTML += `<strong>${variant.name}</strong><br>Weight: ${variant.weight}<br>DP: ${variant.dp}<br>MRP: ${variant.mrp}<br><br>`;
        }
    }
    else {
        resultBox.innerHTML = `<strong>${product.name}</strong><br>Weight: ${product.weight}<br>DP: ${product.dp}<br>MRP: ${product.mrp}`;
    }
}

// Generate the dropdown menus when the page loads
generateDropdowns();