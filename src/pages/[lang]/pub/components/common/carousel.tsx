import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import '@/assets/scss/style.scss';
export function CarouselDemo() {
  return (
    <div className='component-wrap'>
      <div className="hgroup-wrap">
        <h2 className='f40-700-130'>swiper-wrap</h2>
      </div>
      <div className="component-group">
        <div className='from-group'>
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6 bg-blue-100">
                    <span className="text-2xl font-bold text-blue-800">첫 번째 아이템</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6 bg-green-100">
                    <span className="text-2xl font-bold text-green-800">두 번째 아이템</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6 bg-yellow-100">
                    <span className="text-2xl font-bold text-yellow-800">세 번째 아이템</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6 bg-red-100">
                    <span className="text-2xl font-bold text-red-800">네 번째 아이템</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6 bg-purple-100">
                    <span className="text-2xl font-bold text-purple-800">다섯 번째 아이템</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        </div>
      </div>
      <div className="component-group">
        <div className='from-group'>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-sm"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 bg-indigo-100">
                      <span className="text-3xl font-semibold text-indigo-800">1</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 bg-pink-100">
                      <span className="text-3xl font-semibold text-pink-800">2</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 bg-teal-100">
                      <span className="text-3xl font-semibold text-teal-800">3</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 bg-orange-100">
                      <span className="text-3xl font-semibold text-orange-800">4</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 bg-cyan-100">
                      <span className="text-3xl font-semibold text-cyan-800">5</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  )
}
