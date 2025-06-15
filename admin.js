const adminPassword = "admin123";

function login() {
  const password = document.getElementById("adminPassword").value;
  if (password === adminPassword) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadCars();
  } else {
    document.getElementById("loginMsg").innerText = "Contraseña incorrecta.";
  }
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("adminPanel").style.display = "none";
});

document.getElementById("saveCarBtn").addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const imagesInput = document.getElementById("imagesInput").files;

  if (!title || !description || !price || imagesInput.length === 0) {
    alert("Completa todos los campos");
    return;
  }

  const images = [];
  for (let i = 0; i < imagesInput.length; i++) {
    const reader = new FileReader();
    reader.onload = function(e) {
      images.push(e.target.result);
      if (images.length === imagesInput.length) {
        const car = { title, description, price, images };
        saveCar(car);
      }
    };
    reader.readAsDataURL(imagesInput[i]);
  }
});

function saveCar(car) {
  let cars = JSON.parse(localStorage.getItem("cars")) || [];
  cars.push(car);
  localStorage.setItem("cars", JSON.stringify(cars));
  loadCars();
}

function loadCars() {
  const carList = document.getElementById("carList");
  carList.innerHTML = "";
  const cars = JSON.parse(localStorage.getItem("cars")) || [];
  cars.forEach((car, index) => {
    const div = document.createElement("div");
    div.className = "car-item";
    div.innerHTML = `
      <img src="${car.images[0]}" />
      <p><strong>${car.title}</strong></p>
      <p>${car.description}</p>
      <p>₡${car.price}</p>
      <button onclick="deleteCar(${index})">Eliminar</button>
    `;
    carList.appendChild(div);
  });
}

function deleteCar(index) {
  let cars = JSON.parse(localStorage.getItem("cars")) || [];
  cars.splice(index, 1);
  localStorage.setItem("cars", JSON.stringify(cars));
  loadCars();
}
