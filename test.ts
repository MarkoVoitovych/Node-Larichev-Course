let a: number = 5;
let b: string = "5";

let c: number = a + Number(b);

let names: string[] = ["sfsf", "www"];
let ages: number[] = [6, 4];

let tup: [number, string] = [2, "dfs"];

tup.push("fdsfs");
// tup[2]  error

let e: any = 3;
e = true;

function greet(name: string): string {
  return name + "Hi";
}

greet("3");

names.map((x: string) => x);

const coord = (coord: { lat: number; long?: number }): number => {
  if (coord.long) {
    return coord.lat * coord.long;
  }
  return coord.lat * 10;
};
