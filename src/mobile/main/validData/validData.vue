<template>
    <FcPage title="数据核验">
        <div>
            <div class="validData-success" v-if="flag && !loading">
                <div class="validData-success-title">
                    <div>
                        <p>核验成功</p>
                        <span>国家基础设施 可信存证</span>
                    </div>
                </div>
                <div class="validData-success-list">
                    <div class="validData-success-item">
                        <div class="validData-success-item-title">区块详情</div>
                        <div class="validData-success-item-card">
                            <p>区块基本信息</p>
                            <FcCell label="区块高度" :content="blockInfo.blockHeight"></FcCell>
                            <FcCell label="区块时间" :content="showTime(blockInfo.blockTime)"></FcCell>
                            <FcCell label="区块大小(bytes)" :content="blockInfo.size"></FcCell>
                            <FcCell label="存证量" :content="blockInfo.totalTx"></FcCell>
                        </div>
                    </div>

                    <div class="validData-success-item">
                        <div class="validData-success-item-title">存证详情</div>
                        <div class="validData-success-item-card">
                            <p>存证信息</p>
                            <FcCell type="column" label="存证hash" :content="dealInfo.hash"></FcCell>
                            <FcCell type="column" label="存证id" :content="dealInfo.tx_id"></FcCell>
                        </div>

                        <div class="validData-success-item-card">
                            <p>摘要信息</p>
                            <FcCell label="存证数据大小" :content="dealInfo.size"></FcCell>
                            <FcCell label="区块高度" :content="dealInfo.block_height"></FcCell>
                            <FcCell label="存证状态" :content="convertStatus('valid_status', dealInfo['valid_status'])" :status="convertStatus('status', dealInfo['valid_status'])"></FcCell>
                            <FcCell label="存证时间" :content="showTime(dealInfo.tx_time)"></FcCell>
                            <FcCell label="存证类型" :content="convertStatus('tx_type', dealInfo['tx_type'])"></FcCell>
                            <FcCell label="最新修改配置的区块号" :content="dealInfo.config_block_num"></FcCell>
                            <!-- <FcCell label="发起者" :content="creator_msp" linkText="存证详情"></FcCell>
                            <FcCell label="背书者" content="" linkText="存证详情"></FcCell> -->
                        </div>

                        <div class="validData-success-item-card">
                            <p>智能合约</p>
                            <FcCell label="名称" :content="dealInfo['chaincode_id']"></FcCell>
                            <FcCell label="方法名称" :content="dealInfo['function']"></FcCell>
                            <FcCell label="版本" :content="dealInfo['chaincode_version']"></FcCell>
                            <FcCell label="返回参数" :content="dealInfo['proposal_response']"></FcCell>
                            <FcCell type="json" label="参数列表" :jsonData="info"></FcCell>
                        </div>

                        <div class="validData-success-item-card">
                            <p>信息</p>
                            <FcCell type="column" label="发起人" :content="company_name"></FcCell>
                            <FcCell type="column" label="发起人签名" :content="dealInfo['signature']"></FcCell>
                        </div>

                        <div class="validData-success-item-card">
                            <p>策略</p>
                            <FcCell label="策略" :content="dealInfo['msp_id']"></FcCell>
                        </div>
                    </div>
                </div>

                <div class="validData-success-bottom">
                    <p>版权所有 © www.chdpp.com，保留所有权利。</p>
                    <p>打造分布式网络平台，引领金融与监管科技</p>
                </div>
            </div>

            <FcNormal v-if="!flag && !loading" title="核验失败" subtitle="抱歉，似乎出了点问题"></FcNormal>

            <div v-if="loading" class="validData-loading">
                <!-- <div id="validData-loading"></div> -->
                
                <video muted autoplay loop id="validData-video" x5-video-player-type="h5">
                    <source src="https://obs-jsnj.cucloud.cn/saas-test/dpp/loading.mp4" type="video/mp4">
                </video>
            </div>
        </div>
    </FcPage>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import FcCell from "@/mobile/components/cell/cell.vue";
