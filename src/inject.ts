import { Container } from './container';

export function Inject(token: string) {
   return function (target: any, key: string) {
      Object.defineProperty(target, key, {
         get: () => Container.getInstance().resolve(token),
         enumerable: true,
         configurable: true,
      });
   };
}
