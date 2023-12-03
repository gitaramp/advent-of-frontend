export interface Lokalizacja {
    x: number,
    y: number,
    z: number,
    czas: number
}

export type MapaCzasoprzestrzenna = (x: number, y: number, z: number, czas: number) => number;

export function znajdzWorek(lokalizacje: Lokalizacja[], mapa: MapaCzasoprzestrzenna): Lokalizacja | null {
    const [lokalizacjaWithHighestValue] = getSortedLokalizacjeByHighestValue(lokalizacje, mapa);
    if (!lokalizacjaWithHighestValue) return null;

    const highestValue = mapa(lokalizacjaWithHighestValue.x, lokalizacjaWithHighestValue.y, lokalizacjaWithHighestValue.z, lokalizacjaWithHighestValue.czas);
    return Number.isNaN(highestValue) ? null : lokalizacjaWithHighestValue;
}

function getSortedLokalizacjeByHighestValue(lokalizacje: Array<Lokalizacja>, mapa: MapaCzasoprzestrzenna): Array<Lokalizacja> {
    return lokalizacje.toSorted((a: Lokalizacja, b: Lokalizacja) => mapa(b.x, b.y, b.z, b.czas) - mapa(a.x, a.y, a.z, a.czas));
}