import FcPage from "@/mobile/components/page/page.vue";
import FcNormal from "@/mobile/components/normal/normal.vue";
import { useRoute } from "vue-router";
import request from "@/utils/axios";
import { showTime } from "@/utils/function";
import { message } from 'ant-design-vue'
export default defineComponent({
    components: {
        FcCell,
        FcPage,
        FcNormal,
    },
    setup() {
        const query = useRoute().query;
        let state = reactive({
            flag: false,
            creator_msp: ref<any>(null),
            company_name: ref<any>(null),
            info: ref<any>({}),
            blockInfo: ref<any>({}),
            dealInfo: ref<any>({}),
            loading: true,
        });

        

        onMounted(() => {
            // lottie.loadAnimation({
            //     container: document.getElementById(
            //         `validData-loading`
            //     ) as HTMLElement,
            //     renderer: "svg",
            //     loop: true,
            //     autoplay: true,
            //     path: `/animation/validData-loading.json`,
            // });

            const timer = () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 4000);
                });
            };
            Promise.all([interfaceList(), timer()])
                .then(() => {
                    state.loading = false;
                })
                .catch(() => {
                    //state.loading = false;
                });
        });

        /**
         * 获取数据接口
         */
        const interfaceList = () => {
            return new Promise((resolve, reject) => {
                request({
                    url: `${
                        import.meta.env.VITE_BASE_URL
                    }/dpp-platform/master-data/h5/validation`,
                    type: "json",
                    method: "post",
                    data: {
                        serialNo: query.idisCode,
                    },
                })
                    .then((res: any) => {
                        if (res.code == 0) {
                            let {
                                data: { detail },
                            } = res;
                            state.flag = res.data.flag;
                            state.creator_msp = detail.creator_msp;
                            state.blockInfo = detail.block;
                            state.dealInfo = detail.tx;
                            state.company_name = detail.company_name;
                            state.info = JSON.parse(
                                JSON.parse(detail.tx.args)[0]
                            );
                            resolve(true);
                        } else {
                            reject(false);
                        }
                    })
                    .catch(() => {
                        reject(false);
                    });
            });
        };

        const handleError = (event: any)=> {
            alert(JSON.stringify(event))
        }

        const handlePlay = (event: any)=> {
            alert(JSON.stringify(event))
        }

        /**
         * 状态值切换字段
         */
        const convertStatus = (type: string, value: any) => {
            let name: any = "";
            switch (type) {
                case "valid_status":
                    name = value ? "成功" : "失败";
                    break;
                case "status":
                    name = value ? "success" : "danger";
                    break;
                case "tx_type":
                    name = value == 3 ? "普通存证" : "配置存证";
                    break;
            }
            return name;
        };

        return {
            ...toRefs(state),
            showTime,
            handleError,
            handlePlay,
            convertStatus,
        };
    },
});
</script>

<style lang="less" scoped>
.validData-success {
    padding-top: 0.6rem;

    &-title {
        height: 2.92rem;
        padding: 0 .32rem 0.52rem 0.32rem;
        div {
            padding-top: .28rem;
            padding-left: .48rem;
            height: 100%;
            background: url(@/assets/mobileImages/main/validData/validData-success-title.png)
                no-repeat;
            background-size: 100% 100%;
        }

        p {
            font-size: 0.44rem;
            line-height: 1.04rem;
            color: #fff;
        }

        span {
            display: block;
            max-width: 3.8rem;
            margin-top: -0.14rem;
            font-size: 0.28rem;
            line-height: 0.4rem;
            color: #fff;
        }
    }

    &-list {
        padding: 0.5rem 0.32rem 0.7rem;
        background: url(@/assets/mobileImages/main/validData/validData-success-list-bg.png)
            no-repeat;
        background-position: 0% 100%;
        background-size: 100% 5.46rem;
    }

    &-item {
        margin-bottom: 0.88rem;

        &-title {
            font-size: 0.36rem;
            text-align: center;
            line-height: 0.46rem;
            color: #000000;
        }

        &-card {
            margin-top: 0.4rem;
            padding: 0.1rem 0.3rem 0.4rem;
            border-radius: 0.24rem;
            border: 1px solid #efefef;
            background-color: #fff;
            box-shadow: 1px 0.4rem 0.4rem 0px #f2f2f2;

            p {
                margin-bottom: 0.1rem;
                font-size: 0.32rem;
                line-height: 0.88rem;
                font-weight: bold;
                color: #000;
            }
        }
    }

    &-item:last-child {
        margin-bottom: 0;
    }

    &-bottom {
        height: 1.16rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #292930;

        p {
            font-size: 0.24rem;
            line-height: 0.34rem;
            color: #fff;
        }
    }
}

.validData-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    bottom: 0;
    overflow: hidden;
    z-index: 9;
    //background-color: bisque;
    video {
        width: 100%;
        height: calc(100% + 4px);
        object-fit:fill;
        //background-color: aqua;
    }
}
</style>