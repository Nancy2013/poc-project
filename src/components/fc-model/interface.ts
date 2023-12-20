/**
 * 定义接口类型
 */

interface RadioType {
  selected: boolean;
  options: Array<{ name: string; value: boolean }>;
}

interface TagType {
  name: string;
  color: string;
}

interface StatisticType {
  name: string;
  current: number;
  total: number;
}

interface TreeNodeType {
  id: number;
  paramKey: string;
  paramName: string;
  paramDesc: string;
  placeholder?: string;
  value?: boolean | string | number | Date;
}
export interface RenderModel {
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
  tags?: TagType;
  /**
   * 统计
   */
  statistic?: StatisticType;
  /**
   * 单选框
   */
  radios?: RadioType;
  /**
   * 树形节点
   */
  treeNodes?: TreeNodeType;
}
