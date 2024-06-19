import { useSnackbar } from 'notistack';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input.tsx';
import CustomButton from '../../components/button/CustomButton.tsx';
import { useAuth } from '../../hooks';
import { customerService } from '../../services';
import { loginValidation, passwordValidation } from '../../validators';
import styles from './login.module.scss';

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
    formState: { errors, isValid },
    setError,
  } = useForm<LoginForm>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const { statusCode, body } = await customerService.login(data);
      if (statusCode === 200) {
        login(body.customer);
        enqueueSnackbar(
          `Привет ${body.customer.email}. Вы успешно авторизовались.`,
          { variant: 'success' },
        );
        navigate('/');
        return;
      }
    } catch (e) {
      enqueueSnackbar(`Пользователь не найден. Проверьте введенные данные.`, {
        variant: 'error',
      });
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
          placeholder="Введите электронную почту"
          type="text"
          error={errors.email}
        />
        <Input
          {...register('password', passwordValidation())}
          placeholder="Введите пароль"
          type="password"
          error={errors.password}
        />
        <CustomButton className={styles.button} disabled={!isValid}>
          Войти
        </CustomButton>
        <div className={styles.submit}>
          <div className={styles.noaccaunt}>Нет аккаунта?</div>
          <Link className={styles.registration} to="/registration">
            Зарегистрируйтесь
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
