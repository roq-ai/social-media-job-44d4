import { CampaignPlatformInterface } from 'interfaces/campaign-platform';
import { ContentInterface } from 'interfaces/content';
import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CampaignInterface {
  id?: string;
  name: string;
  goal: string;
  schedule: any;
  status: string;
  organization_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  campaign_platform?: CampaignPlatformInterface[];
  content?: ContentInterface[];
  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {
    campaign_platform?: number;
    content?: number;
  };
}

export interface CampaignGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  goal?: string;
  status?: string;
  organization_id?: string;
  user_id?: string;
}
