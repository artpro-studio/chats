export default function isAuth ({ next, store }){
    console.log('sadasd', store.state.username)
    if(!store.state.username){
        return next({
            path: '/'
        })
    }

    return next()
}