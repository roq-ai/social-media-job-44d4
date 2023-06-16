import { CampaignPlatformInterface } from 'interfaces/campaign-platform';
import { GetQueryInterface } from 'interfaces';

export interface PlatformInterface {
  id?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  campaign_platform?: CampaignPlatformInterface[];

  _count?: {
    campaign_platform?: number;
  };
}

export interface PlatformGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
}
