import { postAdminUser } from "@/api/services/mypage.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { TableAdminUser } from "@/types/mypage.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  nickname: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  password: z.string(),
  passwordRe: z.string(),
})

const Mypage: FC = () => {
  const [adminUser, setAdminuser] = useState<TableAdminUser>();

  // 관리자 정보 set
  useEffect(() => {
    const fetchData = async () => {
      const response = await postAdminUser();
      setAdminuser(response.data);
      console.log("-------관리자 정보 -------\n {}", response)
      console.log("------- adminUser -------\n {}", adminUser)
    };
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordRe: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("--- submit ---", values)
    // validation check
    // if(validationResult){} else {}
    // 관리자 정보 수정 api 호출
  }

  return (
      <div className="flex items-center justify-evenly p-6 mx-72 bg-white rounded-lg">
        <div className="flex flex-col space-y-10 w-full max-w-3xl">
          <h1>마이페이지</h1>
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                      <FormItem className="w-96">
                        <FormLabel>이름 <span className="text-destructive font-bold">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder={"이름"} {...field}></Input>
                        </FormControl>
                        <FormDescription>
                          필수 입력 사항입니다.
                        </FormDescription>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="nickname"
                  render={({field}) => (
                      <FormItem className="w-96">
                        <FormLabel>별명 <span className="text-destructive font-bold">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder={"별명"} {...field}></Input>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel>이메일 <span className="text-destructive font-bold">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder={"이메일"} {...field}></Input>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({field}) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>전화번호 <span className="text-destructive font-bold">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder={"전화번호"} {...field}></Input>
                        </FormControl>
                        <FormDescription>
                          번호만 입력해주세요.
                        </FormDescription>
                        <FormMessage/>
                      </FormItem>
                  )}
              />
              <div className="flex gap-5">
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem className="w-96">
                          <FormLabel>비밀번호</FormLabel>
                          <FormControl>
                            <Input placeholder={"비밀번호"} {...field}></Input>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passwordRe"
                    render={({field}) => (
                        <FormItem className="w-96">
                          <FormLabel>비밀번호 확인</FormLabel>
                          <FormControl>
                            <Input placeholder={"비밀번호 확인"} {...field}></Input>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                    )}
                />
              </div>
              <div className="flex justify-center space-x-4">
                <Button variant="destructive" className="mt-5" size={'lg'}> 취소 </Button>
                <Button type="submit" className="mt-5" size={'lg'}> 수정 </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
  )
}
export default Mypage