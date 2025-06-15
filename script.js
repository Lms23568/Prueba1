const cars = JSON.parse(localStorage.getItem("cars")) || [];
const marketplace = document.getElementById("marketplace");

// Variables modal
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const wpLink = document.getElementById("wpLink");
const closeModal = document.getElementById("closeModal");

let currentImages = [];
let currentIndex = 0;

// Función para mostrar los autos en el marketplace
function renderCars(filteredCars) {
  marketplace.innerHTML = ""; // Limpiar contenido previo
  filteredCars.forEach(car => {
    const card = document.createElement("div");
    card.className = "car-card";
    card.innerHTML = `
      <img src="${car.images[0]}" alt="${car.title}">
      <div class="info">
        <h3>${car.title}</h3>
        <p>₡${car.price}</p>
      </div>
    `;
    card.addEventListener("click", () => openModal(car));
    marketplace.appendChild(card);
  });
}

// Abrir modal con detalles del auto
function openModal(car) {
  currentImages = car.images;
  currentIndex = 0;
  modalImage.src = currentImages[0];
  modalTitle.textContent = car.title;
  modalDescription.textContent = car.description;
  modalPrice.textContent = `₡${car.price}`;
  wpLink.href = `https://wa.me/50660000000?text=Hola%2C%20me%20interesa%20el%20auto%3A%20${encodeURIComponent(car.title)}`;
  modal.classList.remove("hidden");
}

// Navegación del carousel en modal
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentImages.length === 0) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  modalImage.src = currentImages[currentIndex];
});
document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentImages.length === 0) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  modalImage.src = currentImages[currentIndex];
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Función para aplicar filtros
function applyFilters() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const minPrice = parseFloat(document.getElementById("minPrice").value);
  const maxPrice = parseFloat(document.getElementById("maxPrice").value);

  const filtered = cars.filter(car => {
    const matchesText =
      car.title.toLowerCase().includes(searchText) ||
      car.description.toLowerCase().includes(searchText);

    const matchesMin = isNaN(minPrice) ? true : car.price >= minPrice;
    const matchesMax = isNaN(maxPrice) ? true : car.price <= maxPrice;

    return matchesText && matchesMin && matchesMax;
  });

  renderCars(filtered);
}

// Render inicial con todos los autos
renderCars(cars);
