import { cp, mkdir } from 'shelljs';

// export function copyStaticAssests(src: string, dest: string) {
mkdir('robinhood-pdf/dist/robinhood-pdf/api/views');
cp("-Rf", 'robinhood-pdf/api/views', 'robinhood-pdf/dist/robinhood-pdf/api/views');
// }

// copyStaticAssests();