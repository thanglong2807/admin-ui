const initState = {
    checkLogin: {
        loggedIn: false
    }
}
const rootReducer = (state = initState, action:any) => {
    switch (action.type) {
        case 'admin/checkLogin':
            const login = action.data;

            return {
                checkLogin: { loggedIn: login }
            }
        default:
            return state;
    }
};
export default rootReducer