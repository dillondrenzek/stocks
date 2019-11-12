import { readPdf } from './read-pdf';

if (!process.argv[2]) {
  throw new Error('No argv 2');
}

const filename = process.argv[2];
readPdf(filename).then((data) => {
  console.log(data);
});