let cart = [];

function addToCart(name, price, size="") {
  cart.push({ name, price, size });
  console.log("Warenkorb:", cart);
  alert(`${name} (${size}) wurde zum Warenkorb hinzugefügt.`);
}

// Lightbox
function openLightbox(img) {
  const lb = document.getElementById("lightbox");
  document.getElementById("lightbox-img").src = img.src;
  lb.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}
