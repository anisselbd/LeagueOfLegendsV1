import axios from "axios";

const DDRAGON = "https://ddragon.leagueoflegends.com";

export async function getLatestVersion() {
  // Récupère la dernière v dispo de LoL
  const { data } = await axios.get(DDRAGON + "/api/versions.json");
  return data[0];
}

export async function getChampionList(version, locale = "fr_FR") {
  // Récupère la liste des champs pour une v et une locale données
  const url =
    DDRAGON + "/cdn/" + version + "/data/" + locale + "/champion.json";
  const { data } = await axios.get(url);
  return Object.values(data.data);
}

export function championSquare(version, imageName) {
  // Génère l'URL de l'icône carrée d'un champion
  return DDRAGON + "/cdn/" + version + "/img/champion/" + imageName;
}

export async function getChampionDetail(version, champId, locale = "fr_FR") {
  // Récupère les détails d'un champion spécifique

  const url =
    DDRAGON +
    "/cdn/" +
    version +
    "/data/" +
    locale +
    "/champion/" +
    champId +
    ".json";
  const { data } = await axios.get(url);
  return data.data[champId];
}

export function splashUrl(champId, skinNum = 0) {
  // Génère l'URL de l'image splash d'un champion pour un skin donné
  return (
    DDRAGON + "/cdn/img/champion/splash/" + champId + "_" + skinNum + ".jpg"
  );
}
export function loadingUrl(champId, skinNum = 0) {
  // Génère l'URL de l'image de chargement d'avant game d'un champion pour un skin donné
  return (
    DDRAGON + "/cdn/img/champion/loading/" + champId + "_" + skinNum + ".jpg"
  );
}

export function spellIcon(version, fileName) {
  // Génère l'URL de l'icône d'un sort
  return DDRAGON + "/cdn/" + version + "/img/spell/" + fileName;
}
export function passiveIcon(version, fileName) {
  // Génère l'URL de l'icône passive d'un champion
  return DDRAGON + "/cdn/" + version + "/img/passive/" + fileName;
}

export async function getItemList(version, locale = "fr_FR") {
  // Récupère la liste des items
  const url = DDRAGON + "/cdn/" + version + "/data/" + locale + "/item.json";
  const { data } = await axios.get(url);
  return Object.values(data.data);
}

export async function getItemById(version, id, locale = "fr_FR") {
  // Récupère un item précis par son id
  const url = DDRAGON + "/cdn/" + version + "/data/" + locale + "/item.json";
  const { data } = await axios.get(url);
  const item = data?.data?.[id];
  if (!item) return null;
  return { ...item, id };
}
