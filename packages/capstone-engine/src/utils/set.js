export const insert = (set) => (value) => {
    if (set.has(value)) return false;
    set.add(value);
    return true;
};
