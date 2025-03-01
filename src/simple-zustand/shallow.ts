// deepEqual 函数
export function shallow<T>(objA: T, objB: T) {
    // NaN视为相同，+0不等于-0
    if (Object.is(objA, objB)) {
      return true
    }
    if (
      typeof objA !== 'object' ||
      objA === null ||
      typeof objB !== 'object' ||
      objB === null
    ) {
      return false
    }
  
    const keysA = Object.keys(objA)
    const keysB = Object.keys(objB)
  
    if (keysA.length !== keysB.length) {
      return false
    }
  
    for (let i = 0; i < keysA.length; i++) {
      if (
        !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
        !Object.is(objA[keysA[i] as keyof T], objB[keysA[i] as keyof T])
      ) {
        return false
      }
    }
    return true
  }
  