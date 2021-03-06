const createConstants = (variants) => Object.fromEntries(
    variants.map(([constant_name, _, value]) => ([constant_name, value]))
);

const match = (variants) => ({ type, data }) => (callback) => {
    for (const [_, name, value] of variants) {
        if (type === value) {
            return (callback[name] ?? callback.default)?.(data, type);
        }
    }
    throw new Error("Invalid variant name received while matching");
};

export const create = (variants) => ({
    VARIANTS: createConstants(variants),
    match: match(variants)
});
