

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/es/message/style/css'
import 'ant-design-vue/es/tabs/style/css'
import 'ant-design-vue/es/progress/style/css'

// 导入语言包
import i18n from '@/languages/i18n'
import FcIcon from "@/components/icon";
import FcForm from "@/components/form";
import FcTable from "@/components/table/table.vue";
import FcCard from "@/components/fc-card/fc-card.vue";
import FcTab from "@/components/fc-tabs/fc-tabs.vue";
import FcModelCol from "@/components/fc-model/fc-model-col.vue";
import FcModel from "@/components/fc-model/fc-model.vue";
import FcSteps from "@/components/fc-steps/fc-steps.vue";
import FcGroup from "@/components/fc-group/fc-group.vue";
import FcChangeTag from "@/components/fc-changeTag/index.vue";

const app = createApp(App)

app.component("fc-icon", FcIcon);
app.component("fc-table", FcTable);
app.component("fc-form", FcForm);
app.component("fc-card", FcCard);
app.component("fc-tab", FcTab);
app.component("fc-model-col", FcModelCol)
app.component("fc-model", FcModel)
app.component("fc-steps", FcSteps)
app.component("fc-group", FcGroup)
app.component("fc-change-tag", FcChangeTag)


app.use(createPinia())
app.use(router)
// 配置语言包
app.use(i18n);

app.mount('#app')
