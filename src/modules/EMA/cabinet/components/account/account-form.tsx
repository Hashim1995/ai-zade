/* eslint-disable react/no-unstable-nested-components */
import { useForm } from 'react-hook-form';
import { inputValidationText } from '@/utils/constants/validations';
import {
  inputPlaceholderText,
  selectPlaceholderText
} from '@/utils/constants/texts';
// import { BsFillPersonFill } from 'react-icons/bs';
import AppHandledInput from '@/components/forms/input/handled-input';
import AppHandledSelect from '@/components/forms/select/handled-select';
import {
  daysList,
  genderOptions,
  monthsList,
  yearsList
} from '@/utils/constants/options';
import { toastOptions } from '@/configs/global-configs';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { AuthService } from '@/services/auth-services/auth-services';
import { IGlobalResponseEmpty, setState } from '@/models/common';
import { fetchUserData } from '@/redux/auth/auth-slice';
import { convertDDMMYYYtoISOString } from '@/utils/functions/functions';
import { useTranslation } from 'react-i18next';
import { IAccountForm } from '../../types';

interface IAccountFormProps {
  fieldsIsDisable: boolean;
  setIsLoading: setState<Boolean>;
}

function AccountForm({ setIsLoading, fieldsIsDisable }: IAccountFormProps) {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    control
  } = useForm<IAccountForm>({
    mode: 'onSubmit',
    defaultValues: {}
  });
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: IAccountForm) => {
    const payload: Omit<IAccountForm, 'email'> = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      gender: data?.gender,
      dateOfBirth: convertDDMMYYYtoISOString(
        `${data.day}.${data.month}.${data.year}`
      )
    };
    delete payload.day;
    delete payload.month;
    delete payload.year;

    setIsLoading(true);
    try {
      const res: IGlobalResponseEmpty =
        await AuthService.getInstance().changeUserDetail(payload);

      if (res.isSuccess) {
        dispatch(fetchUserData());
        toast.success(t('accountDataUpdatedSuccessFully'), toastOptions);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setValue('email', user.email);
    setValue('firstName', user.firstName);
    setValue('lastName', user.lastName);
    setValue('dateOfBirth', user.dateOfBirth);
    const date = String(user.dateOfBirth).split('.');
    setValue('day', date[0]);
    setValue('month', date[1]);
    setValue('year', date[2]);
    setValue('gender', String(user.gender));
  }, [user]);
  return (
    <div className="flex flex-1 items-center px-5 py-5 xl:p-5 rounded-lg overflow-y-auto remove-scrollbar">
      <form
        id="account-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex sm:flex-row flex-col justify-between gap-3 sm:gap-4 w-full"
      >
        <div className="flex flex-col gap-3 sm:gap-4 w-full sm:w-1/2 xl:w-2/5">
          <AppHandledInput
            name="email"
            inputProps={{
              id: 'email',
              isDisabled: fieldsIsDisable
            }}
            type="email"
            className="text-default-900 dark:text-white"
            control={control}
            isInvalid={Boolean(errors.email?.message)}
            errors={errors}
            size="sm"
            // className="bg-transparent text-base text-black sm:text-xl"
            rules={{
              required: {
                value: true,
                message: inputValidationText(t('email'))
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: `${t('email')} ${t('regexFormatValidatorText')}`
              }
            }}
            label={inputPlaceholderText(t('email'))}
            required
          />
          <div className="flex space-x-4">
            <div className="flex-1">
              <AppHandledSelect
                name="day"
                selectProps={{
                  id: 'day',
                  isDisabled: fieldsIsDisable
                }}
                isInvalid={Boolean(errors.day?.message)}
                control={control}
                label={t('day')}
                size="sm"
                required
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('day'))
                  }
                }}
                options={daysList}
                errors={errors}
              />
            </div>

            <div className="flex-1">
              <AppHandledSelect
                name="month"
                selectProps={{
                  id: 'month',
                  isDisabled: fieldsIsDisable
                }}
                isInvalid={Boolean(errors.month?.message)}
                control={control}
                label={t('month')}
                size="sm"
                required
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('month'))
                  }
                }}
                options={monthsList}
                errors={errors}
              />
            </div>

            <div className="flex-1">
              <AppHandledSelect
                name="year"
                selectProps={{
                  id: 'year',
                  isDisabled: fieldsIsDisable
                }}
                isInvalid={Boolean(errors.year?.message)}
                control={control}
                label={t('year')}
                size="sm"
                required
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('year'))
                  }
                }}
                options={yearsList}
                errors={errors}
              />
            </div>
          </div>
          <AppHandledSelect
            name="gender"
            selectProps={{
              id: 'gender',

              isDisabled: fieldsIsDisable
            }}
            isInvalid={Boolean(errors.gender?.message)}
            control={control}
            label={selectPlaceholderText(t('gender'))}
            // className="app-select text-base sm:text-xl"
            size="sm"
            required
            rules={{
              required: {
                value: true,
                message: inputValidationText(t('gender'))
              }
            }}
            options={genderOptions}
            errors={errors}
          />
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 w-full sm:w-1/2 xl:w-2/5">
          <AppHandledInput
            name="firstName"
            inputProps={{
              id: 'firstName',

              isDisabled: fieldsIsDisable
            }}
            type="text"
            control={control}
            isInvalid={Boolean(errors.firstName?.message)}
            errors={errors}
            size="sm"
            rules={{
              required: {
                value: true,
                message: inputValidationText(t('firstName'))
              }
            }}
            label={inputPlaceholderText(t('firstName'))}
            required
          />
          <AppHandledInput
            name="lastName"
            inputProps={{
              id: 'lastName',

              isDisabled: fieldsIsDisable
            }}
            type="text"
            control={control}
            isInvalid={Boolean(errors.lastName?.message)}
            errors={errors}
            size="sm"
            rules={{
              required: {
                value: true,
                message: inputValidationText(t('lastName'))
              }
            }}
            label={inputPlaceholderText(t('lastName'))}
            required
          />
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
