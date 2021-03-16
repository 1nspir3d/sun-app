export function setPosition(coords) {
    return {
        type: 'SET_POSITION',
        payload: {
            lon: coords.longitude || coords.lon,
            lat: coords.latitude || coords.lat
        }
    }
}

export function setSun(sun) {
    return {
        type: 'SET_SUN',
        payload: {
            sunrise: sun.sunrise,
            sunset: sun.sunset
        }
    }
}

export function setCity(info) {
    return {
        type: 'SET_CITY',
        payload: info
    }
}

export function setInput(info) {
    return {
        type: 'SET_INPUT',
        payload: info
    }
}

export function setUndef() {
    return {
        type: "SET_UNDEF"
    }
}