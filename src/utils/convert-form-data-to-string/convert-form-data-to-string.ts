export const convertFormDataToString = (item: FormDataEntryValue | null) => {
  if (typeof item === 'string') {
    return item
  }

  return ''
}
