import { getLatestVersion, getChampionList, championSquare, getChampionDetail, splashUrl, loadingUrl, spellIcon, passiveIcon } from './ddragon.js';

async function testDdragon() {
  // Test getLatestVersion
  const version = await getLatestVersion();
  console.log('Latest version:', version);

  // Test getChampionList
  const champions = await getChampionList(version);
  console.log('First champion:', champions[0]);

  // Test championSquare
  const champIconUrl = championSquare(version, 'Aatrox.png');
  console.log('Champion square URL:', champIconUrl);

  // Test getChampionDetail
  const champDetail = await getChampionDetail(version, 'Aatrox');
  console.log('Champion detail (Aatrox):', champDetail);

  // Test splashUrl
  const splash = splashUrl('Aatrox', 0);
  console.log('Splash URL:', splash);

  // Test loadingUrl
  const loading = loadingUrl('Aatrox', 0);
  console.log('Loading URL:', loading);

  // Test spellIcon
  const spell = spellIcon(version, 'AatroxQ.png');
  console.log('Spell icon URL:', spell);

  // Test passiveIcon
  const passive = passiveIcon(version, 'Aatrox_Passive.png');
  console.log('Passive icon URL:', passive);
}

testDdragon();
