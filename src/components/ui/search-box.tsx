import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, subDays, subMonths, subYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { DateRange } from "react-day-picker";
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
 
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface SearchOption extends Record<string, unknown> {
  startDate? : string
  endDate? : string
  keyword? : string
  searchFormat? : string
}

// 검색 옵션 타입 정의
interface SearchOptions {
  showKeyword?: boolean;      // 검색어 영역 표시
  showDateRange?: boolean;    // 기간 선택 영역 표시
  showSingleDates?: boolean;  // 시작일/종료일 개별 선택 영역 표시
  defaultStartDate?: Date;    // 기본 시작일
  defaultEndDate?: Date;      // 기본 종료일
  defaultKeyword?: string;    // 기본 검색어
  defaultSearchFormat?: string; // 통계 기본 검색 포맷
}

interface SearchProps extends React.HTMLAttributes<React.ElementRef<'div'>> {
  option?: SearchOption
  searchOptions?: SearchOptions
  // 검색 콜백 함수 타입 정의
  onSearch?: (values: SearchOption) => void  // FormValues 타입의 데이터를 파라미터로 받는 함수
}

// Zod 스키마 수정
const formSchema = z.object({
  startDate: z.string().optional(),
  endDate:  z.string().optional(),
  keyword: z.string().optional(),
  dateRange: z.date().optional(),
  searchFormat: z.string().optional()
});

export type FormValues = z.infer<typeof formSchema>;

// 시작일/종료일 입력 컴포넌트
const StatisticsSeachBox = ({ form }: { form: UseFormReturn<FormValues>  }) => {
  const [searchFormat, setSearchFormat ] = useState<string>(form.getValues('searchFormat')||'')
  const handleFormatChange = (mode: string) =>{
    setSearchFormat(mode)
  }

  useEffect(()=>{
    form.setValue('searchFormat', searchFormat)
  },[form, searchFormat])
  
  
  return (<FormItem className="flex items-center gap-x-2">
    <FormLabel className="min-w-20 h-9 flex items-center justify-start m-0 mt-2">시작일/종료일</FormLabel>
    <FormControl>
      <div className="flex gap-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {form.watch('startDate') || '시작일'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              defaultMonth={
                (() => {
                  const date = form.watch('startDate');
                  return date ? new Date(date) : new Date();
                })()
              }
              selected={
                (() => {
                  const date = form.watch('startDate');
                  return date ? new Date(date) : undefined;
                })()
              }
              onSelect={(date) => date && form.setValue('startDate', format(date, 'yyyy-MM-dd'))}
            />
          </PopoverContent>
        </Popover>
        <span className="flex items-center">~</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {form.watch('endDate') || '종료일'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              defaultMonth={
                (() => {
                  const date = form.watch('endDate');
                  return date ? new Date(date) : new Date();
                })()
              }
              selected={
                (() => {
                  const date = form.watch('endDate');
                  return date ? new Date(date) : undefined;
                })()
              }
              onSelect={(date) => date && form.setValue('endDate', format(date, 'yyyy-MM-dd'))}
            />
          </PopoverContent>
        </Popover>
      </div>
    </FormControl>
      <Button 
        variant="outline" 
        className={searchFormat==='DAY'?"border-main bg-main text-primary-foreground hover:bg-third h-9":"h-9"}
        onClick={() => handleFormatChange('DAY')}
      >
        일별
      </Button>
      <Button 
        variant="outline" 
        className={searchFormat==='MONTH'?"border-main bg-main text-primary-foreground hover:bg-third h-9":"h-9"}
        onClick={() => handleFormatChange('MONTH')}
      >
        월별
      </Button>
      <Button 
        variant="outline" 
        className={searchFormat==='YEAR'?"border-main bg-main text-primary-foreground hover:bg-third h-9":"h-9"}
        onClick={() => handleFormatChange('YEAR')}
      >
        년도별
      </Button>
  </FormItem>
)};

