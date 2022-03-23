export const darkMode = {
    namespaced: true,
    state : {
        darkmode: true,
    },
    mutations : {
        setDarkMode(state){
            state.darkmode = !state.darkmode
        }
    },
    actions : {
        setDarkMode(ctx){
            ctx.commit('setDarkMode')
        }
    },

    getters: {
        getDarkMode(state){
            return state.darkmode
        }
    }
}