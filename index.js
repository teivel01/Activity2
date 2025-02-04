import inquirer from 'inquirer';
import sillyname from 'sillyname';
import { randomSuperhero } from 'superheroes'; 
import qr from 'qr-image';
import fs from 'fs';

inquirer.prompt([
    {
        type: 'input',
        name: 'DESTER',
        message: 'What is your name?'
    }
]).then((answers) => {
    const DESTER = answers.DESTER;  
    const Sin = sillyname();  

    // Use randomSuperhero to get a random superhero name
    const HER = randomSuperhero();

    console.log(`Hello ${DESTER}`);
    console.log(`Your villain name will be ${Sin}`);
    console.log(`and your superhero name will be ${HER}`);
    console.log("QR codes are generated");
    console.log("Text file updated");

    // Generate QR codes
    generateQRCode(DESTER, 'dester.png');
    generateQRCode(Sin, 'Sin.png');
    generateQRCode(HER, 'HER.png');

    // Save names to a text file
    const textContent = `Name: ${DESTER}\nVillain Name: ${Sin}\nSuperhero Name: ${HER}\n`;
    fs.writeFile('myhero.txt', textContent, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Names saved to myhero.txt ');
        }
    });
}).catch((error) => {
    if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment.");
    } else {
        console.error("Something went wrong:", error);
    }
});

// Function to generate QR code
function generateQRCode(text, filename) {
    const qr_svg = qr.image(text, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream(filename));
}
