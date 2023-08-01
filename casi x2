document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('plantForm');
  const getPlantButton = document.getElementById('getPlantButton');
  const clearButton = document.getElementById('clearButton');
  const plantRecommendationDiv = document.getElementById('plantRecommendation');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const recommendation = getPlantRecommendation(formData);

    displayPlantRecommendation(recommendation);
  });

  clearButton.addEventListener('click', () => {
    form.reset();
    plantRecommendationDiv.innerHTML = '';
  });

  function getPlantRecommendation(formData) {
    const light = formData.get('light');
    const directSunlight = formData.get('directSunlight');
    const pets = formData.get('pets');
    const wateringHabits = formData.get('wateringHabits');
    const style = formData.get('style');
    const extras = formData.getAll('extras');

    if (light === 'low_light') {
      if (pets === 'Yes' && directSunlight === 'Yes') {
        return {
          name: 'Boston Fern',
          soil: 'Composted Soil',
          pot: 'Simple pot',
          color: 'clay',
          extras: extras,
        };
      } else {
        return {
          name: 'Sansevieria',
          soil: 'Composted Soil',
          pot: 'Simple pot',
          color: 'blue',
          extras: extras,
        };
      }
    } else if (light === 'medium_light') {
      if (wateringHabits === 'Overwater') {
        return {
          name: 'Monstera',
          soil: 'Composted Soil',
          pot: 'Simple pot decorated',
          color: 'yellow',
          extras: extras,
        };
      } else {
        return {
          name: 'Aglaonema',
          soil: 'Composted Soil',
          pot: 'Simple pot',
          color: 'blue',
          extras: extras,
        };
      }
    } else if (light === 'outdoor') {
      if (pets === 'Yes') {
        return {
          name: 'Aloe Vera',
          soil: 'Fertilized Soil',
          pot: 'Simple pot decorated',
          color: 'pink',
          extras: extras,
        };
      } else {
        return {
          name: 'Cactus',
          soil: 'Fertilized Soil',
          pot: 'Simple pot',
          color: 'clay',
          extras: extras,
        };
      }
    } else {
      // No recommendation available for other combinations
      return {
        name: 'Unknown Plant',
        soil: 'Unknown Soil',
        pot: 'Unknown Pot',
        color: 'unknown',
        extras: [],
      };
    }
  }

  function displayPlantRecommendation(recommendation) {
    // Build and display the recommendation on the webpage
    plantRecommendationDiv.innerHTML = `
      <h2>${recommendation.name}</h2>
      <img src="assets/pot_${recommendation.color}.png" alt="Pot" />
      <img src="assets/plant_${recommendation.name.toLowerCase().replace(' ', '_')}.png" alt="Plant" />
      <img src="assets/soil_${recommendation.soil.replace(' ', '_').toLowerCase()}.png" alt="Soil" />
      ${recommendation.extras.map(extra => `<img src="assets/${extra.toLowerCase().replace(' ', '_')}.png" alt="${extra}" />`).join('')}
      `;
  }
});
