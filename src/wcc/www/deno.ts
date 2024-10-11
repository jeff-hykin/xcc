// import { DisWasm } from "./diswasm.ts"
// import { WccRunner } from "./wcc_runner.ts"
import { WccRunner, DisWasm } from "./xcc.bundle.js"

var wccRunner = new WccRunner()
wccRunner.setConsoleOutFunction((text, _isError) => console.log(`[wccRunner.setConsoleOutFunction] error?: ${_isError}, text: ${text}`))
await wccRunner.setUp()
 
async function run({args, sourceCode, compileAndDump=true}) {
    const sourceName = "main.c"
    const objFn = "main.o"
    const compiledPath = "a.wasm"
    const extraOptions = compileAndDump ? ["-c", "-o", objFn, "--import-module-name=env"] : undefined
    await wccRunner.writeFile(sourceName, sourceCode)

    const exitCode = await wccRunner.compile(sourceName, extraOptions)
    if (exitCode !== 0) {
        throw new Error(`Compile failed: ${exitCode}`)
    }

    if (compileAndDump) {
        const compiledCode = await wccRunner.readFile(objFn)
        const disWasm = new DisWasm(compiledCode.buffer)
        let compiledWasm = ""
        disWasm.setLogFunc((code)=>compiledWasm+=(code+"\n"))
        // disWasm.setLogFunc((s) => Util.putTerminal(`${s}\n`))
        disWasm.dump()
        return compiledWasm
    }

    // Run
    args = ["a.wasm", ...args]
    const runExitCode = await wccRunner.runWasi(compiledPath, args)
    if (runExitCode !== 0) {
        throw new Error(`Run failed: ${runExitCode}`)
    }
    await wccRunner.clearTemporaries()
}

let compiledWasm = await run({
    args: [],
    sourceCode: `
        #include <stdio.h>
        
        int fib(int n) {
            if (n < 2)
                return n;
            else
                return fib(n - 1) + fib(n - 2);
        }
        
        int main() {
            printf("%d\\n", fib(30));
            return 0;
        }
    `,
})
console.log(`compiledWasm is:`,compiledWasm)
Deno.exit()
