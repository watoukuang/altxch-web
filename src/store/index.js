// src/stores/useStore.js
import {defineStore} from 'pinia';
import {ref, computed} from 'vue';

export const useStore = defineStore('main', () => {
    // State
    const member = ref(null);
    const activeNav = ref('');
    const loginTimes = ref(null);

    // Actions
    const navigate = (nav) => activeNav.value = nav;

    const setMember = (newMember) => {
        if (newMember) {
            // 更新成员信息
            member.value = newMember;

            // 将成员信息保存到 localStorage
            try {
                localStorage.setItem('MEMBER', JSON.stringify(newMember));
            } catch (error) {
                console.error('保存成员信息到 localStorage 失败:', error);
            }
        } else {
            console.warn('新的成员信息无效，无法更新');
        }
    };

    const recoveryMember = () => {
        member.value = JSON.parse(localStorage.getItem('MEMBER'));
    };

    const initLoginTimes = () => {
        if (localStorage.getItem('LOGINTIMES') == null) {
            loginTimes.value = 0;
        } else {
            loginTimes.value = JSON.parse(localStorage.getItem('LOGINTIMES'));
        }
    };

    const setLoginTimes = (times) => {
        loginTimes.value = times;
        localStorage.setItem('LOGINTIMES', JSON.stringify(times));
    };

    // Getters
    const isLogin = computed(() => member.value != null);

    return {
        member,
        activeNav,
        loginTimes,
        navigate,
        setMember,
        recoveryMember,
        initLoginTimes,
        setLoginTimes,
        isLogin,
    };
});