export const SearchBox = React.forwardRef<React.ElementRef<'div'>, SearchProps>(
  ({ className, children, onSearch, searchOptions = {}, ...props }, ref) => {
      // 기본 옵션 설정
      const {
        showKeyword = true,
        showDateRange = true,
        showSingleDates = false,
        defaultStartDate = new Date(),
        defaultEndDate = new Date(),
        defaultKeyword = '',
        defaultSearchFormat = 'DAY'
      } = searchOptions;

        
    // 캘린더용 로컬 상태
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(),
    });

    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        startDate: format(defaultStartDate, "yyyy-MM-dd"),
        endDate: format(defaultEndDate, "yyyy-MM-dd"),
        keyword: defaultKeyword,
        searchFormat: defaultSearchFormat
      },
    });

    // 캘린더 상태가 변경될 때 form 값도 업데이트
    const handleDateRangeChange = (range: DateRange | undefined) => {
      setDateRange(range);
    };

    const onSubmit = async (values: SearchOption) => {
      // onSearch prop이 있으면 호출
      if (onSearch) {
        onSearch(values);
      }
    };

    const handleDateChange = (period: 'week' | 'month' | '3month' | 'year') => {
      const today = new Date();
      let fromDate: Date;
    
      switch (period) {
        case 'week':
          fromDate = subDays(today, 7);
          break;
        case 'month':
          fromDate = subMonths(today, 1);
          break;
        case '3month':
          fromDate = subMonths(today, 3);
          break;
        case 'year':
          fromDate = subYears(today, 1);
          break;
        default:
          fromDate = today;
      }
    
      const newRange = {
        from: fromDate,
        to: today
      };
    
      setDateRange(newRange);
    };

    // useEffect(()=>{
    //   if(form){
    //     if(dateRange?.from){
    //       form.setValue('startDate',format(dateRange.from,'yyyy-MM-dd'))
    //     }
    //     if(dateRange?.to){
    //       form.setValue('endDate',format(dateRange.to,'yyyy-MM-dd'))
    //     }
    //   }
    // },[form, dateRange])

    return (
      <div ref={ref} className={cn('m-4 mt-6 p-4 pt-2 bg-zinc-300 rounded-sm', className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
          {showDateRange && (
            <FormField
              control={form.control}
              name="dateRange"
              render={() => (
                <FormItem className="flex items-center gap-x-2">
                  <FormLabel className="min-w-20 h-9 flex items-center justify-start m-0 mt-2">기간</FormLabel>
                  <FormControl>
                    <div className={cn("grid gap-2")}>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[300px] justify-start text-left font-normal",
                              !dateRange && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange?.from ? (
                              dateRange.to ? (
                                <>
                                  {format(dateRange.from, "yyyy. MM. dd.")} -{" "}
                                  {format(dateRange.to, "yyyy. MM. dd.")}
                                </>
                              ) : (
                                format(dateRange.from, "yyyy. MM. dd.")
                              )
                            ) : (
                              <span>날짜를 선택하세요</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={handleDateRangeChange}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormControl>
                  <Button 
                    variant="outline" 
                    className="h-9"
                    onClick={() => handleDateChange('week')}
                  >
                    1주일
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-9"
                    onClick={() => handleDateChange('month')}
                  >
                    1개월
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-9"
                    onClick={() => handleDateChange('3month')}
                  >
                    3개월
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-9"
                    onClick={() => handleDateChange('year')}
                  >
                    1년
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {showSingleDates && <StatisticsSeachBox form={form} />}

          {showKeyword && (
            <FormField
              control={form.control}
              name="keyword"
              render={({field}) => (
                // <div className="space-y-2 flex justify-between items-center gap-x-2">
                  <FormItem className="flex items-center gap-x-2">  {/* flex 추가 */}
                    <FormLabel className="min-w-20 h-9 flex items-center justify-start m-0 mt-2">검색어</FormLabel>
                    <FormControl>
                      <Input className="bg-white w-[600px]" placeholder="검색" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                  
                // </div>
              )}
            />
          )}
          <div className="flex justify-end mt-2">
            <Button size={'lg'} className="bg-main hover:bg-third h-9" type="submit">
              검색
            </Button>
          </div>
          </form>
        </Form>
        {children}
      </div>
    );
  }
);
SearchBox.displayName = 'SearchBox'

