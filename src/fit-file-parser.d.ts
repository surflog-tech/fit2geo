declare module 'fit-file-parser' {
  interface callback {
    (err: null | string, res: Fit)
  }
  interface FitParser {
    parse(b: ArrayBuffer, c: callback): void;
  }
  interface FitParserOptions {
    mode?: string;
    speedUnit?: string;
    lengthUnit?: string;
    temperatureUnit?: string;
    elapsedRecordField?: boolean;
    force?: boolean;
  }
  interface FitParserConstructor {
    new (options: FitParserOptions): FitParser
  }
  const module: FitParserConstructor
  export = module
}
