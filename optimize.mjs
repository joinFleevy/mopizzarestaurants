import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directoryPath = 'd:/Jondi/Biz/Webos Mebos/Projects/Morad Oudia le3ziz/website/public/images';

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  
  files.forEach((file) => {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      const inputPath = path.join(directoryPath, file);
      const parsedPath = path.parse(file);
      const outputPath = path.join(directoryPath, parsedPath.name + '.webp');
      
      console.log(`Optimizing ${file}...`);
      
      // Resize to max 1200px width/height and convert to webp
      sharp(inputPath)
        .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath)
        .then(() => {
          console.log(`Successfully converted ${file} to ${parsedPath.name}.webp`);
          // optionally delete original
          fs.unlinkSync(inputPath);
        })
        .catch(err => {
          console.error(`Error processing ${file}:`, err);
        });
    }
  });
});
