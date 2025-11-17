import { renderHook, act } from '@testing-library/react';
import { useChampions } from '../store/useChampions';

describe('useChampions store', () => {
  it('initialise avec les valeurs par défaut', () => {
    const { result } = renderHook(() => useChampions());
    expect(result.current.version).toBeNull();
    expect(result.current.champions).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  // Pour tester fetchAll, il faudrait mocker l’API
});
