import axios from "axios";

const url = "http://localhost:8081/api/admin/";

const state = {
    admins: [
        /* {
            id: 1,
            username: "admin1",
            password: "123"
        },
        {
            id: 2,
            username: "admin2",
            password: "456"
        },
        {
            id: 3,
            username: "admin3",
            password: "789"
        } */
    ]
};
const getters = {
    allAdmins: (state) => state.admins,
    getAdminById: (state) => (id) => {
        return state.admins.find((admin) => admin.id == id);
    }
};
const actions = {
    async fetchAdmins({ commit }) {
        const response = await axios.get(url);
        commit("SET_ADMINS", response.data);
    },
    async addAdmin({ commit }, admin) {
        const response = await axios.post(url, admin);
        commit("ADD_ADMIN", response.data);
    },
    async deleteAdmin(context, id) {
        await axios.delete(`${url}${id}`);
        context.commit("DELETE_ADMIN", id);
    },
    async updateAdmin({ commit }, updAdmin) {
        const response = await axios.put(`${url}${updAdmin.id}`, updAdmin);
        commit("UPDATE_ADMIN", response.data);
    }
};

const mutations = {
    SET_ADMINS: (state, admins) => (state.admins = admins),

    ADD_ADMIN: (state, admin) => {
        state.admins.unshift(admin);
    },
    DELETE_ADMIN: (state, id) => {
        const index = state.admins.findIndex((admin) => admin.id == id);
        state.admins.splice(index, 1);
    },
    UPDATE_ADMIN: (state, updAdmin) => {
        const index = state.admins.findIndex(
            (admin) => admin.id === updAdmin.id
        );
        if (index !== -1) {
            state.admins.splice(index, 1, updAdmin);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
