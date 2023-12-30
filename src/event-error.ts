export class EventError extends Error {
   private key: string;

   constructor(message: string, key: any) {
      super(message);

      Object.setPrototypeOf(this, EventError.prototype);

      this.message = message;
      this.name = 'EventError';
      this.key = key;

      if (Error.captureStackTrace) {
         Error.captureStackTrace(this, EventError);
      }
   }
}
