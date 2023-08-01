export async function fetchApi(endpoint, config, cb) {
    try {
        const responseApi = await fetch(endpoint, config)
        const jsonResponse = await responseApi.json()
        if (jsonResponse.info.status == 200) {
            return cb(jsonResponse, null)
        } else {
            console.log(jsonResponse);
            return cb(null, jsonResponse)
        }

    } catch (err) {
        return null
    }
}

export function addValueToArray(array, value) {
    if (!array.includes(value)) {
      array.push(value)
    } else {
      return array
    }
    return array
  }

export function objToArray (obj) {
    const imagesToArray = []
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                imagesToArray.push(obj[key])
            }
    }
    return imagesToArray
}

export function isAgeAllow(dateStr) {
    const currentDate = new Date();
    const minAgeDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    const inputDate = new Date(dateStr);
    return inputDate <= minAgeDate;
}