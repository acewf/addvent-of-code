const inputPath = `https://adventofcode.com/$YEAR/day/$DAY/input`;
const dataByUrl: { [key: string]: string } = {};

const SESSION = Deno.env.get("SESSION") as string;
const headers = {
  headers: {
    "Cookie": `session=${SESSION}`,
  },
};

export async function getInput(YEAR: number, DAY: number) {
  const path = inputPath.replace("$YEAR", YEAR.toString()).replace(
    "$DAY",
    DAY.toString(),
  );

  if (dataByUrl[path]) {
    return dataByUrl[path];
  }

  const res = await fetch(path, headers);
  const data = await res.text();

  if (!res.ok) {
    switch (res.status) {
      case 404:
        throw new Error(`${res.status}: Day not available!`);
      case 400:
        throw new Error(`${res.status}: Bad credentials!`);
      default:
        throw new Error(`${res.status} ${res.statusText}`);
    }
  }

  return data;
}
