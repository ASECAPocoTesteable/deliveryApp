declare module 'wd' {
    import { EventEmitter } from 'events';
  
    export interface PromiseWebdriver extends EventEmitter {
      init(capabilities: Record<string, any>): Promise<this>;
      quit(): Promise<void>;
      elementsByClassName(className: string): Promise<any[]>;
      elementByAccessibilityId(id: string): Promise<any>;
    }
  
    export function promiseChainRemote(server: string): PromiseWebdriver;
  }
  