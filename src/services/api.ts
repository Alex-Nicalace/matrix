import { TAvailableAssetsResponse } from './services.types';

const API_URL = 'https://api.binance.com/api';

export async function getAvailableAssets() {
  const res = await fetch(`${API_URL}/v3/ticker/24hr`);
  if (!res.ok) throw Error('Ошибка получения доступных активов!!!');

  const data = await res.json();
  return (data || []) as TAvailableAssetsResponse[];
}
