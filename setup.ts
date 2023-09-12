// @ts-ignore
const fs = require("fs-extra");
const path = require("path");
const { hardhat } = require("hardhat");
const yargs = require("yargs");

async function compileSolidity(inputDir: any) {
  try {
    const outputDir = path.join(__dirname, "output");

    await fs.ensureDir(outputDir);

    console.log("Compiling Solidity files...");

    const output = await hardhat.run("compile", {
      paths: {
        artifacts: path.join(__dirname, "artifacts"),
        sources: path.join(__dirname, inputDir),
      },
    });

    if (output.errors) {
      console.error("Compilation errors:", output.errors);
      process.exit(1);
    }

    console.log("Solidity files compiled successfully!");

    const abiFilesDir = path.join(__dirname, "artifacts/contracts");
    const abiOutputDir = path.join(outputDir, "abis");

    await fs.ensureDir(abiOutputDir);

    await fs.copy(abiFilesDir, abiOutputDir);

    console.log("ABI files generated and placed in the 'output/abis' directory.");
  } catch (err) {
    console.error("An error occurred:", err);
    process.exit(1);
  }
}

async function generateAbis(args: any) {
  try {
    const inputDir = path.resolve(args.input);
    const outputDir = path.join(__dirname, "output");

    await fs.ensureDir(outputDir);

    const manifestPath = path.join(inputDir, "manifest.json");
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

    const outputManifestPath = path.join(outputDir, "manifest.json");
    fs.copyFileSync(manifestPath, outputManifestPath);

    await compileSolidity(inputDir);

    console.log("Manifest.json copied and ABI files generated.");
  } catch (err) {
    console.error("An error occurred:", err);
    process.exit(1);
  }
}

yargs
  .command(
    "generate-abis <input>",
    "Generate ABI files for contracts",
    (yargs: { positional: (arg0: string, arg1: { describe: string; type: string; }) => void; }) => {
      yargs
        .positional("input", {
          describe: "Input directory containing manifest.json",
          type: "string",
        });
    },
    async (argv: { input: string; }) => {
      const inputDirectory = argv.input as string;
      await generateAbis({ input: inputDirectory });
    }
  )
  .demandCommand()
  .help()
  .argv;

