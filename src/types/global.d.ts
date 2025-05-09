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
    gridVisible: boolean;
    gridSize: number;
    gridDivisions: number;
    gridColor: string;
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
}

export {};
