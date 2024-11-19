/**
 * Programa que permita entrar por teclado código de ruta, valor pasaje, cantidad de pasajeros, 
 * origen y destino
 * Cuantas rutas hay programadas para Cali?
 * Cuantos pasajeros llegaron a Bogotá y cuantos pagaron?
 * Captura de datos en html
 * Cálculos, evaluacion e interpretación de resultados en java script
 */

const routes = [];
let caliRoutes = 0;
let caliPassengers = 0;
let caliRevenue = 0;
let bogotaRoutes = 0;
let bogotaPassengers = 0;
let bogotaRevenue = 0;

const form = document.querySelector('#route-form');
const caliRoutesEl = document.querySelector('#cali-routes');
const caliPassengersEl = document.querySelector('#cali-passengers'); // Fixed typo here
const caliRevenueEl = document.querySelector('#cali-revenue');
const bogotaRoutesEl = document.querySelector('#bogota-routes');
const bogotaPassengersEl = document.querySelector('#bogota-passengers');
const bogotaRevenueEl = document.querySelector('#bogota-revenue');
const alertText = document.querySelector('.alert');

const handleSubmit = (e) => {
    e.preventDefault();

    const code = document.querySelector('#code').value.trim();
    const price = parseFloat(document.querySelector('#price').value.trim());
    const quantity = parseInt(document.querySelector('#quantity').value.trim(), 10);
    const origin = document.querySelector('#origin').value.trim();
    const destiny = document.querySelector('#destiny').value.trim();

    if (!code || isNaN(price) || isNaN(quantity) || !origin || !destiny) {
        displayMessage('Por favor, complete todos los campos correctamente.');
        return;
    } else {
        displayMessage('Ruta agregada correctamente')
    }

    // === ADD ROUTE TO ARRAY ===
    routes.push({ code, price, quantity, origin, destiny });

    // === UPDATE STATS ===
    if (destiny.toLowerCase() === 'cali') {
        caliRoutes++;
        caliPassengers += quantity;
        caliRevenue += quantity * price;
    }

    if (destiny.toLowerCase() === 'bogota') {
        bogotaRoutes++;
        bogotaPassengers += quantity;
        bogotaRevenue += quantity * price;
    }

    // === UPDATE THE UI ===
    updateUI();

    // === RESET THE FORM ===
    form.reset();
};

const displayMessage = message => {
    alertText.textContent = message;

    // === CLEARING THE ALERT ===
    setTimeout(() => {
        alertText.textContent = ''; 
    }, 3000);
};

const updateUI = () => {
    caliRoutesEl.textContent = `Rutas programadas para Cali: ${caliRoutes}`;
    caliPassengersEl.textContent = `Pasajeros que llegaron a Cali: ${caliPassengers}`; // Fixed reference to correct element
    caliRevenueEl.textContent = `Ingresos de Cali: $${caliRevenue.toLocaleString()}`;
    bogotaRoutesEl.textContent = `Rutas programadas para Bogotá: ${bogotaRoutes}`;
    bogotaPassengersEl.textContent = `Pasajeros que llegaron a Bogotá: ${bogotaPassengers}`;
    bogotaRevenueEl.textContent = `Ingresos de Bogotá: $${bogotaRevenue.toLocaleString()}`;
};

form.addEventListener('submit', handleSubmit);
