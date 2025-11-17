import { getLatestVersion, championSquare } from '../api/ddragon';
import axios from 'axios';

jest.mock('axios');

describe('ddragon API', () => {
  it('getLatestVersion retourne la version', async () => {
    axios.get.mockResolvedValue({ data: ['13.1.1'] });
    const version = await getLatestVersion();
    expect(version).toBe('13.1.1');
  });

  it('championSquare retourne une URL', () => {
    const url = championSquare('13.1.1', 'Aatrox.png');
    expect(url).toContain('Aatrox.png');
  });
});
