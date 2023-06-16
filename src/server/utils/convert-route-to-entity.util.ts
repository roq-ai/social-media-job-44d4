const mapping: Record<string, string> = {
  campaigns: 'campaign',
  'campaign-platforms': 'campaign_platform',
  contents: 'content',
  organizations: 'organization',
  platforms: 'platform',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
