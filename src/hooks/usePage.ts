import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { deepClone } from "@/utils/common";
import { Modal, message } from "ant-design-vue";
import { showTime } from '@/utils/function'

interface UsePageOption<T, K> {
	searchInitData?: any,
	deleteRequest?: (params: T) => Promise<T>,
	transformSearch?: (params: any) => any
	sendRequest: (params: T) => Promise<ResponseData<GetListResponse<K>>>
}

export const usePage = <T, K>(opts: UsePageOption<T, K>) => {
	const { searchInitData, sendRequest, deleteRequest, transformSearch } = opts;
	const router = useRouter();
	const searchData = ref<any>(deepClone(searchInitData) || {})
	const loading = ref<boolean>(true)
	const dataSource = ref<Array<K>>([])
	const pagination = ref<Pagination>({
		total: 0,
		current: 1,
		pageSize: 10
	})

	onMounted(() => {
		query();
	});

	/**
	 *查询
	 *
	 */
	const query = () => {
		const { current, pageSize } = pagination.value
		loading.value = true
		const paramsData: T = Object.assign({ pageNo: current, pageSize }, transformSearch && typeof transformSearch === 'function' ? { ...transformSearch(searchData.value) } : { ...searchData.value });
		sendRequest(paramsData).then((res) => {
			const { code, data: { total, list }} = res;
			if (code === 200 || code === 0) {
				dataSource.value = list && list.map((item: any, key: number) => {
					item.tableIndex = (current - 1) * pageSize + key + 1
					return {
						...item,
						...formatTime(item),
					}

				});
				pagination.value = {
					total: total || 0,
					current,
					pageSize,
				};
			}
			loading.value = false;
		}).catch((e: any) => {
			loading.value = false;
		});
	};

	/**
	 * 格式化时间
	 * @param item 数据
	 */
	const formatTime = (item: any) => {
		const { createTime, updateTime,approveTime } = item;
		if (createTime) {
			// 创建时间
			item.createTime = showTime(createTime);
		}
		if (updateTime) {
			// 更新时间
			item.updateTime = showTime(updateTime);
		}

		if (approveTime) {
			// 更新时间
			item.approveTime = showTime(approveTime);
		}
		return item;
	}

	/**
	 *初始化分页组件
	 *
	 */
	const initPagination = () => {
		pagination.value.current = 1;
	};

	/**
	 *搜索
	 *
	 */
	const handleSearch = () => {
		initPagination();
		query();
	};

	/**
	 *分页
	 *
	 * @param {*} pagination 分页组件
	 */
	const paginationChange = (paginationData: Pagination) => {
		pagination.value = paginationData
		query();
	};

	/**
	 *刷新
	 *
	 */
	const handleFresh = () => {
		handleSearch();
	};

	/**
	   * 点击重置按钮触发
	   * @param { Object } record
	   * @return
	   */
	const handleReset = () => {
		searchData.value = deepClone(searchInitData) || {}
	}

	/**
	 *添加
	 *
	 */
	const handleAdd = (name: string, params?: any) => {
		if (name) {
			router.push({ name, params });
		}

	};

	/**
	 *详情
	 *
	 */
	const handleEdit = (name: string, query: any, params?: any) => {
		if (name && query) {
			router.push({ name, query, params });
		}

	};

	/**
	 *跳转
	 *
	 */
	const handleJump = (path: string, query?: any) => {
		router.push({ path, query })
	}

	/**
	 *删除
	 *
	 * @param {*} item
	 */
	const handleDel = (item: any, msg = "确认要删除该条数据？") => {
		Modal.confirm({
			title: "提示",
			content: msg,
			centered: true,
			onOk() {
				return new Promise((resolve, reject) => {
					const paramsData:any = {
						id: item.id
					}
					deleteRequest&&deleteRequest(paramsData).then((res: any) => {
						resolve(true);
						message.success("删除成功");
						query()
					}).catch(() => {
						reject();
					});
				})
			},
		});
	};

	return {
		loading,
		dataSource,
		searchData,
		pagination,
		query,
		handleSearch,
		handleAdd,
		handleEdit,
		handleJump,
		paginationChange,
		handleFresh,
		handleReset,
		handleDel,
	};
};
