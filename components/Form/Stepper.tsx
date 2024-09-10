import cn from "classnames"

interface StepperProps {
  count?: number
  totalSteps?: number
  className?: string
}

export default function Stepper({
  count = 1,
  totalSteps = 5, // 기본값을 5로 설정
  className = "",
}: StepperProps) {
  return (
    <div
      className={cn("grid", `grid-cols-${totalSteps}`, "gap-3 h-1", className)}
    >
      {/* 활성화된 검정 스텝 */}
      {[...Array(count)]?.map((_, i) => (
        <div key={`active-${i}`} className="bg-black w-full rounded-md" />
      ))}
      {/* 비활성화된 회색 스텝 */}
      {[...Array(totalSteps - count)]?.map((_, i) => (
        <div key={`inactive-${i}`} className="bg-gray-300 w-full rounded-md" />
      ))}
    </div>
  )
}
