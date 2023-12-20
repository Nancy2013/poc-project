/**
 * 定义接口类型
 */

export interface ModelType {
  /**
   * 类型
   */
  type: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 提示
   */
  tip?: string;
  /**
   * 描述
   */
  desc?: string;
  /**
   * 输入框文本
   */
  placeholder?: string;
  /**
   * 自定义值
   */
  value?: boolean | string | number | Date;
  /**
   * 标签
   */
  tags?: {
    name: string;
    color: string;
  };
  /**
   * 统计
   */
  statistic?: {
    name: string;
    current: number;
    total: number;
  };
  /**
   * 单选框
   */
  radios?: {
    selected: boolean;
    options: Array<{ name: string; value: boolean }>;
  };
  /**
   * 树形节点
   */
  treeNodes?: {
    id: number;
    paramKey: string;
    paramName: string;
    paramDesc: string;
    placeholder?: string;
    value?: boolean | string | number | Date;
  };
}

export interface ModelItem {
  /**
     * 绑定key
     */
  key: string;
  /**
   * 绑定名称
   */
  name: string;
  /**
   * 绑定的数据列表项
   */
  arr: Array<ModelType>;
}

export interface BtnConfigType {
  type: string;
  name: string;
  color: string;
  event?: Function;
}

export interface RenderGroup {
  /**
   * 模型配置数据
   */
  tabsList: Array<ModelItem>;

  /**
   * 事件配置数据
   */
  configEventList: Array<BtnConfigType>;
}
