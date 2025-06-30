import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z
    .string()
    .min(1, "아이디가 올바르지 않습니다. 다시 입력해주세요."),
  password: z
    .string()
    .min(
      1,
      "비밀번호가 올바르지 않습니다.\n영문/숫자/특수문자를 조합하여 10~16자 이내로 입력해주세요."
    )
    .regex(
      /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/,
      "비밀번호가 올바르지 않습니다.\n영문/숫자/특수문자를 조합하여 10~16자 이내로 입력해주세요."
    ),
});

const LoginPage: FC = () => {
  const {
    login,
    loading,
    errors,
  } = useAuth();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await login(values);
  };

  useEffect(() => {
    if (errors.username) {
      form.setError("username", {message: errors.username});
    }
    if (errors.password) {
      form.setError("password", {message: errors.password});
    }
  }, [errors, form, form.setError]);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8 w-full max-w-lg">
        <img
          src={"/logo.png"}
          alt="로고"
          className="w-128 h-auto" // 이미지 크기 조절이 필요한 경우 수정하세요
        />
        <h2 className="scroll-m-20 pb-2 text-3xl font-bold text-main tracking-tight first:mt-0">
          for ADMIN
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            <FormField
              control={form.control}
              name="username"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="계정" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="비밀번호" {...field} />
                  </FormControl>
                  <FormMessage className="min-h-[2.5rem]" fixed/>
                </FormItem>
              )}
            />
            <p className="text-sm text-gray-500">
              * 비밀번호는 영문/숫자/특수문자를 조합하여 10~16자 이내로 입력해주세요.
            </p>
            {loading ? (
              <Button className="w-full" disabled>
                <Loader2 className="animate-spin" />
                로그인 중...
              </Button>
            ) : (
              <Button className="w-full bg-main hover:bg-third" type="submit">
                로그인
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
