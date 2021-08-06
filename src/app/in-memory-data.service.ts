import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    let items = [
      { id: 21, name: 'Windstorm' },
      { id: 22, name: 'Bombasto' },
      { id: 23, name: 'Magneta' },
      { id: 24, name: 'Tornado' },
      { id: 25, name: 'Dindstorm' },
      { id: 26, name: 'Rombasto' },
      { id: 27, name: 'Hagneta' },
      { id: 28, name: 'Kornado' },
      { id: 29, name: 'Lindstorm' },
      { id: 30, name: 'Combasto' },
      { id: 31, name: 'Xagneta' },
      { id: 32, name: 'Zornado' }
    ];
    return {items};
  }
}