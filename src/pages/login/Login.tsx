import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/button/Button.tsx';
import { loginValidation } from '../../validators/login-validation.ts';
import { passwordValidation } from '../../validators/password-validation.ts';
import styles from './login.module.scss';
import {customerService} from "../../services/customer.service.ts";

export type LoginForm = {
  email: string;
  password: string;
  error?: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const { statusCode } = await customerService.login(data);
    if (statusCode === 200) {
      navigate("/main");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.title}>Войти в личный кабинет</h3>
        <Input
          {...register('email', loginValidation())}
          placeholder="Enter email"
          type="text"
          error={errors.email}
        />
        <Input
          {...register('password', passwordValidation())}
          placeholder="Enter password"
          type="password"
          error={errors.password}
        />
        <label className={styles.checkbox}>
          <input className="checkbox-original" type="checkbox" />
          <span className="checkbox-custom"></span>
        </label>
        <Button className={styles.button}>Войти</Button>
        <div className={styles.submit}>
          <div className={styles.noaccaunt}>Нет аккаунта?</div>
          <Link className={styles.registration} to="/registration">
            Зарегистрируйтесь
          </Link>
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
