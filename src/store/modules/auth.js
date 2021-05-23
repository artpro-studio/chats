export default {
    state: {
        username: null,
        connectionSocket: null,
    },
    mutations: {
        setUser(state, username){
            state.username = username
        },
        cleaUser(state){
            state.username = ''
        }
    },
    actions: {
        async addUser({commit, state, dispatch}, username){
            try {
                commit('setUser', username)

                state.connectionSocket = await new WebSocket(`${process.env.VUE_APP_SOCKET_URL}?username=${username}`)

                state.connectionSocket.onmessage = (event) => {
                    let message = JSON.parse(event.data)
                    console.log(message);
                    dispatch('NewMessages', message);
                    dispatch('roomMessags', message)
                }

                state.connectionSocket.onopen = (event) =>{
                    console.log(event)
                }
            } catch (e) {
                console.log(e)
            }

        },
        clearUser({commit}){
            commit('cleaUser')
        }
    },
    getters:{
        isAuth(state){
            return state.username
        }
    },
}