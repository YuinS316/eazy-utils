export class Singleton {
  static _instance: Singleton;

  constructor() {

  }

  static getInstance() {
    if (!Singleton._instance)
      Singleton._instance = new Singleton();

    return Singleton._instance;
  }
}
