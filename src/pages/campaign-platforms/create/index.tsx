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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCampaignPlatform } from 'apiSdk/campaign-platforms';
import { Error } from 'components/error';
import { campaignPlatformValidationSchema } from 'validationSchema/campaign-platforms';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CampaignInterface } from 'interfaces/campaign';
import { PlatformInterface } from 'interfaces/platform';
import { getCampaigns } from 'apiSdk/campaigns';
import { getPlatforms } from 'apiSdk/platforms';
import { CampaignPlatformInterface } from 'interfaces/campaign-platform';

function CampaignPlatformCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CampaignPlatformInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCampaignPlatform(values);
      resetForm();
      router.push('/campaign-platforms');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CampaignPlatformInterface>({
    initialValues: {
      campaign_id: (router.query.campaign_id as string) ?? null,
      platform_id: (router.query.platform_id as string) ?? null,
    },
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
            Create Campaign Platform
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'campaign_platform',
  operation: AccessOperationEnum.CREATE,
})(CampaignPlatformCreatePage);
