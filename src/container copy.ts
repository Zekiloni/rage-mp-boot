import { find } from 'lodash';

export class Container {
   private static _instance: Container | null = null;
   private _providers: { [key: string]: any } = {};

   public static getInstance(): Container {
      if (!Container._instance) {
         Container._instance = new Container();
      }
      return Container._instance;
   }

   public getProviders() {
      if (!Container._instance) {
         throw new Error(`Instance of dependency container is not created.`);
      }

      return this._providers;
   }

   public register(token: string, provider: any): void {
      if (this._providers.has(token)) {
         throw new Error(`Provider with token ${token} is already registered.`);
      }
      this._providers.set(token, provider);
   }

   public resolve(token: string) {
      const matchedProvider = find(this._providers, (_provider, key) => key === token);

      if (matchedProvider) {
         return matchedProvider;
      } else {
         throw new Error(`No provider found for ${token}!`);
      }
   }
}
