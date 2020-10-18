// Create map
const map = L.map('mapid').setView([-27.222633, -49.6455874], 15);

// Creat and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Create icon 
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68]
})

let marker;

// Create and add marker 
map.on('click', (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector('[name=lat]').value = lat;
  document.querySelector('[name=lng]').value = lng;


  //remove icon
  marker && map.removeLayer(marker);

  //add icon layer
  marker = L.marker([lat, lng], { icon })
  .addTo(map)
})


// add uploaded photo field
function addPhotoField () {

  // get photo container #images
  const container = document.querySelector('#images');

  // get duplicate container .new-upload
  const fieldContainer = document.querySelectorAll('.new-upload');

  // clone the last added image
  const newFieldContainer = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // check if input is empty
  const input = newFieldContainer.children[0];

  if(input.value == "") {
    return
  };

  // clean the input field
  input.value = "";

  // add clone to the photo container #images
  container.appendChild(newFieldContainer)
}

function deleteField (event) {
  const span = event.currentTarget;

  const fieldContainer = document.querySelectorAll('.new-upload');

  // Clean the input if you only have one image upload input
  if(fieldContainer.length <= 1) {
    span.parentNode.children[0].value = ""
    return
  }

  // Delete the input if you only want to send one picture
  span.parentNode.remove();
}

// Select yes or no buttons 
function toggleSelect(event) {
  // remove the class="active"
  const buttonsYesNo = document.querySelectorAll('.button-select button');
  buttonsYesNo.forEach(button => {
    button.classList.remove('active');
  })

  // add the class="active" in the clicked/selected button
  const clickedButton = event.currentTarget;
  clickedButton.classList.add('active');

  // change the value of the input:hidden 
  const input = document.querySelector('[name="weekends"]');
  input.value = clickedButton.dataset.value;

}