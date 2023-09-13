import { ensureDir, copySync } from "fs-extra";
import fs from "fs";
import { execSync } from "child_process";
import path from "path";
import * as yargs from "yargs";

interface Manifest {
  app: {
    title: string;
  };
  networks: {
    [key: string]: {
      provider: string;
    };
  };
  contracts: Array<{
    name: string;
    src: string;
    networks: {
      [key: string]: {
        address: string;
      };
    };
  }>;
}

function readManifest(inputDir: string): Manifest {
  const manifestPath = path.join(inputDir, "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  return manifest;
}

async function generateOutput(
  inputDir: string,
  outputDir: string = "./output",
  clean: boolean = true
) {
  try {
    console.log("Reading manifest...");
    const manifest = readManifest(inputDir);

    console.log(`App: ${manifest.app.title}`);

    if (clean && fs.existsSync(outputDir)) {
      console.log("Removing old output directory...");
      fs.rmSync(outputDir, { recursive: true });
    }

    console.log("Generating output directory...");
    outputDir = path.join(__dirname, outputDir);
    await ensureDir(outputDir);

    console.log("Copying contracts...");
    await ensureDir(path.join(outputDir, "contracts"));
    for (const contract of manifest.contracts) {
      const contractPath = path.join(inputDir, contract.src);
      const contractFileName = path.basename(contract.src);

      console.log(`- ${contractFileName}`);

      const outputContractPath = path.join(
        outputDir,
        "contracts",
        contractFileName
      );

      fs.copyFileSync(contractPath, outputContractPath);
    }

    console.log("Copying project template files...");
    copySync("./template", path.join(outputDir));

    console.log("Copying manifest...");
    fs.copyFileSync(
      path.join(inputDir, "manifest.json"),
      path.join(outputDir, "src/manifest.json")
    );

    // Change directory to output
    process.chdir(outputDir);

    console.log("Installing dependencies...");
    execSync("npm install");

    console.log("Compiling contracts...");
    execSync("npx hardhat compile");

    console.log(`Output generated in ${outputDir}`);
  } catch (err) {
    console.error(`An error occurred: ${err}`);
    process.exit(1);
  }
}

yargs
  .command(
    'generate-output',
    'Generate output from a given input directory',
    (yargs) => {
      yargs
        .option('input', {
          describe: 'input directory where manifest.json is located',
          alias: 'i',
          type: 'string',
          demandOption: true
        })
        .option('output', {
          describe: 'output directory with generated app',
          alias: 'o',
          type: 'string',
          default: './output'
        })
        .option('clean', {
          describe: 'if set, the output directory is removed if already present',
          alias: 'c',
          type: 'boolean',
          default: true
        });
    },
    async (argv) => {
      await generateOutput(argv.input as string, argv.output as string, argv.clean as boolean);
    }
  )
  .help()
  .argv;