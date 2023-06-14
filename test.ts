type Coord = {
  lat: number;
  long: number;
};

interface ICoord {
  lat: number;
  long: number;
}

type Id = number | string;

function compute(coordinates: ICoord) {}

interface IAnimal {
  name: string;
}

interface IDog extends IAnimal {
  tail: boolean;
}

const dog: IDog = {
  tail: true,
  name: "Flufy",
};

dog.name;

type Flower = {
  name: string;
};

const rose: Flower & { hasLeaves: boolean } = {
  name: "Rose",
  hasLeaves: true,
};

export type { Flower };

interface Car {
  name: string;
}

interface Car {
  engine: string;
}

const tesla: Car = {
  name: "Tesla",
  engine: "electric",
};
