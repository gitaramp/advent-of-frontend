type calculationFunction = (x?: any) => any;


export function memoize(calculation: calculationFunction) {
    if (typeof calculation === 'function') {
        const cache = new Map();
        const cached = function (this: any, val: any) {
            return cache.has(val)
            ? cache.get(val)
            : cache.set(val, calculation.call(this, val)) && cache.get(val);
        };
        cached.cache = cache;
        return cached;
    } else {
        throw 'Function to be memoized must be a function.';
    }
}