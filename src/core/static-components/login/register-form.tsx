/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unstable-nested-components */
import { IUserRegister } from '@/models/user';
import {
  AuthService,
  IRegisterResponse
} from '@/services/auth-services/auth-services';
import { inputValidationText } from '@/utils/constants/validations';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import AppHandledInput from '@/components/forms/input/handled-input';
import {
  inputPlaceholderText,
  selectPlaceholderText
} from '@/utils/constants/texts';
import AppHandledSelect from '@/components/forms/select/handled-select';
import { convertDDMMYYYtoISOString } from '@/utils/functions/functions';
import {
  daysList,
  genderOptions,
  monthsList,
  yearsList
} from '@/utils/constants/options';
import { toast } from 'react-toastify';
import { toastOptions } from '@/configs/global-configs';
import { useTranslation } from 'react-i18next';
import useDarkMode from 'use-dark-mode';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';

interface IRegisterFormProps {
  handleFlip: () => void;
}
/**
 * Represents a register form component.
 * This component renders a register form with email, password, and other inputs,
 * and handles the submission of the form data for user registration.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.handleFlip - The function to handle flipping between login and register forms.
 * @returns {JSX.Element} The RegisterForm component.
 */
function RegisterForm({ handleFlip }: IRegisterFormProps): JSX.Element {
  const { t } = useTranslation();
  const {
    handleSubmit,
    watch,
    clearErrors,
    setError,
    setValue,
    formState: { errors, isSubmitting },
    control
  } = useForm<IUserRegister>({
    mode: 'onChange',
    defaultValues: {}
  });
  // eslint-disable-next-line no-unused-vars
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  /**
   * Handles the form submission for user registration.
   *
   * @param data - The user registration data.
   */
  async function onSubmit(data: IUserRegister) {
    const payload: IUserRegister = {
      ...data,

      dateOfBirth: convertDDMMYYYtoISOString(
        `${data.day}.${data.month}.${data.year}`
      ),
      gender: Number(data.gender)
    };
    delete payload.day;
    delete payload.month;
    delete payload.year;

    try {
      const res: IRegisterResponse = await AuthService.getInstance().register(
        payload
      );
      if (res.isSuccess) {
        toast.success(
          'Uğurla qeydiyyatdan keçdiniz. Zəhmət olmasa yenidən daxil olun',
          toastOptions
        );
        handleFlip();
        setValue('confirmPassword', '');
        setValue('email', '');
        setValue('firstName', '');
        setValue('lastName', '');
        setValue('password', '');
        setValue('dateOfBirth', '');
        setValue('gender', '');
      }
    } catch (err) {
      console.log(err);
    }
  }
  const darkMode = useDarkMode();

  return (
    <div className="flex flex-col">
      <div className="bg-white p-[3px] rounded-xl animate-border">
        <div
          className={`flex flex-col flex-1 justify-center items-start p-10 rounded-xl h-full ${
            darkMode.value ? 'gradient-bg' : 'backdrop-blur-md bg-white/30'
          } `}
        >
          <h4 className="mb-5 text-default-400 text-sm dark:text-white tracking-widest">
            {t('loginAndDiscover')}
          </h4>
          <h3 className="mb-5 font-semibold text-[34px] text-default-800 dark:text-white leading-none tracking-widest">
            {t('login')}
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-5"
          >
            <div className="flex flex-col gap-3 md:gap-5">
              <div className="flex gap-2">
                <AppHandledInput
                  name="email"
                  inputProps={{
                    id: 'email'
                  }}
                  type="email"
                  control={control}
                  isInvalid={Boolean(errors.email?.message)}
                  errors={errors}
                  size="sm"
                  className="w-96"
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
                <AppHandledInput
                  name="firstName"
                  inputProps={{
                    id: 'firstName'
                  }}
                  type="text"
                  className="w-96"
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
              </div>
              <div className="flex gap-2">
                <AppHandledInput
                  name="lastName"
                  inputProps={{
                    id: 'lastName'
                  }}
                  type="text"
                  control={control}
                  className="w-96"
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

                <div className="flex space-x-2 w-1/2">
                  <div className="flex-1">
                    <AppHandledSelect
                      name="day"
                      selectProps={{
                        id: 'day'
                      }}
                      isInvalid={Boolean(errors.day?.message)}
                      control={control}
                      label={t('day')}
                      required
                      className="w-[123.33px] text-white"
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText('Gün')
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
                        id: 'month'
                      }}
                      isInvalid={Boolean(errors.month?.message)}
                      control={control}
                      label={t('month')}
                      className="w-[123.33px]"
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
                        id: 'year'
                      }}
                      isInvalid={Boolean(errors.year?.message)}
                      control={control}
                      className="w-[123.33px]"
                      label={t('year')}
                      required
                      rules={{
                        required: {
                          value: true,
                          message: inputValidationText('İl')
                        }
                      }}
                      options={yearsList}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <AppHandledInput
                  name="password"
                  control={control}
                  className="w-96"
                  isInvalid={Boolean(errors.password?.message)}
                  errors={errors}
                  onChangeApp={() => {
                    if (watch('password') !== watch('confirmPassword')) {
                      setError('password', {
                        message: t('confirmPasswordMessage')
                      });
                      setError('confirmPassword', {
                        message: t('confirmPasswordMessage')
                      });
                    } else {
                      clearErrors('password');
                      clearErrors('confirmPassword');
                    }
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('password'))
                    },
                    minLength: {
                      value: 8,
                      message: t('minLength')
                    },
                    validate: {
                      RequireDigit: value =>
                        /[0-9]/.test(value) || t('minNumber'),
                      RequireLowercase: value =>
                        /[a-z]/.test(value) || t('minSmallLetter'),
                      RequireUppercase: value =>
                        /[A-Z]/.test(value) || t('minBigLetter'),
                      RequireSpecialCharacter: value =>
                        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) ||
                        t('minCharacter')
                    }
                  }}
                  label={inputPlaceholderText(t('password'))}
                  required
                  size="sm"
                  inputProps={{
                    id: 'password',
                    endContent: (
                      <button
                        className="focus:outline-none"
                        aria-label="Show Password"
                        title="Show Password"
                        type="button"
                        onClick={() => setShowPassword(z => !z)}
                      >
                        {showPassword ? (
                          <BsEye
                            size={16}
                            className="text-2xl text-default-400 pointer-events-none"
                          />
                        ) : (
                          <BsEyeSlash
                            size={16}
                            className="text-2xl text-default-400 pointer-events-none"
                          />
                        )}
                      </button>
                    )
                  }}
                  type={showPassword ? 'text' : 'password'}
                />

                <AppHandledSelect
                  name="gender"
                  isInvalid={Boolean(errors.gender?.message)}
                  control={control}
                  selectProps={{
                    id: 'gender'
                  }}
                  label={selectPlaceholderText(t('gender'))}
                  required
                  className="w-96"
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
              <div className="flex gap-2">
                <AppHandledInput
                  name="confirmPassword"
                  control={control}
                  size="sm"
                  className="w-96"
                  isInvalid={Boolean(errors.confirmPassword?.message)}
                  errors={errors}
                  onChangeApp={() => {
                    if (watch('password') !== watch('confirmPassword')) {
                      setError('password', {
                        message: t('confirmPasswordMessage')
                      });
                      setError('confirmPassword', {
                        message: t('confirmPasswordMessage')
                      });
                    } else {
                      clearErrors('password');
                      clearErrors('confirmPassword');
                    }
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText(t('confirmPassword'))
                    },
                    minLength: {
                      value: 8,
                      message: t('minLength')
                    },
                    validate: {
                      RequireDigit: value =>
                        /[0-9]/.test(value) || t('minNumber'),
                      RequireLowercase: value =>
                        /[a-z]/.test(value) || t('minSmallLetter'),
                      RequireUppercase: value =>
                        /[A-Z]/.test(value) || t('minBigLetter'),
                      RequireSpecialCharacter: value =>
                        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) ||
                        t('minCharacter')
                    }
                  }}
                  label={inputPlaceholderText(t('confirmPassword'))}
                  required
                  inputProps={{
                    id: 'confirmPassword',
                    endContent: (
                      <button
                        className="focus:outline-none"
                        type="button"
                        aria-label="Show Password"
                        title="Show Password"
                        onClick={() => setShowPasswordConfirm(z => !z)}
                      >
                        {showPasswordConfirm ? (
                          <BsEye
                            size={16}
                            className="text-2xl text-default-400 pointer-events-none"
                          />
                        ) : (
                          <BsEyeSlash
                            size={16}
                            className="text-2xl text-default-400 pointer-events-none"
                          />
                        )}
                      </button>
                    )
                  }}
                  type={showPasswordConfirm ? 'text' : 'password'}
                />
              </div>
            </div>

            <AppHandledSolidButton
              isLoading={isSubmitting}
              aria-label="Register Form Submit Button"
              title="Register Form Submit Button"
              className="w-full"
              type="submit"
            >
              {t('register')}
            </AppHandledSolidButton>
            <div className="flex flex-col !my-[8px]">
              <div className="flex items-center mb-1">
                <div className="flex-1 border-gray-500 border-t-1" />
                <span
                  aria-hidden
                  onClick={handleFlip}
                  className="mx-3 font-normal text-sm tracking-widest"
                >
                  {t('or')}
                </span>
                <div className="flex-1 border-gray-500 border-t-1" />
              </div>
            </div>
            <div className="flex flex-col !m-0">
              <span className="flex justify-center items-center">
                <span
                  className="text-blue-300 text-sm cursor-pointer"
                  aria-hidden
                  onClick={handleFlip}
                >
                  {t('login')}
                </span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
