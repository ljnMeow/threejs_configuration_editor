/**
 * 信号系统模块
 * 
 * 该模块实现了一个基于发布-订阅模式的信号系统，用于组件间通信。
 * 允许注册、触发和管理事件监听器，支持优先级排序和一次性监听。
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * 创建信号系统的 Pinia Store
 * 使用组合式 API 风格定义 Store
 */
const useSignalStore = defineStore('signal', () => {
  // 存储所有信号及其监听器，键为信号名称，值为监听器配置数组
  const signals = ref<Record<string, ListenerConfig[]>>({});
  
  // 存储信号的激活状态，键为信号名称，值为布尔值表示是否激活
  const activeSignals = ref<Record<string, boolean>>({});

  /**
   * 添加信号监听器
   * @param signalName - 信号名称
   * @param listener - 监听器函数
   * @param listenerContext - 监听器执行上下文
   * @param priority - 监听器优先级，默认为0
   */
  function add(
    signalName: string,
    listener: SignalListener,
    listenerContext?: any,
    priority?: number
  ) {
    // 如果信号不存在，初始化信号及其激活状态
    if (!signals.value[signalName]) {
      signals.value[signalName] = [];
      activeSignals.value[signalName] = true;
    }

    // 添加监听器配置到信号
    signals.value[signalName].push({
      listener,
      context: listenerContext,
      priority: priority || 0,
      once: false
    });

    // 按优先级降序排序，确保高优先级的监听器先执行
    signals.value[signalName].sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  /**
   * 添加一次性信号监听器，触发一次后自动移除
   * @param signalName - 信号名称
   * @param listener - 监听器函数
   * @param listenerContext - 监听器执行上下文
   * @param priority - 监听器优先级，默认为0
   */
  function addOnce(
    signalName: string,
    listener: SignalListener,
    listenerContext?: any,
    priority?: number
  ) {
    // 如果信号不存在，初始化信号及其激活状态
    if (!signals.value[signalName]) {
      signals.value[signalName] = [];
      activeSignals.value[signalName] = true;
    }

    // 添加一次性监听器配置到信号
    signals.value[signalName].push({
      listener,
      context: listenerContext,
      priority: priority || 0,
      once: true
    });

    // 按优先级降序排序，确保高优先级的监听器先执行
    signals.value[signalName].sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  /**
   * 触发信号，执行所有注册的监听器
   * @param signalName - 信号名称
   * @param params - 传递给监听器的参数
   */
  function dispatch(signalName: string, ...params: any[]) {
    // 如果信号不存在或未激活，直接返回
    if (!signals.value[signalName] || !activeSignals.value[signalName]) {
      return;
    }

    // 创建一个监听器配置数组的副本，防止在迭代过程中修改原数组
    const listeners = [...signals.value[signalName]];
    
    // 收集需要移除的一次性监听器
    const toRemove: ListenerConfig[] = [];

    // 遍历执行所有监听器
    for (const config of listeners) {
      if (activeSignals.value[signalName]) {
        // 使用指定上下文执行监听器函数，并传递参数
        config.listener.apply(config.context, params);
        
        // 如果是一次性监听器，添加到待移除列表
        if (config.once) {
          toRemove.push(config);
        }
      } else {
        break; // 如果信号在执行过程中被暂停，停止后续执行
      }
    }

    // 移除所有一次性监听器
    for (const config of toRemove) {
      remove(signalName, config.listener, config.context);
    }
  }

  /**
   * 移除特定的信号监听器
   * @param signalName - 信号名称
   * @param listener - 要移除的监听器函数
   * @param context - 监听器的上下文，用于精确匹配
   */
  function remove(signalName: string, listener: SignalListener, context?: any) {
    // 如果信号不存在，直接返回
    if (!signals.value[signalName]) {
      return;
    }

    // 过滤掉匹配的监听器
    signals.value[signalName] = signals.value[signalName].filter(
      config => !(config.listener === listener && (!context || config.context === context))
    );
  }

  /**
   * 移除指定信号的所有监听器
   * @param signalName - 信号名称
   */
  function removeAll(signalName: string) {
    if (signals.value[signalName]) {
      signals.value[signalName] = [];
    }
  }

  /**
   * 设置信号的激活状态
   * @param signalName - 信号名称
   * @param active - 是否激活
   */
  function setActive(signalName: string, active: boolean) {
    activeSignals.value[signalName] = active;
  }

  /**
   * 暂停信号，使其不再触发监听器
   * @param signalName - 信号名称
   */
  function halt(signalName: string) {
    setActive(signalName, false);
  }

  /**
   * 销毁信号，移除所有监听器并清除信号记录
   * @param signalName - 信号名称
   */
  function dispose(signalName: string) {
    removeAll(signalName);
    delete signals.value[signalName];
    delete activeSignals.value[signalName];
  }

  /**
   * 检查是否存在特定的监听器
   * @param signalName - 信号名称
   * @param listener - 监听器函数
   * @param context - 监听器上下文
   * @returns 是否存在匹配的监听器
   */
  function has(signalName: string, listener: SignalListener, context?: any): boolean {
    if (!signals.value[signalName]) {
      return false;
    }

    return signals.value[signalName].some(
      config => config.listener === listener && (!context || config.context === context)
    );
  }

  // 返回所有公开的方法
  return {
    add,        // 添加监听器
    addOnce,    // 添加一次性监听器
    dispatch,   // 触发信号
    remove,     // 移除监听器
    removeAll,  // 移除所有监听器
    setActive,  // 设置信号激活状态
    halt,       // 暂停信号
    dispose,    // 销毁信号
    has         // 检查监听器是否存在
  };
});

export default useSignalStore;