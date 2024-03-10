const KEY_VALUE_FAVOURITE = "favourite"

export const saveFavourite = (favouritesList = []) => {
    localStorage.setItem(KEY_VALUE_FAVOURITE, JSON.stringify(favouritesList));
}

export const getFavourites = () => {
    return JSON.parse(localStorage.getItem(KEY_VALUE_FAVOURITE)) ? JSON.parse(localStorage.getItem(KEY_VALUE_FAVOURITE)) : []
}
