export const deepClone = (target: any) => {
  if (typeof target === 'object' && target !== null) {
    const result = Array.isArray(target) ? [] : {};
    Object.keys(target).forEach((key: string) => {
      if (typeof target[key] === 'object') {
        (result as any)[key] = deepClone(target[key]);
      } else {
        (result as any)[key] = target[key];
      }
    });
    return result;
  }
  return target;
};

let id = 0;
export const generateId = (): number => id++;

let pathId = 0;
export const generatePathId = (): number => pathId++;
