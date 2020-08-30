/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import { getAllCategories, createCategory, getUserFromID } from '../API';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    user: null,
    categories: [],
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setCategories(state, categories){
      state.categories = categories;
    },
    pushCategory(state, category){
      state.categories.push(category);
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.user ? true : false;
    },
  },
  actions: {
    login({
      commit
    }, token) {
      if (token) {
        commit('setToken', token);
        localStorage.token = token;
        const base64url = token.split('.')[1];
        const base64 = base64url.replace('-', '+').replace('_', '/');
        const user = window.atob(base64);
        commit('setUser', user);
      } else {
        commit('setToken', '');
        commit('setUser', null);
      }
    },
    isAdmin({
      commit,
      state
    }) {
      return state.user.role_id === 1;
    },
    async loadCategories({commit}){
      const categories = await getAllCategories();
      commit('setCategories', categories);
    },
    async addCategory({ commit }, newCategory){
      const category = await createCategory(newCategory);
      console.log(category);
      commit('pushCategory', category);
    }
  },
  modules: {},
});
