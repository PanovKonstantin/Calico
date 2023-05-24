export class UnkownGameSetup extends Error {
  constructor(setup: string) {
    super('Unkown game setup:' + setup);
  }
}
