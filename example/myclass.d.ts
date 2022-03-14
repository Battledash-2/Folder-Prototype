// Having a declaration file is recommended:
//       - Most editors are able to tell when there are functions on a class,
//       - but since we are loading the functions at runtime, the editor doesn't know.
//       - Because of this, we need a declaration file if we still want all of the auto-completions.

export class Test {
    constructor(): void;

    setCode(code: String): void;
    execute(): any;
}