// LocalStorage key
const STORAGE_KEY = 'garajetico_cars';

// DOM elements
const carList = document.getElementById('carList');
const saveBtn = document.getElementById('saveCarBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const priceInput = document.getElementById('price');
const imageURLInput = document.getElementById('imageURL');

let cars = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let editIndex = -1;

function saveCarsToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

function clearForm() {
  titleInput.value = '';
  descInput.value = '';
  priceInput.value = '';
  imageURLInput.value = '';
  editIndex = -1;
  cancelEditBtn.style.display = 'none';
  saveBtn.textContent = 'Guardar Auto';
}

function renderCars() {
  carList.innerHTML = '';
  if(cars.length === 0) {
    carList.innerHTML = '<p>No hay autos agregados aún.</p>';
    return;
  }
  cars.forEach((car, i) => {
    const carCard = document.createElement('div');
    carCard.className = 'car-card';

    carCard.innerHTML = `
      <img src="${car.imageURL}" alt="Auto: ${car.title}" />
      <h3>${car.title}</h3>
      <p>${car.description}</p>
      <p class="price">Precio: $${car.price}</p>
      <div class="buttons">
        <button onclick="editCar(${i})">Editar</button>
        <button onclick="deleteCar(${i})" style="background:#d62828;">Eliminar</button>
        <button onclick="consultarWSP('${car.title}')" style="background:#06d6a0;">Consultar</button>
      </div>
    `;

    carList.appendChild(carCard);
  });
}

function consultarWSP(title) {
  const message = encodeURIComponent(`Hola, estoy interesado en el auto: ${title}`);
  const whatsappURL = `https://wa.me/50612345678?text=${message}`; // Cambia por tu número
  window.open(whatsappURL, '_blank');
}

function editCar(index) {
  const car = cars[index];
  titleInput.value = car.title;
  descInput.value = car.description;
  priceInput.value = car.price;
  imageURLInput.value = car.imageURL;
  editIndex = index;
  saveBtn.textContent = 'Actualizar Auto';
  cancelEditBtn.style.display = 'inline-block';
}

function deleteCar(index) {
  if (confirm('¿Quieres eliminar este auto?')) {
    cars.splice(index, 1);
    saveCarsToStorage();
    renderCars();
    clearForm();
  }
}

saveBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const price = priceInput.value.trim();
  const imageURL = imageURLInput.value.trim();

  if (!title || !description || !price || !imageURL) {
    alert('Por favor llena todos los campos.');
    return;
  }

  if (editIndex >= 0) {
    cars[editIndex] = { title, description, price, imageURL };
  } else {
    cars.push({ title, description, price, imageURL });
  }

  saveCarsToStorage();
  renderCars();
  clearForm();
});

cancelEditBtn.addEventListener('click', () => {
  clearForm();
});

renderCars();
