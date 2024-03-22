function convertDataToFormData(
 data,
 formData = new FormData(),
 parentKey = ""
) {
 for (let key in data) {
  if (data.hasOwnProperty(key)) {
   const value = data[key];
   const newKey = parentKey ? `${parentKey}[${key}]` : key;

   if (Array.isArray(value)) {
    value.forEach((item, index) => {
     if (typeof item === "object" && item !== null) {
      convertDataToFormData(item, formData, `${newKey}[${index}]`);
     } else {
      formData.append(`${newKey}[${index}]`, item);
     }
    });
   } else if (typeof value === "object" && value !== null) {
    convertDataToFormData(value, formData, newKey);
   } else {
    formData.append(newKey, value);
   }
  }
 }
 return formData;
}
