import { Funclib } from './src/app/funclib';
import * as Progress from 'progress';

const fn = new Funclib(this);


console.log(fn.timeStamp(new Date()));
console.log(fn.fmtedDate('yy-MM-dd hh:mm', new Date()));

