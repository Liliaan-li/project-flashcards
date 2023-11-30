export const convertFormDataToBlob = (formData: FormData, key: string): Blob | null => {
  const file = formData.get(key)

  if (file instanceof Blob) {
    return file
  }

  return null
}
