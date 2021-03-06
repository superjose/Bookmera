import { BuyLink, Name } from './typings';

/**
 * A file that contains utility functions that are shared across the project.
 * These functions are independent from React or any other library.
 */

/**
 *
 * Gotten from here:
 * https://www.freecodecamp.org/news/https-medium-com-gladchinda-hacks-for-creating-javascript-arrays-a1b80cb372b/
 *
 * It was slightly modified to allow zero indexes.
 *
 * range()
 *
 * Returns an array of numbers between a start number and an end number incremented
 * sequentially by a fixed number(step), beginning with either the start number or
 * the end number depending on which is greater.
 *
 * @param {number} start (Required: The start number.)
 * @param {number} end (Required: The end number. If end is less than start,
 *  then the range begins with end instead of start and decrements instead of increment.)
 * @param {number} step (Optional: The fixed increment or decrement step. Defaults to 1.)
 *
 * @return {array} (An array containing the range numbers.)
 *
 * @throws {TypeError} (If any of start, end and step is not a finite number.)
 * @throws {Error} (If step is not a positive number.)
 */
export function range(start: number, end: number, step = 1) {
  // Test that the first 3 arguments are finite numbers.
  // Using Array.prototype.every() and Number.isFinite().
  const allNumbers = [start, end, step].every(Number.isFinite);

  // Throw an error if any of the first 3 arguments is not a finite number.
  if (!allNumbers) {
    throw new TypeError('range() expects only finite numbers as arguments.');
  }

  // Ensure the step is always zero or a positive number.
  if (step < 0) {
    throw new Error('step must be a number greater than 0.');
  }

  // When the start number is greater than the end number,
  // modify the step for decrementing instead of incrementing.
  if (start > end) {
    step = -step;
  }

  // Determine the length of the array to be returned.
  // The length is incremented by 1 after Math.floor().
  // This ensures that the end number is listed if it falls within the range.
  const length = Math.floor(Math.abs((end - start) / step)) + 1;

  // Fill up a new array with the range numbers
  // using Array.from() with a mapping function.
  // Finally, return the new array.
  return Array.from(Array(length), (x, index) => start + index * step);
}

/**
 * @param {BuyLink[]} buyLinks: The list of store links (Amazon, Barnes and Noble, and Local Store) that is loaded from the server.
 * @param {Name} name: The enum that identifies the buyLinks.
 */
export function findStoreUrl(buyLinks: BuyLink[], name: Name) {
  const length = buyLinks.length;
  for (let i = 0; i < length; i++) {
    if (buyLinks[i].name !== name) continue;

    return buyLinks[i].url;
  }
}
