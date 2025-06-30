import { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const TestLayout: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="container mx-auto px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/pub")}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            목록으로 돌아가기
          </Button>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-8 py-6">{children}</main>
    </div>
  );
};
