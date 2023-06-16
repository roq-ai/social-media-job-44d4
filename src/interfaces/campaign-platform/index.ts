import { CampaignInterface } from 'interfaces/campaign';
import { PlatformInterface } from 'interfaces/platform';
import { GetQueryInterface } from 'interfaces';

export interface CampaignPlatformInterface {
  id?: string;
  campaign_id?: string;
  platform_id?: string;
  created_at?: any;
  updated_at?: any;

  campaign?: CampaignInterface;
  platform?: PlatformInterface;
  _count?: {};
}

export interface CampaignPlatformGetQueryInterface extends GetQueryInterface {
  id?: string;
  campaign_id?: string;
  platform_id?: string;
}
