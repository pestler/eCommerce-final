import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './login.module.scss';

type FormInputs = {
  loginEmail: string;
  password: string;
  error?: string;
};

const message: FormInputs = {
  loginEmail: 'Please enter loginEmail.',
  password:
    'Ваш пароль включает хотя бы одну строчную букву, одну прописную букву, одну цифру и один специальный символ.',
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
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.title}>Войти в личный кабинет</h3>
        <input
          {...register('loginEmail', {
            pattern: /^\S+@\S+\.\S+$/,
            required: true,
          })}
          className={styles.input}
          placeholder="Enter email"
          type="text"
        />
        {errors.loginEmail && errors.loginEmail.type === 'pattern' && (
          <span>{message.loginEmail}</span>
        )}
        <input
          {...register('password', {
            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
            required: true,
          })}
          className={styles.input}
          placeholder="Enter password"
          type="text"
        />
        {errors.password && errors.password.type === 'required' && (
          <span>This is required</span>
        )}
        {errors.password && errors.password.type === 'pattern' && (
          <span>{message.password}</span>
        )}
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
