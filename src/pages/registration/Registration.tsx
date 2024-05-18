import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/button/Button.tsx';
import { customerService } from '../../services/customer.service.ts';
import { loginValidation } from '../../validators/login-validation.ts';
import { passwordValidation } from '../../validators/password-validation.ts';
import { repeatPasswordValidation } from '../../validators/repeat-password-validation.ts';
import styles from './registration.module.scss';

type RegistrationForm = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  registerPassword: string;
  repeatPassword: string;
};

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
    firstName,
    lastName,
    //  dateOfBirth,
    email,
    registerPassword,
  }) => {
    const { statusCode } = await customerService.registration({
      firstName: firstName,
      lastName: lastName,
      //dateOfBirth: dateOfBirth,
      email: email,
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
        <input
          {...register('firstName')}
          className={styles.input}
          id="first-name"
          type="text"
          name="first-name"
          placeholder="First Name"
        />
        <input
          {...register('lastName')}
          className={styles.input}
          id="last-name"
          type="text"
          name="last-name"
          placeholder="Last Name"
        />
        {/*    <input
          {...register('dateOfBirth')}
          className={styles.input}
          id="date-birth"
          type="text"
          name="date-birth"
          placeholder="dateOfBirth"
        /> */}
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
