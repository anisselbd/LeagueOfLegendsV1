import axios from "axios";

const DDRAGON = "https://ddragon.leagueoflegends.com";

export async function getLatestVersion() {
  const { data } = await axios.get(`${DDRAGON}/api/versions.json`);
  return data[0]; 
}

export async function getChampionList(version, locale = "fr_FR") {
  const url = `${DDRAGON}/cdn/${version}/data/${locale}/champion.json`;
  const { data } = await axios.get(url);
  return Object.values(data.data); 
}

export function championSquare(version, imageName) {
  return `${DDRAGON}/cdn/${version}/img/champion/${imageName}`;
}

export async function getChampionDetail(version, champId, locale = "fr_FR") {

  const url = `${DDRAGON}/cdn/${version}/data/${locale}/champion/${champId}.json`;
  const { data } = await axios.get(url);
  return data.data[champId];
}

export function splashUrl(champId, skinNum = 0) {
  return `${DDRAGON}/cdn/img/champion/splash/${champId}_${skinNum}.jpg`;
}
export function loadingUrl(champId, skinNum = 0) {
  return `${DDRAGON}/cdn/img/champion/loading/${champId}_${skinNum}.jpg`;
}

export function spellIcon(version, fileName) {
  return `${DDRAGON}/cdn/${version}/img/spell/${fileName}`;
}
export function passiveIcon(version, fileName) {
  return `${DDRAGON}/cdn/${version}/img/passive/${fileName}`;
}