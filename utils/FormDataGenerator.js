function convertDataToFormData(
 data,
 formData = new FormData(),
 parentKey = ""
) {
 if (parentKey === "") console.log("Data: ", data);
 for (let key in data) {
  if (key === "logo")
   console.log(
    "key : ",
    parentKey,
    key,
    "Value: ",
    typeof data[key],
    data[key]
   );
  if (data.hasOwnProperty(key)) {
   const value = data[key];
   const newKey = parentKey ? `${parentKey}[${key}]` : key;

   if (value instanceof FileList) {
    for (let i = 0; i < value.length; i++) {
     console.log("file: ", value[i]);
     formData.append(`${newKey}[]`, value[i]);
    }
   } else if (Array.isArray(value)) {
    console.log("Array: ", value);

    value.forEach((item, index) => {
     if (typeof item === "object" && item !== null) {
      convertDataToFormData(item, formData, `${newKey}[${index}]`);
     } else {
      formData.append(`${newKey}[]`, item);
     }
    });
   } else if (value instanceof File) {
    formData.append(`${newKey}[]`, value);
   } else if (value instanceof Date) {
    formData.append(newKey, value.toISOString()); // Convert Date to ISO string before appending
   } else if (
    typeof value === "object" &&
    value !== null &&
    !(value instanceof FileList)
   ) {
    convertDataToFormData(value, formData, newKey);
   } else if (value instanceof FileList) {
    console.log("fileList: ", value);
    for (let i = 0; i < value.length; i++) {
     console.log("file: ", value[i]);
     formData.append(`${newKey}[]`, value[i]);
    }
   } else {
    formData.append(newKey, value);
   }
  }
 }
 return formData;
}
