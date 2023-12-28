document.addEventListener('DOMContentLoaded', async function () {
    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('searchInput');
    let displayedProducts = [];

    const fetchData = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const displayProducts = async () => {
        const products = await fetchData();
        if (products) {
            displayedProducts = products;
            renderProducts(displayedProducts);
        }
    };

    const renderProducts = (products) => {
        productList.innerHTML = '';
        const headerRow = document.createElement('tr');
        productList.appendChild(headerRow);

        const productsToDisplay = products.slice(0, 10); // Menampilkan hanya 10 produk

        productsToDisplay.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>$${product.price}</td>
                <td>${product.category}</td>
                <td><img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px;"></td>
            `;
            productList.appendChild(row);
        });
    };

    displayProducts();

    searchInput.addEventListener('input', function () {
        const searchValue = this.value.toLowerCase();
        const filteredProducts = displayedProducts.filter(product =>
            product.title.toLowerCase().includes(searchValue)
        );
        renderProducts(filteredProducts);
    });
});
