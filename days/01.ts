import { getInput } from "../api/index.ts";

const getData = async () => {
  const input = await getInput(2024, 1);
  const lists = input.split("\n").filter((v) => v !== "").map((v) =>
    v.split(/\s+/)
  );

  const listA: number[] = [];
  const listB: number[] = [];

  lists.forEach(([inputA, inputB]) => {
    listA.push(+inputA);
    listB.push(+inputB);
  });

  return [listA, listB];
};

async function partOne() {
  const [listA, listB] = await getData();

  const sortedListA = listA.sort();
  const sortedListB = listB.sort();

  const distances = sortedListA.map((a, index) => {
    return Math.abs(a - sortedListB[index]);
  });

  const sum = distances.reduce((acc, value) => {
    return acc + value;
  }, 0);

  console.log(`Result of part one of day 1 is: ${sum}`);
}

async function partTwo() {
  const [listA, listB] = await getData();

  const countsById: { [key: string]: number } = {};
  for (const num of listB) {
    countsById[num] = countsById[num] ? countsById[num] + 1 : 1;
  }

  const result = listA.reduce(
    (acc, value) => acc += value * (countsById[value] ?? 0),
    0,
  );
  console.log(`Result of part two of day 1 is: ${result}`);
  return result;
}

await partOne();
await partTwo();
