const axios = require('axios').default;

export default {
    state: {
        room: '',
        messages: [],
    },
    mutations: {
        setRoom(state, roomID){
            state.room = roomID;
        },
        setAllMessages(state, messages){
            state.messages = messages
        },
        clearChats(state){
            state.room = ''
            state.messages = []
        },
        setNewMessages(state, message){
            state.messages.push(message);
        }
    },
    actions: {
        async allMessages({commit}, roomID){
            try {
                const request = await axios.get(`${process.env.VUE_APP_BASE_URL}/rooms/${roomID}/history`);
                if(request.data.result){
                    commit('setAllMessages', request.data.result)
                    commit('setRoom', roomID)
                }
            } catch (e) {
                console.log(e)
            }
        },
        sendMessage({rootState}, form){
            rootState.auth.connectionSocket.send(JSON.stringify(form));
        },
        NewMessages({state, commit}, message){
            console.log('newMessage', message.room, state.room)
            if(message.room == state.room){
                commit('setNewMessages', message)
            }
        },
        exitChat({commit}){
            commit('clearChats')
        },
    }

}