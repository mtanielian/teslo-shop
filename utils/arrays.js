export const serializeResponse = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}