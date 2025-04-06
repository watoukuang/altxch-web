import {createApp} from 'vue';
import App from './App.vue';
import ViewUIPlus from 'view-ui-plus'
import router from './router';
import {createPinia} from 'pinia';
import 'view-ui-plus/dist/styles/viewuiplus.css'
import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css'; // 引入 Ant Design Vue 样式

const app = createApp(App);


// 工具函数：取整
const toFloor = (number, scale = 8) => {
    if (number === 0) return 0;

    const strNumber = number.toString();

    if (strNumber.includes('e') || strNumber.includes('E')) {
        const num = Number(number).toFixed(scale + 1);
        return num.slice(0, -1); // 去掉最后一位
    }

    if (strNumber.includes(".")) {
        return scale === 0 ? strNumber.split('.')[0] : strNumber.substring(0, strNumber.indexOf(".") + scale + 1);
    }

    return strNumber; // 如果没有小数点，直接返回
};

// 将工具函数挂载到全局属性
app.config.globalProperties.$toFloor = toFloor;

// 使用路由和 Pinia
app.use(router);
app.use(ViewUIPlus);
app.use(Antd);
app.use(createPinia());

app.mount('#app');