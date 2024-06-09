import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/button/Button.tsx';
import { useAuth } from '../../hooks/useAuth.ts';
import { useLoader } from '../../hooks/useLoader.ts';
import { IChangePasswordForm } from '../../interface/changePasswordForm.interface.ts';
import { UpdateUserInfo } from '../../interface/registrationForm.interface.ts';
import { BadRequest } from '../../interface/responseError.interface.ts';
import { customerService } from '../../services';
import { loginValidation, passwordValidation } from '../../validators';
import { dateValidation } from '../../validators/date-validation.ts';
import { generalValidation } from '../../validators/general-validation.ts';
import { surnameValidation } from '../../validators/name-surname-validation.ts';
import styles from './profile.module.scss';

const Profile: React.FC = () => {
  const { showLoader, hideLoader } = useLoader();
  const { enqueueSnackbar } = useSnackbar();
  const { user, login } = useAuth();
  const defaultValues: UpdateUserInfo = {
    firstName: user!.firstName!,
    lastName: user!.lastName!,
    email: user!.email!,
    dateOfBirth: user!.dateOfBirth!,
  };
  const [isChanged, setIsChanged] = useState(false);
  const [customer, setCustomer] = useState<UpdateUserInfo>(defaultValues);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateUserInfo>({
    mode: 'onChange',
    defaultValues: customer,
  });

  const {
    register: registerPassForm,
    handleSubmit: handleSubmitPassForm,
    formState: { errors: errorsPassForm, isValid: isValidPassForm },
  } = useForm<IChangePasswordForm>({
    mode: 'onChange',
  });

  const watchedValues = watch();

  const updateUserInfo = useCallback(
    async (data: UpdateUserInfo, version: number, id: string) => {
      showLoader();
      try {
        const { body } = await customerService.updateCustomer(
          id,
          version,
          data,
        );
        setCustomer({
          firstName: body.firstName ?? '',
          lastName: body.lastName ?? '',
          dateOfBirth: body.dateOfBirth ?? '',
          email: body.email,
        });
        login(body);
        enqueueSnackbar(`Данные пользователя обновлены`, {
          variant: 'success',
        });
        hideLoader();
      } catch (e: unknown) {
        const { message } = e as BadRequest;
        enqueueSnackbar(`Ошибка обновления данных пользователя: ${message}`, {
          variant: 'error',
        });
        hideLoader();
      }
    },
    [],
  );

  const changePassword = useCallback(
    async (data: IChangePasswordForm, version: number, id: string) => {
      showLoader();
      try {
        await customerService.changePassword(id, version, data);
        enqueueSnackbar(`Пароль пользователя успешно обновлен`, {
          variant: 'success',
        });
        const { body } = await customerService.login({
          email: user!.email,
          password: data.newPassword,
        });
        login(body.customer);
        hideLoader();
      } catch (e: unknown) {
        const { message } = e as BadRequest;
        enqueueSnackbar(`Ошибка: ${message}`, { variant: 'error' });
        hideLoader();
      }
    },
    [],
  );

  useEffect(() => {
    const isFormChanged =
      JSON.stringify(watchedValues) !== JSON.stringify(customer);
    setIsChanged(isFormChanged);
  }, [watchedValues, user]);

  const onSubmit: SubmitHandler<UpdateUserInfo> = async (data) => {
    await updateUserInfo(data, user!.version, user!.id);
  };

  const changePasswordSubmit: SubmitHandler<IChangePasswordForm> = async (
    data,
  ) => {
    await changePassword(data, user!.version, user!.id);
  };

  return (
    <div className="container">
      <div className={styles.profile}>
        <h1>Личный кабинет</h1>
        <div className={styles.forms}>
          <div className={styles.userInfo}>
            <h2>Личная информация</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register('firstName', surnameValidation())}
                placeholder="Имя"
                type="text"
                error={errors.firstName}
              />
              <Input
                {...register('lastName', surnameValidation())}
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
              <div className="action">
                <Button className={styles.button} disabled={!isChanged}>
                  Сохранить
                </Button>
              </div>
            </form>
          </div>
          <div className={styles.userInfo}>
            <h2>Сменить пароль</h2>
            <form
              className={styles.form}
              onSubmit={handleSubmitPassForm(changePasswordSubmit)}
            >
              <Input
                {...registerPassForm('currentPassword', generalValidation())}
                placeholder="Текущий пароль"
                type="password"
                error={errorsPassForm.currentPassword}
              />
              <Input
                {...registerPassForm('newPassword', passwordValidation())}
                placeholder="Новый пароль"
                type="password"
                error={errorsPassForm.newPassword}
              />
              <div className="action">
                <Button className={styles.button} disabled={!isValidPassForm}>
                  Сменить пароль
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
