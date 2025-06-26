import { useState } from 'react';
import { Key, Loader2, Mail } from 'lucide-react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  Label,
  Input,
  DialogFooter,
} from '@/shared/ui';
import { Alert, AlertDescription } from '@/shared/ui/alert';
import { useResetPassword, useResetPasswordConfirm } from '@/entities/User';

export const ResetPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { mutate: reset } = useResetPassword();
  const { mutate: confirm } = useResetPasswordConfirm();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    reset(email, {
      onSuccess: () => {
        setStep('otp');
        setSuccess('OTP код отправлен на вашу почту');
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      setIsLoading(false);
      return;
    }

    confirm(
      { email, code: otpCode, password: newPassword },
      {
        onSuccess: () => {
          setSuccess('Пароль успешно изменен!');
          handleClose();
        },
        onSettled: () => {
          setIsLoading(false);
        },
        onError: () => {
          setError('Неверный OTP код или произошла ошибка');
        },
      },
    );
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep('email');
    setEmail('');
    setOtpCode('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtpCode('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='link' className='p-0 h-auto text-sm'>
          Забыли пароль?
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        {step === 'email' ? (
          <>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2'>
                <Mail className='h-5 w-5' />
                Восстановление пароля
              </DialogTitle>
              <DialogDescription>
                Введите ваш email адрес. Мы отправим код для сброса пароля.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleEmailSubmit}>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email адрес</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='example@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <Alert variant='destructive'>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}
              </div>

              <DialogFooter className='mt-6'>
                <Button type='button' variant='outline' onClick={handleClose}>
                  Отмена
                </Button>
                <Button type='submit' disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Отправить код
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2'>
                <Key className='h-5 w-5' />
                Введите код и новый пароль
              </DialogTitle>
              <DialogDescription>
                Код отправлен на: <strong>{email}</strong>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handlePasswordReset}>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='otp'>OTP код</Label>
                  <Input
                    id='otp'
                    type='text'
                    placeholder='123456'
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='newPassword'>Новый пароль</Label>
                  <Input
                    id='newPassword'
                    type='password'
                    placeholder='Введите новый пароль'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='confirmPassword'>Подтвердите пароль</Label>
                  <Input
                    id='confirmPassword'
                    type='password'
                    placeholder='Повторите новый пароль'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <Alert variant='destructive'>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && <p>{success}</p>}
              </div>

              <DialogFooter className='mt-6'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleBackToEmail}
                >
                  Назад
                </Button>
                <Button type='submit' disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Сменить пароль
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
