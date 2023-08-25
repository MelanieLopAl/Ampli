document.addEventListener('DOMContentLoaded', function () {
  const customPlantName = localStorage.getItem('customPlantName');
  const customPotMaterial = localStorage.getItem('customPotMaterial');
  const customSoilType = localStorage.getItem('customSoilType');
  const customExtras = localStorage.getItem('customExtras').split(',');
  const customPlantImage = localStorage.getItem('customPlantImage');
  const customSoilImage = localStorage.getItem('customSoilImage');
  const customPotImage = localStorage.getItem('customPotImage');
  const customExtrasImages = JSON.parse(localStorage.getItem('customExtrasImages'));

  const customizationInfo = document.getElementById('customizationInfo');
  customizationInfo.innerHTML = `
    <h3>Your Customized Plant:</h3>
    <p>Plant Name: ${customPlantName}</p>
    <p>Pot Material: ${customPotMaterial}</p>
    <p>Soil Type: ${customSoilType}</p>
    <p>Extras: ${customExtras.join(', ')}</p>
    <img src="${customPlantImage}" alt="Custom Plant Image">
    <img src="${customSoilImage}" alt="Custom Soil Image">
    <img src="${customPotImage}" alt="Custom Pot Image">
  `;

  if (customExtrasImages && customExtrasImages.length > 0) {
    customizationInfo.innerHTML += '<p>Custom Extras Images:</p>';
    customExtrasImages.forEach(imageUrl => {
      customizationInfo.innerHTML += `<img src="${imageUrl}" alt="Custom Extra Image">`;
    });
  }
});
