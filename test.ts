interface IHasLength {
  length: number;
}

function log<T extends IHasLength, K>(obj: T, arr: K[]): K[] {
  arr.length;
  obj.length;
  console.log(obj);
  return arr;
}

log<string, number>("asdf", [3]);

interface IUser {
  name: string;
  age?: number;
  bid: <T>(sum: T) => boolean;
}

function bid<T>(sum: T): boolean {
  return true;
}
