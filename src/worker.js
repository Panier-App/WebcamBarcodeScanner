import * as Comlink from 'comlink';
import { prepareZXingModule, readBarcodes } from "zxing-wasm/reader";


/* Initialize the ZXing module */

async function initialize(options) {
    prepareZXingModule({
        locateFile: (path, prefix) => {
            if (path.endsWith(".wasm")) {
                return options.binaryPath;
            }

            return prefix + path;
        }
    });
}


/* Function to decode barcode */

async function decodeBarcode(imageData, options) {
    try {
        return await readBarcodes(imageData, options);
    }
    catch(err) {
        return null;
    }
}


/* Expose the functions to the main thread */

Comlink.expose({
    initialize,
    decodeBarcode
});
