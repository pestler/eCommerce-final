import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './login.module.scss';
import Input from "../../components/Input/Input.tsx";
import {loginValidation} from "../../validators/login-validation.ts";
import {passwordValidation} from "../../validators/password-validation.ts";

type FormInputs = {
  loginEmail: string;
  password: string;
  error?: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    mode: 'onChange',
    defaultValues: {
      loginEmail: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.title}>Войти в личный кабинет</h3>
        <Input
          {...register('loginEmail', loginValidation)}
          placeholder="Enter email"
          type="text"
          error={errors.loginEmail}
        />
        <Input
          {...register('password', passwordValidation)}
          placeholder="Enter password"
          type="text"
          error={errors.password}
        />
        <label className={styles.checkbox}>
          <input className="checkbox-original" type="checkbox" />
          <span className="checkbox-custom"></span>
        </label>
        <button className={styles.button}>Войти</button>
        <div className={styles.submit}>
          <div className={styles.noaccaunt}>Нет аккаунта</div>
          <div className={styles.registration}>Зарегистрируйтесь</div>
        </div>
      </form>
      <div className={styles.picbox}>
        <div className={styles.big}></div>
        <div className={styles.small}></div>
      </div>
    </div>
  );
};

export default Login;
