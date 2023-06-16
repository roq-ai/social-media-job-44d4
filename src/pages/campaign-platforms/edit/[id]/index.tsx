import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getCampaignPlatformById, updateCampaignPlatformById } from 'apiSdk/campaign-platforms';
import { Error } from 'components/error';
import { campaignPlatformValidationSchema } from 'validationSchema/campaign-platforms';
import { CampaignPlatformInterface } from 'interfaces/campaign-platform';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CampaignInterface } from 'interfaces/campaign';
import { PlatformInterface } from 'interfaces/platform';
import { getCampaigns } from 'apiSdk/campaigns';
import { getPlatforms } from 'apiSdk/platforms';

function CampaignPlatformEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<CampaignPlatformInterface>(
    () => (id ? `/campaign-platforms/${id}` : null),
    () => getCampaignPlatformById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CampaignPlatformInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCampaignPlatformById(id, values);
      mutate(updated);
      resetForm();
      router.push('/campaign-platforms');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<CampaignPlatformInterface>({
    initialValues: data,
    validationSchema: campaignPlatformValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Campaign Platform
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <AsyncSelect<CampaignInterface>
              formik={formik}
              name={'campaign_id'}
              label={'Select Campaign'}
              placeholder={'Select Campaign'}
              fetcher={getCampaigns}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<PlatformInterface>
              formik={formik}
              name={'platform_id'}
              label={'Select Platform'}
              placeholder={'Select Platform'}
              fetcher={getPlatforms}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'campaign_platform',
  operation: AccessOperationEnum.UPDATE,
})(CampaignPlatformEditPage);
