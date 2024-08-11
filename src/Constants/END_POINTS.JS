const BASE_URL = `https://upskilling-egypt.com:3006/api/v1`;
export const BASEIMG_URL = `https://upskilling-egypt.com:3006`



export const BASE_USERS = `${BASE_URL}/Users`;
export const USERS_URLs = {
    login: `${BASE_USERS}/Login`,
    register: `${BASE_USERS}/Register`,
    delete: (id) => `${BASE_USERS}/${id}`,
    resetRequest: `${BASE_USERS}/Reset/Request`,
    reset: `${BASE_USERS}/Reset`,

}


// CATEGORIES URLS
const BASE_CATEGORY = `${BASE_URL}/Category`;
export const CATEGORIES_URLS = {
    getCategories: `${BASE_CATEGORY}`,
    delete: (id) => `${BASE_CATEGORY}/${id}`,


}

// RECIPES URLS
const BASE_RECIPES = `${BASE_URL}/Recipe`;
export const RECIPES_URLS = {
    getRecipes: `${BASE_RECIPES}`,
    delete: (id) => `${BASE_RECIPES}/${id}`,


}




