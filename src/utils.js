import path from "path";

import { fileURLToPath } from "url";

// Debemos crear nuestra propia variable __dirname a través de este método si usamos ESM

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default __dirname;

export const hasNextAndPrevPage = (el) => {
  if (el.hasPrevPage === true) {
    el.prevLink = `http://localhost:8080/api/products?page=${el.prevPage}`;
  } else {
    el.prevLink = null;
  }

  if (el.hasNextPage === true) {
    el.nextLink = `http://localhost:8080/api/products?page=${el.nextPage}`;
  } else {
    el.nextLink = null;
  }
};
