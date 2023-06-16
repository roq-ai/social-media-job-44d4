import * as yup from 'yup';

export const platformValidationSchema = yup.object().shape({
  name: yup.string().required(),
});
