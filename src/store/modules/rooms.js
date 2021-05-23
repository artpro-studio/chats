const axios = require('axios').default;

export default {
    state: {
        roomsState:[],
    },
    mutations: {
        setRooms(state, rooms){
            state.roomsState = rooms
        },
        setCounter(state, index){
            state.roomsState[index].newCount = state.roomsState[index].newCount + 1;
        },
        setRestCount(state, index){
            state.roomsState[index].newCount = 0;
        }
    },
    actions: {
        async Rooms({commit, state}){
            let request = await axios.get(`${process.env.VUE_APP_BASE_URL}/rooms`)
            let rooms = []

            //Обновляем данные если комнаты уже получены
            if(state.roomsState.length > 0){
                request.data.result.forEach(item => {
                    let itemRoom = state.roomsState.find(el => el.name == item.name)

                    if(itemRoom){
                        itemRoom.last_message = item.last_message
                        rooms.push(itemRoom)
                        return;
                    }

                    itemRoom.newCount = 0;
                    rooms.push(itemRoom)
                })

                commit('setRooms', rooms)
                return ;
            }

            rooms = request.data.result.map(item => {
                item.newCount = 0
                return item
            })

            commit('setRooms', rooms)
        },
        createRoom({rootState}, form){
            rootState.auth.connectionSocket.send(JSON.stringify(form));
        },
        roomMessags({rootState, state, commit}, message){
          if(message.room == rootState.chat.room){
              return;
          }

          let roomIndex = state.roomsState.findIndex(item => item.name == message.room);

            console.log('roomIndex', roomIndex, message.room, state.roomsState )
            commit('setCounter', roomIndex)
        },
        resetCount({commit, state}, roomName){
            //Обнуление сообщениу
            let roomIndex = state.roomsState.findIndex(item => item.name == roomName);
            commit('setRestCount', roomIndex)
        }
    },
    getters:{

    },
}