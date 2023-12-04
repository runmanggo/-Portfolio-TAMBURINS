declare module "shortid" {
  interface ShortId {
    (): string;
    generate: () => string;
    characters: (char: string) => string;
    isValid: (id: any) => boolean;
    worker: (int: number) => void;
    seed: (num: number) => void;
  }

  const shortid: ShortId;
  export default shortid;
}
