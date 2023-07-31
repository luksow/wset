type GrapeRaw = {
    order: number,
    name: string,
    climate: string,
    acidity: string;
    tannins: string;
    sweetness: string;
    body: string;
    flavour: string;
    oak: string;
    additional_characteristics: string;
    aging: string;
    country: string;
    region: string;
    characteristics: string;
}

type Climate = "Cool" | "Moderate" | "Warm";
type Acidity = "Low" | "Medium" | "High";
type Tannins = "Low" | "Medium" | "High";
type Sweetness = "Dry" | "Off-dry" | "Medium" | "Sweet";
type WineBody = "Light" | "Medium" | "Full";

type GrapeWithRegion = {
    order: number,
    name: string,
    climate: Climate[],
    acidity: Acidity[],
    tannins: Tannins[],
    sweetness: Sweetness[],
    body: WineBody[],
    flavour: string[],
    oak: string,
    aging: string[],
    additionalCharacteristics: string[],
    country: string,
    region: string,
    regionalCharacteristics: string,
}