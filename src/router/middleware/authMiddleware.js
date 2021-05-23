export default function isAuth ({ next, store }){
    console.log('sadasd', store.state.auth.username)
    if(!store.state.auth.username){
        return next({
            path: '/'
        })
    }

    return next()
}