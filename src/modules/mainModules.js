export async function fetchApi(endpoint, config, cb) {
    try {
        const responseApi = await fetch(endpoint, config)
        const jsonResponse = await responseApi.json()
        if (jsonResponse.info.status == 200) {
            return cb(jsonResponse, null)
        } else {
            return cb(null, jsonResponse)
        }
    } catch (err) {
        return cb(null, { status: 400, msg: err.message })
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
export function objToArray(obj) {
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
export function filterArrayFunction(arrToFilter, arrFilter, cb) {
    console.log(arrFilter)
    const productsSelected = []
    const finalBrandFilter = []
    arrFilter.forEach(condition => {
        const valuesInProducts = []
        arrToFilter.forEach(products => {
            condition === cb(products) ? valuesInProducts.push(products) : null
        })
        productsSelected.push(valuesInProducts)
    })
    productsSelected.forEach(arr => { arr.forEach(pro => { finalBrandFilter.push(pro) }) })
    return finalBrandFilter
}
export function filterFromFunction(arrToFilter, arrFilter, cb) {
    const productsSelected = []
    arrToFilter.forEach(products => {
        arrFilter <= cb(products) ? productsSelected.push(products) : null
    })
    return productsSelected
}
export function filterToFunction(arrToFilter, arrFilter, cb) {
    const productsSelected = []
    arrToFilter.forEach(products => {
        arrFilter >= cb(products) ? productsSelected.push(products) : null
    })
    return productsSelected
}
export function findCommonProducts(obj) {
    const keys = Object.keys(obj);
    let commonProducts = obj[keys[0]];
    for (let i = 1; i < keys.length; i++) {
        const key = keys[i];
        const currentProducts = obj[key];
        commonProducts = commonProducts.filter((product) => {
            return currentProducts.some((currentProduct) => currentProduct.id === product.id);
        });
    }
    return commonProducts;
}  
export const removeImage = (index, event, removeImages, setRemoveImages, oldImages , setOldImages) => {
    event.preventDefault();
    const updatedImages = [...oldImages];
    const removedImage = updatedImages.splice(index, 1)[0];
    const updatedRenovedImages = [...removeImages, removedImage]
    setOldImages(updatedImages);
    setRemoveImages(updatedRenovedImages)
};
export const removeNewImage = (index, event, newImages, setNewImages) => {
    event.preventDefault()
    const updatedImages = [...newImages];
    updatedImages.splice(index, 1);
    setNewImages(updatedImages);
};