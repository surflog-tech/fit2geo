declare module 'fit-file-parser' {
  interface callback {
    (err: null | string, res: Fit)
  }
  interface FitParser {
    parse(b: ArrayBuffer, c: callback): void;
  }
  interface FitParserConstructor {
    new (): FitParser
  }
  const module: FitParserConstructor
  export = module
}
