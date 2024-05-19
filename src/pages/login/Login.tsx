import React from 'react';
import styles from './login.module.scss';
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {customerService} from "../../services";
import Button from "../../components/button/Button.tsx";
import Input from "../../components/Input/Input.tsx";
import {loginValidation, passwordValidation} from "../../validators";
import {useAuth} from "../../hooks/useAuth.ts";
import {useSnackbar} from "notistack";

export type LoginForm = {
  email: string;
  password: string;
  error?: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const { statusCode, body } = await customerService.login(data)
      if (statusCode === 200) {
        login(body.customer);
        enqueueSnackbar(`Привет ${body.customer.email}. Вы успешно авторизовались.`, { variant: 'success' })
        navigate('/');
        return;
      }
    } catch (e) {
      enqueueSnackbar(`Пользователь не найден. Проверьте введенные данные.`, { variant: 'error' })
      setError('password', { message: 'Проверите веденные данные' });
      setError('email', { message: 'Проверите веденные данные' });
    }
  };


  return (
    <div className={styles.container__login}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.titleForm}>Войти в личный кабинет</h3>
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
