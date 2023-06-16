import * as yup from 'yup';

export const campaignPlatformValidationSchema = yup.object().shape({
  campaign_id: yup.string().nullable(),
  platform_id: yup.string().nullable(),
});
