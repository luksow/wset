import { Title, Container, Table, Anchor, Badge, ScrollArea, Divider, Text } from "@mantine/core";
import * as _ from 'lodash';
import grapesRaw from "./grapes.json";
import { useRouter } from 'next/router';

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

export default function IndexPage() {
  const grapes: GrapeWithRegion[] = grapesRaw.map((grapeRaw) => {
    const grape: GrapeWithRegion = {
      name: grapeRaw.name.split("/").join(" / "),
      order: grapeRaw.order,
      climate: grapeRaw.climate.split(',').map((c) => c.trim()).filter(c => c.length != 0) as Climate[],
      acidity: grapeRaw.acidity.split(',').map((c) => c.trim()).filter(c => c.length != 0) as Acidity[],
      tannins: grapeRaw.tannins.split(',').map((c) => c.trim()).filter(c => c.length != 0) as Tannins[],
      sweetness: grapeRaw.sweetness.split(',').map((c) => c.trim()).filter(c => c.length != 0) as Sweetness[],
      body: grapeRaw.body.split(',').map((c) => c.trim()).filter(c => c.length != 0) as WineBody[],
      flavour: grapeRaw.flavour.split(";").filter(c => c.length != 0),
      oak: grapeRaw.oak,
      additionalCharacteristics: grapeRaw.additional_characteristics.split(";").filter(c => c.length != 0),
      aging: grapeRaw.aging.split(";").filter(c => c.length != 0),
      country: grapeRaw.country || "",
      region: grapeRaw.region || "",
      regionalCharacteristics: grapeRaw.characteristics || "",

    };
    return grape;
  });

  const generateClimateBadges = (climates: Climate[]) => {
    const color = (climate: Climate) => {
      switch (climate) {
        case "Cool":
          return "blue";
        case "Moderate":
          return "yellow";
        case "Warm":
          return "red";
      }
    }
    return climates.map((climate) => {
      return (<Badge key={climate} color={color(climate)}>{climate}</Badge>)
    })
  }

  const generateAcidityBadges = (acidity: Acidity[]) => {
    const color = (acidity: Acidity) => {
      switch (acidity) {
        case "Low":
          return "lime";
        case "Medium":
          return "yellow";
        case "High":
          return "red";
      }
    }
    return acidity.map((acidity) => {
      return (<Badge key={acidity} color={color(acidity)}>{acidity}</Badge>)
    })
  }

  const generateTanninsBadges = (tannins: Tannins[]) => {
    const color = (tannins: Tannins) => {
      switch (tannins) {
        case "Low":
          return "lime";
        case "Medium":
          return "yellow";
        case "High":
          return "red";
      }
    }
    return tannins.map((tannins) => {
      return (<Badge key={tannins} color={color(tannins)}>{tannins}</Badge>)
    })
  }

  const generateBodyBadges = (body: WineBody[]) => {
    const color = (body: WineBody) => {
      switch (body) {
        case "Light":
          return "blue";
        case "Medium":
          return "teal";
        case "Full":
          return "red";
      }
    }
    return body.map((body) => {
      return (<Badge key={body} color={color(body)}>{body}</Badge>)
    })
  }

  const generateSweetnessBadges = (sweetness: Sweetness[]) => {
    const color = (sweetness: Sweetness) => {
      switch (sweetness) {
        case "Dry":
          return "blue";
        case "Off-dry":
          return "lime";
        case "Medium":
          return "yellow";
        case "Sweet":
          return "red";
      }
    }
    return sweetness.map((sweetness) => {
      return (<Badge key={sweetness} color={color(sweetness)}>{sweetness}</Badge>)
    })
  }

  const generateGrapeRow = (grape: GrapeWithRegion) => {
    return (<tr key={grape.order}>
      <td><Title order={6}>{grape.name}</Title></td>
      <td><div style={{ display: "flex", flexDirection: "column" }}>{generateClimateBadges(grape.climate)}</div></td>
      <td><div style={{ display: "flex", flexDirection: "column" }}>{generateAcidityBadges(grape.acidity)}</div></td>
      <td><div style={{ display: "flex", flexDirection: "column" }}>{generateTanninsBadges(grape.tannins)}</div></td>
      <td><div style={{ display: "flex", flexDirection: "column" }}>{generateSweetnessBadges(grape.sweetness)}</div></td>
      <td><div style={{ display: "flex", flexDirection: "column" }}>{generateBodyBadges(grape.body)}</div></td>
      <td><ul>{generateFlavourList(grape.flavour)}</ul></td>
      <td>{grape.oak}</td>
      <td><ul>{generateCharacteristicsList(grape.additionalCharacteristics)}</ul></td>
      <td><ul>{generateAgingList(grape.aging)}</ul></td>
    </tr>)
  }

  const generateFlavourList = (flavours: string[]) => {
    return flavours.map((flavour) => {
      return (<li key={flavour}>{flavour}</li>)
    })
  }

  const generateCharacteristicsList = (characteristics: string[]) => {
    return characteristics.map((characteristic) => {
      return (<li key={characteristic}>{characteristic}</li>)
    })
  }

  const generateAgingList = (aging: string[]) => {
    return aging.map((age) => {
      return (<li key={age}>{age}</li>)
    })
  }

  const generateGrapeRegionRow = (grape: GrapeWithRegion, grapesWithRegions: _.Dictionary<GrapeWithRegion[]>) => {
    const subGrapeWithRegions = _.orderBy(grapesWithRegions[grape.name], g => g.country + g.region);
    return subGrapeWithRegions.map((gr, idx) => {
      return (<tr key={gr.order}>
        {idx == 0 ? <td rowSpan={subGrapeWithRegions.length}><Title order={6}>{gr.name}</Title></td> : <></>}
        <td>{gr.country}</td>
        <td>{gr.region}</td>
        <td>{gr.regionalCharacteristics}</td>
      </tr>)
    })
  }

  const generateRegionGrapeRow = (region: GrapeWithRegion, regionsWithGrapes: _.Dictionary<GrapeWithRegion[]>) => {
    const subRegionWithGrapes = _.orderBy(regionsWithGrapes[region.country + region.region], g => g.name);
    return subRegionWithGrapes.map((gr, idx) => {
      return (<tr key={gr.order}>
        {idx == 0 ? <td rowSpan={subRegionWithGrapes.length}>{gr.country}</td> : <></>}
        {idx == 0 ? <td rowSpan={subRegionWithGrapes.length}>{gr.region}</td> : <></>}
        <td><Title order={6}>{gr.name}</Title></td>
        <td>{gr.regionalCharacteristics}</td>
      </tr>)
    })
  }

  const uniqueGrapes = _.chain(grapes).uniqBy(g => g.name).orderBy(g => g.order).value();
  const grapesWithRegions = _.chain(grapes).groupBy(g => g.name).value();

  const uniqueRegions = _.chain(grapes).uniqBy(g => g.country + g.region).orderBy(g => g.country + g.region).value();
  const regionsWithGrapes = _.chain(grapes).groupBy(g => g.country + g.region).value();

  const router = useRouter();
  const printable = router.query.printable != undefined;

  return (
    <Container size={"xl"}>
      <Title order={1} my={15}>Grape varieties</Title>
      {!printable &&
        <ScrollArea h={"85vh"} type="always">
          <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true}>
            <thead style={{ position: "sticky", top: 0, background: "white" }}>
              <tr>
                <th>Grape</th>
                <th>Climate</th>
                <th>Acidity</th>
                <th>Tannins</th>
                <th>Sweetness</th>
                <th>Body</th>
                <th>Flavour</th>
                <th>Oak</th>
                <th>Characteristics</th>
                <th>Aging</th>
              </tr>
            </thead>
            <tbody>
              {uniqueGrapes.map((grape) => generateGrapeRow(grape))}
            </tbody>
          </Table>
        </ScrollArea>
      }
      {printable &&
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true}>
          <thead>
            <tr>
              <th>Grape</th>
              <th>Climate</th>
              <th>Acidity</th>
              <th>Tannins</th>
              <th>Sweetness</th>
              <th>Body</th>
              <th>Flavour</th>
              <th>Oak</th>
              <th>Characteristics</th>
              <th>Aging</th>
            </tr>
          </thead>
          <tbody>
            {uniqueGrapes.map((grape) => generateGrapeRow(grape))}
          </tbody>
        </Table>
      }

      <Title order={1} my={15}>Grapes and regions</Title>
      <Title order={2} my={5}>By grape</Title>
      {!printable &&
        <ScrollArea h={"85vh"} type="always">
          <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true}>
            <thead style={{ position: "sticky", top: 0, background: "white" }}>
              <tr>
                <th>Grape</th>
                <th>Country</th>
                <th>Region</th>
                <th>Characteristics</th>
              </tr>
            </thead>
            <tbody>
              {uniqueGrapes.map((grape) => generateGrapeRegionRow(grape, grapesWithRegions))}
            </tbody>
          </Table>
        </ScrollArea>
      }
      {printable &&
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true}>
          <thead>
            <tr>
              <th>Grape</th>
              <th>Country</th>
              <th>Region</th>
              <th>Characteristics</th>
            </tr>
          </thead>
          <tbody>
            {uniqueGrapes.map((grape) => generateGrapeRegionRow(grape, grapesWithRegions))}
          </tbody>
        </Table>
      }

      <Title order={2} my={5}>By region</Title>
      {!printable &&
        <ScrollArea h={"85vh"} type="always">
          <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true}>
            <thead style={{ position: "sticky", top: 0, background: "white" }}>
              <tr>
                <th>Country</th>
                <th>Region</th>
                <th>Grape</th>
                <th>Characteristics</th>
              </tr>
            </thead>
            <tbody>
              {uniqueRegions.map((region) => generateRegionGrapeRow(region, regionsWithGrapes))}
            </tbody>
          </Table>
        </ScrollArea>
      }
      {printable &&
        <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true}>
          <thead>
            <tr>
              <th>Country</th>
              <th>Region</th>
              <th>Grape</th>
              <th>Characteristics</th>
            </tr>
          </thead>
          <tbody>
            {uniqueRegions.map((region) => generateRegionGrapeRow(region, regionsWithGrapes))}
          </tbody>
        </Table>
      }

      <Title order={1} my={15}>Important numbers</Title>
      <Title order={2} my={5}>Alcohol</Title>
      <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"250px"}>
        <tbody>
          <tr>
            <td>Low</td>
            <td>below 11%</td>
          </tr>
          <tr>
            <td>Medium</td>
            <td>11% - 13.9%</td>
          </tr>
          <tr>
            <td>High</td>
            <td>14%+</td>
          </tr>
        </tbody>
      </Table>
      <Title order={4} pt={5}>Fortified wines</Title>
      <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"250px"}>
        <tbody>
          <tr>
            <td>Low</td>
            <td>15% - 16.4%</td>
          </tr>
          <tr>
            <td>Medium</td>
            <td>16.5% - 18.4%</td>
          </tr>
          <tr>
            <td>High</td>
            <td>18.5%+</td>
          </tr>
        </tbody>
      </Table>
      <Title order={2} my={5}>Climate</Title>
      <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"250px"}>
        <tbody>
          <tr>
            <td>Cool</td>
            <td>16.5°C or below</td>
          </tr>
          <tr>
            <td>Moderate</td>
            <td>16.5°C - 18.5°C</td>
          </tr>
          <tr>
            <td>Warm</td>
            <td>18.5°C - 21°C</td>
          </tr>
        </tbody>
      </Table>
      <Title order={2} my={5}>Fermentation</Title>
      <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"250px"}>
        <tbody>
          <tr>
            <td>White or rosé wines</td>
            <td>12°C - 22°C</td>
          </tr>
          <tr>
            <td>Red wines</td>
            <td>20°C - 32°C</td>
          </tr>
        </tbody>
      </Table>
      <Title order={2} my={5}>Serving temperatures</Title>
      <Table verticalSpacing={"xs"} horizontalSpacing={"xs"} fontSize={"xs"} striped={true} withBorder={true} withColumnBorders={true} maw={"600px"}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Temperature</th>
            <th>Style of wine</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Well chilled</td>
            <td>6°C - 8°C</td>
            <td>Sweet wine</td>
          </tr>
          <tr>
            <td>Well chilled</td>
            <td>6°C - 10°C</td>
            <td>Sparking wine</td>
          </tr>
          <tr>
            <td>Chilled</td>
            <td>7°C - 10°C</td>
            <td>Light-, medium-bodied white or rose</td>
          </tr>
          <tr>
            <td>Lightly chilled</td>
            <td>10°C - 13°C</td>
            <td>Full-bodied white</td>
          </tr>
          <tr>
            <td>Room temperature or lightly chilled</td>
            <td>13°C - 18°C</td>
            <td>Light-bodied red</td>
          </tr>
          <tr>
            <td>Room temperature</td>
            <td>15°C - 18°C</td>
            <td>Medium-, full-bodied red</td>
          </tr>
        </tbody>
      </Table>
      <Title my={15} order={1}>Need printable version?</Title>
      <Text>Try <Anchor href="?printable">this</Anchor> and then use print function in your browser (works best with landscape mode). It is not perfect but that is all I can do for now.</Text>
      <Title my={15} order={1}>Error? Missing information?</Title>
      <Text>You can report any issues <Anchor href="https://github.com/luksow/wset/issues" target="_blank">here</Anchor> or <Anchor href="https://luksow.com" target="_blank">directly to me.</Anchor></Text>
      <Title my={15} order={1}>Acknowledgments</Title>
      <Text>Prepared based on <q>Wines: Looking behind the label</q> and <q>WSET® Level 2 Award in Wines Workbook</q> by WSET. Special thanks to <Anchor href='https://republikawina.pl/' target="_blank">Republika Wina</Anchor> and my study group for the greatest WSET 2 experience.</Text>
      <Divider my={20} size={5} variant="dashed" label="Brought to you with ❤️ by @luksow" labelProps={{ component: 'a', href: 'https://www.luksow.com', target: "_blank", variant: 'link', color: 'blue' }} />
    </Container>
  );
}
