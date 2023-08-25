
import PlantBuilder from '/js/PlantBuilder.js';
import { ProcessPlantName, ProcessPotDecoration, ProcessPotColor, ProcessSoilType } from '/js/helpers/utils.js';
import { potMaterials } from '/js/helpers/constants.js';

// State of the plant recommendation. It is later saved into localStorage.
let plant = null;

function ResolveRecommendationView(plant) {
    // Cleans div.
    const recommendationDiv = document.querySelector('#recommendation');
    recommendationDiv.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = plant.plant;
    recommendationDiv.appendChild(title);

    const imagesContainer = document.createElement('div');
    imagesContainer.classList.add('images-container');

    // Images
    const plantImage = document.createElement('img');
    plantImage.src = plant.ResolvePlantRecomendationImagePath();

    const potImage = document.createElement('img');
    potImage.src = '/assets/' + plant.ResolvePotRecommendationImagePath();

    const soilImage = document.createElement('img');
    soilImage.src = plant.ResolveSoilRecommendationImagePath();

    if (plant.extras.includes('moss-pole')) {
        const mossPoleImage = document.createElement('img');
        mossPoleImage.src = '/assets/moss-pole.png';
        imagesContainer.appendChild(mossPoleImage);
    }

    imagesContainer.appendChild(potImage);

    recommendationDiv.appendChild(imagesContainer);
    imagesContainer.appendChild(soilImage);

    if (plant.extras.includes('pebbles')) {
        const pebblesImage = document.createElement('img');
        pebblesImage.src = '/assets/pebbles.png';
        imagesContainer.appendChild(pebblesImage);
    }

    if (plant.extras.includes('mini-plants')) {
        const miniPlantsImage = document.createElement('img');
        miniPlantsImage.src = '/assets/mini-plants.png';
        imagesContainer.appendChild(miniPlantsImage);
    }

    imagesContainer.appendChild(plantImage);

    // Information
    const infoList = document.createElement('ul');
    infoList.innerHTML = `
    <li>Name: ${plant.plant}</li>
    <li>Soil: ${plant.soil.toLowerCase()}</li>
    <li>Pot material: ${plant.potMaterial.toLowerCase()}</li>
    <li>Pot color: ${plant.potColor}</li>
    <li>Pot decorated: ${plant.potDecoration === true ? 'yes' : 'no'}</li>
    <li>Extras: ${plant.extras.length === 0 ? 'none' : plant.extras}</li>
  `;
    recommendationDiv.appendChild(infoList);
    // Shows customize button.
    document.getElementById('customizeButton').classList.remove('invisible');
    // Saves the plant into the localStorage to be able to be retrieved on other html pages.
    localStorage.setItem('plant', JSON.stringify(plant));
}

function ResolvePassedData(e) {
    try {
        // Prevents website update.
        e.preventDefault();

        // Saves information into a temporal object.
        const {
            placement,
            sunlight,
            pets,
            watering,
            style,
            extras,
        } = {
            placement: document.querySelector('input[name="placement"]:checked').value,
            sunlight: document.querySelector('input[name="sunlight"]:checked').value,
            pets: document.querySelector('input[name="pets"]:checked').value,
            watering: document.querySelector('input[name="watering"]:checked').value,
            style: document.querySelector('input[name="style"]:checked').value,
            extras: Array.from(document.querySelectorAll('input[name="extras"]:checked')).map((input) => input.value),
        };

        // Extracts the fixed information,
        const plantName = ProcessPlantName(placement, pets);
        let potMaterial = watering === 'overwater' ? potMaterials.CLAY_POT : potMaterials.CERAMIC_POT;
        let potDecoration = ProcessPotDecoration(style);
        let potColor = ProcessPotColor(style);
        let soil = ProcessSoilType(sunlight, watering);

        // Builds plant.
        const plantBuilder = new PlantBuilder();
        plantBuilder
            .withPlant(plantName)
            .withPotMaterial(potMaterial)
            .withPotDecoration(potDecoration)
            .withPotColor(potColor)
            .withSoil(soil)
            .withExtras(extras);

        plant = plantBuilder.build();
        ResolveRecommendationView(plant);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Faltan campos.'); console.error(error);
        alert('Faltan campos por seleccionar.');
    }
}

function ClearForm() {
    document.getElementById('plantForm').reset();
    plant = null;
    localStorage.removeItem('plant');
    document.getElementById('customizeButton').classList.add('invisible');
    document.getElementById('recommendation').innerHTML = '';
}

function GoToCustomize() {
    location.href = 'customize.html';
}

export default function init() {
    document.getElementById('plantForm').addEventListener('submit', ResolvePassedData);
    document.getElementById('clearButton').addEventListener('click', ClearForm);
    document.getElementById('customizeButton').addEventListener('click', GoToCustomize);
}
