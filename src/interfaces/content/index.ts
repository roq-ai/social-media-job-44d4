import { CampaignInterface } from 'interfaces/campaign';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ContentInterface {
  id?: string;
  title: string;
  description?: string;
  image?: string;
  campaign_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  campaign?: CampaignInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ContentGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  campaign_id?: string;
  user_id?: string;
}
