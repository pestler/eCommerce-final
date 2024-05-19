/* const onSubmit: SubmitHandler<RegistrationForm> = async (dto) => {
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

  return ( */

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
