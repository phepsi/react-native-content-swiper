
export const limit = (value, min, max) => {
  return Math.min(Math.max(min, value), max);
}

export const limitIndex = (value, min, count) => {
  return limit(value, min, count - 1);
}

export const range = (count) => {
  return Array.from(_range(count));
}

function* _range(count) {
  for (let i = 0; i < count; i++) {
    yield i;
  }
}
