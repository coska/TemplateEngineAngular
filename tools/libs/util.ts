import {
  readFileSync,
  mkdirSync,
  existsSync,
  unlinkSync,
  link,
  writeFile,
  readdirSync,
  statSync
} from 'fs';
import { dirname, basename } from 'path';
import * as sharp from 'sharp';
import * as readline from 'readline';


export class Util {
  getAppRoot() {
    return basename(`${__dirname}/../../`);
  }

  cwd() {
    return basename(process.cwd());
  }

  isdir(path) {
    try {
      return statSync(path).isDirectory();
    } catch (e) {
      return false;
    }
  }

  mkdir(path, recursive = false, mode = 0o777) {
    try {
      return mkdirSync(path, mode);
    } catch (e) { }
    if (!recursive) return false;

    if (!this.isdir(path)) {
      this.mkdir(dirname(path), recursive);
      return this.mkdir(path);
    }
    return false;
  }

  link(src, target) {
    return new Promise((resolve, reject) => {
      if (existsSync(target)) {
        unlinkSync(target);
      }
      link(src, target, err => {
        if (err) return reject(err);
        return resolve(target);
      });
    });
  }

  /**
   * Parse input path into name and ext
   * @param path
   * @param includeDot
   *
   * @return { name, ext }
   * e.g)  path = foo.bar
   *
   * { name: 'foo', ext: '.bar' }   // includeDot true
   * { name: 'foo', ext: 'bar' }    // includeDot false
   */
  parseFileName(path, includeDot = false) {
    const pattern = includeDot ? /(.*)(\.[^\.]+$)/ : /(.*)\.([^\.]+$)/;
    const [, name, ext] = path.match(pattern);
    return { name, ext };
  }

  /**
   * If the path is already exists, find another path until it is available.
   * @param path
   */
  findAvailablePath(path) {
    if (existsSync(path)) {
      const { name, ext } = this.parseFileName(path, true);
      if (isNaN(name.substr(-1))) {
        return this.findAvailablePath(`${name}.1${ext}`);
      }
      // plus 1
      const surfix: Number = Number(name.substr(-1)) + 1;
      return this.findAvailablePath(`${name.substr(0, name.length - 1)}${surfix}${ext}`);
    }
    return path;
  }

  writeFile(path, body, options: any = {}) {
    const { overwrite } = options;
    if (!overwrite) {
      path = this.findAvailablePath(path);
    }
    // console.log(`write to ${path}`);
    return new Promise((resolve, reject) => {
      writeFile(path, body, err => {
        if (err) return reject(err);
        return resolve(path);
      });
    });
  }

  loadJSON(path: string) {
    if (!existsSync(path)) {
      return {};
    }
    const raw = readFileSync(path);
    return JSON.parse(raw.toString());
  }



  saveJSON(output: string, data: any = {}, options: any = {}) {
    const json = JSON.stringify(data);
    this.writeFile(output, json, options).catch(err => console.error(err));
  }

  // convert process.argv to a key:value pairs.
  getOptions() {
    const [, , ...remains] = process.argv;
    const options = {};
    for (let i = 0; i < remains.length; i += 2) {
      const [key, value] = remains.slice(i, i + 2);
      options[key] = value;
    }
    return options;
  }

  // resize(input: string, width: number, height: number, output: string) {
  //   // console.log({ input, output, width, height });return;
  //   return new Promise((resolve, reject) => {
  //     const convert = sharp(input);
  //     if (height > 0) {
  //       convert.resize(width, height);
  //     } else {
  //       convert.resize(width);
  //     }
  //     convert.toFile(output, (err, info) => {
  //       // console.log({ err, info });
  //       if (err) return reject(err);
  //       return resolve(info);
  //     });
  //   });
  // }

  // thumbs(path: string, width: number, height: number, retry: number = 3) {
  //   const resizes = [];
  //   const loadings = ['-', '\\', '|', '/'];

  //   if (retry === 0) {
  //     console.error('no more try');
  //     return false;
  //   }

  //   const items = readdirSync(path);

  //   items
  //     .filter(item => {
  //       // check path is directory or file
  //       if (this.isdir(`${path}/${item}`)) {
  //         this.thumbs(`${path}/${item}`, width, height);
  //         return false;
  //       }
  //       return item.match(/\.(jpeg|png|gif|jpg)$/i);
  //     })
  //     // filter origin files
  //     .filter(item => !item.match(`_${width}x`))
  //     .map((item, i, _items) => {
  //       const { name, ext } = this.parseFileName(item, false);
  //       const img = `${name}_${width}x${height}.${ext}`; // xxxx_300x0.jpeg

  //       const src = `${path}/${item}`;
  //       const output = `${path}/${img}`;

  //       this.resize(src, width, height, output)
  //         .then(() => {
  //           readline.cursorTo(process.stdout, 0);
  //           readline.clearLine(process.stdout, 1);
  //           process.stdout.write(`${loadings[i % 4]} ${output}${String.fromCharCode(13)}`);
  //           // process.stdout.write(`${loadings[i % 4]}${String.fromCharCode(13)}`);
  //           if (i === _items.length - 1) {
  //             readline.clearLine(process.stdout, 0);
  //             readline.cursorTo(process.stdout, 0);
  //           }
  //         })
  //         .catch(error => {
  //           if (retry > 0) {
  //             console.log('Error Retry: ', retry, ', path:', path);
  //             setTimeout(() => {
  //               this.thumbs(path, width, height, retry - 1);
  //             }, 3000);
  //           }
  //           process.stderr.write(`ResizeError: ${src}${String.fromCharCode(13)}`);
  //           readline.cursorTo(process.stdout, 0);
  //         });
  //     });
  // }
}
