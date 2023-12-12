```javascript
document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('productList');
    const filteredProductList = document.getElementById('filteredProductList');
    const refreshButton = document.getElementById('refreshButton');
    const notificationArea = document.getElementById('notificationArea');

    refreshButton.addEventListener('click', function() {
        fetch('/refreshData')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loadProducts();
                    loadFilteredProducts();
                } else {
                    handleError(data.error);
                }
            })
            .catch(error => handleError(error));
    });

    function loadProducts() {
        fetch('/products')
            .then(response => response.json())
            .then(data => {
                productList.innerHTML = '';
                data.forEach(product => {
                    const li = document.createElement('li');
                    li.textContent = `${product.title} - ${product.price} - ${product.dailyOrders} - ${product.monthlyOrders}`;
                    productList.appendChild(li);
                });
            })
            .catch(error => handleError(error));
    }

    function loadFilteredProducts() {
        fetch('/filteredProducts')
            .then(response => response.json())
            .then(data => {
                filteredProductList.innerHTML = '';
                data.forEach(product => {
                    const li = document.createElement('li');
                    li.textContent = `${product.title} - ${product.price} - ${product.dailyOrders} - ${product.monthlyOrders}`;
                    filteredProductList.appendChild(li);
                });
            })
            .catch(error => handleError(error));
    }

    function handleError(error) {
        notificationArea.textContent = `Error: ${error.message}`;
    }

    // Initial load
    loadProducts();
    loadFilteredProducts();
});
```