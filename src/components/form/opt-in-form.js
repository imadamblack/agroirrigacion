import Link from 'next/link';
import { info } from '../../../info';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';
import { useState } from 'react';
import { restrictNumber, emailRegExp } from '../../utils/formValidators';
import fbEvent from '../../services/fbEvents';
import { Radio, Select } from './formAtoms';
import { mexicanStates } from '../../catalogs/mexican-states';

export default function OptInForm() {
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const methods = useForm({mode: 'all'});
  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
  } = methods;

  const onSubmit = (data) => {
    setSending(true);
    data.phone = '52' + data.phone.replace(/^(MX)?\+?(52)?\s?0?1?|\s|\(|\)|-|[a-zA-Z]/g, '');
    data.origin = 'Notoriovs Landing';

    const _fbc = getCookie('_fbc');
    const _fbp = getCookie('_fbp');
    const payload = {...data, _fbc, _fbp};

    fetch(info.optInWebhook, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((result) => result.json())
      // Send FB Event
      .then(({id}) => {
        fbEvent(
          'Lead',
          {email: data.email, phone: data.phone, externalID: id},
        );
        setCookie('lead', {...data, id});
      })
      .catch(() => {
        fbEvent(
          'Lead',
          {email: data.email, phone: data.phone, externalID: ''},
        );
        setCookie('lead', {...data});
      })
      .then(() => {
        if (info.surveyRedirect !== '') {
          const forwardLink = document.createElement('a');
          forwardLink.href = info.surveyRedirect;
          forwardLink.target = '_blank';
          forwardLink.click();
        }
        router.push(`/thankyou`);
      });
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register(
            'fullName',
            {
              required: true,
            },
          )}
          className={errors.fullName && '!bg-red-200'}
          placeholder="Tu nombre"/>
        <input
          {...register(
            'email',
            {
              required: true,
              pattern: {
                value: emailRegExp,
                message: 'Revisa tu correo',
              },
            },
          )}
          className={errors.email && '!bg-red-200'}
          placeholder="Un email activo"/>
        <input
          {...register(
            'phone',
            {required: true, maxLength: 10, minLength: 10},
          )}
          className={errors.phone && '!bg-red-200'}
          onKeyDown={restrictNumber}
          placeholder="Teléfono de WhatsApp"/>

        <Select
          options={mexicanStates}
          name="state"
          inputOptions={{required: true}}
          placeholder="Selecciona un estado"
          className={`rounded-md px-6 py-4 bg-white ${errors.state && '!bg-red-200'}`}
        />

        <input
          {...register(
            'city',
            {required: true},
          )}
          className={errors.city && '!bg-red-200'}
          placeholder="Ciudad o localidad"/>
        <div className={`rounded-md px-6 py-4 bg-white ${errors.city && '!bg-red-200'}`}>
          <p>Tipo de cultivo</p>
          <Radio
            name="cropType"
            inputOptions={{required: true}}
            optCols={2}
            options={[
              {value: 'berries', label: 'Berries'},
              {value: 'frutales', label: 'Frutales'},
              {value: 'hortalizas', label: 'Hortalizas'},
              {value: 'brasicas', label: 'Brassicas'},
              {value: 'ornamentales', label: 'Ornamentales'},
              {value: 'otro', label: 'Otro'},
            ]}
          />
        </div>
        <input
          {...register(
            'hectare',
          )}
          className={errors.hectare && '!bg-red-200'}
          onKeyDown={restrictNumber}
          placeholder="Hectáreas de cultivo (en número)"/>

        <button
          disabled={sending}
          className={`w-full ${sending ? '!bg-transparent' : 'hover:!bg-brand-3'}`}
        >{
          !sending
            ? 'Cotizar mi proyecto →'
            : <span className="material-symbols-outlined animate-spin">progress_activity</span>
        }</button>
        <hr className="!my-12"/>
        <a
          href={`https://wa.me/${info.whatsapp.value}`}
          className={`button !bg-transparent !text-brand-5 !w-full`}
        >{
          !sending
            ? 'Contactar vía WhatsApp →'
            : <span className="material-symbols-outlined animate-spin">progress_activity</span>
        }</a>

        <div className="mt-4">
          <p className="-ft-3 text-center text-white">Al dar clic aceptas nuestra&nbsp;
            <Link href={info.privacyNotice}>política de privacidad</Link>
          </p>
        </div>
      </form>
    </FormProvider>
  );
}