class Coord {
  lat: number;
  long: number;

  computeDistance(newLat: number, newLong: number): number {
    return 0;
  }

  constructor(lat: number, long: number) {
    this.lat = lat;
    this.long = long;
  }
}

const point = new Coord(3, 3);

class MapLocation extends Coord {
  private _name: string;

  constructor(lat: number, long: number) {
    super(lat, long);
  }

  get name() {
    return this._name;
  }

  set name(newName: string) {
    this._name = newName + "cool";
  }

  override computeDistance(newLat: number, newLong: number): number {
    console.log(this._name);
    return 1;
  }
}

const loc = new MapLocation(3, 2);

loc.name = "abs";
for (let i in loc) {
  console.log(i);
}

interface LoggerService {
  log: (s: string) => void;
}

class Logger implements LoggerService {
  log(s: string) {
    console.log(s);
  }
}

class MyClass<T> {
  a: T;
}

const b = new MyClass<string>();
b.a;

abstract class Base {
  print(s: string) {
    console.log(s);
  }
  abstract error(s: string): void;
}

class BaseExtanded extends Base {
  error(s: string): void {
    console.log(s);
  }
}

new BaseExtanded().print("ddd");

class Animal {
  name: string;
}

class Dog {
  tail: boolean;
  name: string;
}

const puppy: Animal = new Dog();
