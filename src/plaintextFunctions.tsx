import { USRDB, USRDBStatic } from ".";
export const _isAnimatedUSRBG = (userId) => {
  const imgUrl = USRDB.get(userId);
  const img = USRDBStatic.get(`${userId}-${imgUrl}`);
  if (img) return true;
};
