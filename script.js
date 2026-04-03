function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function toggleText(element) {
  const hiddenText = element.nextElementSibling;
  hiddenText.style.display =
    hiddenText.style.display === "block" ? "none" : "block";
}
