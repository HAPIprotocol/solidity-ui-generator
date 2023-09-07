const fs = require('fs-extra');
const path = require('path');
const yargs = require('yargs');

const argv = yargs
    .usage('Usage: $0 --input [inputDir] --output [outputDir]')
    .demandOption(['input', 'output'])
    .argv;

const inputDir = path.resolve(argv.input);
const outputDir = path.resolve(argv.output);

if (!fs.existsSync(inputDir)) {
    console.error(`Input directory '${inputDir}' does not exist.`);
    process.exit(1);
}

fs.ensureDirSync(outputDir);

const manifestFile = path.join(inputDir, 'manifest.json');
if (fs.existsSync(manifestFile)) {
    fs.copyFileSync(manifestFile, path.join(outputDir, 'manifest.json'));
} else {
    console.warn('manifest.json not found in the input directory.');
}

// Create a package.json in the output directory
const packageJson = {
    name: 'solidity-ui-generator',
    version: '1.0.0',
    description: 'My Project',
    scripts: {
        start: 'react-scripts start',
        dev: 'react-scripts start',
        build: 'react-scripts build',
    },
    dependencies: {
        '@testing-library/jest-dom': '^5.17.0',
        '@testing-library/react': '^13.4.0',
        '@testing-library/user-event': '^13.5.0',
        '@types/jest': '^27.5.2',
        '@types/node': '^16.18.48',
        '@types/react': '^18.2.21',
        '@types/react-dom': '^18.2.7',
        'react': '^18.2.0',
        'react-dom': '^18.2.0',
        'react-scripts': '5.0.1',
        'typescript': '^4.9.5',
        'web-vitals': '^2.1.4',
    },
};
fs.writeFileSync(path.join(outputDir, 'package.json'), JSON.stringify(packageJson, null, 2));

const helloWorldCode = `
import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}

export default App;
`;

fs.ensureDirSync(path.join(outputDir, 'src'));
fs.writeFileSync(path.join(outputDir, 'src', 'App.tsx'), helloWorldCode);

console.log(`Project setup completed in '${outputDir}'`);
