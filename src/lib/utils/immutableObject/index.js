export const updatePropertyInObject = (object, propertyName, propertyValue) => {
  return { ...object, [propertyName]: propertyValue }
}

export const deletePropertyFromObject = (object, propertyName) => {
  const { [propertyName]: propertyValue, ...rest } = object

  return rest
}
