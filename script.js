document.getElementById('fetchDataButton').addEventListener('click', () => {
    const apiUrl = document.getElementById('apiUrlInput').value;
    const tableBody = document.querySelector('#data-table tbody');
    const errorMessage = document.getElementById('error-message');

    // Clear previous data and error message
    clearTable(tableBody);
    clearError(errorMessage);

    // Validate API URL
    if (!apiUrl) {
        displayError(errorMessage, 'Please enter a valid API URL.');
        return;
    }

    // Fetch data from the API
    fetchData(apiUrl)
        .then(data => populateTable(data, tableBody, errorMessage))
        .catch(error => displayError(errorMessage, 'Error fetching data: ' + error.message));
});

// Function to fetch data from the API
function fetchData(apiUrl) {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

// Function to format the value before displaying in the table
function formatValue(value) {
    if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
            return `Array (${value.length} items)`;
        } else {
            return `Object (${Object.keys(value).length} keys)`;
        }
    } else if (value === null) {
        return 'null';
    } else {
        return value.toString();
    }
}

// Function to add a row to the table
function addRowToTable(key, value, tableBody) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${key}</td><td>${value}</td>`;
    tableBody.appendChild(row);
}

// Function to populate the table with fetched data
function populateTable(data, tableBody, errorMessage) {
    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            addRowToTable(`Item ${index + 1}`, formatValue(item), tableBody);
        });
    } else if (typeof data === 'object') {
        Object.keys(data).forEach(key => {
            addRowToTable(key, formatValue(data[key]), tableBody);
        });
    } else {
        displayError(errorMessage, 'Unsupported data format.');
    }
}

// Function to clear the table
function clearTable(tableBody) {
    tableBody.innerHTML = '';
}

// Function to clear error messages
function clearError(errorMessage) {
    errorMessage.textContent = '';
}

// Function to display an error message
function displayError(errorMessage, message) {
    errorMessage.textContent = message;
}
