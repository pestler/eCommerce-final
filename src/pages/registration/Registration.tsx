import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/button/Button.tsx';
import { RegistrationForm } from '../../interface/registrationForm.ts';
import { customerService } from '../../services/customer.service.ts';
import { dateValidation } from '../../validators/date-validation.ts';
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
    <div className={styles.container__registration}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.title}>Регистрация на сайте</h3>

        <h4 className={styles.info__container}>Личная информация</h4>
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

        <h4>Адрес для выставления счетов</h4>
        <Input
          {...register('billingCountry')}
          placeholder="Country"
          id="country"
          error={errors.billingCountry}
        />
        <Input
          {...register('billingCity')}
          placeholder="City"
          id="billingCity"
          error={errors.billingCity}
        />
        <Input
          {...register('billingStreet')}
          placeholder="Stret"
          id="billingStreet"
          error={errors.billingStreet}
        />
        <Input
          {...register('billingHouseNumber')}
          placeholder="HouseNumber"
          id="billingHouseNumber"
          error={errors.billingHouseNumber}
        />
        <Input
          {...register('billingApartment')}
          placeholder="Apartment"
          id="billingApartment"
          error={errors.billingApartment}
        />
        <Input
          {...register('billingPostcode')}
          placeholder="Postcode"
          id="billingPostcode"
          error={errors.billingPostcode}
        />

        <h4>Адрес доставки</h4>
        <Input
          {...register('shippingCountry')}
          placeholder="Country"
          id="bilingCountry"
          error={errors.shippingCountry}
        />
        <Input
          {...register('shippingCity')}
          placeholder="City"
          id="shippingCity"
          error={errors.shippingCity}
        />
        <Input
          {...register('shippingStreet')}
          placeholder="Stret"
          id="shippingStreet"
          error={errors.shippingStreet}
        />
        <Input
          {...register('shippingHouseNumber')}
          placeholder="HouseNumber"
          id="shippingHouseNumber"
          error={errors.shippingHouseNumber}
        />
        <Input
          {...register('shippingApartment')}
          placeholder="Apartment"
          id="shippingApartment"
          error={errors.shippingApartment}
        />
        <Input
          {...register('shippingPostcode')}
          placeholder="Postcode"
          id="shippingPostcode"
          error={errors.shippingPostcode}
        />

        <Button className={styles.button}>Регистрация</Button>

        <div className={styles.submit}>
          <div className={styles.accaunt}>Уже есть аккаунт?</div>
          <Link className={styles.login} to="/login">
            Войдите
          </Link>
        </div>
      </form>
      <div className={styles.picbox}></div>
    </div>
  );
};

export default Registration;
