import { Checkbox, FormControlLabel } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/button/Button.tsx';
import SelectCustom from '../../components/select/SelectCustom.tsx';
import { useAuth } from '../../hooks/useAuth.ts';
import { IRegistrationForm } from '../../interface/registrationForm.interface.ts';
import { registrationMapper } from '../../mappers/registration.mapper.ts';
import { customerService } from '../../services';
import {
  loginValidation,
  passwordValidation, postalCodeValidation,
  repeatPasswordValidation,
} from '../../validators';
import { dateValidation } from '../../validators/date-validation.ts';
import { generalValidation } from '../../validators/general-validation.ts';
import { nameValidation } from '../../validators/name-validation.ts';
import styles from './registration.module.scss';
import {BadRequest} from "../../interface/responseError.interface.ts";
import {countries} from "../../contstants/countries.constants.ts";

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
      setError,
  } = useForm<IRegistrationForm>({
    mode: 'onChange',
    defaultValues: {
      sameAddress: false,
    },
  });

  const passwordValue = watch('registerPassword');
  const sameAddress = watch('sameAddress');
  const billingCountry = watch('billingCountry');
  const shippingCountry = watch('shippingCountry');

  const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => {
    try {
      const { statusCode, body } = await customerService.registration(
        registrationMapper.toDto(data),
      );
      if (statusCode === 201) {
        login(body.customer);
        enqueueSnackbar(
          `Привет ${body.customer.email}. Вы успешно авторизовались.`,
          { variant: 'success' },
        );
        navigate('/');
      }
    } catch (e: unknown) {
      const error = e as BadRequest;
      enqueueSnackbar(`${error.message}`, { variant: 'error' });
      error.body.errors.forEach((err ) => {
        const key = err.field as keyof IRegistrationForm;
        setError(key,  { message: err.message })
      })
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Регистрация на сайте</h3>

      <div className={styles.container__registration}>
        <div className={styles.container__general}>
          <h4 className={styles.info__title}>Личная информация</h4>

          <Input
            {...register('firstName', nameValidation())}
            placeholder="Имя"
            type="text"
            error={errors.firstName}
          />
          <Input
            {...register('lastName', nameValidation())}
            id="last-name"
            placeholder="Фамилия"
            type="text"
            error={errors.lastName}
          />
          <Input
            {...register('dateOfBirth', dateValidation())}
            id="date-birth"
            type="date"
            placeholder="Дата рождения"
            error={errors.dateOfBirth}
            aria-invalid="true"
          />

          <Input
            {...register('email', loginValidation())}
            placeholder="Электронная почта"
            type="text"
            error={errors.email}
          />
          <Input
            {...register('registerPassword', passwordValidation())}
            placeholder="Пароль"
            type="password"
            error={errors.registerPassword}
          />
          <Input
            {...register(
              'repeatPassword',
              repeatPasswordValidation(passwordValue),
            )}
            placeholder="Повторите пароль"
            type="password"
            error={errors.repeatPassword}
          />
        </div>

        <div className={styles.container__billing}>
          <h4 className={styles.info__title}>Адрес для выставления счетов</h4>
          <SelectCustom
            {...register('billingCountry', generalValidation())}
            error={errors.billingCountry}
            options={countries}
          ></SelectCustom>
          <Input
            {...register('billingCity', generalValidation())}
            placeholder="Город"
            id="billingCity"
            error={errors.billingCity}
          />
          <Input
            {...register('billingStreet', generalValidation())}
            placeholder="Улица"
            id="billingStreet"
            error={errors.billingStreet}
          />
          <Input
            {...register('billingHouseNumber', generalValidation())}
            placeholder="Дом"
            id="billingHouseNumber"
            error={errors.billingHouseNumber}
          />
          <Input
            {...register('billingApartment', generalValidation())}
            placeholder="Квартира"
            id="billingApartment"
            error={errors.billingApartment}
          />
          <Input
            {...register('billingPostcode', postalCodeValidation(
                billingCountry ? countries.find((item) => billingCountry === item.code)!.postalPattern! : /^\b\d{5}\b(?:[- ]{1}\d{4})?$/
            ))}
            placeholder="Индекс"
            id="billingPostcode"
            error={errors.billingPostcode}
          />
          <Controller
            name="defaultShipping"
            control={control}
            defaultValue={true}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} color="success" />}
                label="Установить в качестве платежного адреса по умолчанию"
              />
            )}
          />
          <Controller
            name="sameAddress"
            control={control}
            defaultValue={true}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} color="success" />}
                label="Используйте один и тот же адрес как для выставления счета, так и для доставки"
              />
            )}
          />
        </div>

        <div className={styles.container__shipping}>
          <h4 className={styles.info__title}>Адрес доставки</h4>

          <SelectCustom
            {...register('shippingCountry', generalValidation())}
            error={errors.shippingCountry}
            options={countries}
          ></SelectCustom>

          <Input
            {...register('shippingCity', generalValidation(!sameAddress))}
            placeholder="Город"
            id="shippingCity"
            error={errors.shippingCity}
            disabled={sameAddress}
          />
          <Input
            {...register('shippingStreet', generalValidation(!sameAddress))}
            placeholder="Улица"
            id="shippingStreet"
            error={errors.shippingStreet}
            disabled={sameAddress}
          />
          <Input
            {...register(
              'shippingHouseNumber',
              generalValidation(!sameAddress),
            )}
            placeholder="Дом"
            id="shippingHouseNumber"
            error={errors.shippingHouseNumber}
            disabled={sameAddress}
          />
          <Input
            {...register('shippingApartment', generalValidation(!sameAddress))}
            placeholder="Квартира"
            id="shippingApartment"
            error={errors.shippingApartment}
            disabled={sameAddress}
          />
          <Input
            {...register('shippingPostcode', postalCodeValidation(
                shippingCountry ? countries.find((item) => shippingCountry === item.code)!.postalPattern! : /^\b\d{5}\b(?:[- ]{1}\d{4})?$/
            ))}
            placeholder="Индекс"
            id="shippingPostcode"
            error={errors.shippingPostcode}
            disabled={sameAddress}
          />
          <Controller
            name="defaultBilling"
            control={control}
            defaultValue={true}
            disabled={sameAddress}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} color="success" />}
                label="Установить адрес доставки по умолчанию"
              />
            )}
          />
        </div>
      </div>
      <div className={styles.actions}>
        <Button className={styles.button}>Регистрация</Button>
        <div className={styles.submit}>
          <div className={styles.accaunt}>Уже есть аккаунт?</div>
          <Link className={styles.login} to="/login">
            Войдите
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Registration;
