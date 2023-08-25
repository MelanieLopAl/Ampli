import { potMaterials, soilInformation, potColors, plantInformation } from '/js/helpers/constants.js';

// Based on recommendation data passed, resolves the name of the plant.
export function ProcessPlantName(placement, pets) {
    if (placement === 'inside-indirect-light') {
        if (pets === 'yes') {
            return plantInformation.SANSEVIERIA.name;
        } else if (pets === 'no') {
            return plantInformation.BOSTON_FERN.name;
        }
    } else if (placement === 'inside-lot-indirect-light') {
        if (pets === 'yes') {
            return plantInformation.AGLAONEMA.name;
        } else if (pets === 'no') {
            return plantInformation.MONSTERA.name;
        }
    } else if (placement === 'outside') {
        if (pets === 'yes') {
            return plantInformation.ALOE_VERA.name;
        } else if (pets === 'no') {
            return plantInformation.CACTUS.name;
        }
    }
}

// Based on recommendation data passed, resolves the recommended pot for the plant.
export function ProcessPotType(watering) {
    if (watering === 'overwater') {
        return potMaterials.CLAY_POT;
    } else if (watering === 'underwater' ||
        watering === 'neither') {
        return potMaterials.CLAY_POT;
    }
}

// Based on recommendation data passed, resolves the decoration of the pot.
export function ProcessPotDecoration(style) {
    if (style === 'minimalism') {
        return false;
    } else {
        return true;
    }
}

// Based on recommendation data passed, resolves recommended type of soil for the plant.
export function ProcessSoilType(sunlight, watering) {
    if (watering === 'overwater') {
        return soilInformation.SOIL_DRAINAGE.name;
    }
    return sunlight === 'yes' ? soilInformation.SOIL_COMPOSTED.name : soilInformation.SOIL_FERTILIZED.name;
}

// Based on recommendation data passed, resolves the DEFAULT color for the plant.
export function ProcessPotColor(style) {
    if (style === 'decorated') {
        return potColors.PINK;
    } else {
        return potColors.UNPAINTED;
    }
}

export function CreateDivElementWithContent(content) {
    const div = document.createElement('div');
    div.insertAdjacentHTML('beforeend', content);
    return div;
}
