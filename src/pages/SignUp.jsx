import pb from '@/api/pocketbase';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useState } from 'react';
import useAuthStore from '@/store/auth';
import debounce from '@/utils/debounce';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formState, setFormState] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const navigate = useNavigate();

  const signUp = useAuthStore((state) => state.signUp);
  const isValidForm = Object.values(formState).every((value) => value !== '');

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, nickname, password, passwordConfirm } = formState;

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await signUp({
        email: email,
        nickname: nickname,
        password: password,
        passwordConfirm: passwordConfirm,
      });
      console.log('회원가입 성공');
      navigate('/welcome');
    } catch (error) {
      console.error(error.message);
      alert('입력한 내용을 확인해주세요');
    }
  };

  const handleInput = debounce((e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormState({
      ...formState,
      [name]: value,
    });
  }, 400);

  return (
    <>
      <h2 className="sr-only">회원가입 페이지</h2>
      <form onSubmit={handleSignUp}>
        <div className="flex items-center justify-center pt-[123px]">
          <div className="w-[250px] h-[128px] flex flex-col">
            <p className="text-xs pl-2 pb-1">이메일</p>
            <div className="flex flex-row w-[265px] space-x-1 items-center justify-center">
              <label htmlFor="inputEmail" className="sr-only">
                이메일 입력 공간
              </label>
              <Input
                placeholder="인증 가능한 이메일 주소"
                width="w-[186px]"
                height="h-[42px]"
                name="email"
                value={formState.email}
                onChange={handleInput}
              />
              <Button
                text="중복확인"
                title="이메일 중복확인 버튼입니다"
                width="w-[62px]"
                height="h-[42px]"
                fontcolor="text-gray900"
                fontsize="text-xs"
                bgcolor="bg-primary"
              />
            </div>
            <p className="text-infoError text-[10px] font-bold pl-2 py-1">
              이메일을 양식에 맞게 입력해주세요
            </p>
            <p className="text-xs pl-2 pb-1">닉네임</p>
            <div className="flex flex-row w-[265px] space-x-1 items-center justify-center">
              <label htmlFor="inputNickname" className="sr-only">
                닉네임 입력 공간
              </label>
              <Input
                placeholder="2~8문자(특수문자 사용불가)"
                width="w-[186px]"
                height="h-[42px]"
                name="nickname"
                value={formState.nickname}
                onChange={handleInput}
              />
              <Button
                text="중복확인"
                title="닉네임 중복확인 버튼입니다"
                width="w-[62px]"
                height="h-[42px]"
                fontcolor="text-gray900"
                fontsize="text-xs"
                bgcolor="bg-primary"
              />
            </div>
            <p className="text-infoError text-[10px] font-bold pl-2 py-1">
              중복된 닉네임입니다
            </p>
            <p className="text-xs pl-2 pb-1">비밀번호</p>
            <div className="flex flex-row w-[265px] space-x-1 items-center justify-center">
              <label htmlFor="inputPassword" className="sr-only">
                비밀번호 입력 공간
              </label>
              <Input
                placeholder="비밀번호를 입력해주세요"
                width="w-[250px]"
                height="h-[42px]"
                type="password"
                name="password"
                value={formState.password}
                onChange={handleInput}
              />
            </div>
            <p className="text-infoError text-[10px] font-bold pl-2 py-1">
              비밀번호를 양식에 맞게 입력해주세요
            </p>
            <p className="text-xs pl-2 pb-1">비밀번호 확인</p>
            <div className="flex flex-row w-[265px] space-x-1 items-center justify-center">
              <label htmlFor="inputPasswordConfirm" className="sr-only">
                비밀번호 재입력 공간
              </label>
              <Input
                placeholder="비밀번호를 다시 입력해주세요"
                width="w-[250px]"
                height="h-[42px]"
                type="password"
                name="passwordConfirm"
                value={formState.passwordConfirm}
                onChange={handleInput}
              />
            </div>
            <p className="text-infoError text-[10px] font-bold pl-2 py-1">
              비밀번호가 일치하지 않습니다
            </p>
            <div className="flex w-[265px] items-center justify-center pt-6">
              <Button
                text="회원가입 하기"
                title="회원가입 버튼입니다"
                type="submit"
                width="w-[250px]"
                height="h-[54px]"
                fontsize="text-base"
                fontcolor={isValidForm ? 'text-gray900' : 'text-white'}
                bgcolor={isValidForm ? 'bg-primary' : 'bg-gray750'}
                disabled={!isValidForm}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUp;