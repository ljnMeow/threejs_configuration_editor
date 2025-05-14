/*
 * @Author: linMeow linjinnan1998@sina.com
 * @Date: 2025-05-09 10:46:13
 * @LastEditors: linMeow linjinnan1998@sina.com
 * @LastEditTime: 2025-05-14 16:10:58
 * @FilePath: /threejs_configuration_editor/src/types/global.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
declare global {
  interface TabListItem {
    key: number;
    label: string;
    icon?: string;
  }

  interface SceneInfo {
    id: string;
    name: string;
    desc: string;
    gridHelperVisible: boolean;
    gridHelperSize: number;
    gridHelperDivisions: number;
    gridHelperColor: string;
    axesHelperVisible: boolean;
    axesHelperSize: number;
    viewHelperVisible: boolean
  }

  interface ListenerConfig {
    listener: SignalListener;
    context?: any;
    priority?: number;
    once?: boolean;
  }

  type SignalListener = (...params: any[]) => void;

  interface GridHelperInfo {
    isVisible: boolean;
    size: number;
    divisions: number;
    gridColor: string;
  }

  interface AxesHelperInfo {
    isVisible: boolean;
    size: number;
  }
}

export {};
