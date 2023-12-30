import { Container } from './container';

export function Controller(token?: string): ClassDecorator {
   return function (target: { new (): Object }): void {
      Container.getInstance().register(`controller_${token || target.name}`, new target());
   } as ClassDecorator;
}
