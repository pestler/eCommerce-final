import { useSnackbar } from 'notistack';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/button/Button.tsx';
import { useAuth } from '../../hooks/useAuth.ts';
import { RegistrationForm } from '../../interface/registrationForm.ts';
import { customerService } from '../../services';
import {
  loginValidation,
  passwordValidation,
  repeatPasswordValidation,
} from '../../validators';
import { dateValidation } from '../../validators/date-validation.ts';
import { nameValidation } from '../../validators/name-validation.ts';
import styles from './registration.module.scss';
import {generalValidation} from "../../validators/general-validation.ts";

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationForm>({
    mode: 'onChange',
  });

  const passwordValue = watch('registerPassword');

  const onSubmit: SubmitHandler<RegistrationForm> = async ({
    email,
    registerPassword,
    firstName,
    lastName,
    dateOfBirth,
    billingCountry,
    billingHouseNumber,
    //billingApartment,
    //billingStreet,
    billingCity,
    billingPostcode,
    shippingCountry,
    shippingCity,
    //shippingStreet,
    shippingHouseNumber,
    //shippingApartment,
    shippingPostcode,
  }) => {
    const { statusCode } = await customerService.registration({
      email,
      password: registerPassword,
      firstName,
      lastName,
      dateOfBirth,
      billingAddress: {
        country: billingCountry,
        city: billingCity,
        postalCode: billingPostcode,
        streetNumber: billingHouseNumber,
      },
      shippingAddress: {
        country: shippingCountry,
        city: shippingCity,
        postalCode: shippingPostcode,
        streetNumber: shippingHouseNumber,
      },
    });
    if (statusCode === 201) {
      navigate('/login');
      return;
  const onSubmit: SubmitHandler<RegistrationForm> = async (dto) => {
    try {
      const { statusCode, body } = await customerService.registration({
        ...dto,
        password: dto.registerPassword,
      });
      if (statusCode === 201) {
        login(body.customer);
        enqueueSnackbar(
          `Привет ${body.customer.email}. Вы успешно авторизовались.`,
          { variant: 'success' },
        );
        navigate('/');
      }
    } catch (e) {
      enqueueSnackbar(`Ошибка регистрации`, { variant: 'error' });
    }
  };

  return (

    // <div className={styles.container__registration}>
    //   <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
    //     <h3 className={styles.title}>Регистрация на сайте</h3>
    //     <div className={styles.formContainer}>
    //       <div className={styles.formGroup}>
    //         <h4 className={styles.info__container}>Личная информация</h4>
    //         <Input
    //           {...register('firstName', nameValidation())}
    //           placeholder="Имя"
    //           type="text"
    //           error={errors.firstName}
    //         />
    //         <Input
    //           {...register('lastName', nameValidation())}
    //           id="last-name"
    //           placeholder="Фамилия"
    //           type="text"
    //           error={errors.lastName}
    //         />
    //         <Input
    //           {...register('dateOfBirth', dateValidation())}
    //           id="date-birth"
    //           type="date"
    //           placeholder="Дата рождения"
    //           error={errors.dateOfBirth}
    //           aria-invalid="true"
    //         />
    //         <Input
    //           {...register('email', loginValidation())}
    //           placeholder="Электронная почта"
    //           type="text"
    //           error={errors.email}
    //         />
    //         <Input
    //           {...register('registerPassword', passwordValidation())}
    //           placeholder="Пароль"
    //           type="password"
    //           error={errors.registerPassword}
    //         />
    //         <Input
    //           {...register(
    //             'repeatPassword',
    //             repeatPasswordValidation(passwordValue),
    //           )}
    //           placeholder="Повторите пароль"
    //           type="password"
    //           error={errors.repeatPassword}
    //         />
    //       </div>
    //
    //       <div className={styles.formGroup}>
    //         <h4 className={styles.info__container}>
    //           Адрес для выставления счетов
    //         </h4>
    //         <Input
    //           {...register('billingCountry')}
    //           placeholder="Страна"
    //           id="country"
    //           error={errors.billingCountry}
    //         />
    //         <Input
    //           {...register('billingCity')}
    //           placeholder="Город"
    //           id="billingCity"
    //           error={errors.billingCity}
    //         />
    //         <Input
    //           {...register('billingStreet')}
    //           placeholder="Улица"
    //           id="billingStreet"
    //           error={errors.billingStreet}
    //         />
    //         <Input
    //           {...register('billingHouseNumber')}
    //           placeholder="Дом"
    //           id="billingHouseNumber"
    //           error={errors.billingHouseNumber}
    //         />
    //         <Input
    //           {...register('billingApartment')}
    //           placeholder="Квартира"
    //           id="billingApartment"
    //           error={errors.billingApartment}
    //         />
    //         <Input
    //           {...register('billingPostcode')}
    //           placeholder="Индекс"
    //           id="billingPostcode"
    //           error={errors.billingPostcode}
    //         />
    //       </div>
    //
    //       <div className={styles.formGroup}>
    //         <h4 className={styles.info__container}>Адрес доставки</h4>
    //         <Input
    //           {...register('shippingCountry')}
    //           placeholder="Страна"
    //           id="bilingCountry"
    //           error={errors.shippingCountry}
    //         />
    //         <Input
    //           {...register('shippingCity')}
    //           placeholder="Город"
    //           id="shippingCity"
    //           error={errors.shippingCity}
    //         />
    //         <Input
    //           {...register('shippingStreet')}
    //           placeholder="Улица"
    //           id="shippingStreet"
    //           error={errors.shippingStreet}
    //         />
    //         <Input
    //           {...register('shippingHouseNumber')}
    //           placeholder="Дом"
    //           id="shippingHouseNumber"
    //           error={errors.shippingHouseNumber}
    //         />
    //         <Input
    //           {...register('shippingApartment')}
    //           placeholder="Квартира"
    //           id="shippingApartment"
    //           error={errors.shippingApartment}
    //         />
    //         <Input
    //           {...register('shippingPostcode')}
    //           placeholder="Индекс"
    //           id="shippingPostcode"
    //           error={errors.shippingPostcode}
    //         />
    //       </div>
    //     </div>
    //     <div className={styles.actions}>
    //       <Button className={styles.button}>Регистрация</Button>
    //       <div className={styles.submit}>
    //         <div className={styles.accaunt}>Уже есть аккаунт?</div>
    //         <Link className={styles.login} to="/login">
    //           Войдите
    //         </Link>
    //       </div>
    //     </div>
    //   </form>
    // </div>

    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Регистрация на сайте</h3>

      <div className={styles.container__registration}>
        <div className={styles.container__general}>
          <h4 className={styles.info__title}>Личная информация</h4>

          <Input
            {...register('firstName', nameValidation())}
            placeholder="First Name"
            type="text"
            error={errors.firstName}
          />
          <Input
            {...register('lastName', nameValidation())}
            id="last-name"
            placeholder="Last Name"
            type="text"
            error={errors.lastName}
          />
          <Input
            {...register('dateOfBirth', dateValidation())}
            id="date-birth"
            type="date"
            placeholder="dateOfBirth"
            error={errors.dateOfBirth}
            aria-invalid="true"
          />

          <Input
            {...register('email', loginValidation())}
            placeholder="Enter email"
            type="text"
            error={errors.email}
          />
          <Input
            {...register('registerPassword', passwordValidation())}
            placeholder="Enter password"
            type="password"
            error={errors.registerPassword}
          />
          <Input
            {...register(
              'repeatPassword',
              repeatPasswordValidation(passwordValue),
            )}
            placeholder="Repeat password"
            type="password"
            error={errors.repeatPassword}
          />
        </div>

        <div className={styles.container__billing}>
          <h4 className={styles.info__title}>Адрес для выставления счетов</h4>
          <Input
            {...register('billingCountry', generalValidation())}
            placeholder="Country"
            id="country"
            error={errors.billingCountry}
          />
          <Input
            {...register('billingCity', generalValidation())}
            placeholder="City"
            id="billingCity"
            error={errors.billingCity}
          />
          <Input
            {...register('billingStreet', generalValidation())}
            placeholder="Stret"
            id="billingStreet"
            error={errors.billingStreet}
          />
          <Input
            {...register('billingHouseNumber', generalValidation())}
            placeholder="HouseNumber"
            id="billingHouseNumber"
            error={errors.billingHouseNumber}
          />
          <Input
            {...register('billingApartment', generalValidation())}
            placeholder="Apartment"
            id="billingApartment"
            error={errors.billingApartment}
          />
          <Input
            {...register('billingPostcode', generalValidation())}
            placeholder="Postcode"
            id="billingPostcode"
            error={errors.billingPostcode}
          />
        </div>

        <div className={styles.container__shipping}>
          <h4 className={styles.info__title}>Адрес доставки</h4>
          <Input
            {...register('shippingCountry', generalValidation())}
            placeholder="Country"
            id="bilingCountry"
            error={errors.shippingCountry}
          />
          <Input
            {...register('shippingCity', generalValidation())}
            placeholder="City"
            id="shippingCity"
            error={errors.shippingCity}
          />
          <Input
            {...register('shippingStreet', generalValidation())}
            placeholder="Stret"
            id="shippingStreet"
            error={errors.shippingStreet}
          />
          <Input
            {...register('shippingHouseNumber', generalValidation())}
            placeholder="HouseNumber"
            id="shippingHouseNumber"
            error={errors.shippingHouseNumber}
          />
          <Input
            {...register('shippingApartment', generalValidation())}
            placeholder="Apartment"
            id="shippingApartment"
            error={errors.shippingApartment}
          />
          <Input
            {...register('shippingPostcode', generalValidation())}
            placeholder="Postcode"
            id="shippingPostcode"
            error={errors.shippingPostcode}
          />
        </div>
      </div>

      <Button className={styles.button}>Регистрация</Button>

      <div className={styles.submit}>
        <div className={styles.accaunt}>Уже есть аккаунт?</div>
        <Link className={styles.login} to="/login">
          Войдите
        </Link>
      </div>
    </form>
  );
};

export default Registration;
