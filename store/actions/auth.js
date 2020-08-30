import { AsyncStorage } from 'react-native'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

let timer;

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({
            type: AUTHENTICATE,
            userId,
            token
        })
    }
}

export const signup = (email, password) => {
    return async dispatch => {

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYIfsxG-cw66vBZ5F_vP6Zi1VhvasQTuA', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Something went wrong!!'
            if (errorId === 'EMAIL_EXISTS') {
                message = 'Email already exists please sign in!'
            }
            throw new Error(message);
        }


        const resData = await response.json();
        console.log(resData)
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)

    }
}

export const login = (email, password) => {
    return async dispatch => {

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYIfsxG-cw66vBZ5F_vP6Zi1VhvasQTuA', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Something went wrong!!'
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found'
            }
            else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password does not exist!'
            }
            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData)
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}
const clearLogouttimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

export const logout = () => {
    clearLogouttimer();
    AsyncStorage.removeItem('userData');
    return {
        type: LOGOUT
    }
}


const setLogoutTimer = (expirationTime) => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, expirationTime)
    }
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        userId,
        expiryDate: expirationDate.toISOString()
    }));
}