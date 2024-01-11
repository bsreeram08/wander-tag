import { argv, file, spawnSync, write } from 'bun';

async function generateApp() {
    const [_, __, workingDirectory, appName] = argv;
    console.log(`Creating an app ${appName}`);
    const path = `${workingDirectory}/scripts/generators/files`;
    const process = spawnSync({
        cmd: [`ls`, path],
    });
    const files = process.stdout
        .toString('utf-8')
        .split('\n')
        .filter((v) => !!v);
    const outputDirPath = `${workingDirectory}/packages/${appName}`;
    spawnSync({
        cmd: [`mkdir`, `${outputDirPath}`],
    });

    for (let i = 0; i < files.length; i++) {
        const fileName = files[i];

        const filePath = `${path}/${fileName}`;
        console.log(filePath);
        const fileContents = (await file(filePath).text()).replaceAll('[APP_NAME]', appName);
        const outputFilePath = `${outputDirPath}/${fileName}`;
        await write(outputFilePath, fileContents);
    }

    console.log(`Do not forget to add your application in 
"workspaces" : [
   "packages/${appName}"
]`);
}

generateApp().then(console.log).catch(console.error);
