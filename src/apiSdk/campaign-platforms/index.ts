import axios from 'axios';
import queryString from 'query-string';
import { CampaignPlatformInterface, CampaignPlatformGetQueryInterface } from 'interfaces/campaign-platform';
import { GetQueryInterface } from '../../interfaces';

export const getCampaignPlatforms = async (query?: CampaignPlatformGetQueryInterface) => {
  const response = await axios.get(`/api/campaign-platforms${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCampaignPlatform = async (campaignPlatform: CampaignPlatformInterface) => {
  const response = await axios.post('/api/campaign-platforms', campaignPlatform);
  return response.data;
};

export const updateCampaignPlatformById = async (id: string, campaignPlatform: CampaignPlatformInterface) => {
  const response = await axios.put(`/api/campaign-platforms/${id}`, campaignPlatform);
  return response.data;
};

export const getCampaignPlatformById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/campaign-platforms/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCampaignPlatformById = async (id: string) => {
  const response = await axios.delete(`/api/campaign-platforms/${id}`);
  return response.data;
};
