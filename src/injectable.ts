import { Container } from './container';

export function Injectable(token?: string): Function {
   return function (target: { new (): Object }): void {
      Container.getInstance().register(token || target.name, new target());
   };
}
