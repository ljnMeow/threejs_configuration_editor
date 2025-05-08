/**
 * 信号系统钩子函数模块
 * 
 * 该模块提供了一组便捷的钩子函数，用于在组件中使用信号系统。
 * 基于 Pinia store 实现的信号系统，提供了发布-订阅模式的事件处理机制。
 */
import { useSignalStore } from "../store/modules/signalStore";

/**
 * 信号方法接口定义
 * 泛型 T 用于指定信号参数的类型，默认为 any
 */
interface SignalMethods<T = any> {
  /**
   * 添加信号监听器
   * @param signalName - 信号名称
   * @param listener - 监听器函数
   * @param listenerContext - 监听器执行上下文
   * @param priority - 监听器优先级，数值越大优先级越高
   */
  add(
    signalName: string,
    listener: (...params: T[]) => void,
    listenerContext?: any,
    priority?: Number
  ): void;
  
  /**
   * 添加一次性信号监听器，触发一次后自动移除
   * @param signalName - 信号名称
   * @param listener - 监听器函数
   * @param listenerContext - 监听器执行上下文
   * @param priority - 监听器优先级，数值越大优先级越高
   */
  addOnce(
    signalName: string,
    listener: (...params: T[]) => void,
    listenerContext?: any,
    priority?: Number
  ): void;
  
  /**
   * 触发信号，执行所有注册的监听器
   * @param signalName - 信号名称
   * @param params - 传递给监听器的参数
   */
  dispatch(signalName: string, ...params: T[]): void;
  
  /**
   * 移除特定的信号监听器
   * @param signalName - 信号名称
   * @param listener - 要移除的监听器函数
   * @param context - 监听器的上下文，用于精确匹配
   */
  remove(
    signalName: string,
    listener: (...params: T[]) => void,
    context?: any
  ): void;
  
  /**
   * 移除指定信号的所有监听器
   * @param signalName - 信号名称
   */
  removeAll(signalName: string): void;
  
  /**
   * 设置信号的激活状态
   * @param signalName - 信号名称
   * @param active - 是否激活
   */
  setActive(signalName: string, active: boolean): void;
  
  /**
   * 暂停信号，使其不再触发监听器
   * @param signalName - 信号名称
   */
  halt(signalName: string): void;
  
  /**
   * 销毁信号，移除所有监听器并清除信号记录
   * @param signalName - 信号名称
   */
  dispose(signalName: string): void;
  
  /**
   * 检查是否存在特定的监听器
   * @param signalName - 信号名称
   * @param listener - 监听器函数
   * @param context - 监听器上下文
   * @returns 是否存在匹配的监听器
   */
  has(
    signalName: string,
    listener: (...params: T[]) => void,
    context?: any
  ): boolean;
}

/**
 * 获取完整的信号系统方法集合
 * @returns 包含所有信号系统方法的对象
 */
export function useSignal(): SignalMethods {
  const signalStore = useSignalStore();

  return {
    add: signalStore.add,
    addOnce: signalStore.addOnce,
    dispatch: signalStore.dispatch,
    remove: signalStore.remove,
    removeAll: signalStore.removeAll,
    setActive: signalStore.setActive,
    halt: signalStore.halt,
    dispose: signalStore.dispose,
    has: signalStore.has,
  };
}

/**
 * 添加信号监听器的便捷钩子函数
 * @param signalName - 信号名称
 * @param listener - 监听器函数
 * @param listenerContext - 监听器执行上下文
 * @param priority - 监听器优先级，数值越大优先级越高
 */
export function useAddSignal(
  signalName: string,
  listener: (...params: any) => void,
  listenerContext?: any,
  priority?: Number
): void {
  const signalStore = useSignalStore();
  signalStore.add(signalName, listener, listenerContext, priority as number);
}

/**
 * 触发信号的便捷钩子函数
 * @param signalName - 信号名称
 * @param arg - 传递给监听器的参数
 */
export function useDispatchSignal(signalName: string, ...arg: any[]): void {
  const signalStore = useSignalStore();
  signalStore.dispatch(signalName, ...arg);
}

/**
 * 移除信号监听器的便捷钩子函数
 * @param signalName - 信号名称
 * @param listener - 要移除的监听器函数
 */
export function useRemoveSignal(
  signalName: string,
  listener: (...params: any) => void
): void {
  const signalStore = useSignalStore();
  signalStore.remove(signalName, listener);
}
