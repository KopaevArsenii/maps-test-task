export type Coordinate = [number, number];

export type Road = {
    begin: number,
    coordinates: [Coordinate[]],
    end: number,
    id: number,
    name: string,
    number: number,
    type: string,
    unique_value: number,
    update: null
}