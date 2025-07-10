export const ROUTES = {
    MAIN: "/main",
    MAIN_DETAIL: `/main/:id`,
    SETTINGS: "/settings",
    SETTINGS_DETAIL: "/settings/:id"
}


export const routesBuilder = {
    homeDetail: (id: string | number) => `${ROUTES.MAIN}/${id}`,
    settingsDetail: (id: string | number) => `${ROUTES.SETTINGS}/${id}`
}