const options = {
  dragging: false,
  touchZoom: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  zoomControl: false
}

// Get values from html
const lat = document.querySelector('span[data-lat]').dataset.lat;
const lng = document.querySelector('span[data-lng]').dataset.lng;

// Create map
const map = L.map('mapid', options).setView([lat, lng], 15);

// Creat and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68]
})


// Create and add marker
L.marker([lat, lng], { icon })
    .addTo(map)

// Image gallery
function selectImage(event) {
  const button = event.currentTarget;

  // Remove all class="active"
  const buttons = document.querySelectorAll(".images button");
  buttons.forEach(btn => {
    btn.classList.remove("active");
  })

  // Select clicked image
  const image = button.children[0];
  const imageContainer = document.querySelector(".img-container");

  // Update the image container (big image)
  imageContainer.src = image.src;

  // Add 'class="active"' on the clicked button
  button.classList.add("active")
}