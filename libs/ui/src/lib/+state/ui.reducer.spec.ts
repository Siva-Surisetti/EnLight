import { UiLoaded } from './ui.actions';
import { UiState, Entity, initialState, reducer } from './ui.reducer';

describe('Ui Reducer', () => {
  const getUiId = it => it['id'];
  let createUi;

  beforeEach(() => {
    createUi = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Ui actions ', () => {
    it('should return set the list of known Ui', () => {
      const uis = [createUi('PRODUCT-AAA'), createUi('PRODUCT-zzz')];
      const action = new UiLoaded(uis);
      const result: UiState = reducer(initialState, action);
      const selId: string = getUiId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
