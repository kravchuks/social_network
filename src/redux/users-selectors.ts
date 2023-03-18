import {createSelector} from 'reselect'
import { AppStateType } from './redux-store'

const getUsersSelctor=(state: AppStateType)=>{
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelctor, (users) => {
    return users.filter((s)=> true)
})

export const getPageSize=(state: AppStateType)=>{
    return state.usersPage.pageSize
}

export const getTotalUsersCount=(state: AppStateType)=>{
    return state.usersPage.totalUsersCount
}

export const getCurrentPage=(state: AppStateType)=>{
    return state.usersPage.currentPage
}

export const getIsFetching=(state: AppStateType)=>{
    return state.usersPage.isFetching
}

export const getFollowingInProgres=(state: AppStateType)=>{
    return state.usersPage.followingInProgres
}