const BASE_URL = `https://upskilling-egypt.com:3006/api/v1`;
export const BASEIMG_URL = `https://upskilling-egypt.com:3006`



export const BASE_USERS = `${BASE_URL}/Users`;
export const USERS_URLs = {
    login: `${BASE_USERS}/Login`,
    register: `${BASE_USERS}/Register`,
    delete: (id) => `${BASE_USERS}/${id}`,
    resetRequest: `${BASE_USERS}/Reset/Request`,
    reset: `${BASE_USERS}/Reset`,
    verifyAcount: `${BASE_USERS}/verify`,
    changePassword: `${BASE_USERS}/ChangePassword`

}


// CATEGORIES URLS
const BASE_CATEGORY = `${BASE_URL}/Category`;
export const CATEGORIES_URLS = {
    getCategories: `${BASE_CATEGORY}`,
    addNewCategory: `${BASE_CATEGORY}`,
    delete: (id) => `${BASE_CATEGORY}/${id}`,
    updateCategory: (id) => `${BASE_CATEGORY}/${id}`,


}

// RECIPES URLS
const BASE_RECIPES = `${BASE_URL}/Recipe`;
export const RECIPES_URLS = {
    getRecipes: `${BASE_RECIPES}`,
    addNewRecipe: `${BASE_RECIPES}`,
    delete: (id) => `${BASE_RECIPES}/${id}`,
    updateRecipe: (id) => `${BASE_RECIPES}/${id}`


}
// RECIPES URLS
const BASE_FAVORITES = `${BASE_URL}/userRecipe`;
export const FAVORITES_URLS = {
    getFavorites: `${BASE_FAVORITES}`,
    addToFavorites: `${BASE_FAVORITES}`,
    deleteFavorites: (id) => `${BASE_FAVORITES}/${id}`,


}



// TAG URLS
const BASE_TAGS = `${BASE_URL}/tag`;
export const TAGS_URLS = {
    getTags: `${BASE_TAGS}`,


}




