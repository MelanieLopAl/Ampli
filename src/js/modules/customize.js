import PlantBuilder from '/js/plantBuilder.js';
import Observer from '/js/observer.js';
import { potMaterials, potColors, soilInformation, plantInformation, extrasInformation } from '/js/helpers/constants.js';

let plant = null;

const potMaterialObserver = new Observer();
const potDecorationsObserver = new Observer();
const potColorObserver = new Observer();
const potColorSelectedObserver = new Observer();
const SoilObserver = new Observer();
const plantObserver = new Observer();
const extrasObserver = new Observer();

function ValidateAndBuildPlant() {
    // If plant has not been created in the recommendation,
    // user is put back to recommendation form.
    if (localStorage.getItem('plant') === null) {
        location.href = '/';
    }

    // Gets plant object and parsed.
    plant = JSON.parse(localStorage.getItem('plant'));

    // Builds plant again.
    const plantBuilder = new PlantBuilder();
    plantBuilder
        .withPlant(plant.plant)
        .withPotMaterial(plant.potMaterial)
        .withPotDecoration(plant.potDecoration)
        .withPotColor(plant.potColor)
        .withSoil(plant.soil)
        .withExtras(plant.extras);
    plant = plantBuilder.build();
}

// Sets the form based on the recommendation output.
function SetFormValues() {
    // Plant material.
    plant.potMaterial === potMaterials.CLAY_POT
        ? document.getElementById('pot_material_clay').checked = true
        : document.getElementById('pot_material_ceramic').checked = true;
    // Plant decoration.
    plant.potDecoration === true
        ? document.getElementById('pot_decorations').checked = true
        : document.getElementById('pot_decorations').checked = false;
    // Pot color / not painted.
    plant.potColor !== potColors.UNPAINTED
        ? document.getElementById('pot_color_checkbox').checked = true
        : document.getElementById('pot_color_checkbox').checked = false;
    // Pot color / painted.
    if (plant.potColor === potColors.BLUE) {
        document.getElementById('pot_color_select').selectedIndex = 0;
    } else if (plant.potColor === potColors.PINK) {
        document.getElementById('pot_color_select').selectedIndex = 1;
    } else if (plant.potColor === potColors.GREEN) {
        document.getElementById('pot_color_select').selectedIndex = 2;
    } else if (plant.potColor === potColors.PURPLE) {
        document.getElementById('pot_color_select').selectedIndex = 3;
    } else if (plant.potColor === potColors.UNPAINTED) {
        document.getElementById('pot_color_select').selectedIndex = 4;
    }
    // Soil.
    if (plant.soil === soilInformation.SOIL_COMPOSTED.name) {
        document.getElementById('soilSelection').selectedIndex = 0;
    } else if (plant.soil === soilInformation.SOIL_FERTILIZED.name) {
        document.getElementById('soilSelection').selectedIndex = 1;
    } else if (plant.soil === soilInformation.SOIL_DRAINAGE.name) {
        document.getElementById('soilSelection').selectedIndex = 2;
    }
    // Plant name.
    if (plant.plant === plantInformation.SANSEVIERIA.name) {
        document.getElementById('plantSelection').selectedIndex = 0;
    } else if (plant.plant === plantInformation.BOSTON_FERN.name) {
        document.getElementById('plantSelection').selectedIndex = 1;
    } else if (plant.plant === plantInformation.AGLAONEMA.name) {
        document.getElementById('plantSelection').selectedIndex = 2;
    } else if (plant.plant === plantInformation.MONSTERA.name) {
        document.getElementById('plantSelection').selectedIndex = 3;
    } else if (plant.plant === plantInformation.ALOE_VERA.name) {
        document.getElementById('plantSelection').selectedIndex = 4;
    } else if (plant.plant === plantInformation.CACTUS.name) {
        document.getElementById('plantSelection').selectedIndex = 5;
    } else if (plant.plant === plantInformation.PEACE_LILY.name) {
        document.getElementById('plantSelection').selectedIndex = 6;
    }
    // Extras.
    if (plant.extras.includes(extrasInformation.EXTRA_MINI_PLANTS.nameHTML)) {
        document.getElementById('small_plants').checked = true;
    }
    if (plant.extras.includes(extrasInformation.EXTRA_MOSS_POLE.nameHTML)) {
        document.getElementById('moss_pole').checked = true;
    }
    if (plant.extras.includes(extrasInformation.EXTRA_PEBBLES.nameHTML)) {
        document.getElementById('pebbles').checked = true;
    }
}

function InitializeObservers() {
    function potMaterial(payload) {
        const _ = `${payload.potMaterial} ${payload.potDecoration === true ? 'decorated' : 'undecorated'} ${payload.potColor}.`;
        document.getElementById('plant-pot').innerHTML = _;
        document.getElementById('image-pot').src = '/assets/' + payload.ResolvePotRecommendationImagePath();
    }
    potMaterialObserver.Subscribe(potMaterial);
    potDecorationsObserver.Subscribe(potMaterial);
    potColorObserver.Subscribe(potMaterial);
    potColorSelectedObserver.Subscribe(potMaterial);

    function potSoil(payload) {
        document.getElementById('plant-soil').innerHTML = payload.soil;
        document.getElementById('image-soil').src = payload.ResolveSoilRecommendationImagePath();
    }
    SoilObserver.Subscribe(potSoil);

    function _plant(payload) {
        document.getElementById('plant-name').innerHTML = payload.plant;
        document.getElementById('image-plant').src = payload.ResolvePlantRecomendationImagePath();
    }
    plantObserver.Subscribe(_plant);

    function extras(payload) {
        document.getElementById('plant-extras').innerHTML = payload.extras;
        document.getElementById('image-plant').src = payload.ResolvePlantRecomendationImagePath();
    }
    extrasObserver.Subscribe(extras);
}

function OnFormChange(e) {
    e.preventDefault();   
    if (e.target.id.includes('pot_material')) {
        potMaterialObserver.Notify(plant);
    }
    if (e.target.id.includes('plantSelection')) {
        plant.plant = e.target.value;
        plantObserver.Notify(plant);
    }
}

document.getElementById('customize-form').addEventListener('change', OnFormChange);

export default function init() {
    ValidateAndBuildPlant();
    SetFormValues();
    InitializeObservers();

    potMaterialObserver.Notify(plant);
    SoilObserver.Notify(plant);
    plantObserver.Notify(plant);
    extrasObserver.Notify(plant);
}
