import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/button/Button.tsx';
import { RegistrationForm } from '../../interface/registrationForm.ts';
import { customerService } from '../../services/customer.service.ts';
import { dateValidation } from '../../validators/date-validation.ts';
import { generalValidation } from '../../validators/general-validation.ts';
import { loginValidation } from '../../validators/login-validation.ts';
import { nameValidation } from '../../validators/name-validation.ts';
import { passwordValidation } from '../../validators/password-validation.ts';
import { repeatPasswordValidation } from '../../validators/repeat-password-validation.ts';
import styles from './registration.module.scss';

const Registration: React.FC = () => {
  const navigate = useNavigate();
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
    firstName,
    lastName,
    dateOfBirth,
    shippingCountry,
    billingCountry,
    shippingCity,
    billingCity,
    shippingStreet,
    billingStreet,
    shippingHouseNumber,
    billingHouseNumber,
    shippingApartment,
    billingApartment,
    shippingPostcode,
    billingPostcode,
    sameAddress,
    defaultBilling,
    defaultShipping,
    newPassword,
    currentPassword,
    registerPassword,
    repeatPassword,
  }) => {
    const { statusCode } = await customerService.registration({
      email,
      firstName,
      lastName,
      dateOfBirth,
      shippingCountry,
      billingCountry,
      shippingCity,
      billingCity,
      shippingStreet,
      billingStreet,
      shippingHouseNumber,
      billingHouseNumber,
      shippingApartment,
      billingApartment,
      shippingPostcode,
      billingPostcode,
      sameAddress,
      defaultBilling,
      defaultShipping,
      newPassword,
      currentPassword,
      repeatPassword,
      password: registerPassword,
    });
    if (statusCode === 201) {
      navigate('/login');
      return;
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
